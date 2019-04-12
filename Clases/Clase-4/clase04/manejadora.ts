namespace AJAX
{
    export function Saludar()
    {
      let xhttp:XMLHttpRequest= new XMLHttpRequest();
        
      xhttp.open("POST","administrar.php",true);

      //envio los datos a administrador.php
      xhttp.send();


      xhttp.onreadystatechange=()=>{
          //si esta todo bien entra al if
        if(xhttp.readyState==4 && xhttp.status==200)
        {
            //let nombre:string = (<HTMLInputElement>document.getElementById("txtNombre")).value;
      
            //el "responseText" me devuelve lo que php mostraria
            alert(xhttp.responseText);
            console.log(xhttp.responseText);
            (<HTMLInputElement>document.getElementById("div_mostrar")).innerHTML=xhttp.responseText;
        }

      }


    }


    //POST
    export function Ingresar()
    {
      let xhttp:XMLHttpRequest= new XMLHttpRequest();

      let nombre:string = (<HTMLInputElement>document.getElementById("txtNombre")).value;
        
      xhttp.open("POST","administrar.php",true);

      xhttp.setRequestHeader("content-type","application/x-www-form-urlencoded")

      //envio los datos a administrador.php
      //accion es un parametro que nosotros hardcodeamos y que no exist en html
      //el nombre "txtNombre" no hace falta que sea el mismo del input del index.html ya que al enviarselo
      //desde typescript a php , le podemos cambiar la CLAVE pero no el Valor , en esto caso cambio la clave a "tsNombre"
      //y desde el $_POST le paso el "tsNombre"

      //Ejercicio 3:verificar( )action4
      let verifico:Boolean =Verificar(nombre);
      console.log(verifico);
      if(verifico==false ) 
      {
        xhttp.send("tsNombre="+nombre+"&accion="+2 );


        xhttp.onreadystatechange=()=>{
            //si esta todo bien entra al if
          if(xhttp.readyState==4 && xhttp.status==200)
          {
              //el "responseText" me devuelve lo que php mostraria
              /*Ejeercicio1
              alert(xhttp.responseText);
              console.log(xhttp.responseText);
              (<HTMLInputElement>document.getElementById("div_mostrar")).innerHTML=xhttp.responseText;
              */
  
              //Ejercicio2 accion =2
  
              if(xhttp.responseText==="1")
              {
                Mostrar();
              }
              else
              {
                alert("Error al guardar");
              }
          }
  
        }

      }
      else 
      {
        alert("El nombre ya esta cargado");
      }
     

    }


    export function Mostrar()
    {
      let xhttp:XMLHttpRequest= new XMLHttpRequest();

      let nombre:string = (<HTMLInputElement>document.getElementById("txtNombre")).value;
        
      xhttp.open("POST","administrar.php",true);

      xhttp.setRequestHeader("content-type","application/x-www-form-urlencoded")

      xhttp.send("tsNombre="+nombre+"&accion="+3 );

      xhttp.onreadystatechange=()=>
      {
          //si esta todo bien entra al if
        if(xhttp.readyState==4 && xhttp.status==200)
        {
          (<HTMLInputElement>document.getElementById("div_mostrar")).innerHTML=xhttp.responseText;
        }
      }
    }

    export function Verificar(nombre:string):boolean
    {
      let xhttp:XMLHttpRequest= new XMLHttpRequest();
     
      let retorno:boolean=false;
        
      xhttp.open("POST","administrar.php",true);

      xhttp.setRequestHeader("content-type","application/x-www-form-urlencoded")

      xhttp.send("tsNombre="+nombre+"&accion="+4 );

      xhttp.onreadystatechange=()=>
      {
          //si esta todo bien entra al if
        if(xhttp.readyState==4 && xhttp.status==200)
        {
          console.log(xhttp.responseText);
          if(xhttp.responseText=="1")
          {
            console.log("entra");
            retorno=true;
          }
        }
      }

     return retorno;
    }
}