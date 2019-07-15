///<reference path = "./node_modules/@types/jquery/index.d.ts"/>
window.onload = function(){
    
    $("#errorEliminacion").hide();
    $("#errorModificacion").hide();
    $.ajax({
        type: 'GET',
        url: "../BACKEND/login",
        dataType: "json",
        cache: false,
        contentType: false,
        processData: false,
        async: true,
        headers : {"token" : localStorage.getItem("miJWT")},
    })
    .done(function (objJson) {
        
        if(objJson.status == 200)
        {
            localStorage.setItem("usuario",JSON.stringify(objJson));
            if(objJson.usuario.perfil == "propietario")
            {
                mostarUsuarios("");
                mostrarAutos("propietario");
            }
            else if(objJson.usuario.perfil == "empleado")
            {
                mostarUsuarios("empleado");
                mostrarAutos("");
            }
            else if(objJson.usuario.perfil == "encargado")
            {
                mostarUsuarios("encargado");
                mostrarAutos("encargado"); 
            }
            
            
            console.log(localStorage.getItem("miJWT"));
        }
        
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
        
       location.href = "./login.html";
        

    }); 
    
}
function mostarUsuarios(perfil:string):void
{
    $.ajax({
        type: 'GET',
        url: "../BACKEND",
        dataType: "json",
        cache: false,
        contentType: false,
        processData: false,
        headers : {"perfil" : perfil},
        async: true
    })
    .done(function (objJson) {
        
        if(objJson.exito)
        {
            $("#miDiv").html(objJson.tabla);
        }
        
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
        
        console.log(jqXHR.responseText);
        

    }); 
    
}
function mostrarAutos(perfil : string):void{
    
    
    $.ajax({
        type: 'GET',
        url: "../BACKEND/autos",
        dataType: "json",
        cache: false,
        contentType: false,
        processData: false,
        headers : {"perfil" : perfil},
        async: true
    })
    .done(function (objJson) {
        
        if(objJson.exito)
        {
            $("#miDiv2").html(objJson.tabla);
        }
        
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
        
        console.log(jqXHR.responseText);
        

    }); 
}
function eliminarAuto(json:any):void
{
    console.log(json);
    if(confirm("Desea eliminar este auto?"))
    {
        console.log(json.id);
        let form = new FormData();
        form.append("id", json.id);
        $.ajax({
            type: 'POST',
            url: "../BACKEND/autos",
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
                mostrarAutos("propietario");
            }
            
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            
            console.log(jqXHR.responseText);
            $("#errorEliminacion").show();
            
    
        });
    }
    
}
function obtenerAuto(json:any):void
{
    $("#idAuto").val(json.id);
    $("#marca").val(json.marca);
    $("#precio").val(json.precio);
    $("#color").val(json.color);
    $("#modelo").val(json.modelo);
}
function modificarAuto():void
{
    let id = String($("#idAuto").val());
    let marca = String($("#marca").val());
    let precio = String($("#precio").val());
    let color = String($("#color").val());
    let modelo = String($("#modelo").val());

    let auto = '{ "id" : ' + id + ', "marca" : "' + marca + '", "precio" : "' + precio +'" , "color" : "' + color + '" , "modelo" : "' + modelo + '"}';

    let form = new FormData();
        form.append("json", auto);
        $.ajax({
            type: 'POST',
            url: "../BACKEND/modificarAutos",
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
                
                let json = JSON.parse(localStorage.getItem("usuario"));
                mostrarAutos(json.usuario.perfil);
                
            }
            
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            
            console.log(jqXHR.responseText);
            let json = JSON.parse(jqXHR.responseText);
            $("#errorModificacion").html("<button id = 'cerrarModal' type='button' class='close' data-dismiss='alert'>&times;</button><strong>Error! </strong>" + json.msj);
            $("#errorModificacion").show();
    
        });
}