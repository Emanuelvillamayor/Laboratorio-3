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
                var usuariosLocales = localStorage.getItem("JWTKey");
                var respuesta_1;
                if (usuariosLocales) {
                    var local_usuarios_original = JSON.parse(usuariosLocales);
                    var local_usuarios = local_usuarios_original.usuarios;
                    local_usuarios.forEach(function (element) {
                        if (correoLogeado == element.correo) {
                            console.log(" Logeado como: " + element.perfil);
                            respuesta_1 = element.perfil;
                        }
                    });
                    if (respuesta_1 == 'empleado') {
                        var stringTabla_1 = "<table class='table'><th>Nombre</th><th>Apellido</th><th>Correo</th><th>Legajo</th><th>Clave</th><th>Perfil</th><th>Foto</th>";
                        local_usuarios.forEach(function (empleado) {
                            stringTabla_1 += "<tr><td>" + empleado.nombre + "</td><td>" + empleado.apellido + "</td><td>" + empleado.correo + "</td><td>" + empleado.legajo + "</td><td>" + empleado.clave + "</td><td>" + empleado.perfil + "</td><td><img class='img-thumbnail' width='50px' height='50px' src='../backend" + empleado.foto + "' alt='" + empleado.foto + "'></td></tr>";
                        });
                        stringTabla_1 += "</table>";
                        document.getElementById('laTabla').innerHTML += stringTabla_1;
                    }
                    else if (respuesta_1 == 'encargado') {
                        var stringTabla_2 = "<table class='table'><th>Nombre</th><th>Apellido</th><th>Correo</th><th>Legajo</th><th>Clave</th><th>Perfil</th><th>Foto</th><th>Modificar</th>";
                        local_usuarios.forEach(function (empleado) {
                            if (empleado.perfil == 'propietario') {
                                stringTabla_2 += "<tr><td>" + empleado.nombre + "</td><td>" + empleado.apellido + "</td><td>" + empleado.correo + "</td><td>" + empleado.legajo + "</td><td>" + empleado.clave + "</td><td>" + empleado.perfil + "</td><td><img class='img-thumbnail' width='50px' height='50px' src='../backend" + empleado.foto + "' alt='" + empleado.foto + "'></td><td>No se puede modificar</td></tr>";
                            }
                            else {
                                stringTabla_2 += "<tr><td>" + empleado.nombre + "</td><td>" + empleado.apellido + "</td><td>" + empleado.correo + "</td><td>" + empleado.legajo + "</td><td>" + empleado.clave + "</td><td>" + empleado.perfil + "</td><td><img class='img-thumbnail' width='50px' height='50px' src='../backend" + empleado.foto + "' alt='" + empleado.foto + "'></td><td><a class='btn btn-warning text-light' data-toggle='modal' data-target='#formulario' onclick='Test.Manejadora.EnviarFormModificar(" + JSON.stringify(empleado) + ")'>Modificar</a></td></tr>";
                            }
                        });
                        stringTabla_2 += "</table>";
                        document.getElementById('laTabla').innerHTML += stringTabla_2;
                    }
                    else if (respuesta_1 == 'propietario') {
                        var stringTabla_3 = "<table class='table'><th>Nombre</th><th>Apellido</th><th>Correo</th><th>Legajo</th><th>Clave</th><th>Perfil</th><th>Foto</th><th>Eliminar</th><th>Modificar</th>";
                        local_usuarios.forEach(function (empleado) {
                            stringTabla_3 += "<tr><td>" + empleado.nombre + "</td><td>" + empleado.apellido + "</td><td>" + empleado.correo + "</td><td>" + empleado.legajo + "</td><td>" + empleado.clave + "</td><td>" + empleado.perfil + "</td><td><img class='img-thumbnail' width='50px' height='50px' src='../backend" + empleado.foto + "' alt='" + empleado.foto + "'></td><td><a class='btn btn-danger text-light' data-toggle='modal' data-target='#formulario' onclick='Test.Manejadora.EliminarEmpleado(" + JSON.stringify(empleado) + ")'>Eliminar</a></td><td><a class='btn btn-warning text-light' data-toggle='modal' data-target='#formulario' onclick='Test.Manejadora.EnviarFormModificar(" + JSON.stringify(empleado) + ")'>Modificar</a></td></tr>";
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
    };
    /*
    
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open("GET", "../backend.1/", true);
            xmlhttp.setRequestHeader("miToken", miToken);
            xmlhttp.send();
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    console.log(xmlhttp.responseText);
                    let respuesta = JSON.parse(xmlhttp.responseText);
                    console.log(respuesta);
                    console.log(respuesta.mensaje);
                    if (respuesta.esAdmin == false) {
                        let stringTabla: string = "<table class='table'><th>ID</th><th>Nombre</th><th>Apellido</th><th>Correo</th><th>Legajo</th><th>Clave</th><th>Perfil</th><th>Foto</th>";
                        respuesta.lista.forEach((empleado: any) => {
                            //stringTabla+="<tr><td>"+cd.titel+"</td><td>"+cd.interpret+"</td><td>"+cd.jahr+"</td><td>"+cd.id+"</td><td><a class='btn btn-warning' data-toggle='modal' data-target='#formulario' onclick='Test.Manejadora.Modificar("+JSON.stringify(cd)+")'>Modificar</a></td><td><a class='btn btn-danger' data-toggle='modal' data-target='#formulario' onclick='Test.Manejadora.Eliminar("+JSON.stringify(cd)+")'>Eliminar</a></td></tr>";
                            stringTabla += "<tr><td>" + empleado.id + "</td><td>" + empleado.nombre + "</td><td>" + empleado.apellido + "</td><td>" + empleado.correo + "</td><td>" + empleado.legajo + "</td><td>" + empleado.clave + "</td><td>" + empleado.perfil + "</td><td><img class='img-thumbnail' width='50px' height='50px' src='../backend.1/" + empleado.foto + "' alt='" + empleado.foto + "'></td></tr>";
                            console.log(empleado);
                        });
                        stringTabla += "</table>";
                        (<HTMLDivElement>document.getElementById('laTabla')).innerHTML += stringTabla;
                    }
                    else if (respuesta.esAdmin == true) {
                        let stringTabla: string = "<table class='table'><th>ID</th><th>Nombre</th><th>Apellido</th><th>Correo</th><th>Legajo</th><th>Clave</th><th>Perfil</th><th>Foto</th><th>Eliminar</th>";
                        respuesta.lista.forEach((empleado: any) => {
                            //stringTabla+="<tr><td>"+cd.titel+"</td><td>"+cd.interpret+"</td><td>"+cd.jahr+"</td><td>"+cd.id+"</td><td><a class='btn btn-warning' data-toggle='modal' data-target='#formulario' onclick='Test.Manejadora.Modificar("+JSON.stringify(cd)+")'>Modificar</a></td><td><a class='btn btn-danger' data-toggle='modal' data-target='#formulario' onclick='Test.Manejadora.Eliminar("+JSON.stringify(cd)+")'>Eliminar</a></td></tr>";
                            stringTabla += "<tr><td>" + empleado.id + "</td><td>" + empleado.nombre + "</td><td>" + empleado.apellido + "</td><td>" + empleado.correo + "</td><td>" + empleado.legajo + "</td><td>" + empleado.clave + "</td><td>" + empleado.perfil + "</td><td><img class='img-thumbnail' width='50px' height='50px' src='../backend.1/" + empleado.foto + "' alt='" + empleado.foto + "'></td><td><a class='btn btn-danger' data-toggle='modal' data-target='#formulario' onclick='Test.Manejadora.EliminarEmpleado(" + JSON.stringify(empleado) + ")'>Eliminar</a></td></tr>";
                            console.log(empleado);
                        });
                        stringTabla += "</table>";
                        (<HTMLDivElement>document.getElementById('laTabla')).innerHTML += stringTabla;
                    }
                    else {
                        window.location.href = './home.php';
                    }
                }
            }
        }
     */
};
