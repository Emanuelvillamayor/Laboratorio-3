/*
Aplicación Nº 8 (Leer un archivo .json II)
Tomando como punto de partida el ejercicio anterior, armar una página que posea un <input
type=”button”> que al pulsarlo, muestre el JSON recibido por Ajax en los elementos de tipo
<input type=”text”> (uno por cada atributo del objeto recibido).
*/
var CLASE8;
(function (CLASE8) {
    function EnviarJSON() {
        var params = "";
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", "Ej8.php", true);
        xhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        xhttp.send(params);
        xhttp.onreadystatechange = function () {
            //si esta todo bien entra al if
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                // con la funcion "parse" transformo un "string" de tipo JSON  a un "objet"o de tipo JSON
                var obj = JSON.parse(xhttp.responseText);
                document.getElementById("txtId").value = obj.Id;
                document.getElementById("txtMarca").value = obj.Marca;
                document.getElementById("txtPrecio").value = obj.Precio;
                document.getElementById("txtColor").value = obj.Color;
                document.getElementById("txtModelo").value = obj.Modelo;
            }
        };
    }
    CLASE8.EnviarJSON = EnviarJSON;
})(CLASE8 || (CLASE8 = {}));
