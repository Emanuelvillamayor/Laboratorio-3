
window.onload = function (): void {
    var xmlhttp = new XMLHttpRequest();
    let correoLogeado: string;
    let miToken: any = localStorage.getItem('miToken');
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
            let jsonRespuesta = JSON.parse(xmlhttp.responseText);
            if (jsonRespuesta.mensaje == 'invalido') {
                alert('Tiempo de sesion expirada');
                window.location.assign('./home.html');
                return;
            } else {
                correoLogeado = jsonRespuesta.correo;
                console.log('Correo logeado: ' + correoLogeado + "\n");
                let itemLocal = localStorage.getItem("JWTKey");
                let respuesta;
                if (itemLocal) {
                    let jsonLocal = JSON.parse(itemLocal);
                    jsonLocal.usuarios.forEach((empleado: any) => {
                        if (correoLogeado == empleado.correo) {
                            console.log(" Logeado como: " + empleado.perfil);
                            respuesta = empleado.perfil;
                        }
                    });
                    let itemLocalDos = localStorage.getItem('Productos');
                    if (itemLocalDos) {
                        let jsonRespuestaDos = JSON.parse(itemLocalDos);
                        if (respuesta == 'empleado') {
                            let stringTabla: string = "<table class='table'><th>Marca</th><th>Color</th><th>Talle</th><th>Precio</th><th>Id</th>";
                            jsonRespuestaDos.productos.forEach((producto: any) => {
                                stringTabla += "<tr><td>" + producto.marca + "</td><td>" + producto.color + "</td><td>" + producto.talle + "</td><td>" + producto.precio + "</td><td>" + producto.id + "</td></tr>";
                            });
                            stringTabla += "</table>";
                            (<HTMLDivElement>document.getElementById('laTabla')).innerHTML += stringTabla;
                        } else if (respuesta == 'encargado') {
                            let stringTabla: string = "<table class='table'><th>Marca</th><th>Color</th><th>Talle</th><th>Precio</th><th>Id</th><th>Modificar</th>";
                            jsonRespuestaDos.productos.forEach((producto: any) => {
                                stringTabla += "<tr><td>" + producto.marca + "</td><td>" + producto.color + "</td><td>" + producto.talle + "</td><td>" + producto.precio + "</td><td>" + producto.id + "</td><td><a class='btn btn-warning text-light' data-toggle='modal' data-target='#formulario' onclick='Test.Manejadora.PrepararModificarProducto(" + JSON.stringify(producto) + ")'>Modificar</a></td></tr>";
                            });
                            stringTabla += "</table>";
                            (<HTMLDivElement>document.getElementById('laTabla')).innerHTML += stringTabla;
                        }
                        else if (respuesta == 'propietario') {
                            let stringTabla: string = "<table class='table'><th>Marca</th><th>Color</th><th>Talle</th><th>Precio</th><th>Id</th><th>Modificar</th><th>Eliminar</th>";
                            jsonRespuestaDos.productos.forEach((producto: any) => {
                                stringTabla += "<tr><td>" + producto.marca + "</td><td>" + producto.color + "</td><td>" + producto.talle + "</td><td>" + producto.precio + "</td><td>" + producto.id + "</td><td><a class='btn btn-warning text-light' data-toggle='modal' data-target='#formulario' onclick='Test.Manejadora.PrepararModificarProducto(" + JSON.stringify(producto) + ")'>Modificar</a></td><td><a class='btn btn-danger text-light' data-toggle='modal' data-target='#formulario' onclick='Test.Manejadora.BorrarProducto(" + JSON.stringify(producto) + ")'>Eliminar</a></td></tr>";
                            });
                            stringTabla += "</table>";
                            (<HTMLDivElement>document.getElementById('laTabla')).innerHTML += stringTabla;
                        }
                        else {
                            alert('No se tiene el perfil para mostrar el listado.');
                            window.location.assign('./home.html');
                        }
                    }
                }
            }
        }
    }
};