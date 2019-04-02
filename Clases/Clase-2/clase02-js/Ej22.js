/*
Cree una página que muestre, a través de un Array, los nombres de los meses de un
año, el número al que ese mes corresponde o ambos. Utilizar controles de tipo ’checkBox’.
*/
function MostrarSeleccionados()
{
    let enero =document.getElementById("chbxEnero");
    let febrero =document.getElementById("chbxFebrero");
    let marzo =document.getElementById("chbxMarzo");
    let abril =document.getElementById("chbxAbril");
    let mayo =document.getElementById("chbxMayo");
    let junio =document.getElementById("chbxJunio");
    let julio =document.getElementById("chbxJulio");
    let agosto =document.getElementById("chbxAgosto");
    let septiembre =document.getElementById("chbxSeptiembre");
    let octubre =document.getElementById("chbxOctubre");
    let noviembre =document.getElementById("chbxNoviembre");
    let diciembre =document.getElementById("chbxDiciembre");

    let boton = document.getElementById("boton");
    let array=[enero,febrero,marzo,abril,mayo,junio,julio,agosto,septiembre,octubre,noviembre,diciembre];
    let cadena  ="";

     for(let i=0;i<array.length;i++)
     {
         if(array[i].checked==true)
         {
           cadena+=array[i].value +"\n";
         }
     }
     
    if(cadena.length>0) 
    alert("Casillas seleccionadas:\n"+cadena);
    else
    alert("Ninguna casilla seleccionada!!!");
}