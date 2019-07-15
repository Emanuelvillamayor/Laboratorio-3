/// <reference path="./funcionesLogin.ts" />
/// <reference path="./funcionesRegistro.ts" />
namespace Test {
    export class Manejadora {
        public static Limpiar(): void {
            (<HTMLInputElement>document.getElementById('nombre')).value = "";
            (<HTMLInputElement>document.getElementById('clave')).value = "";
        }

        public static AltaRegistro(): void {
            let nombre: string = (<HTMLInputElement>document.getElementById('nombre')).value;
            let apellido: string = (<HTMLInputElement>document.getElementById('apellido')).value;
            let clave: string = (<HTMLInputElement>document.getElementById('clave')).value;
            let confirmar: string = (<HTMLInputElement>document.getElementById('confirmar')).value;
            let correo: string = (<HTMLInputElement>document.getElementById('correo')).value;
            let perfil: string = (<HTMLSelectElement>document.getElementById('perfil')).value;
            let legajo: string = (<HTMLInputElement>document.getElementById('legajo')).value;
            let foto: any = (<HTMLInputElement>document.getElementById('foto'));
            console.log(nombre, clave, correo, perfil, legajo, foto);
            ValidadoraRegistro.LimpiarErrores();
            if (!(ValidadoraRegistro.ValidarVacios(nombre, apellido, correo, legajo, clave, confirmar, foto)) || !(ValidadoraRegistro.ValidarRegistro(nombre, apellido, correo, legajo, clave, confirmar, foto))) {
                return;
            }
            let usuarioJson = {
                "correo": correo,
                "clave": clave,
                "nombre": nombre,
                "apellido": apellido,
                "legajo": legajo,
                "perfil": perfil,
                "foto": "/fotos/usuarios/" + correo + "-" + legajo + ".jpg"
            };
            let seEncontro = false;
            let jsonUsuarios: any;
            let jsonOriginal: any;
            let stringusers = localStorage.getItem("JWTKey");
            if (stringusers) {
                jsonOriginal = JSON.parse(stringusers);
                jsonUsuarios = jsonOriginal.usuarios;
                jsonUsuarios.forEach((element: any) => {
                    console.log(element);
                    if (element.correo == correo) {
                        alert('El usuario ya esta registrado');
                        seEncontro = true;
                    }
                });
            }
            if (!seEncontro) {
                jsonOriginal.usuarios.push(usuarioJson);
                var formData = new FormData();
                formData.append('correo', correo);
                formData.append('legajo', legajo);
                formData.append('caso', 'agregar');
                formData.append('foto', foto.files[0]);

                var xmlhttp = new XMLHttpRequest();
                xmlhttp.open("POST", "../backend/administrarRequest.php", true);
                xmlhttp.setRequestHeader("enctype", "multipart/form-data");
                xmlhttp.send(formData);

                xmlhttp.onreadystatechange = function () {
                    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                        if (xmlhttp.responseText != "error") {
                            console.log('Exito al dar de alta a usuario!');
                            window.location.assign('home.html');
                            localStorage.setItem("JWTKey", JSON.stringify(jsonOriginal));
                        }
                        else {
                            alert('Error no se pudo subir la foto');
                        }
                    }
                }

            }


        }

