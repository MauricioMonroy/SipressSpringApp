package codelicht.sipresswebapp.servicio.implementacion;

import codelicht.sipresswebapp.modelo.Formula;
import codelicht.sipresswebapp.repositorio.FormulaRepositorio;
import codelicht.sipresswebapp.servicio.interfaces.IFormulaServicio;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Implementación del servicio para la entidad Fórmula.
 */
@Service
public class FormulaServicio implements IFormulaServicio {

    private final FormulaRepositorio formulaRepositorio;

    // Inyección de dependencias por constructor
    public FormulaServicio(FormulaRepositorio formulaRepositorio) {
        this.formulaRepositorio = formulaRepositorio;
    }

    @Override
    public List<Formula> listarFormulas() {
        return formulaRepositorio.findAll();
    }

    @Override
    public Formula buscarFormulaPorId(Integer idFormula) {
        return formulaRepositorio.findById(idFormula).orElse(null);
    }

    @Override
    public Formula guardarFormula(Formula formula) {
        return formulaRepositorio.save(formula);
    }

    @Override
    public void eliminarFormula(Formula formula) {
        formulaRepositorio.delete(formula);
    }
}