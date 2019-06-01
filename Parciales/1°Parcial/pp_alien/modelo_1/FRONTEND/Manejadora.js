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
    var Ente = /** @class */ (function () {
        //constructor
        function Ente(cuadrante, edad, altura) {
            this.cuadrante = cuadrante;
            this.edad = edad;
            this.altura = altura;
        }
        //metodos
        Ente.prototype.ToString = function () {
            return "{\"cuadrante\":\"" + this.cuadrante + "\",\"edad\":\"" + this.edad + "\",\"altura\":\"" + this.altura + "\",";
        };
        return Ente;
    }());
    Entidades.Ente = Ente;
})(Entidades || (Entidades = {}));
///<reference path="Ente.ts"/>
var Entidades;
(function (Entidades) {
    var Alien = /** @class */ (function (_super) {
        __extends(Alien, _super);
        //cosntructor
        function Alien(cuadrante, edad, altura, raza, planeta, path) {
            var _this = _super.call(this, cuadrante, edad, altura) || this;
            _this.raza = raza;
            _this.planetaOrigen = planeta;
            _this.pathFoto = path;
            return _this;
        }
        //metodos
        Alien.prototype.ToJson = function () {
            return _super.prototype.ToString.call(this) + "\"raza\":\"" + this.raza + "\",\"planetaOrigen\":\"" + this.planetaOrigen + "\",\"pathFoto\":\"" + this.pathFoto + "\"}";
        };
        return Alien;
    }(Entidades.Ente));
    Entidades.Alien = Alien;
})(Entidades || (Entidades = {}));
///<reference path="./Alien.ts"/>
var RecuperatorioPrimerParcial;
(function (RecuperatorioPrimerParcial) {
    var Manejadora = /** @class */ (function () {
        function Manejadora() {
        }
        Manejadora.AgregarAlien = function () {
            var xhr = new XMLHttpRequest();
            //recupero datos
            var cuadrante = document.getElementById("cuadrante").value;
            var edad = document.getElementById("edad").value;
            var altura = document.getElementById("altura").value;
            var raza = document.getElementById("raza").value;
            var planeta = document.getElementById("cboPlaneta").value;
            //recupero imagen y path de la imagen para crear el objeto de tipo Alien
            var foto = document.getElementById("foto");
            var path = document.getElementById("foto").value;
            var pathFoto = (path.split('\\'))[2];
            //Creo el objeto de tipo Alien
            var Alien = new Entidades.Alien(cuadrante, parseInt(edad), parseFloat(altura), raza, planeta, pathFoto);
            var form = new FormData();
            form.append('foto', foto.files[0]);
            form.append('cadenaJson', Alien.ToJson());
            form.append('caso', 'agregar');
            xhr.open('POST', './BACKEND/administrar.php', true);
            xhr.setRequestHeader("enctype", "multipart/form-data");
            xhr.send(form);
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    var retJSON = JSON.parse(xhr.responseText);
                    // if(!retJSON.Ok)
                    if (!retJSON.TodoOK) {
                        console.error("NO se subió la foto!!!");
                    }
                    else {
                        //si el atributo "Ok" es true , mostramos la foto subida pisando la que ya estaba por default
                        console.info("Foto subida OK!!!");
                        //direccion de donde se encuentra la foto
                        var path_1 = "./BACKEND/fotos/" + pathFoto;
                        //hay que cambiar el "src" para que sepa donde buscar la foto 
                        document.getElementById("imgFoto").src = path_1;
                        console.log(path_1);
                        Manejadora.MostrarAliens();
                    }
                }
            };
        };
        Manejadora.MostrarAliens = function () {
            var xhr = new XMLHttpRequest();
            var form = new FormData();
            form.append('caso', "traer");
            xhr.open('POST', './BACKEND/administrar.php', true);
            xhr.setRequestHeader("enctype", "multipart/form-data");
            xhr.send(form);
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    //recupero la cadena y convierto a array de json
                    var arrayJson = JSON.parse(xhr.responseText);
                    var tabla = "";
                    tabla += "<table border=1>";
                    tabla += "<thead>";
                    tabla += "<tr>";
                    tabla += "<td>Cuadrante</td>";
                    tabla += "<td>Edad</td>";
                    tabla += "<td>Altura</td>";
                    tabla += "<td>Raza</td>";
                    tabla += "<td>Planeta</td>";
                    tabla += "<td>Foto</td>";
                    tabla += "</tr>";
                    tabla += "</thead>";
                    for (var i = 0; i < arrayJson.length; i++) {
                        tabla += "<tr>";
                        tabla += "<td>";
                        tabla += arrayJson[i].cuadrante;
                        tabla += "</td>";
                        tabla += "<td>";
                        tabla += arrayJson[i].edad;
                        tabla += "</td>";
                        tabla += "<td>";
                        tabla += arrayJson[i].altura;
                        tabla += "</td>";
                        tabla += "<td>";
                        tabla += arrayJson[i].raza;
                        tabla += "</td>";
                        tabla += "<td>";
                        tabla += arrayJson[i].planetaOrigen;
                        tabla += "</td>";
                        tabla += "<td>";
                        /*una forma
                        if(arrayJson[i].pathFoto !== "undefined") {
                            tabla+="<img src='./BACKEND/fotos/" + arrayJson[i].pathFoto + "' height=100 width=100 ></img>";
                        }
                        else {
                            tabla+="No hay foto";
                        }*/
                        //compruebo si existe la imagen
                        var img = new Image();
                        var path = arrayJson[i].pathFoto;
                        img.src = "./BACKEND/fotos/" + path;
                        //if( img.height != 0)
                        //if(arrayJson[i].path !== "undefined")
                        //{
                        tabla += "<img src='./BACKEND/fotos/" + arrayJson[i].pathFoto + "' height=100 width=100 ></img>";
                        //  }
                        // else {
                        //    tabla+="No hay foto";
                        //   }
                        var objJson = JSON.stringify(arrayJson[i]);
                        tabla += "<td><input type='button' onclick='RecuperatorioPrimerParcial.Manejadora.EliminarAlien(" + (objJson) + ")' value='Eliminar'</td>";
                        tabla += "<td><input type='button' onclick='RecuperatorioPrimerParcial.Manejadora.ModificarAlien(" + (objJson) + ")' value='Eliminar'</td>";
                        tabla += "</td>";
                        tabla += "</tr>";
                    }
                    tabla += "</table>";
                    document.getElementById("divTabla").innerHTML = tabla;
                    Manejadora.GuardarEnLocalStorage();
                }
            };
        };
        Manejadora.GuardarEnLocalStorage = function () {
            var xhr = new XMLHttpRequest();
            var form = new FormData();
            form.append('caso', "traer");
            xhr.open('POST', './BACKEND/administrar.php', true);
            xhr.setRequestHeader("enctype", "multipart/form-data");
            xhr.send(form);
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    localStorage.setItem("aliens_local_storage", xhr.responseText);
                }
            };
        };
        Manejadora.VerificarExistencia = function () {
            //recupero datos
            var cuadrante = document.getElementById("cuadrante").value;
            var flag = true;
            var arrayJson = JSON.parse(localStorage.getItem("aliens_local_storage"));
            for (var i = 0; i < arrayJson.length; i++) {
                if (arrayJson[i].cuadrante == cuadrante) {
                    flag = false;
                }
            }
            if (flag == true) {
                Manejadora.AgregarAlien();
            }
            else {
                console.log("El televisor ya existe");
                alert("El televisor ya existe");
            }
        };
        /*
        public static ObtenerAliensPorCuadrante()
        {
          let arrayJson=JSON.parse(localStorage.getItem("aliens_local_storage"));
 
          for(let i=0;arrayJson.length;i++)
          {
 
          }
        }*/
        /*
        EliminarAlien. Eliminará al alien del archivo (por AJAX) y del LocalStorage. Recibe como parámetro al objeto
        JSON que se ha de eliminar. Pedir confirmación, mostrando cuadrante y raza, antes de eliminar. Refrescar el
        listado para visualizar los cambios.
        */
        Manejadora.EliminarAlien = function (cadenaJson) {
            if (confirm("Esta seguro que desea eliminar al ovni de cuadrante " + cadenaJson.cuadrante + " y raza " + cadenaJson.raza)) {
                var xhr_1 = new XMLHttpRequest();
                var form = new FormData();
                form.append('cadenaJson', JSON.stringify(cadenaJson));
                form.append('caso', "eliminar");
                xhr_1.open('POST', './BACKEND/administrar.php', true);
                xhr_1.setRequestHeader("enctype", "multipart/form-data");
                xhr_1.send(form);
                xhr_1.onreadystatechange = function () {
                    if (xhr_1.readyState == 4 && xhr_1.status == 200) {
                        //alert(xhr.responseText);
                        console.log("alien eliminado");
                        document.getElementById("imgFoto").src = "./BACKEND/fotos/alien_defecto.jpg";
                        Manejadora.MostrarAliens();
                    }
                };
            }
            else {
                alert("Accion cancelada");
            }
        };
        Manejadora.ModificarAlien = function (cadenaJson) {
        };
        return Manejadora;
    }());
    RecuperatorioPrimerParcial.Manejadora = Manejadora;
})(RecuperatorioPrimerParcial || (RecuperatorioPrimerParcial = {}));
