package codelicht.sapresis.repositorio;

import codelicht.sapresis.modelo.Eps;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Repositorio para la entidad Eps.
 * Extiende JpaRepository para proporcionar operaciones CRUD básicas.
 */
public interface EpsRepositorio extends JpaRepository<Eps, Integer> {
}
