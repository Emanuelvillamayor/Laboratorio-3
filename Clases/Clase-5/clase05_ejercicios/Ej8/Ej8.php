<?php
/*
Aplicación Nº 8 (Leer un archivo .json II)
Tomando como punto de partida el ejercicio anterior, armar una página que posea un <input
type=”button”> que al pulsarlo, muestre el JSON recibido por Ajax en los elementos de tipo
<input type=”text”> (uno por cada atributo del objeto recibido). */

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