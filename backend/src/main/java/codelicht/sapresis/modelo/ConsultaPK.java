package codelicht.sapresis.modelo;

import jakarta.persistence.Basic;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class ConsultaPK implements Serializable {

    @Basic(optional = false)
    @Column(name = "paciente_id")
    private int pacienteId;
    @Basic(optional = false)
    @Column(name = "doctor_id")
    private int doctorId;

    @Override
    public int hashCode() {
        int hash = 0;
        hash += pacienteId;
        hash += doctorId;
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof ConsultaPK other)) {
            return false;
        }
        if (this.pacienteId != other.pacienteId) {
            return false;
        }
        return this.doctorId == other.doctorId;
    }

    @Override
    public String toString() {
        return "ConsultaPK{" +
                "pacienteId=" + pacienteId +
                ", doctorId=" + doctorId +
                '}';
    }
}
