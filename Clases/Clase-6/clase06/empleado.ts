window.onload = function(){

    MostrarListado();

}

function MostrarListado(){

    //INSTANCIO OBJETO PARA REALIZAR COMUNICACIONES ASINCRONICAS
let xhr : XMLHttpRequest = new XMLHttpRequest();

//INSTANCIO OBJETO FORMDATA
let form : FormData = new FormData();


//PARAMETRO RECUPERADO POR $_POST O $_GET (SEGUN CORRESPONDA)
form.append('op', "mostrarListado");

//METODO; URL; ASINCRONICO?
xhr.open('POST', './admin.php', true);

//ESTABLEZCO EL ENCABEZADO DE LA PETICION
xhr.setRequestHeader("enctype", "multipart/form-data");

//ENVIO DE LA PETICION
xhr.send(form);

//FUNCION CALLBACK
xhr.onreadystatechange = () => {

    if (xhr.readyState == 4 && xhr.status == 200) {
       /*Primer ejercicio
        console.log(xhr.responseText);
        
        let retJSON = JSON.parse(xhr.responseText);
        if(!retJSON.Ok){
            console.error("NO se subió la foto!!!");
        }
        else{
            console.info("Foto subida OK!!!");
            (<HTMLImageElement> document.getElementById("imgFoto")).src = retJSON.Path;
            (<HTMLInputElement> document.getElementById("txtNombre")).value=retJSON.nombre;

        }
        */
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
    xhr.open('POST', './admin.php', true);

    //ESTABLEZCO EL ENCABEZADO DE LA PETICION
    xhr.setRequestHeader("enctype", "multipart/form-data");

    //ENVIO DE LA PETICION
    xhr.send(form);

    //FUNCION CALLBACK
    xhr.onreadystatechange = () => {

        if (xhr.readyState == 4 && xhr.status == 200) {
           /*Primer ejercicio
            console.log(xhr.responseText);
           */ 
            let retJSON = JSON.parse(xhr.responseText);
            if(!retJSON.Ok){
                console.error("NO se subió la foto!!!");
            }
            else{
                console.info("Foto subida OK!!!");
                (<HTMLImageElement> document.getElementById("imgFoto")).src = retJSON.Path;
                (<HTMLInputElement> document.getElementById("txtNombre")).value=retJSON.nombre;

            }
            MostrarListado();
           //(<HTMLInputElement>document.getElementById("div")).innerHTML=xhr.responseText;
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

    xhr.open('POST', './admin.php', true);

    xhr.setRequestHeader("enctype", "multipart/form-data");

    xhr.send(form);

    xhr.onreadystatechange = () => {

        if (xhr.readyState == 4 && xhr.status == 200) {
          alert(xhr.responseText);
            MostrarListado();
           //(<HTMLInputElement>document.getElementById("div")).innerHTML=xhr.responseText;
        }
    };
   }
   else
   {
       alert("Accion cancelada");
   }

}
