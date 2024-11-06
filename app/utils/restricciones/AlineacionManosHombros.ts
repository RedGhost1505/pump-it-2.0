import { Pose, Resultado, RestriccionPostura } from '../Restriccion';

// Restricción: Alineación de las manos con los hombros
export class AlineacionManosHombros extends RestriccionPostura {
    verificar(puntos: Pose): Resultado {
        const puntosMal: string[] = [];

        // Verificar alineación de las manos con los hombros
        // 15 - mano izquierda, 16 - mano derecha, 11 - hombro izquierdo, 12 - hombro derecho
        const rangoPermitido = 0.10; // 10% de tolerancia

        const posicionHombroIzquierdo = puntos['11'];
        const posicionHombroDerecho = puntos['12'];
        const posicionManoIzquierda = puntos['15'];
        const posicionManoDerecha = puntos['16'];

        // Verificamos que la posición de la mano izquierda no se aleje más del 5% de la posición del hombro izquierdo
        if (
            posicionManoIzquierda.x < posicionHombroIzquierdo.x * (1 - rangoPermitido) ||
            posicionManoIzquierda.x > posicionHombroIzquierdo.x * (1 + rangoPermitido) ||
            posicionManoIzquierda.y < posicionHombroIzquierdo.y * (1 - rangoPermitido) ||
            posicionManoIzquierda.y > posicionHombroIzquierdo.y * (1 + rangoPermitido)
        ) {
            puntosMal.push('15'); // Señala mano izquierda
        }

        // Verificamos que la posición de la mano derecha no se aleje más del 5% de la posición del hombro derecho
        if (
            posicionManoDerecha.x < posicionHombroDerecho.x * (1 - rangoPermitido) ||
            posicionManoDerecha.x > posicionHombroDerecho.x * (1 + rangoPermitido) ||
            posicionManoDerecha.y < posicionHombroDerecho.y * (1 - rangoPermitido) ||
            posicionManoDerecha.y > posicionHombroDerecho.y * (1 + rangoPermitido)
        ) {
            puntosMal.push('16'); // Señala mano derecha
        }

        return { puntosMal };
    }
}
