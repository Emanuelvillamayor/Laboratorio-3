<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>


<!--codigo de php-->
<?php

//recupero los datos enviados en la pagina y los guardo en una variable
 $nombre =$_POST["txtNombre"];
 $apellido=$_POST["txtApellido"];
 $dni =$_POST["numDni"];
 $sexo=$_POST["txtSexo"];
 $legajo=$_POST["numLeg"];
 $salario=$_POST["numSal"];
 
//guardo los datos en una cadena:
//$resultado ="Nombre:" . $nombre . "\nApellido:" . $apellido . "\nDNI:" . $dni . "\nSexo:" . $sexo . "\nLegajo:" . $legajo . "\nSalario:" . $salario . "\n";
$resultado =$nombre . "-" . $apellido . "-" . $dni . "-" . $sexo . "-" . $legajo . "-" . $salario . "\n";



$ar=fopen("../Archivos/empleados.txt","a");

$cant=fwrite($ar,$resultado);

if($cant>0)
{
    echo "<h2>Archivos creado con exito</hr2><br>";
}

fclose($ar);





var_dump($_POST);

?>


<!--Nos devuelve a la pagina principal-->
<br><br><br><a href="../Html/Ej3.html">Volver</a>
</body>
</html>