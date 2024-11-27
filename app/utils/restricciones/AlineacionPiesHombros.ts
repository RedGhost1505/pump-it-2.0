import { Pose, Resultado, RestriccionPostura } from '../Restriccion';

// Restricción: Alineación de los pies con los hombros
export class AlineacionPiesHombros extends RestriccionPostura {
    verificar(puntos: Pose): Resultado {
        const puntosMal: string[] = [];

        // Verificar alineación de los pies con los hombros
        // 27 - pie izquierdo, 28 - pie derecho, 11 - hombro izquierdo, 12 - hombro derecho
        const rangoPermitido = 0.10; // 5% de tolerancia

        const posicionHombroIzquierdo = puntos['11'].x;
        const posicionHombroDerecho = puntos['12'].x;
        const posicionPieIzquierdo = puntos['27'].x;
        const posicionPieDerecho = puntos['28'].x;

        // Verificamos que la posición del pie izquierdo no se aleje más del 20% de la posición del hombro izquierdo
        if (
            posicionPieIzquierdo < posicionHombroIzquierdo * (1 - rangoPermitido) ||
            posicionPieIzquierdo > posicionHombroIzquierdo * (1 + rangoPermitido)
        ) {
            puntosMal.push('27'); // Señala pie izquierdo y hombro izquierdo
        }

        // Verificamos que la posición del pie derecho no se aleje más del 20% de la posición del hombro derecho
        if (
            posicionPieDerecho < posicionHombroDerecho * (1 - rangoPermitido) ||
            posicionPieDerecho > posicionHombroDerecho * (1 + rangoPermitido)
        ) {
            puntosMal.push('28'); // Señala pie derecho y hombro derecho
        }

        return { puntosMal };
    }
}