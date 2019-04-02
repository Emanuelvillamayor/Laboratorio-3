"use strict";
/*Ejercicio 19:
Confeccionar un formulario que muestre en un comboBox (SELECT) una serie de mails.
Luego permitir que el visitante seleccione uno o varios mails del cuadro de selección.
*/
function MostrarSeleccionado() {
    /* Para obtener el valor del elemento seleccionado */
    var cod = document.getElementById("chbx").value;
    alert(cod);
    /* Para obtener el texto de la opcion  seleccionada*/
    var combo = document.getElementById("chbx");
    var selected = combo.options[combo.selectedIndex].text;
    alert(selected);
}
//# sourceMappingURL=Ej19.js.map