package codelicht.sapresis.servicio.implementacion;

import codelicht.sapresis.modelo.Paciente;
import codelicht.sapresis.repositorio.PacienteRepositorio;
import codelicht.sapresis.servicio.interfaces.IPacienteServicio;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Implementación del servicio para la entidad Paciente.
 */
@Service
public class PacienteServicio implements IPacienteServicio {

    private final PacienteRepositorio pacienteRepositorio;

    // Inyección de dependencias por constructor
    public PacienteServicio(PacienteRepositorio pacienteRepositorio) {
        this.pacienteRepositorio = pacienteRepositorio;
    }

    @Override
    public List<Paciente> listarPacientes() {
        return pacienteRepositorio.findAll();
    }

    @Override
    public Paciente buscarPacientePorId(Integer idPaciente) {
        return pacienteRepositorio.findById(idPaciente).orElse(null);
    }

    @Override
    public Paciente guardarPaciente(Paciente paciente) {
        return pacienteRepositorio.save(paciente);
    }

    @Override
    public void eliminarPaciente(Paciente paciente) {
        pacienteRepositorio.delete(paciente);
    }
}
