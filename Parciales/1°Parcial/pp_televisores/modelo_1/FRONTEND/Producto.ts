/*
Producto: código(entero), marca(cadena) y precio(flotante) como atributos. Un constructor que
reciba tres parámetros. Un método, ToString():string, que retorne la representación de la clase
en formato cadena (preparar la cadena para que, al juntarse con el método ToJSON, forme
una cadena JSON válida).
*/

namespace Entidades
{
    export class Producto
    {

        //Atributos

        protected _codigo:number;
        protected _marca:string;
        protected _precio:number;

        //-------GET------

        public GetCodigo():number
        {
            return this._codigo;
        }

        public GetMarca():string
        {
            return this._marca;
        }

        public GetPrecio():number
        {
            return this._precio;
        }

        //------SET-----

        public SetCodigo(codigo:number)
        {
            this._codigo=codigo;
        }

        public SetMarca(marca:string)
        {
            this._marca=marca;
        }

        public SetPrecio(precio:number)
        {
            this._precio=precio;
        }

        //constructor

        
        public constructor (codigo:number,marca:string,precio:number)
        {
            this._codigo=codigo;
            this._marca=marca;
            this._precio=precio;
        }

        //metodos

        public ToString():string
        {
            return `{"codigo":"${this._codigo}","marca":"${this._marca}","precio":"${this._precio}",`;
        }


    }
}