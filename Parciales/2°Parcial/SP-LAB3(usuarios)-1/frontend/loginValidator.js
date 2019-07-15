$(document).ready(function () {
    console.log("Cargando validadores del form para Login");

    $('#loginForm').bootstrapValidator({
        message: 'El valor no es válido',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            mail: {
                validators: {
                    notEmpty: {
                        message: 'El email es requerido.'
                    },
                    emailAddress: {
                        message: 'El email no tiene un formato valido'
                    }
                }
            },
            clave: {
                validators: {
                    notEmpty: {
                        message: 'La clave es requerida.'
                    },
                    stringLength: {
                        min: 4,
                        max: 8,
                        message: 'La clave debe tener entre 4 y 8 caracteres'
                    }
                }
            }
        }
    });

    console.log("Termine de cargar los validadores para el form del Login");

    /*Manejador especial en caso de que el validator no funcione al presionar enviar la primera vez*/
    $("#btnEnviar").off('click').click(function () {
        $('#loginForm').bootstrapValidator('revalidateField', 'mail');
        $('#loginForm').bootstrapValidator('revalidateField', 'clave');
    });

    if (localStorage.getItem('usuarios') == null) {
        let arrUsuarios = [{
            "correo": "alviggi1@gmail.com",
            "clave": "1234",
            "nombre": "Augusto",
            "apellido": "Alviggi",
            "legajo": "001",
            "perfil": "invitado",
            "foto": "001.jpg"
        },
        {
            "correo": "fatori2@gmail.com",
            "clave": "4567",
            "nombre": "Nicolas",
            "apellido": "Fatori",
            "legajo": "002",
            "perfil": "admin",
            "foto": "002.jpg"
        },
        {
            "correo": "segado3@gmail.com",
            "clave": "78910",
            "nombre": "Emilio",
            "apellido": "Segado",
            "legajo": "003",
            "perfil": "superadmin",
            "foto": "003.jpg"
        },
        {
            "correo": "user4@gmail.com",
            "clave": "14710",
            "nombre": "User",
            "apellido": "Cuatro",
            "legajo": "004",
            "perfil": "invitado",
            "foto": "004.jpg"
        },
        {
            "correo": "user5@gmail.com",
            "clave": "36912",
            "nombre": "User",
            "apellido": "Cinco",
            "legajo": "005",
            "perfil": "admin",
            "foto": "005.png"
        }];

        localStorage.setItem('usuarios', JSON.stringify(arrUsuarios));
    }
    else {
        console.log("Los usuarios están cargados");
    }

    console.log(JSON.parse(localStorage.getItem('usuarios')));
});