import { Pose, Resultado, RestriccionPostura } from '../Restriccion';

// Clase para verificar la alineación de las muñecas con los codos durante las elevaciones laterales
export class AlineacionMunecasCodos extends RestriccionPostura {
    verificar(puntos: Pose): Resultado {
        const puntosMal: string[] = [];

        // 13 - codo izquierdo, 14 - codo derecho, 15 - muñeca izquierda, 16 - muñeca derecha
        const rangoPermitido = 0.300; // 10% de tolerancia para la posición Y

        const posicionCodoIzquierdoY = puntos['13'].y;
        const posicionCodoDerechoY = puntos['14'].y;
        const posicionMunecaIzquierdaY = puntos['15'].y;
        const posicionMunecaDerechaY = puntos['16'].y;

        // Verificar que la muñeca izquierda esté alineada verticalmente con el codo izquierdo
        if (
            posicionMunecaIzquierdaY < posicionCodoIzquierdoY * (1 - rangoPermitido) ||
            posicionMunecaIzquierdaY > posicionCodoIzquierdoY * (1 + rangoPermitido)
        ) {
            puntosMal.push('15'); // Señala muñeca izquierda
        }

        // Verificar que la muñeca derecha esté alineada verticalmente con el codo derecho
        if (
            posicionMunecaDerechaY < posicionCodoDerechoY * (1 - rangoPermitido) ||
            posicionMunecaDerechaY > posicionCodoDerechoY * (1 + rangoPermitido)
        ) {
            puntosMal.push('16'); // Señala muñeca derecha
        }

        return { puntosMal };
    }
}
