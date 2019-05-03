window.onload = function () {
    MostrarListado();
};
function MostrarListado() {
    //INSTANCIO OBJETO PARA REALIZAR COMUNICACIONES ASINCRONICAS
    var xhr = new XMLHttpRequest();
    //INSTANCIO OBJETO FORMDATA
    var form = new FormData();
    //PARAMETRO RECUPERADO POR $_POST O $_GET (SEGUN CORRESPONDA)
    form.append('op', "mostrarListado");
    //METODO; URL; ASINCRONICO?
    xhr.open('POST', './admin.php', true);
    //ESTABLEZCO EL ENCABEZADO DE LA PETICION
    xhr.setRequestHeader("enctype", "multipart/form-data");
    //ENVIO DE LA PETICION
    xhr.send(form);
    //FUNCION CALLBACK
    xhr.onreadystatechange = function () {
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
            document.getElementById("div").innerHTML = xhr.responseText;
        }
    };
}
function SubirFoto() {
    //INSTANCIO OBJETO PARA REALIZAR COMUNICACIONES ASINCRONICAS
    var xhr = new XMLHttpRequest();
    //RECUPERO LA IMAGEN SELECCIONADA POR EL USUARIO
    var foto = document.getElementById("fileFoto");
    var nombre = document.getElementById("txtNombre").value;
    var apellido = document.getElementById("txtApellido").value;
    var legajo = document.getElementById("numLegajo").value;
    var sueldo = document.getElementById("numSueldo").value;
    //INSTANCIO OBJETO FORMDATA
    var form = new FormData();
    //AGREGO PARAMETROS AL FORMDATA:
    //PARAMETRO RECUPERADO POR $_FILES
    form.append('foto', foto.files[0]);
    form.append('txtNombre', nombre);
    form.append('txtApellido', apellido);
    form.append('numLegajo', legajo);
    form.append('numSueldo', sueldo);
    //PARAMETRO RECUPERADO POR $_POST O $_GET (SEGUN CORRESPONDA)
    form.append('op', "subirFoto");
    //METODO; URL; ASINCRONICO?
    xhr.open('POST', './admin.php', true);
    //ESTABLEZCO EL ENCABEZADO DE LA PETICION
    xhr.setRequestHeader("enctype", "multipart/form-data");
    //ENVIO DE LA PETICION
    xhr.send(form);
    //FUNCION CALLBACK
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            /*Primer ejercicio
             console.log(xhr.responseText);
            */
            var retJSON = JSON.parse(xhr.responseText);
            if (!retJSON.Ok) {
                console.error("NO se subió la foto!!!");
            }
            else {
                console.info("Foto subida OK!!!");
                document.getElementById("imgFoto").src = retJSON.Path;
                document.getElementById("txtNombre").value = retJSON.nombre;
            }
            MostrarListado();
            //(<HTMLInputElement>document.getElementById("div")).innerHTML=xhr.responseText;
        }
    };
}
//ya viene creado el objeto de tipo JSON
function Eliminar(empleado) {
    var objEmp = JSON.parse(empleado);
    var datosEmpleado = objEmp.legajo;
    if (confirm("Esta seguro que desea eliminar al empleado:" + datosEmpleado)) {
        var xhr_1 = new XMLHttpRequest();
        var form = new FormData();
        form.append('obj', empleado);
        form.append('op', "Eliminar");
        xhr_1.open('POST', './admin.php', true);
        xhr_1.setRequestHeader("enctype", "multipart/form-data");
        xhr_1.send(form);
        xhr_1.onreadystatechange = function () {
            if (xhr_1.readyState == 4 && xhr_1.status == 200) {
                alert(xhr_1.responseText);
                MostrarListado();
                //(<HTMLInputElement>document.getElementById("div")).innerHTML=xhr.responseText;
            }
        };
    }
    else {
        alert("Accion cancelada");
    }
}
