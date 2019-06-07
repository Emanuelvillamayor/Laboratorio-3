<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require_once './vendor/autoload.php';
//require_once '/clases/AccesoDatos.php';
//require_once '/clases/Empleado.php';
require_once './clases/Empleado.php';

$config['displayErrorDetails'] = true;
$config['addContentLengthHeader'] = false;

/*
¡La primera línea es la más importante! A su vez en el modo de 
desarrollo para obtener información sobre los errores
 (sin él, Slim por lo menos registrar los errores por lo que si está utilizando
  el construido en PHP webserver, entonces usted verá en la salida de la consola 
  que es útil).

  La segunda línea permite al servidor web establecer el encabezado Content-Length, 
  lo que hace que Slim se comporte de manera más predecible.
*/

//*********************************************************************************************//
//INICIALIZO EL APIREST
//*********************************************************************************************//
$app = new \Slim\App(["settings" => $config]);





$app->group('/emp', function () 
{   
    //si utilizo solo "emp" estoy indicando una instancia vacia por lo tanto mis atributos se deben inicializar por default o de lo contrario crear una instancia
    //aqui dentro y reemplazarla en "emp"
    $this->get('/{legajo}/{clave}', \Empleado::class . ':VerificarEmpGet1');
    $this->get('/', \Empleado::class . ':VerificarEmpGet2');

});


$app->run();