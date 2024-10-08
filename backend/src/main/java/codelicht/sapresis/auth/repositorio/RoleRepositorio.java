package codelicht.sapresis.auth.repositorio;

import codelicht.sapresis.auth.entidad.Role;
import codelicht.sapresis.auth.entidad.RoleEnum;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Repositorio de la entidad Role
 * Extiende de CrudRepository y recibe la entidad Role y el tipo de dato de su llave primaria
 */
@Repository
public interface RoleRepositorio extends CrudRepository<Role, Integer> {
    Optional<Role> findByNombre(RoleEnum name);
}
