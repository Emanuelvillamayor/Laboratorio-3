/*Ejercicio 21 :
 Se necesita hacer una página que contenga dos cuadros de texto (dónde se ingresarán
números), un botón (con la leyenda ‘Calcular’) y cuatro controles de tipo ‘radioButton’(va a haber uno ) (suma,
resta, multiplicación y división). Cuando se pulsa el botón una función deberá mostrar el
resultado (en la consola y en otro cuadro de texto), de acuerdo al tipo de operación que el
usuario eligió. Utilizar la estructura ‘switch’ 
*/

function ResultadoOperacion():void
{
    //obtengo los valores de los cuadros de texto
    let valorString1 : string = (<HTMLInputElement> document.getElementById("txtValor1")).value;
    let valorInt1 :number = parseInt(valorString1);

    let valorString2 : string = (<HTMLInputElement> document.getElementById("txtValor2")).value;
    let valorInt2 :number = parseInt(valorString2);
 
    //obtengo en un array
    let rdButton :any=  document.getElementsByName("rdoTipo");

    let resultado:number=0;
    let signo : string="-";

    //recorro para encontrar de todos los RADIO BUTTON , EL QUE FUE SELECCIONADO , ESO LO SE CON EL ATRIBUTO "CHECKED"
    for(let i=0;i<rdButton.length;i++)
    { 
      if(rdButton[i].checked==true)
      {
        //OBTENGO EL VALOR DE ESE ATRIBUTO
        signo=rdButton[i].value;
        break;
      }
    }
   
   switch (signo) {
       case "+":
           resultado = valorInt1+valorInt2;
           break;
        case "-":
           resultado = valorInt1-valorInt2;
           break;

        case "*":
           resultado = valorInt1*valorInt2;
           break; 

         case "/": 
           resultado = valorInt1/valorInt2;
           break;

       default:
           break;
   }

   alert("El resultado de su Operacion es : " + resultado);
    
    

}