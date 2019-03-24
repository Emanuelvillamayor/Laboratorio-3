"use strict";
/*Ejercicio 5:
Realizar una función que reciba un número y que muestre (por consola) un mensaje
como el siguiente:
"El número 5 es impar" , siendo 5 el número recibido como parámetro.
*/
//creo la funcion
function ParImpar(numero) {
    if (numero % 2 == 0) {
        console.log("el numero " + numero + " es par");
    }
    else {
        console.log("el numero " + numero + " es impar");
    }
}
//utilizo la funcion
ParImpar(2);
ParImpar(3);
//# sourceMappingURL=Ej4.js.map