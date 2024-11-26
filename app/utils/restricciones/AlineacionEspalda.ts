// Archivo: restricciones/AlineacionEspalda.ts
import { Pose, Resultado, RestriccionPostura } from '../Restriccion';

export class AlineacionEspalda extends RestriccionPostura {
    verificar(puntos: Pose): Resultado {
        const puntosMal: string[] = [];

        const anguloEspaldaIzquierda = this.calcularAngulo(puntos['11'], puntos['23'], puntos['25']);
        if (anguloEspaldaIzquierda < 150 || anguloEspaldaIzquierda > 180) {
            puntosMal.push('11', '23', '25');
        }

        const anguloEspaldaDerecha = this.calcularAngulo(puntos['12'], puntos['24'], puntos['26']);
        if (anguloEspaldaDerecha < 150 || anguloEspaldaDerecha > 180) {
            puntosMal.push('12', '24', '26');
        }

        return { puntosMal };
    }
}
