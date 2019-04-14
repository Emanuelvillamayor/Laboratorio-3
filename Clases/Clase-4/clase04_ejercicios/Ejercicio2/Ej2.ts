 function IngresarPath()
{
    let xhttp:XMLHttpRequest = new XMLHttpRequest();

    let path:string =(<HTMLInputElement>document.getElementById("txtPath")).value;

    xhttp.open("POST","Ej2.php",true);

    xhttp.setRequestHeader("content-type","application/x-www-form-urlencoded");

    xhttp.send("txtPath="+path);


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