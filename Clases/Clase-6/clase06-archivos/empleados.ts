//ese metodo se va a ejecutar cada vez que se carge la ventana
window.onload = function(){

    MostrarListado();

}

function MostrarListado(){

let xhr : XMLHttpRequest = new XMLHttpRequest();

let form : FormData = new FormData();

form.append('op', "mostrarListado");


xhr.open('POST', './BACKEND/nexo.php', true);

xhr.setRequestHeader("enctype", "multipart/form-data");

xhr.send(form);

xhr.onreadystatechange = () => {

    if (xhr.readyState == 4 && xhr.status == 200) {
        //la tabla que recuperamos desde nexo.php la mostramos dentro de el "div"
       (<HTMLInputElement>document.getElementById("div")).innerHTML=xhr.responseText;
    }
};

}



function SubirFoto() : void {
    
    //INSTANCIO OBJETO PARA REALIZAR COMUNICACIONES ASINCRONICAS
    let xhr : XMLHttpRequest = new XMLHttpRequest();

    //RECUPERO LA IMAGEN SELECCIONADA POR EL USUARIO
    let foto : any = (<HTMLInputElement> document.getElementById("fileFoto"));

    let nombre : string =(<HTMLInputElement> document.getElementById("txtNombre")).value;
    let apellido : string =(<HTMLInputElement> document.getElementById("txtApellido")).value;
    let legajo : string =(<HTMLInputElement> document.getElementById("numLegajo")).value;
    let sueldo : string =(<HTMLInputElement> document.getElementById("numSueldo")).value;
    //INSTANCIO OBJETO FORMDATA
    let form : FormData = new FormData();

    //AGREGO PARAMETROS AL FORMDATA:

    //PARAMETRO RECUPERADO POR $_FILES
    form.append('foto', foto.files[0]);
    form.append('txtNombre',nombre);
    form.append('txtApellido',apellido);
    form.append('numLegajo',legajo);
    form.append('numSueldo',sueldo);

    //PARAMETRO RECUPERADO POR $_POST O $_GET (SEGUN CORRESPONDA)
    form.append('op', "subirFoto");

    //METODO; URL; ASINCRONICO?
    xhr.open('POST', './BACKEND/nexo.php', true);

    //ESTABLEZCO EL ENCABEZADO DE LA PETICION
    xhr.setRequestHeader("enctype", "multipart/form-data");

    //ENVIO DE LA PETICION
    xhr.send(form);

    //FUNCION CALLBACK
    xhr.onreadystatechange = () => {

        if (xhr.readyState == 4 && xhr.status == 200) {

            //recupero el objeto de tipo JSON en formato cadena que nos devuelve nexo.php
            let retJSON = JSON.parse(xhr.responseText);

            //si el atributo "Ok" es falso , mostramos que la foto no se subio
            if(!retJSON.Ok){
                console.error("NO se subió la foto!!!");
            }
            else{
                //si el atributo "Ok" es true , mostramos la foto subida pisando la que ya estaba por default
                console.info("Foto subida OK!!!");
                
                //direccion de donde se encuentra la foto
                let path :string="./BACKEND/"+retJSON.Path;
                //hay que cambiar el "src" para que sepa donde buscar la foto 
                (<HTMLImageElement> document.getElementById("imgFoto")).src = path;
                console.log(retJSON.Path);
            }
            //le damos a refresacr el listado para que aparezca el nuevo usuario agregado a la lista
            MostrarListado();
        }
    };
}

//ya viene creado el objeto de tipo JSON
function Eliminar(empleado:any)
{
   let objEmp :any = JSON.parse(empleado);
   let datosEmpleado= objEmp.legajo;

   if(confirm("Esta seguro que desea eliminar al empleado:" +datosEmpleado))
   {
    let xhr : XMLHttpRequest = new XMLHttpRequest();

    let form : FormData = new FormData();

    form.append('obj',empleado);

    form.append('op', "Eliminar");

    xhr.open('POST', './BACKEND/nexo.php', true);

    xhr.setRequestHeader("enctype", "multipart/form-data");

    xhr.send(form);

    xhr.onreadystatechange = () => {

        if (xhr.readyState == 4 && xhr.status == 200) {
          alert(xhr.responseText);
          MostrarListado();
        }
    };
   }
   else
   {
       alert("Accion cancelada");
   }
   MostrarListado();
}