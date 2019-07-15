window.onload = function (): void {
    if (localStorage.getItem('JWTKey')) {
        console.log("Ya existen elementos en el local storage: " + localStorage.getItem('JWTKey'));
    }
    else {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("POST", "../backend/administrarRequest.php", true);
        xmlhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        xmlhttp.send('caso=leerUsuarios');

        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                if (xmlhttp.responseText != 'error') {
                    localStorage.setItem('JWTKey', xmlhttp.responseText);
                    console.log("Se agregaron los usuarios del archivo.");
                }
            }
        }
        console.log(localStorage.getItem('JWTKey'));
    }


};