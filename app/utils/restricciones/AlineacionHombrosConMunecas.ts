import { Pose, Resultado, RestriccionPostura } from '../Restriccion';

// Clase para verificar que las muñecas estén alineadas verticalmente con los hombros
export class AlineacionHombrosConMunecas extends RestriccionPostura {
    verificar(puntos: Pose): Resultado {
        const puntosMal: string[] = [];

        // 11 - hombro izquierdo, 12 - hombro derecho, 15 - muñeca izquierda, 16 - muñeca derecha
        const rangoPermitido = 0.20; // 10% de tolerancia

        const posicionHombroIzquierdoX = puntos['11'].x;
        const posicionHombroDerechoX = puntos['12'].x;
        const posicionMunecaIzquierdaX = puntos['15'].x;
        const posicionMunecaDerechaX = puntos['16'].x;

        // Verificamos la alineación de la muñeca izquierda con el hombro izquierdo
        if (
            posicionMunecaIzquierdaX < posicionHombroIzquierdoX * (1 - rangoPermitido) ||
            posicionMunecaIzquierdaX > posicionHombroIzquierdoX * (1 + rangoPermitido)
        ) {
            puntosMal.push('15'); // Señala muñeca izquierda
        }

        // Verificamos la alineación de la muñeca derecha con el hombro derecho
        if (
            posicionMunecaDerechaX < posicionHombroDerechoX * (1 - rangoPermitido) ||
            posicionMunecaDerechaX > posicionHombroDerechoX * (1 + rangoPermitido)
        ) {
            puntosMal.push('16'); // Señala muñeca derecha
        }

        return { puntosMal };
    }
}
