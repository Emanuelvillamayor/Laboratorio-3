"use strict";
/*Ejercicio 17:
Confeccione un formulario que muestre una serie de títulos de películas con su
respectivo checkbox. Al pulsar el botón, mostrar las películas seleccionadas por consola.
*/
function MostrarSeleccionados() {
    //en esta ocuacion voy a guardar el "checked" para saber si esa opcion esta seleccionada o no
    //let rocky :HTMLElement=<HTMLInputElement> document.getElementById("chxRocky");
    var rocky = document.getElementsByName("chxRocky");
    var rambo = document.getElementsByName("chxRambo");
    var demoledor = document.getElementsByName("chxDemoledor");
    var indestructible = document.getElementsByName("chxIndestructibles");
    var arrays = [rocky, rambo, demoledor, indestructible];
    var seleccionadas = "";
    if (rocky[0].checked == true) {
        seleccionadas += rocky[0].value + "\n";
    }
    if (rambo[0].checked == true) {
        seleccionadas += rambo[0].value + "\n";
    }
    if (demoledor[0].checked == true) {
        seleccionadas += demoledor[0].value + "\n";
    }
    if (indestructible[0].checked == true) {
        seleccionadas += indestructible[0].value + "\n";
    }
    if (seleccionadas.length > 0) {
        alert("Las peliculas seleccionadas son :\n" + seleccionadas);
    }
    else {
        alert("No hay peliculas seleccionadas");
    }
}
//# sourceMappingURL=Ej17.js.map