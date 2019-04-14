<?php
if(isset($_POST["txtPath"])==true && isset($_POST["txtPalabra"])==true)
{
$path=$_POST["txtPath"];
$palabra=$_POST["txtPalabra"];

if(file_exists($path))
{
 $ar= fopen($path,"r");
 $resultado="";

while(!feof($ar))
{
    $cadena=fgets($ar);
    if($cadena=="")
    {
        continue;
    }
    $arrayCadena=explode(" ",$cadena);

    $resultado= $cadena."<br>";

}


    echo $resultado;
}
else
{
    echo "0";
}


}



?>