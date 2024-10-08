import React from "react";

/**
 * Componente que muestra la página de inicio de la aplicación.
 * @returns El componente de la página de inicio.
 * @version 1.0
 */

function Inicio() {
  return (
    <div className="py-2 mb-5 mt-5">
      {/* Encabezado */}
      <header>
        <div className="container">
          <div className="row bg-light rounded-3 text-center m-5">
            <div className="m-2">            
              <h4 className="fw-bold">
              <span className="text-success fw-bold fs-2">Sapresis</span> - Sistema Integral para la Prestación de Servicios de Salud
              </h4>
              <p className="fs-6">
                El Sapresis es una aplicación diseñada para simplificar la
                gestión de las Instituciones Prestadoras de Salud (IPS),
                facilitando el manejo de la información de los pacientes,
                personal médico y administrativo, así como de los servicios que
                se prestan en la institución. Su objetivo principal es mejorar
                la atención y la eficiencia en la prestación de servicios
                hospitalarios.
              </p>
            </div>
          </div>
        </div>
      </header>
      {/* Contenido */}
      <section className="index">
        <div className="container mb-5">
          <div className="row gx-lg-5">
            <div className="col-md-3 col-sm-6">
              <a href="/instituciones" className="text-decoration-none">
                <div className="card text-center h-100 custom-card">
                  <div className="card-header">
                    <h3 className="card-title">Sedes</h3>
                  </div>
                  <div className="card-body">
                    <span>
                    <img
                      src={`${process.env.PUBLIC_URL}images/institucion.png`}
                      alt="institucion.png"
                      className="card-img-top"
                    />
                    </span>                   
                  </div>
                </div>
              </a>
            </div>
            <div className="col-md-3 col-sm-6">
              <a href="/personalS" className="text-decoration-none">
                <div className="card text-center h-100 custom-card">
                  <div className="card-header">
                    <h3 className="card-title">Personal</h3>
                  </div>
                  <div className="card-body">
                    <img
                      src={`${process.env.PUBLIC_URL}images/personal.png`}
                      alt="personal.png"
                      className="card-img-top"
                    />
                  </div>
                </div>
              </a>
            </div>
            <div className="col-md-3 col-sm-6">
              <a href="/doctores" className="text-decoration-none">
                <div className="card text-center h-100 custom-card">
                  <div className="card-header">
                    <h3 className="card-title">Doctores</h3>
                  </div>
                  <div className="card-body">
                    <img
                      src={`${process.env.PUBLIC_URL}images/equipo-medico.png`}
                      alt="equipo-medico.png"
                      className="card-img-top"
                    />
                  </div>
                </div>
              </a>
            </div>
            <div className="col-md-3 col-sm-6">
              <a href="/pacientes" className="text-decoration-none">
                <div className="card text-center h-100 custom-card">
                  <div className="card-header">
                    <h3 className="card-title">Pacientes</h3>
                  </div>

                  <div className="card-body">
                    <img
                      src={`${process.env.PUBLIC_URL}images/patients.png`}
                      alt="patients.png"
                      className="card-img-top"
                    />
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
        <br />
      </section>
    </div>
  );
}

export default Inicio;
