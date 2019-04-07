/*
La clase Punto ha de tener dos atributos privados con acceso de sólo lectura (sólo con
getters), que serán las coordenadas del punto. Su constructor recibirá las coordenadas del
punto.
*/
namespace Figuras
{
    export class Punto
    {
        //Atributos
        private _x:number;
        private _y:number;


        //Get
        
        public get GetX() : number
        {
            return this._x;
        }

        
        public get GetY() : number 
        {
            return this._y;
        }
        
        //Constructor

        public constructor(x:number,y:number)
        {
            this._x=x;
            this._y=y;
        }
        
    }

}
