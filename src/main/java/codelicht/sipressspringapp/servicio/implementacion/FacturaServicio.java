package codelicht.sipressspringapp.servicio.implementacion;

import codelicht.sipressspringapp.modelo.Factura;
import codelicht.sipressspringapp.repositorio.FacturaRepositorio;
import codelicht.sipressspringapp.servicio.interfaces.IFacturaServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Implementación del servicio para la entidad Consultorio.
 */
@Service
public class FacturaServicio implements IFacturaServicio {

    @Autowired
    private FacturaRepositorio facturaRepositorio;

    @Override
    public List<Factura> listarFacturas() {
        return facturaRepositorio.findAll();
    }

    @Override
    public Factura buscarFacturaPorId(Integer idFactura) {
        return facturaRepositorio.findById(idFactura).orElse(null);
    }

    @Override
    public Factura guardarFactura(Factura factura) {
        return facturaRepositorio.save(factura);
    }

    @Override
    public void eliminarFactura(Factura factura) {
        facturaRepositorio.delete(factura);
    }
}