/*Ejercicio 4:
Tomando como punto de partida el ejercicio anterior, enviar una colección de tres elementos
de tipo producto por Ajax (hacia la página mostrarColeccionJson.php) y mostrar lo
recibido con var_dump() y luego de transformarlo en un objeto standard de PHP, mostrar
todos los atributos de todos los objetos.
*/

namespace CLASE4
{
export function EnviarJSON():void
{
    let productos:any =[{"codigoBarra":13232,"nombre":"ema","precio":27.22},
                      {"codigoBarra":201,"nombre":"lucas","precio":3.1}];

    let params : string = "misProductos=" + JSON.stringify(productos);

    let xhttp:XMLHttpRequest= new XMLHttpRequest();

    xhttp.open("POST","mostrarJson4.php",true);

    xhttp.setRequestHeader("content-type","application/x-www-form-urlencoded");


    xhttp.send(params);

    xhttp.onreadystatechange=()=>{
        //si esta todo bien entra al if
      if(xhttp.readyState==4 && xhttp.status==200)
      {
       /*
          alert(xhttp.responseText);
          console.log(xhttp.responseText);
          */
         let obj  = JSON.parse(xhttp.responseText);
         alert(obj.Id);

      }

    }
}

}
