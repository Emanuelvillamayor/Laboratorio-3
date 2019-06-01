namespace Entidades
{
    export class Persona
    {
       protected _nombre : string;
       protected _apellido : string;
       protected _edad : number;

       public constructor(nombre : string ,apellido : string ,edad:number)
       {
           this._apellido = apellido;
           this._nombre = nombre;
           this._edad = edad;
       }

    }
    export class Ciudadano extends Persona
    {
        public _nacionalidad : string;
        public _dni : number;

        public constructor(nombre:string,apellido:string,edad:number,nacionalidad:string,dni:number)
        {
            super(nombre,apellido,edad);
            this._nacionalidad = nacionalidad;
            this._dni = dni;
        }
    }
        
}