
///<reference path="./Televisor.ts"/>


namespace PrimerParcial
{
    export class Manejadora
    {

        /*
        AgregarTelevisor. Tomará los distintos valores desde la página index.html (incluida la foto), creará un
        objeto de tipo Televisor, que se enviará (por AJAX) junto al parámetro caso (con valor “agregar”),
        hacia “./BACKEND/adminstrar.php”. En esta página se guardará al televisor en el archivo
        “./BACKEND/televisores.json” y la foto en “./BACKEND/fotos”.
        */


       public static AgregarTelevisor():void
        {
            let xhr : XMLHttpRequest = new XMLHttpRequest();

            //recupero datos
            let codigo : string =(<HTMLInputElement> document.getElementById("codigo")).value;
            let marca : string =(<HTMLInputElement> document.getElementById("marca")).value;
            let precio : string =(<HTMLInputElement> document.getElementById("precio")).value;
            let tipo : string =(<HTMLInputElement> document.getElementById("tipo")).value;
            let pais : string = (<HTMLSelectElement> document.getElementById("pais")).value; 

            //recupero imagen y path de la imagen para crear el objeto de tipo Televisor
            let foto : any = (<HTMLInputElement> document.getElementById("foto"));
            let path : string = (<HTMLInputElement> document.getElementById("foto")).value;
            let pathFoto : string = (path.split('\\'))[2];

            //Creo el objeto de tipo televisor
            let tele = new Entidades.Televisor(parseInt(codigo) ,marca,parseFloat(precio) ,tipo,pais,pathFoto);

            let form : FormData = new FormData();

            form.append('foto',foto.files[0]);
            form.append('cadenaJson',tele.ToJson());
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
                    }
                }
            };

        }


        /*
        MostrarTelevisores. Recuperará (por AJAX) todos los televisores del archivo .json (caso=”traer”) y
        generará un listado dinámico (en el FRONTEND) que mostrará toda la información de cada uno de los
        televisores (incluida la foto).
        */

       /* FORMA RECUPERANDO TABLA EN PHP
       
       public static MostrarTelevisor()
        {
            let xhr : XMLHttpRequest = new XMLHttpRequest();

            let form : FormData = new FormData();

            form.append('caso', "traer");


            xhr.open('POST', './BACKEND/administrar.php', true);

            xhr.setRequestHeader("enctype", "multipart/form-data");

            xhr.send(form);

            xhr.onreadystatechange = () => {

            if (xhr.readyState == 4 && xhr.status == 200) {
            //la tabla que recuperamos desde nexo.php la mostramos dentro de el "div"
            (<HTMLInputElement>document.getElementById("divTabla")).innerHTML=xhr.responseText;
            }
            };

        }
        */

       public static MostrarTelevisor()
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
             tabla+= "<td>Codigo</td>";
             tabla+= "<td>Marca</td>";
             tabla+= "<td>Precio</td>";
             tabla+= "<td>Tipo</td>";
             tabla+= "<td>Pais</td>";
             tabla+= "<td>Foto</td>";
             tabla+= "</tr>";
             tabla+= "</thead>";


            for(let i=0 ;i<arrayJson.length ;i++ )
            {          
                tabla+= "<tr>";

                tabla+= "<td>";
                tabla+= arrayJson[i].codigo;
                tabla+= "</td>";

                tabla+= "<td>";
                tabla+= arrayJson[i].marca;
                tabla+= "</td>";

                tabla+= "<td>";
                tabla+= arrayJson[i].precio;
                tabla+= "</td>";

                tabla+= "<td>";
                tabla+= arrayJson[i].tipo;
                tabla+= "</td>";

                tabla+= "<td>";
                tabla+= arrayJson[i].pais;
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

                tabla+="</td>";
                tabla+="</tr>"; 

            }
            tabla+="</table>";

           (<HTMLInputElement>document.getElementById("divTabla")).innerHTML=tabla;
           }
           };

       }

       /*
       GuardarEnLocalStorage. Recuperará (por AJAX) todos los televisores del archivo .json
       (caso=”traer”) y los guarda en el LocalStorage, con la clave “televisores_local_storage”.
       */

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
        localStorage.setItem("televisores_local_storage", xhr.responseText);

       }
      };
    }

    /*
    VerificarExistencia. Verifica que el televisor que se quiere agregar no exista. Para ello, comparará los
    códigos de los televisores guardados en el LocalStorage. Si el televisor existe, se mostrará (por
    consola y alert) lo acontecido. Caso contrario, agregará el nuevo televisor y se actualizará el
    LocalStorage (GuardarEnLocalStorage).
    */
    public static VerificarExistencia()
    {

        //recupero datos
        let codigo : string =(<HTMLInputElement> document.getElementById("codigo")).value;

        let flag=true;

        let arrayJson=JSON.parse(localStorage.getItem("televisores_local_storage"));


        for(let i= 0 ;i<arrayJson.length;i++)
        {
           if(arrayJson[i].codigo == codigo)
           {
               flag=false;
           }
        }

        if(flag==true)
        {
            Manejadora.AgregarTelevisor();
            Manejadora.GuardarEnLocalStorage();
        }
        else
        {
            console.log("El televisor ya existe");
            alert("El televisor ya existe");
        }

    }

    }

}