"use strict";
/*Ejercicio 10:
Definir una función que muestre información sobre una cadena de texto que se le pasa
como argumento. A partir de la cadena que se le pasa, la función determina si esa cadena
está formada sólo por mayúsculas, sólo por minúsculas o por una mezcla de ambas.
*/
//creo funcion
function ValidarCadena(cadena) {
    if (cadena === cadena.toUpperCase()) {
        console.log("Formado solo por mayusculas\n");
    }
    else if (cadena === cadena.toLowerCase()) {
        console.log("Formado solo por minusculas\n");
    }
    else {
        console.log("Formado por mayusculas y minusculas\n");
    }
}
var cadena1 = "HOLA";
var cadena2 = "hola";
var cadena3 = "HoLa";
//Implemento funcion
console.log("Pruebo con una cadena en MAYUSCULA:\n");
ValidarCadena(cadena1);
console.log("Pruebo con una cadena en minuscula:\n");
ValidarCadena(cadena2);
console.log("Pruebo con una cadena en MAYUSCULA y minuscula:\n");
ValidarCadena(cadena3);
console.log();
//# sourceMappingURL=Ej10.js.map