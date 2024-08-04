import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Calendario from "../comunes/Calendario";
import BasicTimePicker from "../comunes/BasicTimePicker";
import dayjs from "dayjs";

export default function AgregarConsulta({ onConsultaAdded }) {
  const modalRef = useRef(null);

  const [consulta, setConsulta] = useState({
    fechaConsulta: "",
    horaConsulta: "",
    paciente: { idPaciente: "" },
    doctor: { idDoctor: "" },
  });

  const { fechaConsulta, horaConsulta, paciente, doctor } = consulta;

  const [pacientes, setPacientes] = useState([]);
  const [doctores, setDoctores] = useState([]);

  useEffect(() => {
    const cargarPacientes = async () => {
      try {
        const resultado = await axios.get(
          "http://localhost:8080/sipress-app/pacientes"
        );
        setPacientes(resultado.data);
      } catch (error) {
        console.error("Error al cargar los pacientes:", error);
      }
    };
    cargarPacientes();
  }, []);

  useEffect(() => {
    const cargarDoctores = async () => {
      try {
        const resultado = await axios.get(
          "http://localhost:8080/sipress-app/doctores"
        );
        setDoctores(resultado.data);
      } catch (error) {
        console.error("Error al cargar los doctores:", error);
      }
    };
    cargarDoctores();
  }, []);

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setConsulta((prevConsulta) => {
      if (name === "idPaciente") {
        return { ...prevConsulta, paciente: { idPaciente: value } };
      } else if (name === "idDoctor") {
        return { ...prevConsulta, doctor: { idDoctor: value } };
      } else {
        return { ...prevConsulta, [name]: value };
      }
    });
  };

  const onDateClick = (date) => {
    const dateStr = date
      .toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
      .replace(/\//g, "-"); // Reemplazar '/' con '-'
    setConsulta((prevConsulta) => ({
      ...prevConsulta,
      fechaConsulta: dateStr,
    }));
  };

  const onTimeChange = (newValue) => {
    const timeStr = newValue ? newValue.format("HH:mm:ss") : "";
    setConsulta((prevConsulta) => ({
      ...prevConsulta,
      horaConsulta: timeStr,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(consulta); // Añadir esta línea para verificar los valores
    const urlBase = "http://localhost:8080/sipress-app/consultas";
    try {
      await axios.post(urlBase, consulta);
      if (modalRef.current) {
        const modalInstance = new window.bootstrap.Modal(modalRef.current);
        modalInstance.hide();
      }
      onConsultaAdded();
    } catch (error) {
      console.error("Error al agregar la consulta:", error);
    }
  };

  return (
    <div
      className="modal fade"
      id="AgregarConsultaModal"
      tabIndex="-1"
      aria-labelledby="AgregarConsultaModalLabel"
      aria-hidden="true"
      ref={modalRef}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content bg-light">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="AgregarConsultaModalLabel">
              Registro de Consultas
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close">
              <span></span>
            </button>
          </div>
          <form onSubmit={onSubmit}>
            <div className="modal-body">
              <div className="form-floating form-group mb-3">
                <select
                  className="form-control"
                  id="idPaciente"
                  name="idPaciente"
                  required
                  value={paciente.idPaciente}
                  onChange={onInputChange}>
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
                  id="idDoctor"
                  name="idDoctor"
                  required
                  value={doctor.idDoctor}
                  onChange={onInputChange}>
                  <option value="">Seleccione un Doctor</option>
                  {doctores.map((doctor) => (
                    <option key={doctor.idDoctor} value={doctor.idDoctor}>
                      {doctor.nombreDoctor} {doctor.apellidoDoctor}
                    </option>
                  ))}
                </select>
                <label htmlFor="idDoctor">Doctor</label>
              </div>

              <div className="mb-3">
                <Calendario onDateClick={onDateClick} />
              </div>
              <div className="form-floating form-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="fechaConsulta"
                  name="fechaConsulta"
                  placeholder="Fecha de Consulta"
                  readOnly
                  value={fechaConsulta}
                />
                <label htmlFor="fechaConsulta">Fecha de Consulta </label>
              </div>
              <div className="form-floating form-group mb-3">
                <span>
                  <BasicTimePicker
                    value={dayjs(horaConsulta, "HH:mm:ss")}
                    onChange={onTimeChange}
                  />
                </span>
                <label htmlFor="horaConsulta"></label>
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