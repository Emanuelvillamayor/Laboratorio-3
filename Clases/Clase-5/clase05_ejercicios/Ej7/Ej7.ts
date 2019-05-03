/*Aplicación Nº 7 (Leer un archivo .json)
Realizar una aplicación web que, a través de Ajax, lea el archivo auto.json desde la página
traerAuto.php y muestre el JSON recibido por alert() y en el console.log() */
namespace CLASE7
{
export function EnviarJSON():void
{
  //creo array de tipo JSON
    let productos:any =[{"codigoBarra":13232,"nombre":"ema","precio":27.22},
                      {"codigoBarra":201,"nombre":"lucas","precio":3.1}];

    //convierto ese array de tipo JSON  a string utilizando la funcion "stringify"
    //let params : string = "misProductos=" + JSON.stringify(productos);
    let params="";

    let xhttp:XMLHttpRequest= new XMLHttpRequest();

    xhttp.open("POST","Ej7.php",true);

    xhttp.setRequestHeader("content-type","application/x-www-form-urlencoded");


    xhttp.send(params);

    xhttp.onreadystatechange=()=>{
        //si esta todo bien entra al if
      if(xhttp.readyState==4 && xhttp.status==200)
      {   
         // con la funcion "parse" transformo un "string" de tipo JSON  a un "objet"o de tipo JSON
         let obj  = JSON.parse(xhttp.responseText);
         alert (JSON.stringify (obj));

      }

    }
}

}