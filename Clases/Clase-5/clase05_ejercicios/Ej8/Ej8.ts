/*
Aplicación Nº 8 (Leer un archivo .json II)
Tomando como punto de partida el ejercicio anterior, armar una página que posea un <input
type=”button”> que al pulsarlo, muestre el JSON recibido por Ajax en los elementos de tipo
<input type=”text”> (uno por cada atributo del objeto recibido).
*/

namespace CLASE8
{
export function EnviarJSON():void
{

    let params="";

    let xhttp:XMLHttpRequest= new XMLHttpRequest();

    xhttp.open("POST","Ej8.php",true);

    xhttp.setRequestHeader("content-type","application/x-www-form-urlencoded");


    xhttp.send(params);

    xhttp.onreadystatechange=()=>{
        //si esta todo bien entra al if
      if(xhttp.readyState==4 && xhttp.status==200)
      {   
         // con la funcion "parse" transformo un "string" de tipo JSON  a un "objet"o de tipo JSON
         let obj  = JSON.parse(xhttp.responseText);
         (<HTMLInputElement> document.getElementById("txtId")).value = obj.Id;
         (<HTMLInputElement> document.getElementById("txtMarca")).value = obj.Marca;
         (<HTMLInputElement> document.getElementById("txtPrecio")).value = obj.Precio;
         (<HTMLInputElement> document.getElementById("txtColor")).value = obj.Color;
         (<HTMLInputElement> document.getElementById("txtModelo")).value = obj.Modelo;

      }

    }
}

}