///<reference path="Campera.ts"/>

namespace Test 
{
    /*
    1- AgregarCampera. Tomará los distintos valores desde la página index.html, creará
    un objeto de tipo Campera, que se enviará (por AJAX) junto al parámetro caso
    (con valor “agregar”), hacia “./BACKEND/adminstrar.php”. En esta página se
    guardará al ciudadano en el archivo “./BACKEND/camperas.json”.
    */
    export class Manejadora
    {
        /*
        AgregarCampera. Tomará los distintos valores desde la página index.html, creará
        un objeto de tipo Campera, que se enviará (por AJAX) junto al parámetro caso
        (con valor “agregar”), hacia “./BACKEND/adminstrar.php”. En esta página se
        guardará al ciudadano en el archivo “./BACKEND/camperas.json”.
        */
        public static AgregarCampera():void
        {
            let xhr : XMLHttpRequest = new XMLHttpRequest();

            //recupero datos
            let codigo : string =(<HTMLInputElement> document.getElementById("txtCodigo")).value;
            let nombre : string =(<HTMLInputElement> document.getElementById("txtNombre")).value;
            let precio : string =(<HTMLInputElement> document.getElementById("txtPrecio")).value;
            let talle : string =(<HTMLInputElement> document.getElementById("txtTalle")).value;
            let color : string = (<HTMLSelectElement> document.getElementById("cboColor")).value; 

            Manejadora.SubirFoto(codigo);
           let path:string=(<HTMLImageElement>document.getElementById("imgFoto")).src;


            //Creo el objeto de tipo televisor
            let tele = new Entidades.Campera(parseInt(codigo) ,nombre,parseFloat(precio) ,talle,color,path);

            let form : FormData = new FormData();

            let caso:string="";

           // form.append('foto',foto.files[0]);
            form.append('cadenaJson',tele.ToJson());
            if(localStorage.getItem("modificar")=="true")
            {
                caso="modificar";
            }
            else
            {
                caso="agregar";
            }
            form.append('caso',caso);

            xhr.open('POST', './BACKEND/administrar.php', true);
            xhr.setRequestHeader("enctype", "multipart/form-data");
            xhr.send(form);

            xhr.onreadystatechange = () => {

                if (xhr.readyState == 4 && xhr.status == 200) 
                {
                    Manejadora.AdministrarSpinner(false);
                    localStorage.clear();
                    (<HTMLInputElement> document.getElementById("btnAgregar")).value = "Agregar";
                    let retJSON = JSON.parse(xhr.responseText);

                   // if(!retJSON.Ok)
                    if(!retJSON.TodoOK)
                    {
                        console.error("NO se subió la foto!!!");
                    }
                    else{
                        //si el atributo "Ok" es true , mostramos la foto subida pisando la que ya estaba por default
                       // console.info("Foto subida OK!!!");
                        
                        //direccion de donde se encuentra la foto
                        //let path :string="./BACKEND/fotos/"+path;
                        //hay que cambiar el "src" para que sepa donde buscar la foto 
                        //(<HTMLImageElement> document.getElementById("imgFoto")).src = path;
                        //console.log(path);
                        console.log("Campera agregada");
                    }
                    
                }
                else
                {
                    Manejadora.AdministrarSpinner(true);
                }
            };
            Manejadora.LimpiarForm();

        }

