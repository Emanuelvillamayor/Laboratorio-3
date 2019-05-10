/*
Ejercicio 10:
Examinar cuidadosamente el archivo city.list.min.json , luego realizar una aplicación web,
similar a la del ejercicio anterior, que permita armar un listado con el contenido completo de las
ciudades. El archivo .php se deberá nombrar como administrarCiudades.php, pasándole
como parámetro la opción “traerCiudades”.
*/
var CLASE10;
(function (CLASE10) {
    function EnviarJSON() {
        var xhttp = new XMLHttpRequest();
        var form = new FormData();
        form.append('op', "traerCiudades");
        xhttp.open("POST", "administrarCiudades.php", true);
        xhttp.setRequestHeader("enctype", "multipart/form-data");
        xhttp.send(form);
        xhttp.onreadystatechange = function () {
            //si esta todo bien entra al if
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                document.getElementById("divTable").innerHTML = xhttp.responseText;
            }
        };
    }
    CLASE10.EnviarJSON = EnviarJSON;
})(CLASE10 || (CLASE10 = {}));
