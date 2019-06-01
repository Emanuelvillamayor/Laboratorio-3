
///<reference path = "./entidades.ts" />
namespace Test 
{
    
    export class Manejadora
    {
        public static AgregarCiudadanos() : void
        {
           let nombre = (<HTMLInputElement>document.getElementById("txtNombre")).value;
           let apellido = (<HTMLInputElement>document.getElementById("txtApellido")).value;
           let edad = (<HTMLInputElement>document.getElementById("txtEdad")).value;
           let dni = (<HTMLInputElement>document.getElementById("txtDni")).value;
           let nac = (<HTMLSelectElement>document.getElementById("cboPais")).value;

           let miCiudadano : Entidades.Ciudadano = new Entidades.Ciudadano(nombre,apellido,Number(edad),nac,Number(dni));

           let xhttp = new XMLHttpRequest();
           xhttp.open("POST","./BACKEND/nexo.php",true);
           xhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
           xhttp.send("accion=agregar&obJSON=" + JSON.stringify(miCiudadano));

           xhttp.onreadystatechange =()=>
           {
               if(xhttp.status == 200 && xhttp.readyState == 4)
               {
                   console.log(xhttp.responseText);
                   if(xhttp.responseText == "1")
                   {
                       alert("Ciudadano agregado....");
                       Manejadora.MostrarCiudadanos("mostrar");
                   }
               }
           }


        }
        public static MostrarCiudadanos(accion:string):void
        {
            let xhttp = new XMLHttpRequest();
            xhttp.open("POST","./BACKEND/nexo.php",true);
            xhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            if(accion == "mostrar")
            {
              xhttp.send("accion=" + accion);
              xhttp.onreadystatechange=()=>{
                if(xhttp.status == 200 && xhttp.readyState == 4)
                {
                    (<HTMLDivElement>document.getElementById("divTabla")).innerHTML = xhttp.responseText;
                }
              }
            }
            else if(accion == "filtrar")
            {
                let nac = (<HTMLSelectElement>document.getElementById("cboPais")).value;
                xhttp.send("accion=" + accion + "&pais=" + nac);
                xhttp.onreadystatechange=()=>{
                  if(xhttp.status == 200 && xhttp.readyState == 4)
                  {
                    (<HTMLDivElement>document.getElementById("divTabla")).innerHTML = xhttp.responseText;
                  } 
                }
            }
        }
        public static EliminarCiudadanos(obJSON : any):void
        {
            if(confirm("Desea eliminar al ciudadano " + obJSON._nombre + " " + obJSON._apellido + "?"))
            {
               let xhttp = new XMLHttpRequest();
               xhttp.open("POST","./BACKEND/nexo.php",true);
               xhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
               xhttp.send("accion=eliminar&obJSON=" + JSON.stringify(obJSON));

                xhttp.onreadystatechange=()=>{
                   if(xhttp.status == 200 && xhttp.readyState == 4)
                   {
                      if(xhttp.responseText == "1")
                      {
                          alert("Se ha eliminado al ciudadano " + obJSON._nombre + " " + obJSON._apellido);
                          Manejadora.MostrarCiudadanos("mostrar");
                      }
                   }
                }
            
            }
            else
            {
                alert("Accion cancelada....");
            }
        }
        public static ObtenerCiudadano(obJSON:any):void
        {
            (<HTMLInputElement>document.getElementById("txtNombre")).value = obJSON._nombre;
            (<HTMLInputElement>document.getElementById("txtApellido")).value = obJSON._apellido;
            (<HTMLInputElement>document.getElementById("txtDni")).value = obJSON._dni;
            (<HTMLInputElement>document.getElementById("txtDni")).disabled = true;
            (<HTMLInputElement>document.getElementById("txtEdad")).value = obJSON._edad;
            (<HTMLSelectElement>document.getElementById("cboPais")).value = obJSON._nacionalidad;

            (<HTMLButtonElement>document.getElementById("btnCargar")).value = "Modificar";
            (<HTMLButtonElement>document.getElementById("btnCargar")).setAttribute("onclick","Test.Manejadora.ModificarCiudadanos()");
        }
        public static ModificarCiudadanos():void
        {
            if(confirm("Desea guardar los cambios?"))
            {
                let nombre = (<HTMLInputElement>document.getElementById("txtNombre")).value;
                let apellido = (<HTMLInputElement>document.getElementById("txtApellido")).value;
                let edad = (<HTMLInputElement>document.getElementById("txtEdad")).value;
                let dni = (<HTMLInputElement>document.getElementById("txtDni")).value;
                let nac = (<HTMLSelectElement>document.getElementById("cboPais")).value;

                let miCiudadano : Entidades.Ciudadano = new Entidades.Ciudadano(nombre,apellido,Number(edad),nac,Number(dni));

                let xhttp = new XMLHttpRequest();
                xhttp.open("POST","./BACKEND/nexo.php",true);
                xhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
                xhttp.send("accion=modificar&obJSON=" + JSON.stringify(miCiudadano));

                xhttp.onreadystatechange =()=>
                {
                  if(xhttp.status == 200 && xhttp.readyState == 4)
                  {
                    console.log(xhttp.responseText);
                    if(xhttp.responseText == "1")
                    {
                       alert("Ciudadano modificado con exito....");
                       Manejadora.MostrarCiudadanos("mostrar");

                    }
                  }
                }
            }
            else
            {
                alert("Acción cancelada...");
            }
            (<HTMLButtonElement>document.getElementById("btnCargar")).value = "Agregar";
            (<HTMLButtonElement>document.getElementById("btnCargar")).setAttribute("onclick","Test.Manejadora.AgregarCiudadanos()");
            (<HTMLInputElement>document.getElementById("txtDni")).disabled = false;
        }
        public static CargarPaises():void
        {
            let cboPais = (<HTMLSelectElement>document.getElementById("cboPais"));
            cboPais.innerHTML = "";


            /*let txt = document.createTextNode("España");
            let pais = document.createElement("option");
            pais.appendChild(txt);
            cboPais.appendChild(pais);*/

            let xhttp = new XMLHttpRequest();
            xhttp.open("POST","./BACKEND/nexo.php",true);
            xhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            xhttp.send("accion=paises");

            xhttp.onreadystatechange = ()=>{
                if(xhttp.status == 200 && xhttp.readyState == 4)
                {
                  console.log(xhttp.responseText); 
                  let obJSON  = JSON.parse(xhttp.responseText);

                   obJSON.forEach((pais : any) => {
                    
                     let txt = document.createTextNode(pais.descripcion);
                     let option = document.createElement("option");
                     option.appendChild(txt);
                     cboPais.appendChild(option);
                  });
                }
            }
        }
    }
}