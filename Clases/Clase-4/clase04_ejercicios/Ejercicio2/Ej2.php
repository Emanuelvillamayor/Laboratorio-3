<?php
if(isset($_POST["txtPath"]))
{
$path=$_POST["txtPath"];

if(file_exists($path))
{
 $ar= fopen($path,"r");

while(!feof($ar))
{
    $cadena=fgets($ar);
    if($cadena=="")
    {
        continue;
    }
    echo $cadena."<br>";

}

    
}
else
{
    echo "0";
}


}



?>