        public static MostrarCamperas()
        {
            let xhr : XMLHttpRequest = new XMLHttpRequest();

           let form : FormData = new FormData();

           form.append('caso', "mostrar");


           xhr.open('POST', './BACKEND/administrar.php', true);

           xhr.setRequestHeader("enctype", "multipart/form-data");

           xhr.send(form);

           xhr.onreadystatechange = () => {

           if (xhr.readyState == 4 && xhr.status == 200) 
           {
            Manejadora.AdministrarSpinner(false);
               //recupero la cadena y convierto a array de json
             let arrayJson =JSON.parse(xhr.responseText) ;

             let tabla:string ="";
             tabla+= "<table border=1>";
             tabla+= "<thead>";
             tabla+= "<tr>";
             tabla+= "<td>Codigo</td>";
             tabla+= "<td>Nombre</td>";
             tabla+= "<td>Precio</td>";
             tabla+= "<td>Talle</td>";
             tabla+= "<td>Color</td>";
             tabla+="<td>Eliminar</td>";
             tabla+="<td>Modificar</td>"
             //tabla+= "<td>Foto</td>";
             tabla+= "</tr>";
             tabla+= "</thead>";


            for(let i=0 ;i<arrayJson.length ;i++ )
            {          
                tabla+= "<tr>";

                tabla+= "<td>";
                tabla+= arrayJson[i].codigo;
                tabla+= "</td>";

                tabla+= "<td>";
                tabla+= arrayJson[i].nombre;
                tabla+= "</td>";

                tabla+= "<td>";
                tabla+= arrayJson[i].precio;
                tabla+= "</td>";

                tabla+= "<td>";
                tabla+= arrayJson[i].talle;
                tabla+= "</td>";

                tabla+= "<td>";
                tabla+= arrayJson[i].color;
                tabla+= "</td>";

              //  tabla+="<td>";

                /*una forma
                if(arrayJson[i].pathFoto !== "undefined") {
                    tabla+="<img src='./BACKEND/fotos/" + arrayJson[i].pathFoto + "' height=100 width=100 ></img>";
                }
                else {
                    tabla+="No hay foto";
                }*/

                //compruebo si existe la imagen
              //  var img = new Image();
               // let path : string = arrayJson[i].pathFoto ; 
               // img.src ="./BACKEND/fotos/"+ path ; 

                //if( img.height != 0)
                //if(arrayJson[i].path !== "undefined")
                //{
                //    tabla+="<img src='./BACKEND/fotos/" + arrayJson[i].pathFoto + "' height=100 width=100 ></img>";
              //  }
               // else {
               //    tabla+="No hay foto";
             //   }

             //  tabla+="</td>";

             let objJson :string= JSON.stringify(arrayJson[i]);
             tabla+= "<td><input type='button' onclick='Test.Manejadora.EliminarCampera("+(objJson)+")' value='Eliminar'</td>";
             tabla+= "<td><input type='button' onclick='Test.Manejadora.ModificarCampera("+(objJson)+")' value='Modificar'</td>";


                tabla+="</tr>"; 

            }
            tabla+="</table>";

           (<HTMLInputElement>document.getElementById("divTabla")).innerHTML=tabla;
           }
           else
           {
            Manejadora.AdministrarSpinner(true);
           }
           };

        }


        /*
        EliminarCampera. Eliminará a la campera del archivo (por AJAX)
        (caso=”eliminar”). Recibe como parámetro al objeto JSON que se ha de eliminar.
        Pedir confirmación, mostrando código y talle, antes de eliminar. Refrescar el
        listado para visualizar los cambios.
        */
        public static EliminarCampera(objJson:any)
        {
            if(confirm("Esta seguro que desea eliminar a la campera de codigo "+objJson.codigo+ " y talle " + objJson.talle ))
            {
             let xhr : XMLHttpRequest = new XMLHttpRequest();
         
             let form : FormData = new FormData();
         
             form.append('cadenaJson',JSON.stringify(objJson));
         
             form.append('caso', "eliminar");
         
             xhr.open('POST', './BACKEND/administrar.php', true);
         
             xhr.setRequestHeader("enctype", "multipart/form-data");
         
             xhr.send(form);
         
             xhr.onreadystatechange = () => {
         
                 if (xhr.readyState == 4 && xhr.status == 200) {

                    Manejadora.AdministrarSpinner(false);
                   Manejadora.MostrarCamperas();
             
                 }
                 else
                 {
                    Manejadora.AdministrarSpinner(true);
                 }
             };
            }
            else
            {
                alert("Accion cancelada");
            }
              
        }

        /*
        ModificarCampera. Mostrará todos los datos de la campera que recibe por
        parámetro (objeto JSON), en el formulario. Permitirá modificar cualquier campo, a
        excepción del código.
        Modificar el método AgregarCampera para cambiar el caso de “agregar” a
        “modificar”, según corresponda.
        */
        public static ModificarCampera(objJson :any)
        {
            let codigo : string =(<HTMLInputElement> document.getElementById("txtCodigo")).value =objJson.codigo;
            (<HTMLInputElement> document.getElementById("txtCodigo")).disabled=true;
            let nombre : string =(<HTMLInputElement> document.getElementById("txtNombre")).value=objJson.nombre;
            let precio : string =(<HTMLInputElement> document.getElementById("txtPrecio")).value=objJson.precio;
            let talle : string =(<HTMLInputElement> document.getElementById("txtTalle")).value=objJson.talle;
            let color : string = (<HTMLSelectElement> document.getElementById("cboColor")).value=objJson.color; 

            (<HTMLInputElement> document.getElementById("btnAgregar")).value ="Modificar";

            localStorage.setItem("modificar","true");
        }

