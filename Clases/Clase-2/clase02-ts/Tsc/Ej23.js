/*Ejercicio 23 :
Crear una página que posea un formulario que permita el ingreso del nombre, apellido,
email y cantidad de horas trabajadas a la semana de un operario. Al pulsar el botón
btnCalcular , se invocará a una función que calcule y muestre en un cuadro de texto (INPUT
type=text) el salario mensual del operario. El salario se calculará por medio de la cantidad de
horas trabajadas al mes por un coeficiente. Dicho coeficiente lo retornará la función
ObtenerCoeficiente (por el momento será siempre 6.88).
*/
function CalcularSalarioMensual() {
    var nombre = document.getElementById("txtNombre").value;
    var apellido = document.getElementById("txtApellido").value;
    var email = document.getElementById("email").value;
    var horas = parseFloat(document.getElementById("numHoras").value);
    var textoHoras = document.getElementById("txtHoras");
    var salario = ObtenerCoeficiente(horas);
    if (textoHoras) {
        textoHoras.value += "Salario: " + salario;
        alert("Nombre: " + nombre + "\nApellido: " + apellido + "\nEmail: " + email + "\nHoras: " + horas);
    }
}
function ObtenerCoeficiente(horas) {
    return horas * 6.88;
}
