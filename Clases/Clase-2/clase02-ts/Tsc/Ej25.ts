/*
<!--Ejercicio 25:
Agregarle al ejercicio anterior un mensaje, en color rojo (#ff0000), en aquellos campos
que no sean válidos.
-->
*/
function ValidarDatos2()
{
   let nombre :any= document.getElementById("txtNombre");
   let apellido:any = document.getElementById("txtApellido");
   let dni:any = document.getElementById("numDni");

   let masculino:any=document.getElementById("chxMasculino");
   let femenino:any=document.getElementById("chxFemenino");

   let cadena:string="";

    
   if(parseInt( nombre.value.length )>0)
    {
        cadena+="Nombre: "+nombre.value+"\n";
    }
    else
    {

       nombre.value="ERROR!";
       nombre.style.color="red";
        cadena+="Nombre: "+"Error!"+"\n";
    }

    if(parseInt(apellido.value.length)>0)
    {
        cadena+="Apellido: "+apellido.value+"\n";
    }
    else
    {
        apellido.value="ERROR";
        apellido.style.color="red";
        cadena+="Apellido: "+"Error!"+"\n";
    }


    if(dni.value>="11111111" && dni.value<="99999999")
    {
        cadena+="DNI:"+ dni.value+"\n";
    }
    else
    {
        dni.value.style="red";
        cadena+="DNI:Error\n";
    }

    if(masculino.checked==true)
    {
        cadena+="Sexo:"+masculino.value+"\n";
    }
    
    if(femenino.checked==true)
    {
        cadena+="Sexo:"+femenino.value+"\n";
    }

    alert(cadena);
}