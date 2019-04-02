"use strict";
/*Ejercicio 20:
Confeccionar un formulario que muestre un control de cada tipo y los muestre todos
deshabilitados. (Cuando conozca JavaScript podemos habilitarlos por ejemplo si el visitante
ingresa una clave correcta, por ahora vea como queda visualmente el formulario con los
controles deshabilitados)
*/
function HabilitarControles() {
    var contrasenia = document.getElementById("passw").value;
    var texto = document.getElementById("txtNombre").disabled;
    //let boton :Boolean =(<HTMLInputElement>document.getElementById("botton")).disabled;
    //contraseña que definimos nostros
    if (contrasenia == "holamundo") {
        texto = false;
        //boton=false;
    }
    else {
        texto = true;
        //boton=true;
    }
}
//# sourceMappingURL=Ej20.js.map