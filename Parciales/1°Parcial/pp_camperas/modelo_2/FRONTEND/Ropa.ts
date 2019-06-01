namespace Entidades
{
    export class Ropa
    {
        public codigo:number;
        public nombre:string;
        public precio:number;

        public constructor (codigo:number,nombre:string,precio:number)
        {
            this.codigo=codigo;
            this.nombre=nombre;
            this.precio=precio;
        }

        public ToString():string
        {
            return `"nombre":"${this.nombre}","precio":${this.precio},"codigo":${this.codigo}`;
        }



    }
}