        /*
        FiltrarCamperasPorColor. Mostrará (por AJAX) (caso=”mostrar”) un listado
        dinámico (en el FRONTEND) de todas las camperas según el color seleccionado
        en el combo (cboColor).
        */

        public static FiltrarCamperasPorColor()
        {
            let xhr : XMLHttpRequest = new XMLHttpRequest();

            let form : FormData = new FormData();
 
            form.append('caso', "mostrar");
 
 
            xhr.open('POST', './BACKEND/administrar.php', true);
 
            xhr.setRequestHeader("enctype", "multipart/form-data");
 
            xhr.send(form);
 
            xhr.onreadystatechange = () => {
 
            if (xhr.readyState == 4 && xhr.status == 200) 
            {
                //recupero la cadena y convierto a array de json
                Manejadora.AdministrarSpinner(false);
                let arrayJson =JSON.parse(xhr.responseText) ;

                let tabla:string ="";
                tabla+= "<table border=1>";
                tabla+= "<thead>";
                tabla+= "<tr>";
                tabla+= "<td>Codigo</td>";
                tabla+= "<td>Nombre</td>";
                tabla+= "<td>Precio</td>";
                tabla+= "<td>Talle</td>";
                tabla+= "<td>Color</td>";
                tabla+="<td>Eliminar</td>";
                tabla+="<td>Modificar</td>"
                //tabla+= "<td>Foto</td>";
                tabla+= "</tr>";
                tabla+= "</thead>";

                let arrayJsonFiltrado=[];
                let cboColor:string = (<HTMLSelectElement> document.getElementById("cboColor")).value; 

                for(let j=0;j<arrayJson.length;j++)
                {
                    if(arrayJson[j].color==cboColor)
                    {
                        arrayJsonFiltrado.push(arrayJson[j]);
                    }

                }


                for(let i=0 ;i<arrayJsonFiltrado.length ;i++ )
                {          
                    tabla+= "<tr>";

                    tabla+= "<td>";
                    tabla+= arrayJsonFiltrado[i].codigo;
                    tabla+= "</td>";

                    tabla+= "<td>";
                    tabla+= arrayJsonFiltrado[i].nombre;
                    tabla+= "</td>";

                    tabla+= "<td>";
                    tabla+= arrayJsonFiltrado[i].precio;
                    tabla+= "</td>";

                    tabla+= "<td>";
                    tabla+= arrayJsonFiltrado[i].talle;
                    tabla+= "</td>";

                    tabla+= "<td>";
                    tabla+= arrayJsonFiltrado[i].color;
                    tabla+= "</td>";

                    //  tabla+="<td>";

                    /*una forma
                    if(arrayJson[i].pathFoto !== "undefined") {
                        tabla+="<img src='./BACKEND/fotos/" + arrayJson[i].pathFoto + "' height=100 width=100 ></img>";
                    }
                    else {
                        tabla+="No hay foto";
                    }*/

                    //compruebo si existe la imagen
                    //  var img = new Image();
                    // let path : string = arrayJson[i].pathFoto ; 
                    // img.src ="./BACKEND/fotos/"+ path ; 

                    //if( img.height != 0)
                    //if(arrayJson[i].path !== "undefined")
                    //{
                    //    tabla+="<img src='./BACKEND/fotos/" + arrayJson[i].pathFoto + "' height=100 width=100 ></img>";
                    //  }
                    // else {
                    //    tabla+="No hay foto";
                    //   }

                    //  tabla+="</td>";

                    let objJson :string= JSON.stringify(arrayJsonFiltrado[i]);
                    tabla+= "<td><input type='button' onclick='Test.Manejadora.EliminarCampera("+(objJson)+")' value='Eliminar'</td>";
                    tabla+= "<td><input type='button' onclick='Test.Manejadora.ModificarCampera("+(objJson)+")' value='Modificar'</td>";


                    tabla+="</tr>"; 

                }
                    tabla+="</table>";

                    (<HTMLInputElement>document.getElementById("divTabla")).innerHTML=tabla;
                
            }
            else
            {
                Manejadora.AdministrarSpinner(true);
            }
        };

        }


