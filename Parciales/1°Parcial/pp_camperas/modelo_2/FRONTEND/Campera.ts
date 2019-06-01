///<reference path="Ropa.ts"/>

namespace Entidades
{
    export class Campera extends Ropa
    {
        public talle:string;
        public color:string;
        public path:string;

        public constructor(codigo:number,nombre:string,precio:number,talle:string,color:string,path:string)
        {
            super(codigo,nombre,precio);

            this.talle=talle;
            this.color=color;
            this.path=path;
       }
    
       public ToJson():string
       {
           return `{"talle":"${this.talle}","color":"${this.color}","path":"${this.path}",${this.ToString()}}`;
       }

    }
}