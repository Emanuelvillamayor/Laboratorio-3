$(document).ready(function () {
    //Cargo el listado
    //MostrarLista();

    $("#altaForm").bootstrapValidator({

        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            apellido: {
                validators: {
                    notEmpty: {
                        message: 'El apellido es requerido!!!'
                    }
                }
            },
            nombre: {
                validators: {
                    notEmpty: {
                        message: 'El nombre es requerido!!!'
                    }
                }
            },
            legajo: {
                validators: {
                    notEmpty: {
                        message: 'El legajo es requerido!!!'
                    },
                    stringLength: {
                        min: 4,
                        max: 6,
                        message: 'Por favor, ingrese entre 4 y 6 caracteres!!!'
                    }
                }
            },
            sueldo: {
                validators: {
                    notEmpty: {
                        message: 'El sueldo es requerido!!!'
                    },
                    stringLength: {
                        min: 4,
                        max: 6,
                        message: 'Por favor, ingrese entre 4 y 6 caracteres!!!'
                    }
                }
            },
            foto: {
                validators: {
                    notEmpty: {
                        message: 'Seleccione una imagen'
                    },
                    file: {
                        extension: 'jpeg,jpg,png',
                        type: 'image/jpeg,image/png,image/jpg',
                        maxSize: 100000, 
                        message: 'El archivo seleccionado es grande o no tiene formato .jpg o .png!'
                    },
                }
            }
        }
    })
    //SI SUPERA TODAS LAS VALIDACIONES, SE PROVOCA EL SUBMIT DEL FORM
    .on('success.form.bv', function (e) {

        // Prevent form submission (evita que se envie el form por default)
        e.preventDefault();

        // *** Utilizo estos if para asi controlar qué función tengo que llamar *** //

        if( $("#btnIM").html() == "Enviar")
        {
            AltaUsuario();
        }
        if($("#btnIM").html() == "Modificar")
        {
            ModificarUsuario();
        }
        
    });
});

// ***** FUNCIONES **** //

