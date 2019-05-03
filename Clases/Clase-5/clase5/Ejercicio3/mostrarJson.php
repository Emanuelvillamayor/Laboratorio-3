<?php
//recibo el JSON (string) enviado desde  typescript
$producto = $_POST["miProducto"];

//MUESTRO CON var_dump
//var_dump($producto);

//con decode() transformo el string de un JSON a un objeto det ipo JSON y puedo acceder a sus atributos
$obj = json_decode($producto);
echo "Muestro desde objeto (antes hago decode):\r\n";

echo "codigo Barra:" . $obj->codigoBarra . "<br>";
echo "precio:" . $obj->precio . "<br>";
echo "nombre" .$obj->nombre . "<br>";



?>