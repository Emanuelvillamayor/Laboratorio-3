///<reference path = "./node_modules/@types/jquery/index.d.ts"/>
window.onload = function () {
    $("#errorLogin").hide();
    $("#errorRegistro").hide();
};
var Usuario;
(function (Usuario) {
    var Manejadora = /** @class */ (function () {
        function Manejadora() {
        }
        Manejadora.verificarUsuario = function () {
            var correo = String($("#email").val());
            var clave = String($("#clave").val());
            var json = '{"correo":"' + correo + '","clave" : "' + clave + '"}';
            var form = new FormData();
            form.append("json", json);
            $.ajax({
                type: 'POST',
                url: "../BACKEND/login",
                dataType: "json",
                cache: false,
                contentType: false,
                processData: false,
                data: form,
                async: true
            })
                .done(function (obJson) {
                if (obJson.exito) {
                    console.log(obJson);
                    localStorage.setItem("miJWT", obJson.JWT);
                    location.href = "./principal.html";
                }
            })
                .fail(function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR.responseText);
                var json = JSON.parse(jqXHR.responseText);
                $("#errorLogin").html("<button type='button' class='close' data-dismiss='alert'>&times;</button><strong>Error! </strong>" + json.msj);
                $("#errorLogin").show();
            });
        };
        Manejadora.registrarUsuario = function () {
            var apellido = String($("#apellido").val());
            var clave = String($("#clave2").val());
            var nombre = String($("#nombre").val());
            var email = String($("#email2").val());
            var perfil = String($("#perfil").val());
            var foto = String($("#foto").val());
            var nombreFoto = "fotos/" + foto.slice(12, foto.length);
            console.log(nombreFoto);
            var archivo = document.getElementById("foto");
            var form = new FormData();
            var json = '{"correo":"' + email + '","clave" : "' + clave + '","nombre" : "' + nombre + '","apellido" : "' + apellido + '","perfil" :"' + perfil + '","foto": "' + nombreFoto + '" , "confirmar" : "' + clave + '"}';
            form.append("json", json);
            form.append("img", archivo.files[0]);
            $.ajax({
                type: 'POST',
                url: "../BACKEND/usuarios",
                dataType: "json",
                cache: false,
                contentType: false,
                processData: false,
                data: form,
                async: true
            })
                .done(function (objJson) {
                if (objJson.exito) {
                    $("#myModal .close").click();
                }
            })
                .fail(function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR.responseText);
                var json = JSON.parse(jqXHR.responseText);
                console.log(json.msj);
                $("#errorRegistro").html("<button id = 'cerrarModal' type='button' class='close' data-dismiss='alert'>&times;</button><strong>Error! </strong>" + json.msj);
                $("#errorRegistro").show();
            });
        };
        return Manejadora;
    }());
    Usuario.Manejadora = Manejadora;
})(Usuario || (Usuario = {}));
