/*Aplicación Nº 7 (Leer un archivo .json)
Realizar una aplicación web que, a través de Ajax, lea el archivo auto.json desde la página
traerAuto.php y muestre el JSON recibido por alert() y en el console.log() */
var CLASE7;
(function (CLASE7) {
    function EnviarJSON() {
        //creo array de tipo JSON
        var productos = [{ "codigoBarra": 13232, "nombre": "ema", "precio": 27.22 },
            { "codigoBarra": 201, "nombre": "lucas", "precio": 3.1 }];
        //convierto ese array de tipo JSON  a string utilizando la funcion "stringify"
        //let params : string = "misProductos=" + JSON.stringify(productos);
        var params = "";
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", "Ej7.php", true);
        xhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        xhttp.send(params);
        xhttp.onreadystatechange = function () {
            //si esta todo bien entra al if
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                // con la funcion "parse" transformo un "string" de tipo JSON  a un "objet"o de tipo JSON
                var obj = JSON.parse(xhttp.responseText);
                alert(JSON.stringify(obj));
            }
        };
    }
    CLASE7.EnviarJSON = EnviarJSON;
})(CLASE7 || (CLASE7 = {}));
