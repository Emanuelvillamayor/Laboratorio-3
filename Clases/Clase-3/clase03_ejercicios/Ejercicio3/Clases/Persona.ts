/*Clase Persona:
Clase Persona
Atributos (todos privados)
Constructor (inicializa los atributos de la clase)
Métodos (de instancia)
 Hablar (abstracto). Retorna un string.
 ToString. Retorna un string mostrando todos los datos de la persona, separados por
un guión medio (-).
 getters para cada uno de los atributos.
*/

namespace Empleados
{
    export abstract class Persona
    {
        //Atributos

        private _apellido:string;
        private _dni:number;
        private _nombre:string;
        private _sexo:string;

       //--------Get-------

       //metodo
       public GetApellido():string
       {
           return this._apellido;
       }


       //propiedad
       public get Dni() : number 
       {
           return this._dni;
       }

       public get Nombre() : string 
       {
           return this._nombre;
       }

       public get Sexo() : string 
       {
           return this._sexo;
       }
       
       
   //Constructor
   public constructor(nombre:string,apellido:string,dni:number,sexo:string)
   {
       this._apellido=apellido;
       this._nombre=nombre;
       this._dni=dni;
       this._sexo=sexo;
   }

   //Metodos abstractos

   public abstract  Hablar(idioma:string) :string;

   //Metodos instancia

   public ToString():string
   {
     return `Nombre:${this._nombre}\nApellido:${this._apellido}\nDNI:${this._dni}\nSexo:${this._sexo}`;  
     //return "Nombre:"+this._nombre+"\nApellido:"+this._apellido+"\nDNI:"+this._dni+"\nSexo:"+this._sexo;
   }
       

    }
}