import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";

/** Componente funcional que renderiza el modal para agregar un consultorio
 * @param {Object} props Las propiedades del componente
 * @param {Function} props.onConsultorioAdded Función que se ejecuta cuando se agrega un consultorio
 * @returns El componente de formulario para agregar un consultorio
 * @requires react, axios, react-toastify
 * @version 1.0
 * */

export default function AgregarConsultorio({ onConsultorioAdded }) {
  const modalRef = useRef(null);
  const [error, setError] = useState(null);

  const [consultorio, setConsultorio] = useState({
    numeroConsultorio: "",
    fechaAdmision: "",
    paciente: { idPaciente: "" },
    personal: { idPersonal: "" },
  });

  const { numeroConsultorio, fechaAdmision, paciente, personal } = consultorio;

  const [pacientes, setPacientes] = useState([]);
  const [personalS, setPersonalS] = useState([]);

  useEffect(() => {
    const cargarPacientes = async () => {
      const token = localStorage.getItem("token");
      try {
        const resultado = await axios.get(
          "https://sipress-backend.onrender.com/sipress-app/pacientes",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPacientes(resultado.data);
        setError(null);
      } catch (error) {
        console.error("Error al cargar los registros de Paciente", error);
      }
    };
    cargarPacientes();
  }, []);

  useEffect(() => {
    const cargarPersonalS = async () => {
      const token = localStorage.getItem("token");
      try {
        const resultado = await axios.get(
          "https://sipress-backend.onrender.com/sipress-app/personalS",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPersonalS(resultado.data);
        setError(null);
      } catch (error) {
        console.error("Error al cargar los registros de Personal", error);
      }
    };
    cargarPersonalS();
  }, []);

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setConsultorio((prevConsultorio) => {
      if (name === "idPaciente") {
        return { ...prevConsultorio, paciente: { idPaciente: value } };
      } else if (name === "idPersonal") {
        return { ...prevConsultorio, personal: { idPersonal: value } };
      } else {
        return { ...prevConsultorio, [name]: value };
      }
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const urlBase = "https://sipress-backend.onrender.com/sipress-app/consultorios";
    const token = localStorage.getItem("token");
    try {
      await axios.post(urlBase, consultorio, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (modalRef.current) {
        const modalInstance = new window.bootstrap.Modal(modalRef.current);
        modalInstance.hide();
      }
      onConsultorioAdded();
      toast.success("Registro agregado correctamente");
    } catch (error) {
      console.error("Error al agregar el registro", error);
      toast.error("Error al agregar el registro");
    }
  };

  return (
    <div
      className="modal fade"
      id="AgregarConsultorioModal"
      tabIndex="-1"
      aria-labelledby="AgregarConsultorioModalLabel"
      aria-hidden="true"
      ref={modalRef}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content bg-light">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="AgregarConsultorioModalLabel">
              Registro de Consultorios
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close">
              <span></span>
            </button>
          </div>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="modal-body">
              {error && <p className="fs-5">{error}</p>}
              <div className="form-floating form-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="numeroConsultorio"
                  name="numeroConsultorio"
                  placeholder="Número de Consultorio"
                  required={true}
                  value={numeroConsultorio}
                  onChange={(e) => onInputChange(e)}
                />
                <label htmlFor="numeroConsultorio">Número de Consultorio</label>
              </div>

              <div className="form-floating form-group mb-3">
                <input
                  type="date"
                  className="form-control"
                  id="fechaAdmision"
                  name="fechaAdmision"
                  placeholder="Fecha de admisión"
                  required={true}
                  value={fechaAdmision}
                  onChange={(e) => onInputChange(e)}
                />
                <label htmlFor="fechaAdmision">Fecha de admisión</label>
              </div>

              <div className="form-floating form-group mb-3">
                <select
                  className="form-control"
                  id="idPaciente"
                  name="idPaciente"
                  required={true}
                  value={paciente.idPaciente} // Usar el ID de la paciente
                  onChange={(e) => onInputChange(e)}>
                  <option value="">Seleccione un Paciente</option>
                  {pacientes.map((paciente) => (
                    <option
                      key={paciente.idPaciente}
                      value={paciente.idPaciente}>
                      {paciente.nombrePaciente} {paciente.apellidoPaciente}
                    </option>
                  ))}
                </select>
                <label htmlFor="idPaciente">Paciente</label>
              </div>

              <div className="form-floating form-group mb-3">
                <select
                  className="form-control"
                  id="idPersonal"
                  name="idPersonal"
                  required={true}
                  value={personal.idPersonal} // Usar el ID del personal
                  onChange={(e) => onInputChange(e)}>
                  <option value="">Seleccione una opción</option>
                  {personalS.map((personal) => (
                    <option
                      key={personal.idPersonal}
                      value={personal.idPersonal}>
                      {personal.nombrePersonal} {personal.apellidoPersonal}
                    </option>
                  ))}
                </select>
                <label htmlFor="idPersonal">Personal Encargado</label>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary btn-sm me-3"
                data-bs-dismiss="modal">
                <i className="fa-regular fa-rectangle-xmark"></i> Cerrar
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                data-bs-dismiss="modal">
                <i className="fa-solid fa-folder-plus"></i> Guardar registro
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
