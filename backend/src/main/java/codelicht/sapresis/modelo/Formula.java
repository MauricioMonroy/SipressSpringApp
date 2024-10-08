package codelicht.sapresis.modelo;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDate;

@Getter
@Setter
@Entity
@NamedQueries({
        @NamedQuery(name = "Formula.findAll", query = "SELECT f FROM Formula f")})
public class Formula implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    @Basic(optional = false)
    @Column(name = "numero_formula")
    @JsonProperty("numeroFormula")
    private Integer numeroFormula;

    @NotEmpty(message = "El nombre de la medicación no puede estar vacío")
    @Column(name = "nombre_medicacion")
    @JsonProperty("nombreMedicacion")
    private String nombreMedicacion;

    @Column(name = "fecha_medicacion")
    @Temporal(TemporalType.DATE)
    @JsonProperty("fechaMedicacion")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate fechaMedicacion;

    @DecimalMin(value = "0.0", inclusive = false, message = "El costo de la medicación debe ser un valor positivo")
    @Column(name = "costo_medicacion")
    @JsonProperty("costoMedicacion")
    private Double costoMedicacion;

    @JoinColumn(name = "paciente_id", referencedColumnName = "id_paciente")
    @ManyToOne
    @JsonProperty("paciente")
    private Paciente paciente;

    @Override
    public String toString() {
        return "Formula{\n" +
                "numeroFormula=" + numeroFormula + ",\n" +
                "nombreMedicacion='" + nombreMedicacion + "',\n" +
                "fechaMedicacion=" + fechaMedicacion + ",\n" +
                "costoMedicacion=" + costoMedicacion + ",\n" +
                "paciente=" + paciente + "\n" +
                '}';
    }
}
