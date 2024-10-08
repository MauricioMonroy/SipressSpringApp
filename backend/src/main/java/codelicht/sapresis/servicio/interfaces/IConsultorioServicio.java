package codelicht.sapresis.servicio.interfaces;

import codelicht.sapresis.modelo.Consultorio;

import java.util.List;

/**
 * Interface para la entidad Consultorio.
 * Contiene los métodos a implementar en operaciones CRUD básicas.
 */
public interface IConsultorioServicio {
    List<Consultorio> listarConsultorios();

    Consultorio buscarConsultorioPorId(Integer idConsultorio);

    Consultorio guardarConsultorio(Consultorio consultorio);

    void eliminarConsultorio(Consultorio consultorio);
}
