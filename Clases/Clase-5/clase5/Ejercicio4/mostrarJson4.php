<?php
/*
$producto = $_POST["misProductos"];

//MUESTRO CON var_dump
//var_dump($producto);

$obj = json_decode($producto);
echo "Muestro desde objeto (antes hago decode):\r\n\n";
for($i=0;$i<count($obj);$i++)
{
  echo "Producto numero :". ($i+1) ."\n";
  echo "codigo Barra:" . $obj[$i]->codigoBarra . "\n";
  echo "precio:" . $obj[$i]->precio . "\n";
  echo "nombre:" .$obj[$i]->nombre . "\n";

  echo "\n\n";
}
*/

//EJEMPLO DE autos.json
/*
$a = fopen("./archivos/autos.json","r");

$contenido =fread($a,filesize("./archivos/autos.json"));
fclose($a);

$autos = json_decode($contenido);

echo json_encode($autos);
*/

//EJEMPLO DE auto.json
/*
$a = fopen("./archivos/auto.json","r");

$linea = '';
while(!feof($a))
{
  $linea.=fgets($a);
}

fclose($a);

$autos = json_decode($linea);

echo json_encode($autos);
*/


//EJEMPLO de city.list.min.json
/*
$a = fopen("./archivos/city.list.min.json","r");

$arrayObj=array();
$linea='';
while(!feof($a))
{
  $linea= trim(fgets($a));

  $obj = json_decode($linea);
  array_push($arrayObj,$obj);
}

fclose($a);

echo json_encode($arrayObj);
*/


//EJEMPLO de remeras.json

$a = fopen("./archivos/remeras.json","r");

$contenido =fread($a,filesize("./archivos/remeras.json"));
fclose($a);

$remeras = json_decode($contenido);

echo json_encode($remeras);




?>