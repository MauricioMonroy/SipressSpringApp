import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditarPersonal() {
  const urlBase = "http://localhost:8080/sipress-app/personalS";

  let navigate = useNavigate();
  const { id } = useParams();

  const [personal, setPersonal] = useState({
    idPersonal: "",
    nombrePersonal: "",
    apellidoPersonal: "",
    telefonoPersonal: "",
    emailPersonal: "",
    dependencia: {
      idDependencia: "",
      nombreDependencia: "",
      institucion: {
        idInstitucion: "",
        nombreInstitucion: "",
        direccionInstitucion: "",
        telefonoInstitucion: "",
        codigoPostal: "",
      },
    },
  });

  const {
    idPersonal,
    nombrePersonal,
    apellidoPersonal,
    telefonoPersonal,
    emailPersonal,
    dependencia: { idDependencia },
  } = personal;

  const [dependencias, setDependencias] = useState([]);

  const cargarDependencias = useCallback(async () => {
    try {
      const resultado = await axios.get(
        "http://localhost:8080/sipress-app/dependencias"
      );
      setDependencias(resultado.data);
    } catch (error) {
      console.error("Error al cargar las dependencias:", error);
    }
  }, []);

  const cargarPersonal = useCallback(async () => {
    try {
      const resultado = await axios.get(`${urlBase}/${id}`);
      setPersonal(resultado.data);
    } catch (error) {
      console.error("Error al cargar el personal:", error);
    }
  }, [id]);

  useEffect(() => {
    cargarDependencias();
  }, [cargarDependencias]);

  useEffect(() => {
    cargarPersonal();
  }, [cargarPersonal]);

  const onInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("institucion")) {
      setPersonal({
        ...personal,
        dependencia: {
          ...personal.dependencia,
          institucion: {
            ...personal.dependencia.institucion,
            [name.split(".")[1]]: value,
          },
        },
      });
    } else if (name.startsWith("dependencia")) {
      setPersonal({
        ...personal,
        dependencia: {
          ...personal.dependencia,
          [name.split(".")[1]]: value,
        },
      });
    } else {
      setPersonal({ ...personal, [name]: value });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${urlBase}/${id}`, personal);
      navigate("/personalS");
    } catch (error) {
      console.error("Error al actualizar el personal:", error);
    }
  };

  return (
    <div className="p-4" id="details">
      <div className="row justify-content-center">
        <div className="col-lg-9">
          <div className="card">
            <div className="card-header">
              <h4>Modificar Registro</h4>
            </div>
            <form onSubmit={(e) => onSubmit(e)}>
              <div className="card-body">
                <div className="form-floating form-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="idPersonal"
                    name="idPersonal"
                    placeholder="ID Personal"
                    required={true}
                    value={idPersonal}
                    onChange={(e) => onInputChange(e)}
                  />
                  <label htmlFor="idPersonal">ID del Personal</label>
                </div>

                <div className="form-floating form-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="nombrePersonal"
                    name="nombrePersonal"
                    placeholder="Nombre del Personal"
                    required={true}
                    value={nombrePersonal}
                    onChange={(e) => onInputChange(e)}
                  />
                  <label htmlFor="nombrePersonal">Nombre del Personal</label>
                </div>

                <div className="form-floating form-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="apellidoPersonal"
                    name="apellidoPersonal"
                    placeholder="Apellido del Personal"
                    required={true}
                    value={apellidoPersonal}
                    onChange={(e) => onInputChange(e)}
                  />
                  <label htmlFor="apellidoPersonal">
                    Apellido del Personal
                  </label>
                </div>

                <div className="form-floating form-group mb-3">
                  <input
                    type="tel"
                    className="form-control"
                    id="telefonoPersonal"
                    name="telefonoPersonal"
                    placeholder="Teléfono del Personal"
                    required={true}
                    value={telefonoPersonal}
                    onChange={(e) => onInputChange(e)}
                  />
                  <label htmlFor="telefonoPersonal">
                    Teléfono del Personal
                  </label>
                </div>

                <div className="form-floating form-group mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="emailPersonal"
                    name="emailPersonal"
                    placeholder="Email"
                    required={true}
                    value={emailPersonal}
                    onChange={(e) => onInputChange(e)}
                  />
                  <label htmlFor="emailPersonal">Email</label>
                </div>

                <div className="form-floating form-group mb-3">
                  <select
                    className="form-control"
                    id="idDependencia"
                    name="dependencia.idDependencia"
                    required={true}
                    value={idDependencia}
                    onChange={(e) => onInputChange(e)}>
                    {dependencias.map((dependencia) => (
                      <option
                        key={dependencia.idDependencia}
                        value={dependencia.idDependencia}>
                        {dependencia.nombreDependencia}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="idDependencia">Dependencia</label>
                </div>

                <button type="submit" className="btn btn-primary">
                  <i className="fa-regular fa-floppy-disk"></i> Guardar Cambios
                </button>
                <Link to="/personalS">
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
