import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

/**
 * Componente funcional que permite editar un paciente
 * @returns El componente de formulario para editar un paciente
 * @requires react, axios, react-toastify, useNavigate, useParams, Link, useState, useCallback, useEffect
 * @version 1.0
 * */

export default function EditarPaciente() {
  const urlBase = process.env.REACT_APP_API_URL + "/sapresis/pacientes";

  let navigate = useNavigate();
  const { id } = useParams();

  const [paciente, setPaciente] = useState({
    idPaciente: "",
    nombrePaciente: "",
    apellidoPaciente: "",
    direccionPaciente: "",
    telefonoPaciente: "",
    emailPaciente: "",
    eps: {
      idEps: "",
      nombreEps: "",
      telefonoEps: "",
      emailEps: "",
    },
  });

  const {
    idPaciente,
    nombrePaciente,
    apellidoPaciente,
    direccionPaciente,
    telefonoPaciente,
    emailPaciente,
    eps: { idEps },
  } = paciente;

  const [epsS, setEpsS] = useState([]);

  const cargarEpsS = useCallback(async () => {
    const token = localStorage.getItem("token");
    try {
      const resultado = await axios.get(
        process.env.REACT_APP_API_URL + "/sapresis/epsS",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setEpsS(resultado.data);
    } catch (error) {
      console.error("Error al cargar los registros de Eps:", error);
      toast.error("Error al cargar los datos del registro solicitado");
    }
  }, []);

  const cargarPaciente = useCallback(async () => {
    const token = localStorage.getItem("token");
    try {
      const resultado = await axios.get(`${urlBase}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPaciente(resultado.data);
    } catch (error) {
      console.error("Error al cargar los registros de Paciente:", error);
      toast.error("Error al cargar los datos del registro solicitado");
    }
  }, [id, urlBase]);

  useEffect(() => {
    cargarEpsS();
  }, [cargarEpsS]);

  useEffect(() => {
    cargarPaciente();
  }, [cargarPaciente]);

  const onInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "eps.idEps") {
      setPaciente((prevPaciente) => ({
        ...prevPaciente,
        eps: {
          ...prevPaciente.eps,
          idEps: value,
        },
      }));
    } else {
      setPaciente((prevPaciente) => ({
        ...prevPaciente,
        [name]: value,
      }));
    }
  };

  const onSubmit = async (e) => {
    const token = localStorage.getItem("token");
    e.preventDefault();
    try {
      await axios.put(`${urlBase}/${id}`, paciente, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Registro actualizado con éxito");
      navigate("/pacientes");
    } catch (error) {
      console.error("Error al actualizar el paciente:", error);
      toast.error("Error al actualizar el registro");
    }
  };

  return (
    <div className="p-4 mb-2 mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-9">
          <div className="card mt-3" id="details">
            <div className="card-header">
              <h4>Modificar Registro</h4>
            </div>
            <form onSubmit={(e) => onSubmit(e)}>
              <div className="card-body">
                <div className="form-floating form-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="idPaciente"
                    name="idPaciente"
                    placeholder="ID Paciente"
                    required={true}
                    value={idPaciente}
                    onChange={(e) => onInputChange(e)}
                  />
                  <label htmlFor="idPaciente">ID del Paciente</label>
                </div>

                <div className="form-floating form-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="nombrePaciente"
                    name="nombrePaciente"
                    placeholder="Nombre del Paciente"
                    required={true}
                    value={nombrePaciente}
                    onChange={(e) => onInputChange(e)}
                  />
                  <label htmlFor="nombrePaciente">Nombre del Paciente</label>
                </div>

                <div className="form-floating form-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="apellidoPaciente"
                    name="apellidoPaciente"
                    placeholder="Apellido del Paciente"
                    required={true}
                    value={apellidoPaciente}
                    onChange={(e) => onInputChange(e)}
                  />
                  <label htmlFor="apellidoPaciente">
                    Apellido del Paciente
                  </label>
                </div>

                <div className="form-floating form-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="direccionPaciente"
                    name="direccionPaciente"
                    placeholder="Dirección del Paciente"
                    required={true}
                    value={direccionPaciente}
                    onChange={(e) => onInputChange(e)}
                  />
                  <label htmlFor="direccionPaciente">
                    Dirección del Paciente
                  </label>
                </div>

                <div className="form-floating form-group mb-3">
                  <input
                    type="tel"
                    className="form-control"
                    id="telefonoPaciente"
                    name="telefonoPaciente"
                    placeholder="Teléfono del Paciente"
                    required={true}
                    value={telefonoPaciente}
                    onChange={(e) => onInputChange(e)}
                  />
                  <label htmlFor="telefonoPaciente">
                    Teléfono del Paciente
                  </label>
                </div>

                <div className="form-floating form-group mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="emailPaciente"
                    name="emailPaciente"
                    placeholder="Email"
                    required={true}
                    value={emailPaciente}
                    onChange={(e) => onInputChange(e)}
                  />
                  <label htmlFor="emailPaciente">Email</label>
                </div>

                <div className="form-floating form-group mb-3">
                  <select
                    className="form-control"
                    id="idEps"
                    name="eps.idEps"
                    required={true}
                    value={idEps}
                    onChange={(e) => onInputChange(e)}>
                    {epsS.map((eps) => (
                      <option key={eps.idEps} value={eps.idEps}>
                        {eps.nombreEps}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="idEps">Eps</label>
                </div>

                <button type="submit" className="btn btn-primary">
                  <i className="fa-regular fa-floppy-disk"></i> Guardar Cambios
                </button>
                <Link to="../pacientes">
                  <i className="fa-solid fa-triangle-exclamation"></i> Cancelar
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
