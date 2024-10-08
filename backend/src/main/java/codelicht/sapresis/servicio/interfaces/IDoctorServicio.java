package codelicht.sapresis.servicio.interfaces;

import codelicht.sapresis.modelo.Doctor;

import java.util.List;

/**
 * Interface para la entidad Doctor.
 * Contiene los métodos a implementar en operaciones CRUD básicas.
 */
public interface IDoctorServicio {
    List<Doctor> listarDoctores();

    Doctor buscarDoctorPorId(Integer idDoctor);

    Doctor guardarDoctor(Doctor doctor);

    void eliminarDoctor(Doctor doctor);
}
