package codelicht.sipressspringapp.modelo;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.io.Serial;
import java.io.Serializable;
import java.util.Date;

@Getter
@Setter
@Entity
@NamedQueries({
        @NamedQuery(name = "Consultorio.findAll", query = "SELECT c FROM Consultorio c")})
public class Consultorio implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @Column(name = "numero_consultorio")
    private Integer numeroConsultorio;
    @Column(name = "fecha_admision")
    @Temporal(TemporalType.DATE)
    private Date fechaAdmision;
    @JoinColumn(name = "paciente_id", referencedColumnName = "id_paciente")
    @ManyToOne
    @JsonBackReference
    private Paciente paciente;
    @JoinColumn(name = "personal_id", referencedColumnName = "id_personal")
    @ManyToOne
    @JsonBackReference
    private Personal personal;

}