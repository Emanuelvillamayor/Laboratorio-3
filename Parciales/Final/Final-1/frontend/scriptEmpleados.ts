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

                let usuariosLocales = localStorage.getItem("JWTKey");
                let respuesta;
                if (usuariosLocales) {
                    let local_usuarios_original = JSON.parse(usuariosLocales);
                    let local_usuarios: any = local_usuarios_original.usuarios;
                    local_usuarios.forEach((element: any) => {
                        if (correoLogeado == element.correo) {
                            console.log(" Logeado como: " + element.perfil);
                            respuesta = element.perfil;
                        }
                    });
                    if (respuesta == 'empleado') {
                        let stringTabla: string = "<table class='table'><th>Nombre</th><th>Apellido</th><th>Correo</th><th>Legajo</th><th>Clave</th><th>Perfil</th><th>Foto</th>";
                        local_usuarios.forEach((empleado: any) => {
                            stringTabla += "<tr><td>" + empleado.nombre + "</td><td>" + empleado.apellido + "</td><td>" + empleado.correo + "</td><td>" + empleado.legajo + "</td><td>" + empleado.clave + "</td><td>" + empleado.perfil + "</td><td><img class='img-thumbnail' width='50px' height='50px' src='../backend" + empleado.foto + "' alt='" + empleado.foto + "'></td></tr>";
                        });
                        stringTabla += "</table>";
                        (<HTMLDivElement>document.getElementById('laTabla')).innerHTML += stringTabla;
                    }
                    else if (respuesta == 'encargado') {
                        let stringTabla: string = "<table class='table'><th>Nombre</th><th>Apellido</th><th>Correo</th><th>Legajo</th><th>Clave</th><th>Perfil</th><th>Foto</th><th>Modificar</th>";
                        local_usuarios.forEach((empleado: any) => {
                            if (empleado.perfil == 'propietario') {
                                stringTabla += "<tr><td>" + empleado.nombre + "</td><td>" + empleado.apellido + "</td><td>" + empleado.correo + "</td><td>" + empleado.legajo + "</td><td>" + empleado.clave + "</td><td>" + empleado.perfil + "</td><td><img class='img-thumbnail' width='50px' height='50px' src='../backend" + empleado.foto + "' alt='" + empleado.foto + "'></td><td>No se puede modificar</td></tr>";
                            } else {
                                stringTabla += "<tr><td>" + empleado.nombre + "</td><td>" + empleado.apellido + "</td><td>" + empleado.correo + "</td><td>" + empleado.legajo + "</td><td>" + empleado.clave + "</td><td>" + empleado.perfil + "</td><td><img class='img-thumbnail' width='50px' height='50px' src='../backend" + empleado.foto + "' alt='" + empleado.foto + "'></td><td><a class='btn btn-warning text-light' data-toggle='modal' data-target='#formulario' onclick='Test.Manejadora.EnviarFormModificar(" + JSON.stringify(empleado) + ")'>Modificar</a></td></tr>";
                            }
                        });
                        stringTabla += "</table>";
                        (<HTMLDivElement>document.getElementById('laTabla')).innerHTML += stringTabla;
                    }
                    else if (respuesta == 'propietario') {
                        let stringTabla: string = "<table class='table'><th>Nombre</th><th>Apellido</th><th>Correo</th><th>Legajo</th><th>Clave</th><th>Perfil</th><th>Foto</th><th>Eliminar</th><th>Modificar</th>";
                        local_usuarios.forEach((empleado: any) => {
                            stringTabla += "<tr><td>" + empleado.nombre + "</td><td>" + empleado.apellido + "</td><td>" + empleado.correo + "</td><td>" + empleado.legajo + "</td><td>" + empleado.clave + "</td><td>" + empleado.perfil + "</td><td><img class='img-thumbnail' width='50px' height='50px' src='../backend" + empleado.foto + "' alt='" + empleado.foto + "'></td><td><a class='btn btn-danger text-light' data-toggle='modal' data-target='#formulario' onclick='Test.Manejadora.EliminarEmpleado(" + JSON.stringify(empleado) + ")'>Eliminar</a></td><td><a class='btn btn-warning text-light' data-toggle='modal' data-target='#formulario' onclick='Test.Manejadora.EnviarFormModificar(" + JSON.stringify(empleado)+")'>Modificar</a></td></tr>";
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
};