        public static Logear(): any {
            let correo: string = (<HTMLInputElement>document.getElementById('correo')).value;
            let clave: string = (<HTMLInputElement>document.getElementById('clave')).value;
            ValidadoraLogin.LimpiarErrores();
            if (!(ValidadoraLogin.ValidarLoginVacios(correo, clave)) || !(ValidadoraLogin.ValidarLoginFormato(correo, clave))) {
                return;
            }
            let seEncontro = false;
            let stringusers = localStorage.getItem("JWTKey");
            if (stringusers) {
                let usuarios = JSON.parse(stringusers);
                usuarios = usuarios.usuarios;
                usuarios.forEach((elemento: any) => {
                    console.log(elemento);
                    if (elemento.clave == clave && elemento.correo == correo) {
                        console.log(elemento.clave + "-" + elemento.correo)
                        seEncontro = true;
                    }
                });
            }
            if (!seEncontro) {
                alert('Usuario o contraseña incorrectos');
                window.location.assign('./home.html');
                return;
            }
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open("POST", "../backend/login/", true);
            xmlhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            xmlhttp.send("correo=" + correo + '&clave=' + clave);
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    console.log(xmlhttp.responseText);
                    let respuestaParseada = JSON.parse(xmlhttp.responseText);
                    if (respuestaParseada.mensaje == undefined) {
                        localStorage.setItem('miToken', respuestaParseada.split('"'));
                        window.location.assign('./principal.html');
                    }
                }
            }

        }

        public static LimpiarForm(): void {
            (<HTMLInputElement>document.getElementById('formularioLabel')).innerText = "Agregar";
            (<HTMLInputElement>document.getElementById('id')).value = "";
            (<HTMLInputElement>document.getElementById('marca')).value = "";
            (<HTMLInputElement>document.getElementById('color')).value = "";
            (<HTMLInputElement>document.getElementById('talle')).value = "";
            (<HTMLInputElement>document.getElementById('precio')).value = "";
            (<HTMLInputElement>document.getElementById('id')).readOnly = false;
            (<HTMLInputElement>document.getElementById('marca')).readOnly = false;
            (<HTMLInputElement>document.getElementById('color')).readOnly = false;
            (<HTMLInputElement>document.getElementById('talle')).readOnly = false;
            (<HTMLInputElement>document.getElementById('precio')).readOnly = false;
            //(<HTMLImageElement>document.getElementById('imagen')).hidden=true;
            (<HTMLButtonElement>document.getElementById('boton-agregar')).hidden = false;
            (<HTMLButtonElement>document.getElementById('boton-borrar')).hidden = true;
            (<HTMLButtonElement>document.getElementById('boton-modificar')).hidden = true;
            (<HTMLDivElement>document.getElementById('divId')).hidden = true;
        }

        public static Deslogear(): void {
            localStorage.removeItem("miToken");
            window.location.assign('./home.html');
        }


        public static EliminarEmpleado(objJson: any): any {
            console.log(objJson);
            let correo = objJson.correo;
            let legajo = objJson.legajo;
            console.log('Correo y legajo a eliminar: ' + correo + " " + legajo);
            //let foto : any = (<HTMLInputElement> document.getElementById("fotoSubir"));
            var r = confirm("Desea borrar a " + objJson.apellido + " " + objJson.nombre);
            if (r == false) {
                return;
            }
            let usuariosLocales = localStorage.getItem("JWTKey");
            let ruta = "";
            if (usuariosLocales) {
                let local_usuarios_original = JSON.parse(usuariosLocales);
                let local_usuarios: any = local_usuarios_original.usuarios;
                local_usuarios_original = { usuarios: [] };
                local_usuarios.forEach((element: any) => {
                    if (correo != element.correo) {
                        local_usuarios_original.usuarios.push(element);
                    }
                    else {
                        ruta = element.foto;
                    }
                });
                console.log(local_usuarios_original);
                var xmlhttp = new XMLHttpRequest();

                xmlhttp.open("POST", "../backend/administrarRequest.php", true);
                xmlhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
                xmlhttp.send("correo=" + correo + "&legajo=" + legajo + '&caso=eliminar' + "&ruta=" + ruta);

                xmlhttp.onreadystatechange = function () {
                    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                        if (xmlhttp.responseText != "error") {
                            localStorage.removeItem("JWTKey");
                            localStorage.setItem("JWTKey", JSON.stringify(local_usuarios_original));
                            alert('Usuario eliminado');
                            location.reload();
                        }
                        else {
                            alert('No se pudo eliminar');
                        }
                    }
                }
            }
        }
        public static EnviarFormModificar(objJson: any) {
            let correo = objJson.correo;
            let legajo = objJson.legajo;
            var r = confirm("Desea modificar a " + objJson.apellido + " " + objJson.nombre + "?");
            if (r == false) {
                return;
            }
            (<HTMLInputElement>document.getElementById('datosModificar')).value = objJson.correo;
            (<HTMLFormElement>document.getElementById('formEnviar')).submit();
        }

        public static ModificarEmpleado(): any {
            let nombre: string = (<HTMLInputElement>document.getElementById('nombre')).value;
            let apellido: string = (<HTMLInputElement>document.getElementById('apellido')).value;
            let clave: string = (<HTMLInputElement>document.getElementById('clave')).value;
            let correo: string = (<HTMLInputElement>document.getElementById('correo')).value;
            let perfil: string = (<HTMLSelectElement>document.getElementById('perfil')).value;
            let foto: any = (<HTMLInputElement>document.getElementById('foto'));
            let legajo: string = (<HTMLInputElement>document.getElementById('legajo')).value;
            let rutaOrig = "";
            let ruta = "/fotos/modificados/" + correo + "-" + legajo + ".jpg";
            let itemLocal = localStorage.getItem("JWTKey");
            if (itemLocal) {
                let jsonLocal = JSON.parse(itemLocal);
                let jsonNuevo: any = { usuarios: [] };
                jsonLocal.usuarios.forEach((element: any) => {
                    if (correo != element.correo) {
                        jsonNuevo.usuarios.push(element);
                    }
                    else {
                        rutaOrig = element.foto;
                        element.nombre = nombre;
                        element.apellido = apellido;
                        element.clave = clave;
                        element.perfil = perfil;
                        element.foto = ruta;
                        jsonNuevo.usuarios.push(element);
                    }
                });
                console.log(jsonNuevo);
                console.log(rutaOrig);
                var xmlhttp = new XMLHttpRequest();
                xmlhttp.open("POST", "../backend/administrarRequest.php", true);
                if (foto.value == '') {
                    xmlhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
                    xmlhttp.send("correo=" + correo + "&legajo=" + legajo + '&caso=modificar' + "&ruta=" + rutaOrig);
                    xmlhttp.onreadystatechange = function () {
                        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                            if (xmlhttp.responseText != 'error') {
                                localStorage.removeItem("JWTKey");
                                localStorage.setItem("JWTKey", JSON.stringify(jsonNuevo));
                                alert('Usuario modificado');
                                window.location.assign('principal.html');
                            } else {
                                alert('No se pudo modificar');
                                window.location.assign('principal.html');
                            }
                        }
                    }
                } else {
                    xmlhttp.setRequestHeader("enctype", "multipart/form-data");
                    var formData = new FormData();
                    formData.append('correo', correo);
                    formData.append('legajo', legajo);
                    formData.append('caso', 'modificarNuevaFoto');
                    formData.append('ruta', rutaOrig);
                    formData.append('foto', foto.files[0]);
                    xmlhttp.send(formData);
                    xmlhttp.onreadystatechange = function () {
                        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                            if (xmlhttp.responseText != 'error') {
                                console.log(xmlhttp.responseText);
                                localStorage.removeItem("JWTKey");
                                localStorage.setItem("JWTKey", JSON.stringify(jsonNuevo));
                                alert('Usuario modificado con nueva foto');
                                window.location.assign('principal.html');
                            } else {
                                alert('No se pudo modificar');
                                window.location.assign('principal.html');
                            }
                        }
                    }
                }
            }
        }

        public static AgregarProducto() {
            let marca = (<HTMLInputElement>document.getElementById('marca')).value;
            let color = (<HTMLInputElement>document.getElementById('color')).value;
            let talle = (<HTMLInputElement>document.getElementById('talle')).value;
            let precio = (<HTMLInputElement>document.getElementById('precio')).value;
            let id = (<HTMLInputElement>document.getElementById('id')).value;
            let productoJson = {
                "marca": marca,
                "color": color,
                "talle": talle,
                "precio": precio,
                "id": id
            };
            let seEncontro = false;
            let jsonItem: any;
            let itemLocal = localStorage.getItem("Productos");
            if (itemLocal) {
                jsonItem = JSON.parse(itemLocal);
                jsonItem.productos.forEach((producto: any) => {
                    console.log(producto);
                    if (producto.id == id) {
                        alert('El producto ya esta registrado');
                        seEncontro = true;
                        window.location.reload();
                    }
                });
            }
            if (!seEncontro) {
                jsonItem.productos.push(productoJson);
                alert('Se agrego el producto!');
                window.location.reload();
                localStorage.setItem("Productos", JSON.stringify(jsonItem));
            }

        }
        public static PrepararModificarProducto(objJson: any) {
            (<HTMLButtonElement>document.getElementById('boton-agregar')).hidden = true;
            (<HTMLButtonElement>document.getElementById('boton-modificar')).hidden = false;
            (<HTMLButtonElement>document.getElementById('boton-borrar')).hidden = true;
            (<HTMLInputElement>document.getElementById('id')).value = objJson.id;
            (<HTMLButtonElement>document.getElementById('boton-modificar')).setAttribute('onclick', 'Test.Manejadora.ModificarProducto(' + JSON.stringify(objJson) + ')');
            (<HTMLInputElement>document.getElementById('formularioLabel')).innerText = "Modificar";
            (<HTMLInputElement>document.getElementById('marca')).value = objJson.marca;
            (<HTMLInputElement>document.getElementById('color')).value = objJson.color;
            (<HTMLInputElement>document.getElementById('talle')).value = objJson.talle;
            (<HTMLInputElement>document.getElementById('precio')).value = objJson.precio;
            (<HTMLInputElement>document.getElementById('id')).readOnly = true;
            (<HTMLInputElement>document.getElementById('marca')).readOnly = false;
            (<HTMLInputElement>document.getElementById('color')).readOnly = false;
            (<HTMLInputElement>document.getElementById('talle')).readOnly = false;
            (<HTMLInputElement>document.getElementById('precio')).readOnly = false;
            (<HTMLInputElement>document.getElementById('divId')).hidden = false;

        }
        public static ModificarProducto(prodJson: any) {
            let marca = (<HTMLInputElement>document.getElementById('marca')).value;
            let color = (<HTMLInputElement>document.getElementById('color')).value;
            let talle = (<HTMLInputElement>document.getElementById('talle')).value;
            let precio = (<HTMLInputElement>document.getElementById('precio')).value;
            let idModif = (<HTMLInputElement>document.getElementById('id')).value;
            let id = prodJson.id;
            var r = confirm("Desea modificar a " + prodJson.marca + " [" + prodJson.id + "]");
            if (r == false) {
                return;
            }
            let itemLocal = localStorage.getItem("Productos");
            localStorage.removeItem("Productos");
            if (itemLocal) {
                let jsonItem = JSON.parse(itemLocal);
                let jsonFinal: any = { productos: [] };
                jsonItem.productos.forEach((producto: any) => {
                    if (id != producto.id) {
                        jsonFinal.productos.push(producto);
                    } else {
                        producto.marca = marca;
                        producto.color = color;
                        producto.talle = talle;
                        producto.precio = precio;
                        producto.id = idModif;
                        jsonFinal.productos.push(producto);
                    }
                });
                localStorage.setItem("Productos", JSON.stringify(jsonFinal));
                alert('Producto modificado');
                window.location.reload();
            }
        }
        public static BorrarProducto(prodJson: any) {
            let id = prodJson.id;
            var r = confirm("Desea borrar a " + prodJson.marca + " [" + prodJson.id + "]");
            if (r == false) {
                return;
            }
            let itemLocal = localStorage.getItem("Productos");
            localStorage.removeItem("Productos");
            if (itemLocal) {
                let jsonItem = JSON.parse(itemLocal);
                let jsonFinal: any = { productos: [] };
                jsonItem.productos.forEach((producto: any) => {
                    if (id != producto.id) {
                        jsonFinal.productos.push(producto);
                    }
                });
                localStorage.setItem("Productos", JSON.stringify(jsonFinal));
                alert('Producto eliminado');
                window.location.reload();
            }
        }
    }
}
