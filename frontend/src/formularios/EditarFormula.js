import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

/**
 * Componente funcional que permite editar una fórmula
 * @returns El componente de formulario para editar una fórmula
 * @requires react, axios, react-toastify, useNavigate, useParams, Link, useState, useCallback, useEffect
 * @version 1.0
 * */

export default function EditarFormula() {
  const urlBase = process.env.REACT_APP_API_URL + "/sapresis/formulas";

  let navigate = useNavigate();
  const { id } = useParams();

  const [formula, setFormula] = useState({
    numeroFormula: "",
    nombreMedicacion: "",
    fechaMedicacion: "",
    costoMedicacion: "",
    paciente: {
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
    },
  });

  const {
    numeroFormula,
    nombreMedicacion,
    fechaMedicacion,
    costoMedicacion,
    paciente: { idPaciente },
  } = formula;

  const [pacientes, setPacientes] = useState([]);

  const cargarPacientes = useCallback(async () => {
    const token = localStorage.getItem("token");
    try {
      const resultado = await axios.get(
        process.env.REACT_APP_API_URL + "/sapresis/pacientes",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPacientes(resultado.data);
    } catch (error) {
      console.error("Error al cargar los registros de Paciente:", error);
      toast.error("Error al cargar los datos del registro solicitado");
    }
  }, []);

  const cargarFormula = useCallback(async () => {
    const token = localStorage.getItem("token");
    try {
      const resultado = await axios.get(`${urlBase}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFormula(resultado.data);
    } catch (error) {
      console.error("Error al cargar los registros de Fórmula:", error);
      toast.error("Error al cargar los datos del registro solicitado");
    }
  }, [id, urlBase]);

  useEffect(() => {
    cargarPacientes();
  }, [cargarPacientes]);

  useEffect(() => {
    cargarFormula();
  }, [cargarFormula]);

  const onInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("eps")) {
      setFormula({
        ...formula,
        paciente: {
          ...formula.paciente,
          eps: {
            ...formula.paciente.eps,
            [name.split(".")[1]]: value,
          },
        },
      });
    } else if (name.startsWith("paciente")) {
      setFormula({
        ...formula,
        paciente: {
          ...formula.paciente,
          [name.split(".")[1]]: value,
        },
      });
    } else {
      setFormula({ ...formula, [name]: value });
    }
  };

  const onSubmit = async (e) => {
    const token = localStorage.getItem("token");
    e.preventDefault();
    try {
      await axios.put(`${urlBase}/${id}`, formula, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Registro actualizado con éxito");
      navigate("/formulas");
    } catch (error) {
      console.error("Error al actualizar el registro:", error);
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
                    id="numeroFormula"
                    name="numeroFormula"
                    placeholder="Número de Fórmula Médica"
                    required={true}
                    value={numeroFormula}
                    onChange={(e) => onInputChange(e)}
                  />
                  <label htmlFor="numeroFormula">
                    Número de Fórmula Médica
                  </label>
                </div>

                <div className="form-floating form-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="nombreMedicacion"
                    name="nombreMedicacion"
                    placeholder="Nombre de la Medicación"
                    required={true}
                    value={nombreMedicacion}
                    onChange={(e) => onInputChange(e)}
                  />
                  <label htmlFor="nombreMedicacion">
                    Nombre de la Medicación
                  </label>
                </div>

                <div className="form-floating form-group mb-3">
                  <input
                    type="date"
                    className="form-control"
                    id="fechaMedicacion"
                    name="fechaMedicacion"
                    placeholder="Fecha de la Medicación"
                    required={true}
                    value={fechaMedicacion}
                    onChange={(e) => onInputChange(e)}
                  />
                  <label htmlFor="fechaMedicacion">
                    Fecha de la Medicación
                  </label>
                </div>

                <div className="form-floating form-group mb-3">
                  <input
                    type="number"
                    step="any"
                    className="form-control"
                    id="costoMedicacion"
                    name="costoMedicacion"
                    placeholder="Costo de la Medicación"
                    required={true}
                    value={costoMedicacion}
                    onChange={(e) => onInputChange(e)}
                  />
                  <label htmlFor="costoMedicacion">
                    Costo de la Medicación
                  </label>
                </div>

                <div className="form-floating form-group mb-3">
                  <select
                    className="form-control"
                    id="idPaciente"
                    name="paciente.idPaciente"
                    required={true}
                    value={idPaciente}
                    onChange={(e) => onInputChange(e)}>
                    {pacientes.map((paciente) => (
                      <option
                        key={paciente.idPaciente}
                        value={paciente.idPaciente}>
                        {paciente.nombrePaciente} {paciente.apellidoPaciente}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="idPaciente">Elegir paciente</label>
                </div>

                <button type="submit" className="btn btn-primary">
                  <i className="fa-regular fa-floppy-disk"></i> Guardar Cambios
                </button>
                <Link to="../formulas">
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
