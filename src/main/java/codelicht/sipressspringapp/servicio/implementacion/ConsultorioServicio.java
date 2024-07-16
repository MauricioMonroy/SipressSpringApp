package codelicht.sipressspringapp.servicio.implementacion;

import codelicht.sipressspringapp.modelo.Consultorio;
import codelicht.sipressspringapp.repositorio.ConsultorioRepositorio;
import codelicht.sipressspringapp.servicio.interfaces.IConsultorioServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Implementación del servicio para la entidad Consultorio.
 */
@Service
public class ConsultorioServicio implements IConsultorioServicio {

    @Autowired
    private ConsultorioRepositorio consultorioRepositorio;

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