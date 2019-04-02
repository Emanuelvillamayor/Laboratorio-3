/*Ejercicio 24:
Realizar una página que permita el ingreso de: Apellido, Nombre, Dni y sexo de una
persona. Si el usuario pulsa el botón de confirmación se invocará a una función encargada de
validar cada uno de los datos ingresados (que tanto el nombre y apellido no estén vacíos,
que el documento sea numérico y que el sexo sea o ‘m’ o ‘f’)
*/

function ValidarDatos1()
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
       nombre.placeholder="ERROR";
       cadena+="Nombre: "+"Error!"+"\n";
   }

   if(parseInt(apellido.value.length)>0)
   {
       cadena+="Apellido: "+apellido.value+"\n";
   }
   else
   {
       apellido.placeholder="ERROR";
       cadena+="Apellido: "+"Error!"+"\n";
   }


   if(dni.value>="11111111" && dni.value<="99999999")
   {
       cadena+="DNI:"+ dni.value+"\n";
   }
   else
   {
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