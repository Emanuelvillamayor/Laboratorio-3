<?php
/*
Aplicación Nº 7 (Leer un archivo .json)
Realizar una aplicación web que, a través de Ajax, lea el archivo auto.json desde la página
traerAuto.php y muestre el JSON recibido por alert() y en el console.log() */

$a = fopen("./auto.json","r");

$linea = '';
while(!feof($a))
{
  $linea.=fgets($a);
}

fclose($a);

$autos = json_decode($linea);

echo json_encode($autos);


?>