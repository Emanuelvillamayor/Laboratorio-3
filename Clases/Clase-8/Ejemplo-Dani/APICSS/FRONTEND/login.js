function Login()
{
    var legajo = $("#legajo").val();
    var clave = $("#clave").val();

    $.ajax({
        type: 'GET',
        url: 'index.php/empleado/login/'+legajo+","+clave,
        dataType: "JSON", 
        cache: false,
        contentType: false,
        processData: false,
        //data: form,
        async: true
    })
        .done(function (reply) {

            if(reply.Mensaje !== "Usuario no existe")
            {
                location.assign("./index.html"); //en caso de exito
            }
            else
            {
                alert(reply.Mensaje); //Si no existe
            }
        
    })
        .fail(function (jqXHR, textStatus, errorThrown) {
            
        console.log(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
    });
}