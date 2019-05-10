/*
Ejercicio 10:
Examinar cuidadosamente el archivo city.list.min.json , luego realizar una aplicación web,
similar a la del ejercicio anterior, que permita armar un listado con el contenido completo de las
ciudades. El archivo .php se deberá nombrar como administrarCiudades.php, pasándole
como parámetro la opción “traerCiudades”.
*/


namespace CLASE10
{
export function EnviarJSON():void
{


    let xhttp:XMLHttpRequest= new XMLHttpRequest();

    let form : FormData = new FormData();
    form.append('op', "traerCiudades");



    xhttp.open("POST","administrarCiudades.php",true);

    xhttp.setRequestHeader("enctype", "multipart/form-data");


    xhttp.send(form);

    xhttp.onreadystatechange=()=>{
        //si esta todo bien entra al if
      if(xhttp.readyState==4 && xhttp.status==200)
      {   
        (<HTMLInputElement>document.getElementById("divTable")).innerHTML=xhttp.responseText;
      }

    }
}

}