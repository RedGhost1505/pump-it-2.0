import { Pose, Resultado, RestriccionPostura } from '../Restriccion';

// Clase para verificar que las rodillas estén alineadas con los pies en el eje X
export class AlineacionRodillasPies extends RestriccionPostura {
    verificar(puntos: Pose): Resultado {
        const puntosMal: string[] = [];

        // 25 - rodilla izquierda, 26 - rodilla derecha, 27 - tobillo izquierdo, 28 - tobillo derecho
        const rangoPermitido = 0.10; // 10% de tolerancia

        const posicionRodillaIzquierdaX = puntos['25'].x;
        const posicionRodillaDerechaX = puntos['26'].x;
        const posicionTobilloIzquierdoX = puntos['27'].x;
        const posicionTobilloDerechoX = puntos['28'].x;

        // Verificamos la alineación de la rodilla izquierda con el tobillo izquierdo
        if (
            posicionRodillaIzquierdaX < posicionTobilloIzquierdoX * (1 - rangoPermitido) ||
            posicionRodillaIzquierdaX > posicionTobilloIzquierdoX * (1 + rangoPermitido)
        ) {
            puntosMal.push('25'); // Señala rodilla izquierda
        }

        // Verificamos la alineación de la rodilla derecha con el tobillo derecho
        if (
            posicionRodillaDerechaX < posicionTobilloDerechoX * (1 - rangoPermitido) ||
            posicionRodillaDerechaX > posicionTobilloDerechoX * (1 + rangoPermitido)
        ) {
            puntosMal.push('26'); // Señala rodilla derecha
        }

        return { puntosMal };
    }
}
