namespace Entidades
{
    export class Ente 
    {
        //atributos
       public cuadrante:string;
       public edad:number;
       public altura:number;

       //constructor
       public constructor (cuadrante:string,edad:number,altura:number)
       {
           this.cuadrante=cuadrante;
           this.edad=edad;
           this.altura=altura;
       }


       //metodos
       public ToString():string
       {
           return `{"cuadrante":"${this.cuadrante}","edad":"${this.edad}","altura":"${this.altura}",`;
       }

    }

}