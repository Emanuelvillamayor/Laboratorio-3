/*Ejercicio 18:
Confeccionar un formulario que solicite el ingreso del nombre de una persona y permita
votar el sitio. Mediante un control de tipo radio, el visitante puede elegir entre las siguientes
opciones: Excelente, Muy Bueno, Bueno, Regular y Malo. Al pulsar el botón, mostrar la
opción elegida por consola.
*/

function MostrarResultado():void
{
    //obtengo los valores de los cuadros de texto
    let nombre : string = (<HTMLInputElement> document.getElementById("txtNombre")).value;
   
 
    //obtengo en un array
    let rdButton :any=  document.getElementsByName("rdb");
    let valor :string="";

    //recorro para encontrar de todos los RADIO BUTTON , EL QUE FUE SELECCIONADO , ESO LO SE CON EL ATRIBUTO "CHECKED"
    
    for(let i=0;i<rdButton.length;i++)
    { 
      if(rdButton[i].checked==true)
      {
        //OBTENGO EL VALOR DE ESE ATRIBUTO
        valor=rdButton[i].value;
        alert("Su nombre es: " + nombre +"\n"+"La opcion elegida es: " + valor);
        
        break;
      }
    }
   

   
}