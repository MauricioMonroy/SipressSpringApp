package codelicht.sapresis.servicio.implementacion;

import codelicht.sapresis.modelo.Consultorio;
import codelicht.sapresis.repositorio.ConsultorioRepositorio;
import codelicht.sapresis.servicio.interfaces.IConsultorioServicio;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Implementación del servicio para la entidad Consultorio.
 */
@Service
public class ConsultorioServicio implements IConsultorioServicio {

    private final ConsultorioRepositorio consultorioRepositorio;

    // Inyección de dependencias por constructor
    public ConsultorioServicio(ConsultorioRepositorio consultorioRepositorio) {
        this.consultorioRepositorio = consultorioRepositorio;
    }

    @Override
    public List<Consultorio> listarConsultorios() {
        return consultorioRepositorio.findAll();
    }

    @Override
    public Consultorio buscarConsultorioPorId(Integer idConsultorio) {
        return consultorioRepositorio.findById(idConsultorio).orElse(null);
    }

    @Override
    public Consultorio guardarConsultorio(Consultorio consultorio) {
        return consultorioRepositorio.save(consultorio);
    }

    @Override
    public void eliminarConsultorio(Consultorio consultorio) {
        consultorioRepositorio.delete(consultorio);
    }
}
