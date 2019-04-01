"use strict";
/*Ejercicio 16:
Confeccionar un formulario que permita ingresar el nombre de una persona, su mail, su
DNI (documento nacional de identidad) y finalmente su currículum vitae (este último dato
hacerlo utilizando un <TEXTAREA>). Al pulsar el botón btnAceptar , por medio de una
función en TypeScript, mostrar todos sus datos por consola.
*/
function MostrarResultados() {
    var nombre = document.getElementById("nombre").value;
    var email = document.getElementById("email").value;
    var dni = document.getElementById("dni").value;
    var curriculum = document.getElementById("curriculum").value;
    alert("Nombre: " + nombre + "\nEmail: " + email + "\nDNI: " + dni + "\nCurriculum vitae:\n" + curriculum);
}
//# sourceMappingURL=Ej16.js.map