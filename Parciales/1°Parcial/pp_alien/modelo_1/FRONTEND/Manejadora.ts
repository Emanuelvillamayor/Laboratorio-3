
///<reference path="./Alien.ts"/>

namespace RecuperatorioPrimerParcial
{
    export class Manejadora
    {
        public static AgregarAlien()
        {
            let xhr : XMLHttpRequest = new XMLHttpRequest();

            //recupero datos
            let cuadrante : string =(<HTMLInputElement> document.getElementById("cuadrante")).value;
            let edad : string =(<HTMLInputElement> document.getElementById("edad")).value;
            let altura : string =(<HTMLInputElement> document.getElementById("altura")).value;
            let raza : string =(<HTMLInputElement> document.getElementById("raza")).value;
            let planeta : string = (<HTMLSelectElement> document.getElementById("cboPlaneta")).value; 

            //recupero imagen y path de la imagen para crear el objeto de tipo Alien
            let foto : any = (<HTMLInputElement> document.getElementById("foto"));
            let path : string = (<HTMLInputElement> document.getElementById("foto")).value;
            let pathFoto : string = (path.split('\\'))[2];

            //Creo el objeto de tipo Alien

            let Alien = new Entidades.Alien(cuadrante,parseInt(edad),parseFloat(altura),raza,planeta,pathFoto);

            let form : FormData = new FormData();

            form.append('foto',foto.files[0]);
            form.append('cadenaJson',Alien.ToJson());
            form.append('caso','agregar');

            xhr.open('POST', './BACKEND/administrar.php', true);
            xhr.setRequestHeader("enctype", "multipart/form-data");
            xhr.send(form);

            xhr.onreadystatechange = () => {

                if (xhr.readyState == 4 && xhr.status == 200) 
                {
                    let retJSON = JSON.parse(xhr.responseText);

                   // if(!retJSON.Ok)
                    if(!retJSON.TodoOK)
                    {
                        console.error("NO se subió la foto!!!");
                    }
                    else{
                        //si el atributo "Ok" es true , mostramos la foto subida pisando la que ya estaba por default
                        console.info("Foto subida OK!!!");
                        
                        //direccion de donde se encuentra la foto
                        let path :string="./BACKEND/fotos/"+pathFoto;
                        //hay que cambiar el "src" para que sepa donde buscar la foto 
                        (<HTMLImageElement> document.getElementById("imgFoto")).src = path;
                        console.log(path);

                        Manejadora.MostrarAliens();
                    }
                }
            };

            

        }

        public static MostrarAliens()
        {
            let xhr : XMLHttpRequest = new XMLHttpRequest();

            let form : FormData = new FormData();
 
            form.append('caso', "traer");
 
 
            xhr.open('POST', './BACKEND/administrar.php', true);
 
            xhr.setRequestHeader("enctype", "multipart/form-data");
 
            xhr.send(form);
 
            xhr.onreadystatechange = () => {
 
            if (xhr.readyState == 4 && xhr.status == 200) 
            {
                //recupero la cadena y convierto a array de json
              let arrayJson =JSON.parse(xhr.responseText) ;
 
              let tabla:string ="";
              tabla+= "<table border=1>";
              tabla+= "<thead>";
              tabla+= "<tr>";
              tabla+= "<td>Cuadrante</td>";
              tabla+= "<td>Edad</td>";
              tabla+= "<td>Altura</td>";
              tabla+= "<td>Raza</td>";
              tabla+= "<td>Planeta</td>";
              tabla+= "<td>Foto</td>";
              tabla+= "</tr>";
              tabla+= "</thead>";
 
 
             for(let i=0 ;i<arrayJson.length ;i++ )
             {          
                 tabla+= "<tr>";
 
                 tabla+= "<td>";
                 tabla+= arrayJson[i].cuadrante;
                 tabla+= "</td>";
 
                 tabla+= "<td>";
                 tabla+= arrayJson[i].edad;
                 tabla+= "</td>";
 
                 tabla+= "<td>";
                 tabla+= arrayJson[i].altura;
                 tabla+= "</td>";
 
                 tabla+= "<td>";
                 tabla+= arrayJson[i].raza;
                 tabla+= "</td>";
 
                 tabla+= "<td>";
                 tabla+= arrayJson[i].planetaOrigen;
                 tabla+= "</td>";
 
                 tabla+="<td>";
 
                 /*una forma
                 if(arrayJson[i].pathFoto !== "undefined") {
                     tabla+="<img src='./BACKEND/fotos/" + arrayJson[i].pathFoto + "' height=100 width=100 ></img>";
                 }
                 else {
                     tabla+="No hay foto";
                 }*/
 
                 //compruebo si existe la imagen
                 var img = new Image();
                 let path : string = arrayJson[i].pathFoto ; 
                 img.src ="./BACKEND/fotos/"+ path ; 
 
                 //if( img.height != 0)
                 //if(arrayJson[i].path !== "undefined")
                 //{
                     tabla+="<img src='./BACKEND/fotos/" + arrayJson[i].pathFoto + "' height=100 width=100 ></img>";
               //  }
                // else {
                //    tabla+="No hay foto";
              //   }
 
                let objJson :string= JSON.stringify(arrayJson[i]);
                 tabla+= "<td><input type='button' onclick='RecuperatorioPrimerParcial.Manejadora.EliminarAlien("+(objJson)+")' value='Eliminar'</td>";
                 tabla+= "<td><input type='button' onclick='RecuperatorioPrimerParcial.Manejadora.ModificarAlien("+(objJson)+")' value='Eliminar'</td>";

                 tabla+="</td>";


                 tabla+="</tr>"; 
 
             }
             tabla+="</table>";
 
            (<HTMLInputElement>document.getElementById("divTabla")).innerHTML=tabla;
            Manejadora.GuardarEnLocalStorage();
            }
            };
 
        }

