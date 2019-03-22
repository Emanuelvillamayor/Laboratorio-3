"use strict";
/*Ejercicio 6:
 Realizar una función que reciba como parámetro un número y que retorne el cubo del
mismo.
Nota : La función retornará el cubo del parámetro ingresado. Realizar una función que
invoque a esta última y permita mostrar por consola el resultado.
*/
function Cubo(num) {
    //v1
    return Math.pow(num, 3);
    //v2
    //return num*num*num;
}
var numero = 5;
console.log(Cubo(numero));
//console.log(Cubo(2));
//fat arrow
var numero2 = function (i) { return Math.pow(i, 3); };
console.log(numero2(3));
//# sourceMappingURL=Ej6.js.map