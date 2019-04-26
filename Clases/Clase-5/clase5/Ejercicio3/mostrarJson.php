<?php

$producto = $_POST["miProducto"];

//MUESTRO CON var_dump
//var_dump($producto);

$obj = json_decode($producto);
echo "Muestro desde objeto (antes hago decode):\r\n";

echo "codigo Barra:" . $obj->codigoBarra . "<br>";
echo "precio:" . $obj->precio . "<br>";
echo "nombre" .$obj->nombre . "<br>";



?>