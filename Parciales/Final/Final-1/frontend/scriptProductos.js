window.onload = function () {
    var xmlhttp = new XMLHttpRequest();
    var correoLogeado;
    var miToken = localStorage.getItem('miToken');
    if ((localStorage.getItem('miToken') === null)) {
        alert("Usuario no logeado");
        window.location.assign('./home.html');
        return;
    }
    xmlhttp.open("POST", "../backend/login/validarToken", true);
    xmlhttp.setRequestHeader("miToken", miToken);
    xmlhttp.send();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var jsonRespuesta = JSON.parse(xmlhttp.responseText);
            if (jsonRespuesta.mensaje == 'invalido') {
                alert('Tiempo de sesion expirada');
                window.location.assign('./home.html');
                return;
            }
            else {
                correoLogeado = jsonRespuesta.correo;
                console.log('Correo logeado: ' + correoLogeado + "\n");
                var itemLocal = localStorage.getItem("JWTKey");
                var respuesta_1;
                if (itemLocal) {
                    var jsonLocal = JSON.parse(itemLocal);
                    jsonLocal.usuarios.forEach(function (empleado) {
                        if (correoLogeado == empleado.correo) {
                            console.log(" Logeado como: " + empleado.perfil);
                            respuesta_1 = empleado.perfil;
                        }
                    });
                    var itemLocalDos = localStorage.getItem('Productos');
                    if (itemLocalDos) {
                        var jsonRespuestaDos = JSON.parse(itemLocalDos);
                        if (respuesta_1 == 'empleado') {
                            var stringTabla_1 = "<table class='table'><th>Marca</th><th>Color</th><th>Talle</th><th>Precio</th><th>Id</th>";
                            jsonRespuestaDos.productos.forEach(function (producto) {
                                stringTabla_1 += "<tr><td>" + producto.marca + "</td><td>" + producto.color + "</td><td>" + producto.talle + "</td><td>" + producto.precio + "</td><td>" + producto.id + "</td></tr>";
                            });
                            stringTabla_1 += "</table>";
                            document.getElementById('laTabla').innerHTML += stringTabla_1;
                        }
                        else if (respuesta_1 == 'encargado') {
                            var stringTabla_2 = "<table class='table'><th>Marca</th><th>Color</th><th>Talle</th><th>Precio</th><th>Id</th><th>Modificar</th>";
                            jsonRespuestaDos.productos.forEach(function (producto) {
                                stringTabla_2 += "<tr><td>" + producto.marca + "</td><td>" + producto.color + "</td><td>" + producto.talle + "</td><td>" + producto.precio + "</td><td>" + producto.id + "</td><td><a class='btn btn-warning text-light' data-toggle='modal' data-target='#formulario' onclick='Test.Manejadora.PrepararModificarProducto(" + JSON.stringify(producto) + ")'>Modificar</a></td></tr>";
                            });
                            stringTabla_2 += "</table>";
                            document.getElementById('laTabla').innerHTML += stringTabla_2;
                        }
                        else if (respuesta_1 == 'propietario') {
                            var stringTabla_3 = "<table class='table'><th>Marca</th><th>Color</th><th>Talle</th><th>Precio</th><th>Id</th><th>Modificar</th><th>Eliminar</th>";
                            jsonRespuestaDos.productos.forEach(function (producto) {
                                stringTabla_3 += "<tr><td>" + producto.marca + "</td><td>" + producto.color + "</td><td>" + producto.talle + "</td><td>" + producto.precio + "</td><td>" + producto.id + "</td><td><a class='btn btn-warning text-light' data-toggle='modal' data-target='#formulario' onclick='Test.Manejadora.PrepararModificarProducto(" + JSON.stringify(producto) + ")'>Modificar</a></td><td><a class='btn btn-danger text-light' data-toggle='modal' data-target='#formulario' onclick='Test.Manejadora.BorrarProducto(" + JSON.stringify(producto) + ")'>Eliminar</a></td></tr>";
                            });
                            stringTabla_3 += "</table>";
                            document.getElementById('laTabla').innerHTML += stringTabla_3;
                        }
                        else {
                            alert('No se tiene el perfil para mostrar el listado.');
                            window.location.assign('./home.html');
                        }
                    }
                }
            }
        }
    };
};
