/*Ejercicio 3:
Diseñar una aplicación que envíe por Ajax un producto hacia la página mostrarJson.php. En
dicha página, mostrar el valor recibido utilizando la función var_dump() .
Luego, transformar lo recibido en un objeto standard de PHP y mostrar cada uno de sus
atributos. Utilizar las funciones json_encode() y json_decode() .
*/
var CLASE;
(function (CLASE) {
    function EnviarJSON() {
        var producto = { "codigoBarra": 12323, "nombre": "ema", "precio": 22.5 };
        var params = "miProducto=" + JSON.stringify(producto);
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", "mostrarJson.php", true);
        xhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        xhttp.send(params);
        xhttp.onreadystatechange = function () {
            //si esta todo bien entra al if
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                alert(xhttp.responseText);
                console.log(xhttp.responseText);
            }
        };
    }
    CLASE.EnviarJSON = EnviarJSON;
})(CLASE || (CLASE = {}));
