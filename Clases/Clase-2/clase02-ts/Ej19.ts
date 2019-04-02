/*Ejercicio 19:
Confeccionar un formulario que muestre en un comboBox (SELECT) una serie de mails.
Luego permitir que el visitante seleccione uno o varios mails del cuadro de selección.
*/

function MostrarSeleccionado():void
{
/* Para obtener el valor del elemento seleccionado */
var cod :string= (<HTMLInputElement>document.getElementById("chbx")).value;
alert(cod);

/* Para obtener el texto de la opcion  seleccionada*/
var combo:any = document.getElementById("chbx");

var selected =combo.options[combo.selectedIndex].text;
alert(selected);
}
