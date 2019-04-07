///<reference path="FiguraGeometrica.ts"/>

namespace Figuras2
{
    export class Rectangulo extends FiguraGeometrica
    {
        //Atributos

        private _ladoDos:number;
        private _ladoUno:number;


        //Constructor

        public constructor(color:string , l1:number , l2:number)
        {
          super(color);

          this._ladoUno=l1;
          this._ladoDos=l2;
          this.CalcularDatos();
        }


        public Dibujar(): string 
        {
             //var retorno :string='<div style="color :#'+this.GetColor +'">';//pongo los colores hexadecimal      
               var retorno:string ='<div style="color :'+ this.GetColor +'">'; //pongo los colores ingles 
            
                for(let i=0;i<this._ladoUno;i++)
                {
                    for(let j=0;j<this._ladoDos;j++)
                    {
                        retorno+= "*";
                    }
                    retorno+="<br>";
                }
            
            return retorno;
        }        

        protected CalcularDatos(): void 
        {
            this._perimetro=(this._ladoUno*2) + (this._ladoDos*2);
            this._superficie =this._ladoDos*this._ladoUno;
        }

        public ToString()
        {
            return super.ToString() +`<br>Perimetro:${this._perimetro}<br>Superficie:${this._superficie}<br>Dibujo:${this.Dibujar()}`;
        }

    }
}