        public static CargarColoresJSON()
        {
            let xhr : XMLHttpRequest = new XMLHttpRequest();


            let form : FormData = new FormData();

            form.append('caso','colores');

            let cboColor = (<HTMLSelectElement>document.getElementById('cboColor'));
            cboColor.innerHTML = "";

            xhr.open('POST', './BACKEND/administrar.php', true);
            xhr.setRequestHeader("enctype", "multipart/form-data");
            xhr.send(form);


            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    Manejadora.AdministrarSpinner(false);
                    let jsonColores = JSON.parse(xhr.responseText);
                    for(let i=0;i<jsonColores.length;i++)
                    {
                        cboColor.innerHTML += `<option id='${jsonColores[i].id}'>${jsonColores[i].descripcion}</option>`;
                    }
                }
                else
                {
                    Manejadora.AdministrarSpinner(true);
                }
            };
            Manejadora.LimpiarForm();

        }

        public static LimpiarForm() 
        {
            (<HTMLInputElement>document.getElementById('txtCodigo')).value = "";
            (<HTMLInputElement>document.getElementById('txtNombre')).value = "";
            (<HTMLInputElement>document.getElementById('txtPrecio')).value = "";
            (<HTMLInputElement>document.getElementById('txtTalle')).value = "";

            (<HTMLSelectElement>document.getElementById('cboColor')).selectedIndex = 0;
        }

        /*AdministrarSpinner. Este método mostrará u ocultará el archivo
        “./BACKEND/gif-load.gif”, de acuerdo al parámetro booleano que recibe como
        parámetro. Aplicar la llamada de este método en cada acción que invoque a un
        AJAX
        */
        public  static AdministrarSpinner(flag: Boolean)
        {
            setTimeout(() => 
            {
                if (!flag) 
                {
                    (<HTMLImageElement>document.getElementById('imgSpinner')).setAttribute('src', '');
                }
            }, 1000);
            if (flag)
                (<HTMLImageElement>document.getElementById('imgSpinner')).setAttribute('src', './BACKEND/gif-load.gif');

        }

        public static SubirFoto(codigo: string) {

            let xhr: XMLHttpRequest = new XMLHttpRequest();

            let foto: any = (<HTMLInputElement>document.getElementById("idFoto"));

            let form: FormData = new FormData();

            form.append('foto', foto.files[0]);

            form.append('caso', "subirFoto");
            form.append('codigo', codigo);
            xhr.open('POST', './BACKEND/administrar.php', true);

            xhr.setRequestHeader("enctype", "multipart/form-data");

            xhr.send(form);

            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4 && xhr.status == 200) {

                    console.log(xhr.responseText);
                    let retJSON = JSON.parse(xhr.responseText);
                    if (!retJSON.Ok) {
                        console.error("NO se subió la foto!!!");
                    }
                    else {
                        console.info("Foto subida OK!!!");
                        (<HTMLImageElement>document.getElementById("imgFoto")).src = "./BACKEND/" + retJSON.Path;

                    }
                }

            };

        }

        public static ModificarFoto(codigo: string) 
        {
            let xhr: XMLHttpRequest = new XMLHttpRequest();

            let form: FormData = new FormData();

            form.append('caso', "modificarFoto");
            form.append('codigo', codigo);
            xhr.open('POST', './BACKEND/administrar.php', true);

            xhr.setRequestHeader("enctype", "multipart/form-data");

            xhr.send(form);

            let xhttp: XMLHttpRequest = new XMLHttpRequest();

            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    console.log(xhttp.responseText);

                    let retJSON = JSON.parse(xhttp.responseText);
                    if (!retJSON.Ok) {
                        console.error("NO se subió la foto!!!");
                    }
                    else {
                        console.info("Foto subida OK!!!");
                        (<HTMLImageElement>document.getElementById("imgFoto")).src = "./BACKEND/" + retJSON.Path;
                        Manejadora._path = "./BACKEND/" + retJSON.Path;
                    }
                }
            }
        }

    }
}