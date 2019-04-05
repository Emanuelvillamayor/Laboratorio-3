/*Clase Empleado:
Atributos (todos protegidos)
Maximiliano Neiner TypeScript - POO Página 4
Constructor (inicializa los atributos de la clase)
Métodos (de instancia)
 Hablar (polimorfismo). Retorna un string con el formato “El empleado habla Español ”,
siendo Español, el valor recibido por parámetro.
 ToString (polimorfismo). Retorna un string mostrando todos los datos del empleado,
separados por un guión medio (-).
 getters para cada uno de los atributos.
*/

///<reference path="Persona.ts"/>

namespace Empleados
{
    export class Empleado extends Persona
    {
       //Atributos

       protected _legajo:number;
       protected _sueldo:number;

       //Propiedades

       public get Legajo() : number 
       {
           return this._legajo;
       }

       public get Sueldo() : number 
       {
           return this._sueldo;
       }
      
       //Constructor

       public constructor(nombre:string,apellido:string,dni:number,sexo:string,legajo:number,sueldo:number)
       {
           //inicializo atributos en el constructor de la clase padre
           super(nombre,apellido,dni,sexo);

           this._legajo=legajo;
           this._sueldo=sueldo;
       }

    

        public Hablar(idioma: string): string 
        {
            return `El empleado habla ${idioma}\n`;
        }

        public ToString():string
        {
         return `${super.ToString()}\nLegajo:${this._legajo}\nSueldo:${this._sueldo}`;
        }
        
    }

}