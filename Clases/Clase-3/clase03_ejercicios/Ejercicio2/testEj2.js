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
La clase FiguraGeometrica posee: todos sus atributos protegidos, un constructor con
un parámetro, un método getter para el atributo _color , un método virtual ( ToString ) y dos
métodos abstractos: Dibujar (público) y CalcularDatos (protegido).
CalcularDatos será invocado en el constructor de la clase derivada que corresponda, su
funcionalidad será la de inicializar los atributos _superficie y _perimetro.
Dibujar, retornará un string (con el color que corresponda) formando la figura geométrica del
objeto que lo invoque (retornar una serie de asteriscos que modele el objeto).
Ejemplo:
Maximiliano Neiner TypeScript - POO Página 2
  *     *******
 ***    *******
*****   *******
Utilizar el método ToString para obtener toda la información completa del objeto, y luego
dibujarlo por pantalla y mostrarlo por consola.
*/
var Figuras2;
(function (Figuras2) {
    var FiguraGeometrica = /** @class */ (function () {
        //Constructor
        function FiguraGeometrica(color) {
            this._color = color;
            this._perimetro = 0;
            this._superficie = 0;
        }
        Object.defineProperty(FiguraGeometrica.prototype, "GetColor", {
            //Get
            get: function () {
                return this._color;
            },
            enumerable: true,
            configurable: true
        });
        //Metodo Virtual
        FiguraGeometrica.prototype.ToString = function () {
            //  return `Color:${this._color}<br>Perimetro:${this._perimetro}<br>Superficie:${this._superficie}`;
            return "Color:" + this._color + "\nPerimetro:" + this._perimetro + "\nSuperficie:" + this._superficie;
        };
        return FiguraGeometrica;
    }());
    Figuras2.FiguraGeometrica = FiguraGeometrica;
})(Figuras2 || (Figuras2 = {}));
///<reference path="FiguraGeometrica.ts"/>
var Figuras2;
(function (Figuras2) {
    var Rectangulo = /** @class */ (function (_super) {
        __extends(Rectangulo, _super);
        //Constructor
        function Rectangulo(color, l1, l2) {
            var _this = _super.call(this, color) || this;
            _this._ladoUno = l1;
            _this._ladoDos = l2;
            _this.CalcularDatos();
            return _this;
        }
        Rectangulo.prototype.Dibujar = function () {
            //var retorno :string='<div style="color :#'+this.GetColor +'">';//pongo los colores hexadecimal      
            // var retorno:string ='<div style="color :'+ this.GetColor +'">'; //pongo los colores ingles 
            var retorno = "";
            for (var i = 0; i < this._ladoUno; i++) {
                for (var j = 0; j < this._ladoDos; j++) {
                    retorno += "*";
                }
                // retorno+="<br>";
                retorno += "\n";
            }
            return retorno;
        };
        Rectangulo.prototype.CalcularDatos = function () {
            this._perimetro = (this._ladoUno * 2) + (this._ladoDos * 2);
            this._superficie = this._ladoDos * this._ladoUno;
        };
        Rectangulo.prototype.ToString = function () {
            return _super.prototype.ToString.call(this) + ("\nDibujo:\n\n" + this.Dibujar());
        };
        return Rectangulo;
    }(Figuras2.FiguraGeometrica));
    Figuras2.Rectangulo = Rectangulo;
})(Figuras2 || (Figuras2 = {}));
///<reference path ="./Clases/Rectangulo.ts"/>
var rect = new Figuras2.Rectangulo("red", 2, 4);
console.log(rect.ToString() + "\n\n");
console.log("%cSoy de color azul", "color: blue");
