///<reference path="Ente.ts"/>

namespace Entidades
{
    export class Alien extends Ente
    {
        //atributos

        public raza:string;
        public planetaOrigen:string;
        public pathFoto:string;

        //cosntructor

        public constructor(cuadrante:string , edad:number ,altura:number,raza:string,planeta:string,path:string)
        {
            super(cuadrante,edad,altura);

            this.raza=raza;
            this.planetaOrigen=planeta;
            this.pathFoto=path;
        }

        //metodos

        public ToJson():string
         {
             return `${super.ToString()}"raza":"${this.raza}","planetaOrigen":"${this.planetaOrigen}","pathFoto":"${this.pathFoto}"}`;
         }
    }
}