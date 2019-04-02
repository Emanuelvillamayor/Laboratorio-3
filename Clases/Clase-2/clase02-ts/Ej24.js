"use strict";
/*Ejercicio 24:
Realizar una página que permita el ingreso de: Apellido, Nombre, Dni y sexo de una
persona. Si el usuario pulsa el botón de confirmación se invocará a una función encargada de
validar cada uno de los datos ingresados (que tanto el nombre y apellido no estén vacíos,
que el documento sea numérico y que el sexo sea o ‘m’ o ‘f’)
*/
function ValidarDatos1() {
    var nombre = document.getElementById("txtNombre");
    var apellido = document.getElementById("txtApellido");
    var dni = document.getElementById("numDni").value;
    var masculino = document.getElementById("chxMasculino");
    var femenino = document.getElementById("chxFemenino");
    var cadena = "";
    if (parseInt(nombre.value.length) > 0) {
        cadena += "Nombre: " + nombre.value + "\n";
    }
    if (parseInt(apellido.value.length) > 0) {
        cadena += "Apellido: " + apellido.value + "\n";
    }
    if (dni >= "11111111" && dni <= "99999999") {
        cadena += "DNI:" + dni + "\n";
    }
    if (masculino.checked == true) {
        cadena += "Sexo:" + masculino.value + "\n";
    }
    if (femenino.checked == true) {
        cadena += "Sexo:" + femenino.value + "\n";
    }
    alert(cadena);
}
//# sourceMappingURL=Ej24.js.map