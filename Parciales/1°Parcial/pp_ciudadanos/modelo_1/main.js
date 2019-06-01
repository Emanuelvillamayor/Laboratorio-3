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
    var Persona = /** @class */ (function () {
        function Persona(nombre, apellido, edad) {
            this._apellido = apellido;
            this._nombre = nombre;
            this._edad = edad;
        }
        return Persona;
    }());
    Entidades.Persona = Persona;
    var Ciudadano = /** @class */ (function (_super) {
        __extends(Ciudadano, _super);
        function Ciudadano(nombre, apellido, edad, nacionalidad, dni) {
            var _this = _super.call(this, nombre, apellido, edad) || this;
            _this._nacionalidad = nacionalidad;
            _this._dni = dni;
            return _this;
        }
        return Ciudadano;
    }(Persona));
    Entidades.Ciudadano = Ciudadano;
})(Entidades || (Entidades = {}));
///<reference path = "./entidades.ts" />
var Test;
(function (Test) {
    var Manejadora = /** @class */ (function () {
        function Manejadora() {
        }
        Manejadora.AgregarCiudadanos = function () {
            var nombre = document.getElementById("txtNombre").value;
            var apellido = document.getElementById("txtApellido").value;
            var edad = document.getElementById("txtEdad").value;
            var dni = document.getElementById("txtDni").value;
            var nac = document.getElementById("cboPais").value;
            var miCiudadano = new Entidades.Ciudadano(nombre, apellido, Number(edad), nac, Number(dni));
            var xhttp = new XMLHttpRequest();
            xhttp.open("POST", "./BACKEND/nexo.php", true);
            xhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            xhttp.send("accion=agregar&obJSON=" + JSON.stringify(miCiudadano));
            xhttp.onreadystatechange = function () {
                if (xhttp.status == 200 && xhttp.readyState == 4) {
                    console.log(xhttp.responseText);
                    if (xhttp.responseText == "1") {
                        alert("Ciudadano agregado....");
                        Manejadora.MostrarCiudadanos("mostrar");
                    }
                }
            };
        };
        Manejadora.MostrarCiudadanos = function (accion) {
            var xhttp = new XMLHttpRequest();
            xhttp.open("POST", "./BACKEND/nexo.php", true);
            xhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            if (accion == "mostrar") {
                xhttp.send("accion=" + accion);
                xhttp.onreadystatechange = function () {
                    if (xhttp.status == 200 && xhttp.readyState == 4) {
                        document.getElementById("divTabla").innerHTML = xhttp.responseText;
                    }
                };
            }
            else if (accion == "filtrar") {
                var nac = document.getElementById("cboPais").value;
                xhttp.send("accion=" + accion + "&pais=" + nac);
                xhttp.onreadystatechange = function () {
                    if (xhttp.status == 200 && xhttp.readyState == 4) {
                        document.getElementById("divTabla").innerHTML = xhttp.responseText;
                    }
                };
            }
        };
        Manejadora.EliminarCiudadanos = function (obJSON) {
            if (confirm("Desea eliminar al ciudadano " + obJSON._nombre + " " + obJSON._apellido + "?")) {
                var xhttp_1 = new XMLHttpRequest();
                xhttp_1.open("POST", "./BACKEND/nexo.php", true);
                xhttp_1.setRequestHeader("content-type", "application/x-www-form-urlencoded");
                xhttp_1.send("accion=eliminar&obJSON=" + JSON.stringify(obJSON));
                xhttp_1.onreadystatechange = function () {
                    if (xhttp_1.status == 200 && xhttp_1.readyState == 4) {
                        if (xhttp_1.responseText == "1") {
                            alert("Se ha eliminado al ciudadano " + obJSON._nombre + " " + obJSON._apellido);
                            Manejadora.MostrarCiudadanos("mostrar");
                        }
                    }
                };
            }
            else {
                alert("Accion cancelada....");
            }
        };
        Manejadora.ObtenerCiudadano = function (obJSON) {
            document.getElementById("txtNombre").value = obJSON._nombre;
            document.getElementById("txtApellido").value = obJSON._apellido;
            document.getElementById("txtDni").value = obJSON._dni;
            document.getElementById("txtDni").disabled = true;
            document.getElementById("txtEdad").value = obJSON._edad;
            document.getElementById("cboPais").value = obJSON._nacionalidad;
            document.getElementById("btnCargar").value = "Modificar";
            document.getElementById("btnCargar").setAttribute("onclick", "Test.Manejadora.ModificarCiudadanos()");
        };
        Manejadora.ModificarCiudadanos = function () {
            if (confirm("Desea guardar los cambios?")) {
                var nombre = document.getElementById("txtNombre").value;
                var apellido = document.getElementById("txtApellido").value;
                var edad = document.getElementById("txtEdad").value;
                var dni = document.getElementById("txtDni").value;
                var nac = document.getElementById("cboPais").value;
                var miCiudadano = new Entidades.Ciudadano(nombre, apellido, Number(edad), nac, Number(dni));
                var xhttp_2 = new XMLHttpRequest();
                xhttp_2.open("POST", "./BACKEND/nexo.php", true);
                xhttp_2.setRequestHeader("content-type", "application/x-www-form-urlencoded");
                xhttp_2.send("accion=modificar&obJSON=" + JSON.stringify(miCiudadano));
                xhttp_2.onreadystatechange = function () {
                    if (xhttp_2.status == 200 && xhttp_2.readyState == 4) {
                        console.log(xhttp_2.responseText);
                        if (xhttp_2.responseText == "1") {
                            alert("Ciudadano modificado con exito....");
                            Manejadora.MostrarCiudadanos("mostrar");
                        }
                    }
                };
            }
            else {
                alert("Acción cancelada...");
            }
            document.getElementById("btnCargar").value = "Agregar";
            document.getElementById("btnCargar").setAttribute("onclick", "Test.Manejadora.AgregarCiudadanos()");
            document.getElementById("txtDni").disabled = false;
        };
        Manejadora.CargarPaises = function () {
            var cboPais = document.getElementById("cboPais");
            cboPais.innerHTML = "";
            /*let txt = document.createTextNode("España");
            let pais = document.createElement("option");
            pais.appendChild(txt);
            cboPais.appendChild(pais);*/
            var xhttp = new XMLHttpRequest();
            xhttp.open("POST", "./BACKEND/nexo.php", true);
            xhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            xhttp.send("accion=paises");
            xhttp.onreadystatechange = function () {
                if (xhttp.status == 200 && xhttp.readyState == 4) {
                    console.log(xhttp.responseText);
                    var obJSON = JSON.parse(xhttp.responseText);
                    obJSON.forEach(function (pais) {
                        var txt = document.createTextNode(pais.descripcion);
                        var option = document.createElement("option");
                        option.appendChild(txt);
                        cboPais.appendChild(option);
                    });
                }
            };
        };
        return Manejadora;
    }());
    Test.Manejadora = Manejadora;
})(Test || (Test = {}));
