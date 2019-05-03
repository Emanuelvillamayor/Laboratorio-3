<?php

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


?>