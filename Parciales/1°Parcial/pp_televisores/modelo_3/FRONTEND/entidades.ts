namespace Entidades
{
    export class Producto
    {
        protected codigo : number;
        protected marca : string;
        protected precio : number;

        public constructor(codigo:number,marca:string,precio:number)
        {
            this.codigo = codigo;
            this.marca = marca;
            this.precio = precio;
        }
        public ToString():string
        {
            return '{"codigo" : ' + this.codigo + ', "marca" : "' + this.marca + '" , "precio" : ' + this.precio ;  
        }
    }
    export class Televisor extends Producto
    {
        public tipo : string;
        public paisOrigen : string;
        public pathFoto : string;

        public constructor(codigo:number,marca:string,precio:number,tipo:string,paisOrigen:string,pathFoto:string)
        {
            super(codigo,marca,precio);
            this.tipo = tipo;
            this.paisOrigen = paisOrigen;
            this.pathFoto = pathFoto;
        }
        public ToJson() : string
        {
            var cadenaJSON : string = super.ToString() + ', "tipo" : "' + this.tipo + '" , "paisOrigen" : "' + this.paisOrigen + '" , "pathFoto" : "' + this.pathFoto + '"}';
            return cadenaJSON;
        }
    }
}