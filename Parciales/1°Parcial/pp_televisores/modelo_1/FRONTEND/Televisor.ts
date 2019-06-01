/*
Televisor, hereda de Producto, posee como atributos tipo(cadena), paisOrigen(cadena) y
pathFoto(cadena). Un constructor para inicializar los atributos. Un método ToJSON():JSON,
que retornará la representación del objeto en formato JSON. Se debe de reutilizar el método
ToString de la clase Producto.
*/

///<reference path="Producto.ts"/>

namespace Entidades
{
    export class Televisor extends Producto
    {
        //Atributos
        protected _tipo:string;
        protected _paisOrigen:string;
        protected _pathFoto:string;

        //-------GET--------

        public GetTipo():string
        {
            return this._tipo;
        }

        public GetPaisOrigen():string
        {
            return this._paisOrigen;
        }

        public GetPathFoto():string
        {
            return this._pathFoto;
        }

        //--------SET-------

        public SetTipo(tipo:string)
        {
            this._tipo=tipo;
        }

        public SetPaisOrigen(pais:string)
        {
            this._paisOrigen=pais;
        }

        public SetPathFoto(foto:string)
        {
            this._pathFoto=foto;
        }

        public constructor (codigo:number,marca:string,precio:number,tipo:string,pais:string,foto:string)
        {
            super(codigo,marca,precio);

            this._tipo=tipo;
            this._paisOrigen=pais;
            this._pathFoto=foto;
        }

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

         public ToJson():string
         {
             return `${super.ToString()}"tipo":"${this._tipo}","pais":"${this._paisOrigen}","pathFoto":"${this._pathFoto}"}`;
         }



    }
}