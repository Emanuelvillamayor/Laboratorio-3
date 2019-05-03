/*
Aplicación Nº 5 (Recibir Json por Ajax)
Diseñar una aplicación que reciba por Ajax un producto desde la página recibirJson.php.
Crear una instancia de stdClass y asignarle los atributos y valores correspondientes.
Desde javascript, mostrar el valor recibido utilizando la función alert() y en el console.log() 
*/

namespace CLASE5
{
export function EnviarJSON():void
{
  //creo array de tipo JSON
    let productos:any =[{"codigoBarra":13232,"nombre":"ema","precio":27.22},
                      {"codigoBarra":201,"nombre":"lucas","precio":3.1}];

    //convierto ese array de tipo JSON  a string utilizando la funcion "stringify"
    let params : string = "misProductos=" + JSON.stringify(productos);

    let xhttp:XMLHttpRequest= new XMLHttpRequest();

    xhttp.open("POST","Ej5.php",true);

    xhttp.setRequestHeader("content-type","application/x-www-form-urlencoded");


    xhttp.send(params);

    xhttp.onreadystatechange=()=>{
        //si esta todo bien entra al if
      if(xhttp.readyState==4 && xhttp.status==200)
      {
          
         // con la funcion "parse" transformo un "string" de tipo JSON  a un "objeto" de tipo JSON
         let obj :any = JSON.parse(xhttp.responseText);
         alert(xhttp.responseText);

         for(let i=0;i<obj.length;i++)
         {

            alert("Producto numero "+(i+1)+"\n"+ "Codigo barra: " + obj[i].codigoBarra + "  Nombre: "+ obj[i].nombre+ "  Precio: " + obj[i].precio+"\n");
         }
         

      }

    }
}

}