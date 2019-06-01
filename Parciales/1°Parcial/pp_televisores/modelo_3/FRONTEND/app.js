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
    var Producto = /** @class */ (function () {
        function Producto(codigo, marca, precio) {
            this.codigo = codigo;
            this.marca = marca;
            this.precio = precio;
        }
        Producto.prototype.ToString = function () {
            return '{"codigo" : ' + this.codigo + ', "marca" : "' + this.marca + '" , "precio" : ' + this.precio;
        };
        return Producto;
    }());
    Entidades.Producto = Producto;
    var Televisor = /** @class */ (function (_super) {
        __extends(Televisor, _super);
        function Televisor(codigo, marca, precio, tipo, paisOrigen, pathFoto) {
            var _this = _super.call(this, codigo, marca, precio) || this;
            _this.tipo = tipo;
            _this.paisOrigen = paisOrigen;
            _this.pathFoto = pathFoto;
            return _this;
        }
        Televisor.prototype.ToJson = function () {
            var cadenaJSON = _super.prototype.ToString.call(this) + ', "tipo" : "' + this.tipo + '" , "paisOrigen" : "' + this.paisOrigen + '" , "pathFoto" : "' + this.pathFoto + '"}';
            return cadenaJSON;
        };
        return Televisor;
    }(Producto));
    Entidades.Televisor = Televisor;
})(Entidades || (Entidades = {}));
var PrimerParcial;
(function (PrimerParcial) {
    var Manejadora = /** @class */ (function () {
        function Manejadora() {
        }
        Manejadora.AgregarTelevisor = function (json) {
            var tv = null;
            if (json == undefined) {
                var codigo = document.getElementById("codigo").value;
                var marca = document.getElementById("marca").value;
                var precio = document.getElementById("precio").value;
                var tipo = document.getElementById("tipo").value;
                var paisOrigen = document.getElementById("pais").value;
                var path = document.getElementById("foto").value;
                var pathFoto = (path.split('\\'))[2];
                document.getElementById("imgFoto").src = "./BACKEND/fotos/" + pathFoto;
                tv = new Entidades.Televisor(Number(codigo), marca, Number(precio), tipo, paisOrigen, pathFoto);
            }
            else {
                tv = json;
            }
            console.log(tv.ToJson());
            var foto = document.getElementById("foto");
            var form = new FormData();
            form.append("cadenaJson", tv.ToJson());
            form.append("caso", "agregar");
            form.append("foto", foto.files[0]);
            var xhttp = new XMLHttpRequest();
            xhttp.open("POST", "./BACKEND/administrar.php", true);
            xhttp.setRequestHeader("enctype", "multipart/form-data");
            xhttp.send(form);
            xhttp.onreadystatechange = function () {
                if (xhttp.status == 200 && xhttp.readyState == 4) {
                    console.log(xhttp.responseText);
                    var obJson = JSON.parse(xhttp.responseText);
                    console.log(obJson.TodoOK);
                    if (obJson.TodoOK) {
                        alert("TV agregada");
                        PrimerParcial.Manejadora.MostrarTelevisores();
                    }
                    else {
                        alert("No se agrego la TV");
                    }
                }
            };
        };
        Manejadora.MostrarTelevisores = function () {
            var xhttp = new XMLHttpRequest();
            xhttp.open("POST", "./BACKEND/administrar.php", true);
            xhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            xhttp.send("caso=traer");
            xhttp.onreadystatechange = function () {
                if (xhttp.status == 200 && xhttp.readyState == 4) {
                    if (xhttp.responseText != "") {
                        PrimerParcial.Manejadora.GenerarTabla(xhttp.responseText);
                        PrimerParcial.Manejadora.GuardarEnLocalStorage();
                    }
                }
            };
        };
        Manejadora.GenerarTabla = function (obJson) {
            var televisores = JSON.parse(obJson);
            var tabla = document.createElement("table");
            tabla.border = "2";
            tabla.innerHTML = "<tr><td>CODIGO</td><td>MARCA</td><td>PRECIO</td><td>TIPO</td><td>ORIGEN</td><td>FOTO</td><td>ACCION</td></tr>";
            televisores.forEach(function (tv) {
                var fila = document.createElement("tr");
                var codigo = document.createTextNode(tv.codigo);
                var colCod = document.createElement("td");
                colCod.appendChild(codigo);
                fila.appendChild(colCod);
                var marca = document.createTextNode(tv.marca);
                var colMar = document.createElement("td");
                colMar.appendChild(marca);
                fila.appendChild(colMar);
                var precio = document.createTextNode(tv.precio);
                var colPre = document.createElement("td");
                colPre.appendChild(precio);
                fila.appendChild(colPre);
                var tipo = document.createTextNode(tv.tipo);
                var colTip = document.createElement("td");
                colTip.appendChild(tipo);
                fila.appendChild(colTip);
                var paisorigen = document.createTextNode(tv.paisOrigen);
                var colPais = document.createElement("td");
                colPais.appendChild(paisorigen);
                fila.appendChild(colPais);
                var foto = document.createElement("img");
                foto.src = "./BACKEND/fotos/" + tv.pathFoto;
                foto.width = 50;
                foto.height = 50;
                var colPath = document.createElement("td");
                colPath.appendChild(foto);
                fila.appendChild(colPath);
                //BOTONES
                var colAcc = document.createElement("td");
                var eliminar = document.createElement("button");
                var txt = document.createTextNode("Eliminar");
                eliminar.appendChild(txt);
                eliminar.setAttribute("onclick", "PrimerParcial.Manejadora.EliminarTv(" + JSON.stringify(tv) + ")");
                colAcc.appendChild(eliminar);
                var modificar = document.createElement("button");
                var txt2 = document.createTextNode("Modificar");
                modificar.setAttribute("onclick", "PrimerParcial.Manejadora.ObtenerTv(" + JSON.stringify(tv) + ")");
                modificar.appendChild(txt2);
                colAcc.appendChild(modificar);
                fila.appendChild(colAcc);
                tabla.appendChild(fila);
            });
            document.getElementById("divTabla").innerHTML = tabla.outerHTML;
        };
        Manejadora.GuardarEnLocalStorage = function () {
            var xhttp = new XMLHttpRequest();
            xhttp.open("POST", "./BACKEND/administrar.php", true);
            xhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            xhttp.send("caso=traer");
            xhttp.onreadystatechange = function () {
                if (xhttp.status == 200 && xhttp.readyState == 4) {
                    if (xhttp.responseText != "") {
                        localStorage.setItem("televisores_local_storage_", xhttp.responseText);
                        console.log("Guardado en local storage");
                        console.log(localStorage.getItem("televisores_local_storage_"));
                    }
                }
            };
        };
        Manejadora.VerificarTelevisores = function () {
            var codigo = document.getElementById("codigo").value;
            var marca = document.getElementById("marca").value;
            var precio = document.getElementById("precio").value;
            var tipo = document.getElementById("tipo").value;
            var paisOrigen = document.getElementById("pais").value;
            var path = document.getElementById("foto").value;
            var pathFoto = (path.split('\\'))[2];
            var tv = new Entidades.Televisor(Number(codigo), marca, Number(precio), tipo, paisOrigen, pathFoto);
            var tvS = JSON.parse(localStorage.getItem("televisores_local_storage_"));
            var flag = 0;
            tvS.forEach(function (tv) {
                if (tv.codigo == Number(codigo)) {
                    flag = 1;
                }
            });
            if (flag == 1) {
                alert("El codigo ya esta registrado");
            }
            else {
                PrimerParcial.Manejadora.AgregarTelevisor(tv);
            }
        };
        Manejadora.EliminarTv = function (tv) {
            if (confirm("Desea eliminar la TV codigo " + tv.codigo + "?")) {
                var xhttp_1 = new XMLHttpRequest();
                xhttp_1.open("POST", "./BACKEND/administrar.php", true);
                xhttp_1.setRequestHeader("content-type", "application/x-www-form-urlencoded");
                xhttp_1.send("caso=eliminar&cadenaJson=" + JSON.stringify(tv));
                xhttp_1.onreadystatechange = function () {
                    if (xhttp_1.status == 200 && xhttp_1.readyState == 4) {
                        var obJson = JSON.parse(xhttp_1.responseText);
                        if (obJson.TodoOK == true) {
                            alert("TV eliminada");
                            Manejadora.MostrarTelevisores();
                        }
                    }
                };
            }
            else {
                alert("Accion cancelada....");
            }
        };
        Manejadora.ObtenerTv = function (json) {
            document.getElementById("codigo").value = json.codigo;
            document.getElementById("codigo").disabled = true;
            document.getElementById("marca").value = json.marca;
            document.getElementById("precio").value = String(json.precio);
            document.getElementById("tipo").value = json.tipo;
            document.getElementById("pais").value = json.paisOrigen;
            document.getElementById("imgFoto").src = "./BACKEND/fotos/" + json.pathFoto;
            document.getElementById("btn-agregar").value = "Modificar";
            document.getElementById("btn-agregar").setAttribute("onclick", "PrimerParcial.Manejadora.ModificarTv()");
        };
        Manejadora.ModificarTv = function () {
            var codigo = document.getElementById("codigo").value;
            var marca = document.getElementById("marca").value;
            var precio = document.getElementById("precio").value;
            var tipo = document.getElementById("tipo").value;
            var paisOrigen = document.getElementById("pais").value;
            var path = document.getElementById("foto").value;
            var pathFoto = (path.split('\\'))[2];
            var tv = new Entidades.Televisor(Number(codigo), marca, Number(precio), tipo, paisOrigen, pathFoto);
            var foto = document.getElementById("foto");
            var form = new FormData();
            form.append("cadenaJson", tv.ToJson());
            form.append("caso", "modificar");
            form.append("foto", foto.files[0]);
            var xhttp = new XMLHttpRequest();
            xhttp.open("POST", "./BACKEND/administrar.php", true);
            xhttp.setRequestHeader("enctype", "multipart/form-data");
            xhttp.send(form);
            xhttp.onreadystatechange = function () {
                if (xhttp.status == 200 && xhttp.readyState == 4) {
                    console.log(xhttp.responseText);
                    var obJson = JSON.parse(xhttp.responseText);
                    console.log(obJson.TodoOK);
                    if (obJson.TodoOK) {
                        alert("TV modificada");
                        PrimerParcial.Manejadora.MostrarTelevisores();
                    }
                    else {
                        alert("No se modifico la TV");
                    }
                }
            };
            document.getElementById("btn-agregar").value = "Agregar";
            document.getElementById("btn-agregar").setAttribute("onclick", "PrimerParcial.Manejadora.AgregarTelevisor()");
            document.getElementById("codigo").disabled = false;
        };
        Manejadora.FiltrarTelevisores = function () {
            var pais = document.getElementById("pais").value;
            var tvS = JSON.parse(localStorage.getItem("televisores_local_storage_"));
            var nuevaLista = new Array();
            var flag = 0;
            tvS.forEach(function (tv) {
                if (tv.paisOrigen == pais) {
                    nuevaLista.push(tv);
                    flag = 1;
                }
            });
            if (flag == 1) {
                Manejadora.GenerarTabla(JSON.stringify(nuevaLista));
            }
            else {
                document.getElementById("divTabla").innerHTML = "No hay televisores registrados con el pais de origen seleccionado";
            }
        };
        Manejadora.CargarPaises = function () {
            var select = document.getElementById("pais");
            var xhttp = new XMLHttpRequest();
            xhttp.open("POST", "./BACKEND/administrar.php");
            xhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            xhttp.send("caso=paises");
            xhttp.onreadystatechange = function () {
                if (xhttp.status == 200 && xhttp.readyState == 4) {
                    if (xhttp.responseText != "") {
                        select.innerHTML = "";
                        var paises = JSON.parse(xhttp.responseText);
                        paises.forEach(function (pais) {
                            var txt = document.createTextNode(pais.descripcion);
                            var op = document.createElement("option");
                            op.appendChild(txt);
                            select.appendChild(op);
                        });
                    }
                }
            };
        };
        return Manejadora;
    }());
    PrimerParcial.Manejadora = Manejadora;
})(PrimerParcial || (PrimerParcial = {}));
