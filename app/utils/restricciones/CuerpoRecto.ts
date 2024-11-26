import { Pose, Resultado, RestriccionPostura } from '../Restriccion';

// Clase para verificar que el cuerpo esté alineado en una línea recta desde hombros hasta tobillos
export class CuerpoRecto extends RestriccionPostura {
    verificar(puntos: Pose): Resultado {
        const puntosMal: string[] = [];

        // 11 - hombro izquierdo, 23 - cadera izquierda, 27 - tobillo izquierdo
        // 12 - hombro derecho, 24 - cadera derecha, 28 - tobillo derecho
        const anguloPermitido = 10; // Grados de tolerancia

        // Calculamos el ángulo formado por hombro, cadera y tobillo izquierdo
        const anguloCaderaIzquierda = this.calcularAngulo(puntos['11'], puntos['23'], puntos['27']);
        if (anguloCaderaIzquierda < 180 - anguloPermitido || anguloCaderaIzquierda > 180 + anguloPermitido) {
            puntosMal.push('23'); // Señala cadera izquierda
        }

        // Calculamos el ángulo formado por hombro, cadera y tobillo derecho
        const anguloCaderaDerecha = this.calcularAngulo(puntos['12'], puntos['24'], puntos['28']);
        if (anguloCaderaDerecha < 180 - anguloPermitido || anguloCaderaDerecha > 180 + anguloPermitido) {
            puntosMal.push('24'); // Señala cadera derecha
        }

        return { puntosMal };
    }
}

