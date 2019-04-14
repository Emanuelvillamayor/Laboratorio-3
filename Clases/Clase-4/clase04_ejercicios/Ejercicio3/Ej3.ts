function IngresarPath2()
{
    let xhttp:XMLHttpRequest = new XMLHttpRequest();

    let path:string =(<HTMLInputElement>document.getElementById("txtPath")).value;

    let palabra:string=(<HTMLInputElement>document.getElementById("txtPalabra")).value;

    xhttp.open("POST","Ej3.php",true);

    xhttp.setRequestHeader("content-type","application/x-www-form-urlencoded");

    xhttp.send("txtPath="+path+"&txtPalabra="+palabra);


    xhttp.onreadystatechange=()=>{
        if(xhttp.readyState==4 && xhttp.status==200)
        {
            console.log(xhttp.responseText);

            if(xhttp.responseText=="0")
            {
              alert("Error , el archivo no existe");
            }
            else
            {
                (<HTMLInputElement>document.getElementById("div")).innerHTML=xhttp.responseText;
            }

        }
    }
}