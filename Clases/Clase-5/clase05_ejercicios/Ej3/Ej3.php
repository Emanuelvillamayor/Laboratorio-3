<?php
/*Ejercicio 3:
Diseñar una aplicación que envíe por Ajax un producto hacia la página mostrarJson.php. En
dicha página, mostrar el valor recibido utilizando la función var_dump() .
Luego, transformar lo recibido en un objeto standard de PHP y mostrar cada uno de sus
atributos. Utilizar las funciones json_encode() y json_decode() .
*/
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