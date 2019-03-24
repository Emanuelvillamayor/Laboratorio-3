"use strict";
/*Ejercicio 8 :
Crear una función que realice el cálculo factorial del número que recibe como parámetro.
Nota : Utilizar console.log()
*/
//creo la funcion
function Factorial(n) {
    var total = 1;
    for (var i = 1; i <= n; i++) {
        total = total * i;
    }
    console.log(total);
}
//implemento la funcion
Factorial(4);
//# sourceMappingURL=Ej8.js.map