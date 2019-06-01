var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Entidades;
(function (Entidades) {
    var Ropa = /** @class */ (function () {
        function Ropa(codigo, nombre, precio) {
            this.codigo = codigo;
            this.nombre = nombre;
            this.precio = precio;
        }
        Ropa.prototype.ToString = function () {
            return "\"nombre\":\"" + this.nombre + "\",\"precio\":" + this.precio + ",\"codigo\":" + this.codigo;
        };
        return Ropa;
    }());
    Entidades.Ropa = Ropa;
})(Entidades || (Entidades = {}));
///<reference path="Ropa.ts"/>
var Entidades;
(function (Entidades) {
    var Campera = /** @class */ (function (_super) {
        __extends(Campera, _super);
        function Campera(codigo, nombre, precio, talle, color, path) {
            var _this = _super.call(this, codigo, nombre, precio) || this;
            _this.talle = talle;
            _this.color = color;
            _this.path = path;
            return _this;
        }
        Campera.prototype.ToJson = function () {
            return "{\"talle\":\"" + this.talle + "\",\"color\":\"" + this.color + "\",\"path\":\"" + this.path + "\"," + this.ToString() + "}";
        };
        return Campera;
    }(Entidades.Ropa));
    Entidades.Campera = Campera;
})(Entidades || (Entidades = {}));
///<reference path="Campera.ts"/>
var Test;
(function (Test) {
    /*
    1- AgregarCampera. Tomará los distintos valores desde la página index.html, creará
    un objeto de tipo Campera, que se enviará (por AJAX) junto al parámetro caso
    (con valor “agregar”), hacia “./BACKEND/adminstrar.php”. En esta página se
    guardará al ciudadano en el archivo “./BACKEND/camperas.json”.
    */
    var Manejadora = /** @class */ (function () {
        function Manejadora() {
        }
        /*
        AgregarCampera. Tomará los distintos valores desde la página index.html, creará
        un objeto de tipo Campera, que se enviará (por AJAX) junto al parámetro caso
        (con valor “agregar”), hacia “./BACKEND/adminstrar.php”. En esta página se
        guardará al ciudadano en el archivo “./BACKEND/camperas.json”.
        */
        Manejadora.AgregarCampera = function () {
            var xhr = new XMLHttpRequest();
            //recupero datos
            var codigo = document.getElementById("txtCodigo").value;
            var nombre = document.getElementById("txtNombre").value;
            var precio = document.getElementById("txtPrecio").value;
            var talle = document.getElementById("txtTalle").value;
            var color = document.getElementById("cboColor").value;
            Manejadora.SubirFoto(codigo);
            var path = document.getElementById("imgFoto").src;
            //Creo el objeto de tipo televisor
            var tele = new Entidades.Campera(parseInt(codigo), nombre, parseFloat(precio), talle, color, path);
            var form = new FormData();
            var caso = "";
            // form.append('foto',foto.files[0]);
            form.append('cadenaJson', tele.ToJson());
            if (localStorage.getItem("modificar") == "true") {
                caso = "modificar";
            }
            else {
                caso = "agregar";
            }
            form.append('caso', caso);
            xhr.open('POST', './BACKEND/administrar.php', true);
            xhr.setRequestHeader("enctype", "multipart/form-data");
            xhr.send(form);
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    Manejadora.AdministrarSpinner(false);
                    localStorage.clear();
                    document.getElementById("btnAgregar").value = "Agregar";
                    var retJSON = JSON.parse(xhr.responseText);
                    // if(!retJSON.Ok)
                    if (!retJSON.TodoOK) {
                        console.error("NO se subió la foto!!!");
                    }
                    else {
                        //si el atributo "Ok" es true , mostramos la foto subida pisando la que ya estaba por default
                        // console.info("Foto subida OK!!!");
                        //direccion de donde se encuentra la foto
                        //let path :string="./BACKEND/fotos/"+path;
                        //hay que cambiar el "src" para que sepa donde buscar la foto 
                        //(<HTMLImageElement> document.getElementById("imgFoto")).src = path;
                        //console.log(path);
                        console.log("Campera agregada");
                    }
                }
                else {
                    Manejadora.AdministrarSpinner(true);
                }
            };
            Manejadora.LimpiarForm();
        };
        Manejadora.MostrarCamperas = function () {
            var xhr = new XMLHttpRequest();
            var form = new FormData();
            form.append('caso', "mostrar");
            xhr.open('POST', './BACKEND/administrar.php', true);
            xhr.setRequestHeader("enctype", "multipart/form-data");
            xhr.send(form);
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    Manejadora.AdministrarSpinner(false);
                    //recupero la cadena y convierto a array de json
                    var arrayJson = JSON.parse(xhr.responseText);
                    var tabla = "";
                    tabla += "<table border=1>";
                    tabla += "<thead>";
                    tabla += "<tr>";
                    tabla += "<td>Codigo</td>";
                    tabla += "<td>Nombre</td>";
                    tabla += "<td>Precio</td>";
                    tabla += "<td>Talle</td>";
                    tabla += "<td>Color</td>";
                    tabla += "<td>Eliminar</td>";
                    tabla += "<td>Modificar</td>";
                    //tabla+= "<td>Foto</td>";
                    tabla += "</tr>";
                    tabla += "</thead>";
                    for (var i = 0; i < arrayJson.length; i++) {
                        tabla += "<tr>";
                        tabla += "<td>";
                        tabla += arrayJson[i].codigo;
                        tabla += "</td>";
                        tabla += "<td>";
                        tabla += arrayJson[i].nombre;
                        tabla += "</td>";
                        tabla += "<td>";
                        tabla += arrayJson[i].precio;
                        tabla += "</td>";
                        tabla += "<td>";
                        tabla += arrayJson[i].talle;
                        tabla += "</td>";
                        tabla += "<td>";
                        tabla += arrayJson[i].color;
                        tabla += "</td>";
                        //  tabla+="<td>";
                        /*una forma
                        if(arrayJson[i].pathFoto !== "undefined") {
                            tabla+="<img src='./BACKEND/fotos/" + arrayJson[i].pathFoto + "' height=100 width=100 ></img>";
                        }
                        else {
                            tabla+="No hay foto";
                        }*/
                        //compruebo si existe la imagen
                        //  var img = new Image();
                        // let path : string = arrayJson[i].pathFoto ; 
                        // img.src ="./BACKEND/fotos/"+ path ; 
                        //if( img.height != 0)
                        //if(arrayJson[i].path !== "undefined")
                        //{
                        //    tabla+="<img src='./BACKEND/fotos/" + arrayJson[i].pathFoto + "' height=100 width=100 ></img>";
                        //  }
                        // else {
                        //    tabla+="No hay foto";
                        //   }
                        //  tabla+="</td>";
                        var objJson = JSON.stringify(arrayJson[i]);
                        tabla += "<td><input type='button' onclick='Test.Manejadora.EliminarCampera(" + (objJson) + ")' value='Eliminar'</td>";
                        tabla += "<td><input type='button' onclick='Test.Manejadora.ModificarCampera(" + (objJson) + ")' value='Modificar'</td>";
                        tabla += "</tr>";
                    }
                    tabla += "</table>";
                    document.getElementById("divTabla").innerHTML = tabla;
                }
                else {
                    Manejadora.AdministrarSpinner(true);
                }
            };
        };
        /*
        EliminarCampera. Eliminará a la campera del archivo (por AJAX)
        (caso=”eliminar”). Recibe como parámetro al objeto JSON que se ha de eliminar.
        Pedir confirmación, mostrando código y talle, antes de eliminar. Refrescar el
        listado para visualizar los cambios.
        */
        Manejadora.EliminarCampera = function (objJson) {
            if (confirm("Esta seguro que desea eliminar a la campera de codigo " + objJson.codigo + " y talle " + objJson.talle)) {
                var xhr_1 = new XMLHttpRequest();
                var form = new FormData();
                form.append('cadenaJson', JSON.stringify(objJson));
                form.append('caso', "eliminar");
                xhr_1.open('POST', './BACKEND/administrar.php', true);
                xhr_1.setRequestHeader("enctype", "multipart/form-data");
                xhr_1.send(form);
                xhr_1.onreadystatechange = function () {
                    if (xhr_1.readyState == 4 && xhr_1.status == 200) {
                        Manejadora.AdministrarSpinner(false);
                        Manejadora.MostrarCamperas();
                    }
                    else {
                        Manejadora.AdministrarSpinner(true);
                    }
                };
            }
            else {
                alert("Accion cancelada");
            }
        };
        /*
        ModificarCampera. Mostrará todos los datos de la campera que recibe por
        parámetro (objeto JSON), en el formulario. Permitirá modificar cualquier campo, a
        excepción del código.
        Modificar el método AgregarCampera para cambiar el caso de “agregar” a
        “modificar”, según corresponda.
        */
        Manejadora.ModificarCampera = function (objJson) {
            var codigo = document.getElementById("txtCodigo").value = objJson.codigo;
            document.getElementById("txtCodigo").disabled = true;
            var nombre = document.getElementById("txtNombre").value = objJson.nombre;
            var precio = document.getElementById("txtPrecio").value = objJson.precio;
            var talle = document.getElementById("txtTalle").value = objJson.talle;
            var color = document.getElementById("cboColor").value = objJson.color;
            document.getElementById("btnAgregar").value = "Modificar";
            localStorage.setItem("modificar", "true");
        };
        /*
        FiltrarCamperasPorColor. Mostrará (por AJAX) (caso=”mostrar”) un listado
        dinámico (en el FRONTEND) de todas las camperas según el color seleccionado
        en el combo (cboColor).
        */
        Manejadora.FiltrarCamperasPorColor = function () {
            var xhr = new XMLHttpRequest();
            var form = new FormData();
            form.append('caso', "mostrar");
            xhr.open('POST', './BACKEND/administrar.php', true);
            xhr.setRequestHeader("enctype", "multipart/form-data");
            xhr.send(form);
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    //recupero la cadena y convierto a array de json
                    Manejadora.AdministrarSpinner(false);
                    var arrayJson = JSON.parse(xhr.responseText);
                    var tabla = "";
                    tabla += "<table border=1>";
                    tabla += "<thead>";
                    tabla += "<tr>";
                    tabla += "<td>Codigo</td>";
                    tabla += "<td>Nombre</td>";
                    tabla += "<td>Precio</td>";
                    tabla += "<td>Talle</td>";
                    tabla += "<td>Color</td>";
                    tabla += "<td>Eliminar</td>";
                    tabla += "<td>Modificar</td>";
                    //tabla+= "<td>Foto</td>";
                    tabla += "</tr>";
                    tabla += "</thead>";
                    var arrayJsonFiltrado = [];
                    var cboColor = document.getElementById("cboColor").value;
                    for (var j = 0; j < arrayJson.length; j++) {
                        if (arrayJson[j].color == cboColor) {
                            arrayJsonFiltrado.push(arrayJson[j]);
                        }
                    }
                    for (var i = 0; i < arrayJsonFiltrado.length; i++) {
                        tabla += "<tr>";
                        tabla += "<td>";
                        tabla += arrayJsonFiltrado[i].codigo;
                        tabla += "</td>";
                        tabla += "<td>";
                        tabla += arrayJsonFiltrado[i].nombre;
                        tabla += "</td>";
                        tabla += "<td>";
                        tabla += arrayJsonFiltrado[i].precio;
                        tabla += "</td>";
                        tabla += "<td>";
                        tabla += arrayJsonFiltrado[i].talle;
                        tabla += "</td>";
                        tabla += "<td>";
                        tabla += arrayJsonFiltrado[i].color;
                        tabla += "</td>";
                        //  tabla+="<td>";
                        /*una forma
                        if(arrayJson[i].pathFoto !== "undefined") {
                            tabla+="<img src='./BACKEND/fotos/" + arrayJson[i].pathFoto + "' height=100 width=100 ></img>";
                        }
                        else {
                            tabla+="No hay foto";
                        }*/
                        //compruebo si existe la imagen
                        //  var img = new Image();
                        // let path : string = arrayJson[i].pathFoto ; 
                        // img.src ="./BACKEND/fotos/"+ path ; 
                        //if( img.height != 0)
                        //if(arrayJson[i].path !== "undefined")
                        //{
                        //    tabla+="<img src='./BACKEND/fotos/" + arrayJson[i].pathFoto + "' height=100 width=100 ></img>";
                        //  }
                        // else {
                        //    tabla+="No hay foto";
                        //   }
                        //  tabla+="</td>";
                        var objJson = JSON.stringify(arrayJsonFiltrado[i]);
                        tabla += "<td><input type='button' onclick='Test.Manejadora.EliminarCampera(" + (objJson) + ")' value='Eliminar'</td>";
                        tabla += "<td><input type='button' onclick='Test.Manejadora.ModificarCampera(" + (objJson) + ")' value='Modificar'</td>";
                        tabla += "</tr>";
                    }
                    tabla += "</table>";
                    document.getElementById("divTabla").innerHTML = tabla;
                }
                else {
                    Manejadora.AdministrarSpinner(true);
                }
            };
        };
        Manejadora.CargarColoresJSON = function () {
            var xhr = new XMLHttpRequest();
            var form = new FormData();
            form.append('caso', 'colores');
            var cboColor = document.getElementById('cboColor');
            cboColor.innerHTML = "";
            xhr.open('POST', './BACKEND/administrar.php', true);
            xhr.setRequestHeader("enctype", "multipart/form-data");
            xhr.send(form);
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    Manejadora.AdministrarSpinner(false);
                    var jsonColores = JSON.parse(xhr.responseText);
                    for (var i = 0; i < jsonColores.length; i++) {
                        cboColor.innerHTML += "<option id='" + jsonColores[i].id + "'>" + jsonColores[i].descripcion + "</option>";
                    }
                }
                else {
                    Manejadora.AdministrarSpinner(true);
                }
            };
            Manejadora.LimpiarForm();
        };
        Manejadora.LimpiarForm = function () {
            document.getElementById('txtCodigo').value = "";
            document.getElementById('txtNombre').value = "";
            document.getElementById('txtPrecio').value = "";
            document.getElementById('txtTalle').value = "";
            document.getElementById('cboColor').selectedIndex = 0;
        };
        /*AdministrarSpinner. Este método mostrará u ocultará el archivo
        “./BACKEND/gif-load.gif”, de acuerdo al parámetro booleano que recibe como
        parámetro. Aplicar la llamada de este método en cada acción que invoque a un
        AJAX
        */
        Manejadora.AdministrarSpinner = function (flag) {
            setTimeout(function () {
                if (!flag) {
                    document.getElementById('imgSpinner').setAttribute('src', '');
                }
            }, 1000);
            if (flag)
                document.getElementById('imgSpinner').setAttribute('src', './BACKEND/gif-load.gif');
        };
        Manejadora.SubirFoto = function (codigo) {
            var xhr = new XMLHttpRequest();
            var foto = document.getElementById("idFoto");
            var form = new FormData();
            form.append('foto', foto.files[0]);
            form.append('caso', "subirFoto");
            form.append('codigo', codigo);
            xhr.open('POST', './BACKEND/administrar.php', true);
            xhr.setRequestHeader("enctype", "multipart/form-data");
            xhr.send(form);
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    console.log(xhr.responseText);
                    var retJSON = JSON.parse(xhr.responseText);
                    if (!retJSON.Ok) {
                        console.error("NO se subió la foto!!!");
                    }
                    else {
                        console.info("Foto subida OK!!!");
                        document.getElementById("imgFoto").src = "./BACKEND/" + retJSON.Path;
                    }
                }
            };
        };
        return Manejadora;
    }());
    Test.Manejadora = Manejadora;
})(Test || (Test = {}));
