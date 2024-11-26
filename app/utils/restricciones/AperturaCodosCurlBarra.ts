import { Pose, Resultado, RestriccionPostura } from '../Restriccion';

// Restricción: Apertura de los codos (Curl de barra)
export class AperturaCodosCurlBarra extends RestriccionPostura {
    verificar(puntos: Pose): Resultado {
        const puntosMal: string[] = [];
        const anguloCodoIzquierdo = this.calcularAngulo(puntos['13'], puntos['11'], puntos['23']); 
        const anguloCodoDerecho = this.calcularAngulo(puntos['14'], puntos['12'], puntos['24']); 

        // Para un curl de barra, el ángulo del codo debería estar entre 30 y 150 grados
        if (anguloCodoIzquierdo < 5 || anguloCodoIzquierdo > 20) {
            puntosMal.push('13'); // left elbow
        }
        if (anguloCodoDerecho < 5 || anguloCodoDerecho > 20) {
            puntosMal.push('14'); // right elbow
        }

        return { puntosMal };
    }
}