///<reference path = "./node_modules/@types/jquery/index.d.ts"/>
window.onload = function(){
    $("#errorLogin").hide();
    $("#errorRegistro").hide();
}
namespace Usuario
{
    export class Manejadora
    {
        public static verificarUsuario():void
        {
            let correo = String($("#email").val());
            let clave = String($("#clave").val());
            let json = '{"correo":"'  + correo + '","clave" : "' + clave + '"}';
            let form = new FormData();
            form.append("json",json);
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
            
                if(obJson.exito )
                {
                    console.log(obJson);
                    localStorage.setItem("miJWT",obJson.JWT);
                    
                    location.href = "./principal.html";
                    
                }
                
                
                
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR.responseText);
                let json = JSON.parse(jqXHR.responseText);
                $("#errorLogin").html("<button type='button' class='close' data-dismiss='alert'>&times;</button><strong>Error! </strong>" +  json.msj)
                $("#errorLogin").show();
            }); 
        }
        public static registrarUsuario():void
        {
        let apellido = String($("#apellido").val());
        let clave = String($("#clave2").val());
        let nombre = String($("#nombre").val());
        let email= String($("#email2").val());
        let perfil = String($("#perfil").val());
        let foto = String($("#foto").val());
        let nombreFoto = "fotos/" + foto.slice(12,foto.length);
        console.log(nombreFoto);
        let archivo = (<HTMLInputElement>document.getElementById("foto"));
        let form :FormData = new FormData(); 
        let json = '{"correo":"'  + email + '","clave" : "' + clave + '","nombre" : "' + nombre + '","apellido" : "' + apellido + '","perfil" :"' + perfil + '","foto": "' + nombreFoto + '" , "confirmar" : "' + clave + '"}';
        console.log(json);
        form.append("json",json);
        form.append("img",archivo.files[0]);
        
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
            if(objJson.exito)
            {
                $("#myModal .close").click();
                
            }
            
            
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            
            console.log(jqXHR.responseText);
            let json = JSON.parse(jqXHR.responseText);
            console.log(json.msj);
            $("#errorRegistro").html("<button id = 'cerrarModal' type='button' class='close' data-dismiss='alert'>&times;</button><strong>Error! </strong>" + json.msj);
            $("#errorRegistro").show();

        }); 
        }
    }


}
    
