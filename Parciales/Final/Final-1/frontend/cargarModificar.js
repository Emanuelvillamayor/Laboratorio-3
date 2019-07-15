window.onload = function () {
    var correo = document.getElementById('correo').value;
    var itemLocal = localStorage.getItem("JWTKey");
    if (itemLocal) {
        var jsonItem = JSON.parse(itemLocal);
        jsonItem.usuarios.forEach(function (element) {
            if (correo == element.correo) {
                console.log(element);
                document.getElementById('nombre').value = element.nombre;
                document.getElementById('apellido').value = element.apellido;
                document.getElementById('clave').value = element.clave;
                document.getElementById('correo').value = element.correo;
                document.getElementById('perfil').value = element.perfil;
                document.getElementById('legajo').value = element.legajo;
                return;
            }
        });
    }
};
