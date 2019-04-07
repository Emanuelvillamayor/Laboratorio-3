/*
La clase Rectangulo tiene los atributos privados de tipo Punto _vertice1 , _vertice2 ,
_vertice3 y _vertice4 (que corresponden a los cuatro vértices del rectángulo).
La base de todos los rectángulos de esta clase será siempre horizontal. Por lo tanto, debe
tener un constructor para construir el rectángulo por medio de los vértices 1 y 3.
Los atributos _ ladoUno , _ ladoDos , _area y _ perimetro se deberán inicializar una vez
construido el rectángulo.
*/

///<reference path="Punto.ts"/>

namespace Figuras
{
    export class Rectangulo
    {
        //Atributos
        private _area:number;
       // private _ladoDos:number;
       // private _ladoUno:number;
        private _perimetro:number;
        private _vertice1:Punto;
      //  private _vertice2:Punto;
        private _vertice3:Punto;
      //  private _vertice4:Punto;
    
        //get
 
        public get GetArea() : number 
        {
            return this._area;
        }

        
        public get GetPerimetro() : number 
        {
            return this._perimetro;
        }

        //Constructor
        
        public constructor(v1:Punto ,v3:Punto)
        {
            this._vertice1=v1;
            this._vertice3=v3;
        }

        //Metodos instacia

        public  ToString() :string
        {
            return "hola";
        }




    }

}