function AltaUsuario() {
    
    //Recupero datos desde inputs
    var nombre = $("#nombre").val();
    var apellido = $("#apellido").val();
    var legajo = $("#legajo").val();
    var sueldo = $("#sueldo").val();
    //RECUPERO LA IMAGEN SELECCIONADA POR EL USUARIO
    var foto = document.getElementById("foto");
    //INSTANCIO OBJETO FORMDATA
    var form = new FormData();
    //AGREGO PARAMETROS AL FORMDATA:
    //PARAMETRO RECUPERADO POR $_FILES
    form.append('foto', foto.files[0]);
    form.append('nombre', nombre);
    form.append('apellido', apellido);
    form.append('legajo', legajo);
    form.append('sueldo', sueldo);

    form.append('op','subirFoto');
    
    $.ajax({
        type: 'POST',
        url: './admin.php',
        
        cache: false,
        contentType: false,
        processData: false,
        data: form,
        async: true
    })
        .done(function (reply) {

        var reply = JSON.parse(reply);
        //Spinner(false);
        
        if(reply.Exito == "ERROR")
        {
            alert("ERROR AL INSERTAR EMPLEADO!");
        }
        location.reload(); //To activate buttons again
        LimpiarCampos();
        
    })
        .fail(function (jqXHR, textStatus, errorThrown) {
            //Spinner(false);
        console.log(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
    });
    
}
function ModificarUsuario()
{

    //Recupero datos desde inputs
    var nombre = $("#nombre").val();
    var apellido = $("#apellido").val();
    var legajo = $("#legajo").val();
    var sueldo = $("#sueldo").val();
    //RECUPERO LA IMAGEN SELECCIONADA POR EL USUARIO
    var foto = document.getElementById("foto");
    //INSTANCIO OBJETO FORMDATA
    var form = new FormData();
    //AGREGO PARAMETROS AL FORMDATA:
    //PARAMETRO RECUPERADO POR $_FILES
    form.append('foto', foto.file[0]);
    form.append('nombre', nombre);
    form.append('apellido', apellido);
    form.append('legajo', legajo);
    form.append('sueldo', sueldo);

    form.append('op','Modificar');
    
    $.ajax({
        type: 'POST',
        url: './admin.php',
        
        cache: false,
        contentType: false,
        processData: false,
        data: form,
        async: true
    })
        .done(function (reply) {

        var reply = JSON.parse(reply);
        //Spinner(false);
        
        if(reply.Exito == "ERROR")
        {
            alert("ERROR AL MODIFICAR EMPLEADO!");
        }
        location.reload(); //To activate buttons again
        LimpiarCampos();
        
    })
        .fail(function (jqXHR, textStatus, errorThrown) {
            //Spinner(false);
        console.log(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
    });

}
function MostrarLista() {
    //INSTANCIO OBJETO PARA REALIZAR COMUNICACIONES ASINCRONICAS
    var xhr = new XMLHttpRequest();
    //INSTANCIO OBJETO FORMDATA
    var form = new FormData();
    form.append('op', "MostrarListado");
    //METODO; URL; ASINCRONICO?
    xhr.open('POST', './admin.php', true);
    //ESTABLEZCO EL ENCABEZADO DE LA PETICION
    xhr.setRequestHeader("enctype", "multipart/form-data");
    //ENVIO DE LA PETICION
    xhr.send(form);
    //FUNCION CALLBACK
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            document.getElementById("listado").innerHTML = xhr.responseText;
        }
    };
}
function Eliminar(obj) {
    var objeto = obj; //No necesito parcear, ya se transforma al pasar por esta funcion (obj:JSON)
    //var objJSON : any = JSON.parse(obj);
    if (confirm("Esta seguro de eliminar al empleado con el legajo >>> " + objeto.legajo + " <<< ?")) {
        //INSTANCIO OBJETO PARA REALIZAR COMUNICACIONES ASINCRONICAS
        var xhr_1 = new XMLHttpRequest();
        //INSTANCIO OBJETO FORMDATA
        var form = new FormData();
        form.append('op', "Eliminar");
        form.append('cadenaJson', JSON.stringify(obj));
        //METODO; URL; ASINCRONICO?
        xhr_1.open('POST', './admin.php', true);
        //ESTABLEZCO EL ENCABEZADO DE LA PETICION
        xhr_1.setRequestHeader("enctype", "multipart/form-data"); // Solo para post
        //ENVIO DE LA PETICION
        xhr_1.send(form);
        //FUNCION CALLBACK
        xhr_1.onreadystatechange = function () {
            if (xhr_1.readyState == 4 && xhr_1.status == 200) {
                var resp = JSON.parse(xhr_1.responseText);
                if (resp.Exito) {
                    console.log("Eliminado !");
                }
                else {
                    console.log("Error al eliminar !");
                }
                MostrarLista();
            }
        };
    }
    else {
        alert("Accion cancelada!");
    }
}
function CargarCampos(obj) {
    var objeto = obj;
    //Comienzo a llenar los input con data recuperado
    $("#apellido").val(objeto.apellido);
    document.getElementById("nombre").value = objeto.nombre;
    document.getElementById("legajo").value = objeto.legajo;
    document.getElementById("legajo").disabled = true;
    document.getElementById("legajo").style.backgroundColor = "#454545";
    document.getElementById("sueldo").value = objeto.sueldo;
    document.getElementById("imgFoto").src = "./archivos/" + objeto.path_foto;
    document.getElementById("btnIM").className = "btn btn-warning";
    document.getElementById("btnIM").value = "Modificar";
}
function LimpiarCampos() {
    document.getElementById("apellido").value = "";
    document.getElementById("nombre").value = "";
    document.getElementById("legajo").value = "";
    document.getElementById("legajo").disabled = false;
    document.getElementById("legajo").style.backgroundColor = "white";
    document.getElementById("sueldo").value = "";
    document.getElementById("foto").value = "";
    document.getElementById("imgFoto").src = "./BACKEND/usr_default.jpg";
}

