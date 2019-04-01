/*Ejercicio 17:
Confeccione un formulario que muestre una serie de títulos de películas con su
respectivo checkbox. Al pulsar el botón, mostrar las películas seleccionadas por consola.
*/

function MostrarSeleccionados():void
{
    //en esta ocuacion voy a guardar el "checked" para saber si esa opcion esta seleccionada o no
    let rocky : any=<HTMLInputElement> document.getElementById("chxRocky");

    let rambo : any = (<HTMLInputElement> document.getElementById("chxRambo")).checked;

    let demoledor : any = (<HTMLInputElement> document.getElementById("chxDemoledor")).checked;

    let indestructible : boolean = (<HTMLInputElement> document.getElementById("chxInsdestructibles")).checked;

    let array :Boolean[]=[];

    

    array[0]=rocky;
    array[1]=rambo;
    array[2]=demoledor;
    array[3]=indestructible;

    for(let i=0;i<4;i++)
    {
        if(array[i]==true)
        {
           
        }
    }

    
}