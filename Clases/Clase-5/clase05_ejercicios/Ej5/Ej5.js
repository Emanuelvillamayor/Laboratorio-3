/*
Aplicación Nº 5 (Recibir Json por Ajax)
Diseñar una aplicación que reciba por Ajax un producto desde la página recibirJson.php.
Crear una instancia de stdClass y asignarle los atributos y valores correspondientes.
Desde javascript, mostrar el valor recibido utilizando la función alert() y en el console.log()
*/
var CLASE5;
(function (CLASE5) {
    function EnviarJSON() {
        //creo array de tipo JSON
        var productos = [{ "codigoBarra": 13232, "nombre": "ema", "precio": 27.22 },
            { "codigoBarra": 201, "nombre": "lucas", "precio": 3.1 }];
        //convierto ese array de tipo JSON  a string utilizando la funcion "stringify"
        var params = "misProductos=" + JSON.stringify(productos);
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", "Ej5.php", true);
        xhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        xhttp.send(params);
        xhttp.onreadystatechange = function () {
            //si esta todo bien entra al if
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                // con la funcion "parse" transformo un "string" de tipo JSON  a un "objeto" de tipo JSON
                var obj = JSON.parse(xhttp.responseText);
                alert(xhttp.responseText);
                for (var i = 0; i < obj.length; i++) {
                    alert("Producto numero " + (i + 1) + "\n" + "Codigo barra: " + obj[i].codigoBarra + "  Nombre: " + obj[i].nombre + "  Precio: " + obj[i].precio + "\n");
                }
            }
        };
    }
    CLASE5.EnviarJSON = EnviarJSON;
})(CLASE5 || (CLASE5 = {}));
