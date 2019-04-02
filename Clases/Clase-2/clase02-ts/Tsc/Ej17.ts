/*Ejercicio 17:
Confeccione un formulario que muestre una serie de títulos de películas con su
respectivo checkbox. Al pulsar el botón, mostrar las películas seleccionadas por consola.
*/

function MostrarSeleccionados():void
{
    //en esta ocuacion voy a guardar el "checked" para saber si esa opcion esta seleccionada o no
    //let rocky :HTMLElement=<HTMLInputElement> document.getElementById("chxRocky");
    let rocky : any = document.getElementsByName("chxRocky");
    

    let rambo:any = document.getElementsByName("chxRambo");


    let demoledor : any = document.getElementsByName("chxDemoledor");

    let indestructible : any =  document.getElementsByName("chxIndestructibles");

  
   let arrays=[rocky,rambo,demoledor,indestructible];

   let seleccionadas:string="";

   if(rocky[0].checked==true)
   {
     seleccionadas+=rocky[0].value +"\n" ;
   }
   if(rambo[0].checked==true)
   {
    seleccionadas+=rambo[0].value +"\n" ;
   }
   if(demoledor[0].checked==true)
   {
    seleccionadas+=demoledor[0].value +"\n" ;
   }
   if(indestructible[0].checked==true)
   {
    seleccionadas+=indestructible[0].value +"\n" ;
   }

   if(seleccionadas.length>0)
   {
     alert("Las peliculas seleccionadas son :\n" +seleccionadas);
   }
   else
   {
     alert("No hay peliculas seleccionadas");
   }
  
   

    

  

    
}