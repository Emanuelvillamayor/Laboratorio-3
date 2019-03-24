"use strict";
/*Ejercicio 7:
 Se necesita mostrar por consola los primeros 20 números primos. Para ello realizar una
función .
Nota : Utilizar console.log()
*/
for (var i = 1; i < 20; i++) {
    if (Primo(i) == true) {
        console.log(i + "\n");
    }
}
//funcion para saber si es primo o no
function Primo(num) {
    var flag = false;
    var a = 0;
    for (var i = 1; i <= num; i++) {
        if (num % i == 0) {
            a++;
        }
    }
    if (a == 2) {
        flag = true;
    }
    return flag;
}
//# sourceMappingURL=Ej7.js.map