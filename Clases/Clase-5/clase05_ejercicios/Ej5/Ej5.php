<?php

$producto = $_POST["misProductos"];

//MUESTRO CON var_dump
//var_dump($producto);

//transformo la cadena JSON a objeto JSON
$obj = json_decode($producto);
//transformo el objeto JSON a cadena JSON y envio con "echo"
echo json_encode($obj);



?>