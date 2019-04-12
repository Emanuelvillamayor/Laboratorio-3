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
namespace Figuras2
{
    export abstract class FiguraGeometrica
    {
        //Atributos

        protected _color:string;
        protected _perimetro:number;
        protected _superficie:number;

        //Get
      
        public get GetColor() : string 
        {
            return this._color;
        }

        //Constructor

        public constructor(color:string)
        {
            this._color=color;
            this._perimetro=0;
            this._superficie=0;
        }
        

        //Metodo Virtual
        public ToString():string
        {
          //  return `Color:${this._color}<br>Perimetro:${this._perimetro}<br>Superficie:${this._superficie}`;
          return `Color:${this._color}\nPerimetro:${this._perimetro}\nSuperficie:${this._superficie}`;
        }

        //Metodos Abstractos

        public abstract Dibujar():string;

        protected abstract CalcularDatos():void;


    }

}