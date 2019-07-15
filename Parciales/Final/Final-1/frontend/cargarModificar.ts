window.onload = function () {
    let correo = (<HTMLInputElement>document.getElementById('correo')).value;
    let itemLocal = localStorage.getItem("JWTKey");
    if (itemLocal) {
        let jsonItem = JSON.parse(itemLocal);
        jsonItem.usuarios.forEach((element: any) => {
            if (correo == element.correo) {
                console.log(element);
                (<HTMLInputElement>document.getElementById('nombre')).value = element.nombre;
                (<HTMLInputElement>document.getElementById('apellido')).value = element.apellido;
                (<HTMLInputElement>document.getElementById('clave')).value = element.clave;
                (<HTMLInputElement>document.getElementById('correo')).value = element.correo;
                (<HTMLSelectElement>document.getElementById('perfil')).value = element.perfil;
                (<HTMLInputElement>document.getElementById('legajo')).value = element.legajo;
                return;
            }
        });

    }
};

