import { Pose, Resultado, RestriccionPostura } from '../Restriccion';

// Restricción: Alineación de los codos con los hombros en el eje X
export class AlineacionCodosHombrosX extends RestriccionPostura {
    verificar(puntos: Pose): Resultado {
        const puntosMal: string[] = [];

        // 13 - codo izquierdo, 14 - codo derecho, 11 - hombro izquierdo, 12 - hombro derecho
        const rangoPermitido = 0.05; // 3% de tolerancia

        const posicionHombroIzquierdoX = puntos['11'].x;
        const posicionHombroDerechoX = puntos['12'].x;
        const posicionCodoIzquierdoX = puntos['13'].x;
        const posicionCodoDerechoX = puntos['14'].x;

        // Verificamos que la posición del codo izquierdo esté dentro del 10% de la posición del hombro izquierdo
        if (
            posicionCodoIzquierdoX < posicionHombroIzquierdoX * (1 - rangoPermitido) ||
            posicionCodoIzquierdoX > posicionHombroIzquierdoX * (1 + rangoPermitido)
        ) {
            puntosMal.push('13'); // Señala codo izquierdo
        }

        // Verificamos que la posición del codo derecho esté dentro del 10% de la posición del hombro derecho
        if (
            posicionCodoDerechoX < posicionHombroDerechoX * (1 - rangoPermitido) ||
            posicionCodoDerechoX > posicionHombroDerechoX * (1 + rangoPermitido)
        ) {
            puntosMal.push('14'); // Señala codo derecho
        }

        return { puntosMal };
    }
}