        public static GuardarEnLocalStorage()
        {
            let xhr : XMLHttpRequest = new XMLHttpRequest();

            let form : FormData = new FormData();

            form.append('caso', "traer");


            xhr.open('POST', './BACKEND/administrar.php', true);

            xhr.setRequestHeader("enctype", "multipart/form-data");

            xhr.send(form);

            xhr.onreadystatechange = () => {

            if (xhr.readyState == 4 && xhr.status == 200) 
            {
                localStorage.setItem("aliens_local_storage", xhr.responseText);

            }
      };

        }


        public static VerificarExistencia()
        {
            //recupero datos
                let cuadrante : string =(<HTMLInputElement> document.getElementById("cuadrante")).value;

                let flag=true;

                let arrayJson=JSON.parse(localStorage.getItem("aliens_local_storage"));


                for(let i= 0 ;i<arrayJson.length;i++)
                {
                if(arrayJson[i].cuadrante == cuadrante)
                {
                    flag=false;
                }
                }

                if(flag==true)
                {
                    Manejadora.AgregarAlien();
                   
                }
                else
                {
                    console.log("El televisor ya existe");
                    alert("El televisor ya existe");
                }

       }


       /*
       public static ObtenerAliensPorCuadrante()
       {
         let arrayJson=JSON.parse(localStorage.getItem("aliens_local_storage"));

         for(let i=0;arrayJson.length;i++)
         {

         }
       }*/

       /*
       EliminarAlien. Eliminará al alien del archivo (por AJAX) y del LocalStorage. Recibe como parámetro al objeto
       JSON que se ha de eliminar. Pedir confirmación, mostrando cuadrante y raza, antes de eliminar. Refrescar el
       listado para visualizar los cambios.
       */
       public static EliminarAlien( cadenaJson :any)
       {

        if(confirm("Esta seguro que desea eliminar al ovni de cuadrante "+cadenaJson.cuadrante+ " y raza " + cadenaJson.raza ))
        {
         let xhr : XMLHttpRequest = new XMLHttpRequest();
     
         let form : FormData = new FormData();
     
         form.append('cadenaJson',JSON.stringify(cadenaJson));
     
         form.append('caso', "eliminar");
     
         xhr.open('POST', './BACKEND/administrar.php', true);
     
         xhr.setRequestHeader("enctype", "multipart/form-data");
     
         xhr.send(form);
     
         xhr.onreadystatechange = () => {
     
             if (xhr.readyState == 4 && xhr.status == 200) {
               //alert(xhr.responseText);
               console.log("alien eliminado");
               (<HTMLImageElement> document.getElementById("imgFoto")).src = "./BACKEND/fotos/alien_defecto.jpg";
               Manejadora.MostrarAliens();
         
             }
         };
        }
        else
        {
            alert("Accion cancelada");
        }
          
       }

       public static ModificarAlien(cadenaJson:any)
       {
           

       }
        
    }
}