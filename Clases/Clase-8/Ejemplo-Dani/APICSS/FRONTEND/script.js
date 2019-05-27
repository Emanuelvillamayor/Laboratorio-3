$(document).ready(function () {
    //Cargo el listado
    MostrarLista();

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
            clave: {
                validators: {
                    notEmpty: {
                        message: 'La clave es requerida!!!'
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
    var clave = $("#clave").val();
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
    form.append('clave', clave);
    form.append('sueldo', sueldo);

    Spinner(true);

    $.ajax({
        type: 'POST',
        url: 'index.php/empleado/',
        cache: false,
        contentType: false,
        processData: false,
        data: form,
        async: true
    })
        .done(function (reply) {

        Spinner(false);
        
        if(reply.Mensaje !== "Empleado agregado con exito!")
        {
            alert(reply.Mensaje);
        }
        else
        {
            console.info(reply.Mensaje);
            location.assign("./login.php"); //Si se pudo subir el usuario, redirecciono hacia el login
        }
    })
        .fail(function (jqXHR, textStatus, errorThrown) {
            Spinner(false);
        console.log(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
    });
    
}
function ModificarUsuario()
{

    //Recupero datos desde inputs

    var id = localStorage.getItem("id"); //Recupero el id a modificar
    var foto_vieja = localStorage.getItem("img_old"); //recupero la imagen vieja

    var nombre = $("#nombre").val();
    var apellido = $("#apellido").val();
    var legajo = $("#legajo").val();
    var sueldo = $("#sueldo").val();
    var clave = $("#clave").val();

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
    form.append('clave', clave);
    form.append('sueldo', sueldo);
    form.append('id',id);
    form.append('foto_vieja',foto_vieja);
    
    Spinner(true);

    $.ajax({
        type: 'POST',
        url: 'index.php/empleado/update',
        cache: false,
        contentType: false,
        processData: false,
        data: form,
        async: true
    })
        .done(function (reply) {
        
        Spinner(false);
        
        if(reply.Mensaje !== "Error al modificar usuario!")
        {
            LimpiarCampos();
        }
        MostrarLista();
        LimpiarCampos();
    })
        .fail(function (jqXHR, textStatus, errorThrown) {
            Spinner(false);
        console.log(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
    });

}
function MostrarLista() {
    
    Spinner(true);

    $.ajax({
        type: 'GET',
        url: 'index.php/empleado',
        dataType: "JSON", 
        cache: false,
        contentType: false,
        processData: false,
        //data: form,
        async: true
    })
        .done(function (reply) {

            var tabla ="<table align='center'><thead><th>Legajo</th><th>Apellido</th><th>Nombre</th><th>Sueldo</th><th>Foto</th><th>Acciones</th></thead>";
            
            if(reply.Mensaje !== "Error listado")
            {
                
                for (let i = 0; i < reply.length; i++) {
                    
                    tabla += "<td>"+reply[i].legajo+"</td><td>"+reply[i].apellido +"</td><td>"+reply[i].nombre+"</td><td>"+reply[i].sueldo+"</td><td>"+"<img src='./BACKEND/fotos/"+reply[i].foto+"'width='100px' height='100px' class='img img-circle'></td>"+"<td><input class='btn btn-danger' type='button' onclick='Eliminar("+JSON.stringify(reply[i])+")' value='Eliminar'><input class='btn btn-primary' type='button' onclick='CargarCampos("+JSON.stringify(reply[i])+")' value='Modificar'><tr>";
    
                }
            }
            else
            {
                console.log(reply.Mensaje);
            }
            tabla += "<tr></table>";
            $("#listado").html(tabla);
        
        Spinner(false);
        
    })
        .fail(function (jqXHR, textStatus, errorThrown) {
            Spinner(false);
        console.log(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
    });
}
function Eliminar(obj) {
    var id = obj.id; 
    var legajo = obj.legajo;
    var foto_vieja = obj.foto;
    
    if (confirm("Esta seguro de eliminar al empleado con el legajo >>> " + legajo + " <<< ?"))
    {

        Spinner(true);

        //EL METODO DELETE NO ACEPTA FORM DATA NI LOS OTROS PARAMETROS COMENTADOS, NO SE PORQUE
        $.ajax({
            type: 'DELETE',
            url: 'index.php/empleado/',
            //dataType: "JSON", 
            /* cache: false,
            contentType: false,
            processData: false, */
            data: {"id":id,"foto_vieja":foto_vieja}, //OJO, ESTE METODO FUNCIONA SOLO ASI !!!!
            async: true
        })
            .done(function (reply) {
    
            if(reply.Mensaje == "Usuario eliminado con exito!")
            {
                alert("OK");
            }
            else
            {
                alert("NO SE ELIMINO");
            }
            MostrarLista();

            Spinner(false);
            
        }) 
            .fail(function (jqXHR, textStatus, errorThrown) {
                Spinner(false);
            console.log(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
        });
    }
    else
    {
        alert("Accion cancelada!");
    }
}
function CargarCampos(obj) {
    var objeto = obj;
    //Comienzo a llenar los input con data recuperado
    $("#apellido").val(objeto.apellido);
    $("#nombre").val(objeto.nombre);
    $("#legajo").val(objeto.legajo).attr("disabled",true).css("background-color","#454545");
    $("#clave").val(objeto.clave);
    $("#sueldo").val(objeto.sueldo);
    $("#imgFoto").attr("src","./BACKEND/fotos/" + objeto.foto).addClass("img img-rounded img-thumbnail");

    localStorage.setItem("id", objeto.id); //Guardo el id en el localstorage para recuperarlo luego en Modificar()
    localStorage.setItem("img_old",objeto.foto); //Guardo la foto para eliminarla en el futuro

    $("#btnIM").removeClass("btn btn-success btn-block");
    $("#btnIM").addClass("btn btn-primary btn-block");
    $("#btnIM").html("Modificar");

    
}
function LimpiarCampos() {
    
    location.reload();
    
}

function Spinner(key)
{
    switch (key) {
        case true:
        //AGREGO CLASE A LA CLASE DEL SPINNER, PARA QUE SE 'MUESTRE'
        $("#spinner").removeClass("hidden");

        //AGREGO CLASE A LA CLASE DEL SPINNER, PARA QUE 'GIRE'
        $("#spinner").addClass("fa-spin");
        break;
    
        case false:
        //REMUEVO LA CLASE DEL SPINNER, PARA QUE 'FRENE'
        $("#spinner").removeClass("fa-spin");

        //AGREGO CLASE A LA CLASE DEL SPINNER, PARA QUE SE 'OCULTE'
        $("#spinner").addClass("hidden");
        break;
    }
}
