/// <reference path="./node_modules/@types/jquery/index.d.ts"/>
function HolaMundo() {
    if ($("#txtNombre").val() === "") {
        $("#txtNombre").val("hola");
    }
}
