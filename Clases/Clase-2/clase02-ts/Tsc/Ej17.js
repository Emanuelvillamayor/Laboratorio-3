"use strict";
/*Ejercicio 17:
Confeccione un formulario que muestre una serie de títulos de películas con su
respectivo checkbox. Al pulsar el botón, mostrar las películas seleccionadas por consola.
*/
function MostrarSeleccionados() {
    //en esta ocuacion voy a guardar el "checked" para saber si esa opcion esta seleccionada o no
    var rocky = document.getElementById("chxRocky");
    var rambo = document.getElementById("chxRambo").checked;
    var demoledor = document.getElementById("chxDemoledor").checked;
    var indestructible = document.getElementById("chxInsdestructibles").checked;
    var array = [];
    array[0] = rocky;
    array[1] = rambo;
    array[2] = demoledor;
    array[3] = indestructible;
    for (var i = 0; i < 4; i++) {
        if (array[i] == true) {
        }
    }
}
//# sourceMappingURL=Ej17.js.map