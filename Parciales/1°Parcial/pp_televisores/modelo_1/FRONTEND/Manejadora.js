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
/*
Producto: código(entero), marca(cadena) y precio(flotante) como atributos. Un constructor que
reciba tres parámetros. Un método, ToString():string, que retorne la representación de la clase
en formato cadena (preparar la cadena para que, al juntarse con el método ToJSON, forme
una cadena JSON válida).
*/
var Entidades;
(function (Entidades) {
    var Producto = /** @class */ (function () {
        //constructor
        function Producto(codigo, marca, precio) {
            this._codigo = codigo;
            this._marca = marca;
            this._precio = precio;
        }
        //-------GET------
        Producto.prototype.GetCodigo = function () {
            return this._codigo;
        };
        Producto.prototype.GetMarca = function () {
            return this._marca;
        };
        Producto.prototype.GetPrecio = function () {
            return this._precio;
        };
        //------SET-----
        Producto.prototype.SetCodigo = function (codigo) {
            this._codigo = codigo;
        };
        Producto.prototype.SetMarca = function (marca) {
            this._marca = marca;
        };
        Producto.prototype.SetPrecio = function (precio) {
            this._precio = precio;
        };
        //metodos
        Producto.prototype.ToString = function () {
            return "{\"codigo\":\"" + this._codigo + "\",\"marca\":\"" + this._marca + "\",\"precio\":\"" + this._precio + "\",";
        };
        return Producto;
    }());
    Entidades.Producto = Producto;
})(Entidades || (Entidades = {}));
/*
Televisor, hereda de Producto, posee como atributos tipo(cadena), paisOrigen(cadena) y
pathFoto(cadena). Un constructor para inicializar los atributos. Un método ToJSON():JSON,
que retornará la representación del objeto en formato JSON. Se debe de reutilizar el método
ToString de la clase Producto.
*/
///<reference path="Producto.ts"/>
var Entidades;
(function (Entidades) {
    var Televisor = /** @class */ (function (_super) {
        __extends(Televisor, _super);
        function Televisor(codigo, marca, precio, tipo, pais, foto) {
            var _this = _super.call(this, codigo, marca, precio) || this;
            _this._tipo = tipo;
            _this._paisOrigen = pais;
            _this._pathFoto = foto;
            return _this;
        }
        //-------GET--------
        Televisor.prototype.GetTipo = function () {
            return this._tipo;
        };
        Televisor.prototype.GetPaisOrigen = function () {
            return this._paisOrigen;
        };
        Televisor.prototype.GetPathFoto = function () {
            return this._pathFoto;
        };
        //--------SET-------
        Televisor.prototype.SetTipo = function (tipo) {
            this._tipo = tipo;
        };
        Televisor.prototype.SetPaisOrigen = function (pais) {
            this._paisOrigen = pais;
        };
        Televisor.prototype.SetPathFoto = function (foto) {
            this._pathFoto = foto;
        };
        //metodos de instancia
        //retorno como OBJETO JSON
        /*
        public  ToJson():string
         {
           let cadena:string = `${super.ToString()}"tipo":"${this._tipo}","pais":"${this._paisOrigen}","path":"${this._pathFoto}"}`;
           let retornoJson = JSON.parse(cadena);
            return retornoJson;
         }*/
        //retorno como CADENA JSON
        Televisor.prototype.ToJson = function () {
            return _super.prototype.ToString.call(this) + "\"tipo\":\"" + this._tipo + "\",\"pais\":\"" + this._paisOrigen + "\",\"pathFoto\":\"" + this._pathFoto + "\"}";
        };
        return Televisor;
    }(Entidades.Producto));
    Entidades.Televisor = Televisor;
})(Entidades || (Entidades = {}));
///<reference path="./Televisor.ts"/>
var PrimerParcial;
(function (PrimerParcial) {
    var Manejadora = /** @class */ (function () {
        function Manejadora() {
        }
        /*
        AgregarTelevisor. Tomará los distintos valores desde la página index.html (incluida la foto), creará un
        objeto de tipo Televisor, que se enviará (por AJAX) junto al parámetro caso (con valor “agregar”),
        hacia “./BACKEND/adminstrar.php”. En esta página se guardará al televisor en el archivo
        “./BACKEND/televisores.json” y la foto en “./BACKEND/fotos”.
        */
        Manejadora.AgregarTelevisor = function () {
            var xhr = new XMLHttpRequest();
            //recupero datos
            var codigo = document.getElementById("codigo").value;
            var marca = document.getElementById("marca").value;
            var precio = document.getElementById("precio").value;
            var tipo = document.getElementById("tipo").value;
            var pais = document.getElementById("pais").value;
            //recupero imagen y path de la imagen para crear el objeto de tipo Televisor
            var foto = document.getElementById("foto");
            var path = document.getElementById("foto").value;
            var pathFoto = (path.split('\\'))[2];
            //Creo el objeto de tipo televisor
            var tele = new Entidades.Televisor(parseInt(codigo), marca, parseFloat(precio), tipo, pais, pathFoto);
            var form = new FormData();
            form.append('foto', foto.files[0]);
            form.append('cadenaJson', tele.ToJson());
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
                    }
                }
            };
        };
        /*
        MostrarTelevisores. Recuperará (por AJAX) todos los televisores del archivo .json (caso=”traer”) y
        generará un listado dinámico (en el FRONTEND) que mostrará toda la información de cada uno de los
        televisores (incluida la foto).
        */
        /* FORMA RECUPERANDO TABLA EN PHP
        
        public static MostrarTelevisor()
         {
             let xhr : XMLHttpRequest = new XMLHttpRequest();
 
             let form : FormData = new FormData();
 
             form.append('caso', "traer");
 
 
             xhr.open('POST', './BACKEND/administrar.php', true);
 
             xhr.setRequestHeader("enctype", "multipart/form-data");
 
             xhr.send(form);
 
             xhr.onreadystatechange = () => {
 
             if (xhr.readyState == 4 && xhr.status == 200) {
             //la tabla que recuperamos desde nexo.php la mostramos dentro de el "div"
             (<HTMLInputElement>document.getElementById("divTabla")).innerHTML=xhr.responseText;
             }
             };
 
         }
         */
        Manejadora.MostrarTelevisor = function () {
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
                    tabla += "<td>Codigo</td>";
                    tabla += "<td>Marca</td>";
                    tabla += "<td>Precio</td>";
                    tabla += "<td>Tipo</td>";
                    tabla += "<td>Pais</td>";
                    tabla += "<td>Foto</td>";
                    tabla += "</tr>";
                    tabla += "</thead>";
                    for (var i = 0; i < arrayJson.length; i++) {
                        tabla += "<tr>";
                        tabla += "<td>";
                        tabla += arrayJson[i].codigo;
                        tabla += "</td>";
                        tabla += "<td>";
                        tabla += arrayJson[i].marca;
                        tabla += "</td>";
                        tabla += "<td>";
                        tabla += arrayJson[i].precio;
                        tabla += "</td>";
                        tabla += "<td>";
                        tabla += arrayJson[i].tipo;
                        tabla += "</td>";
                        tabla += "<td>";
                        tabla += arrayJson[i].pais;
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
                        tabla += "</td>";
                        tabla += "</tr>";
                    }
                    tabla += "</table>";
                    document.getElementById("divTabla").innerHTML = tabla;
                }
            };
        };
        /*
        GuardarEnLocalStorage. Recuperará (por AJAX) todos los televisores del archivo .json
        (caso=”traer”) y los guarda en el LocalStorage, con la clave “televisores_local_storage”.
        */
        Manejadora.GuardarEnLocalStorage = function () {
            var xhr = new XMLHttpRequest();
            var form = new FormData();
            form.append('caso', "traer");
            xhr.open('POST', './BACKEND/administrar.php', true);
            xhr.setRequestHeader("enctype", "multipart/form-data");
            xhr.send(form);
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    localStorage.setItem("televisores_local_storage", xhr.responseText);
                }
            };
        };
        /*
        VerificarExistencia. Verifica que el televisor que se quiere agregar no exista. Para ello, comparará los
        códigos de los televisores guardados en el LocalStorage. Si el televisor existe, se mostrará (por
        consola y alert) lo acontecido. Caso contrario, agregará el nuevo televisor y se actualizará el
        LocalStorage (GuardarEnLocalStorage).
        */
        Manejadora.VerificarExistencia = function () {
            //recupero datos
            var codigo = document.getElementById("codigo").value;
            var flag = true;
            var arrayJson = JSON.parse(localStorage.getItem("televisores_local_storage"));
            for (var i = 0; i < arrayJson.length; i++) {
                if (arrayJson[i].codigo == codigo) {
                    flag = false;
                }
            }
            if (flag == true) {
                Manejadora.AgregarTelevisor();
                Manejadora.GuardarEnLocalStorage();
            }
            else {
                console.log("El televisor ya existe");
                alert("El televisor ya existe");
            }
        };
        return Manejadora;
    }());
    PrimerParcial.Manejadora = Manejadora;
})(PrimerParcial || (PrimerParcial = {}));
