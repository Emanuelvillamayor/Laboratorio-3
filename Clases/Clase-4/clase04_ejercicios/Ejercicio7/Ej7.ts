
function SugerirNombre()
{
    let xhttp:XMLHttpRequest = new XMLHttpRequest();

    let nombre:string =(<HTMLInputElement>document.getElementById("txtName")).value;


    xhttp.open("POST","comprobarNombre.php",true);

    xhttp.setRequestHeader("content-type","application/x-www-form-urlencoded");

    xhttp.send("txtName="+nombre);


    xhttp.onreadystatechange=()=>{
        if(xhttp.readyState==4 && xhttp.status==200)
        {
            console.log(xhttp.responseText);

            if(xhttp.responseText==="no")
            {
                alert("Se ha guardado correctamente!!");
                (<HTMLInputElement>document.getElementById("lista")).innerHTML="";
            }
            else
            {
                console.log(xhttp.responseText);
                (<HTMLInputElement>document.getElementById("div_lista")).innerHTML=xhttp.responseText;

            }

        }
    }

}