"use strict";
/*Ejercicio 10:
Definir una función que muestre información sobre una cadena de texto que se le pasa
como argumento. A partir de la cadena que se le pasa, la función determina si esa cadena
está formada sólo por mayúsculas, sólo por minúsculas o por una mezcla de ambas.
*/
function AnalizarCadena(cadena) {
    for (var _i = 0, cadena_1 = cadena; _i < cadena_1.length; _i++) {
        var letra = cadena_1[_i];
        console.log(letra + "\n");
    }
}
AnalizarCadena("hola");
//# sourceMappingURL=Ej10.js.map