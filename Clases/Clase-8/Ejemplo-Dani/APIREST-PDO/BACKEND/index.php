<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require_once '../vendor/autoload.php'; # Contiene codigo para usar los verbos, API y middleware
require_once './clases/AccesoDatos.php'; # Contiene strings de coneccion a la base de datos
require_once './clases/ApiRest.php'; # Contiene todas mis clases y funciones

$config['displayErrorDetails'] = true;
$config['addContentLengthHeader'] = false;


$app = new \Slim\App(["settings" => $config]);

# Steto este verbo por default para evitar acceso no autorizado
$app->get('[/]',function(Request $request, Response $response){
    $response->getBody()->write("Bienvenido al API de EMPLEADOS!<br>Leer la documentación para el uso de la API.");
    return $response;
});

# ** COMIENZO DE LAS FUNCIONES ** //

$app->group('/empleado',function(){
    $this->post('[/]', \Usuario::class . '::AltaDeUsuario')->add(\MW::class . ":Existe")->add(\MW::class . "::EstaVacio")->add(\MW::class . ":VerificarLegajo"); # En realidad no hace falta si uso bootstrapvalidator
    //pero lo uso para si accedo directamente a mi index.php desde Postman 
    $this->get('[/]', \Usuario::class . '::ListadoDeUsuarios');
    $this->get('/login/', \Usuario::class . '::Login');
    $this->put('[/]', \Usuario::class . '::ModificadoDeUsuarios');
    $this->delete('[/]', \Usuario::class . '::BorradoDeUsuarios'); 
});

# ** FIN DE LAS FUNCIONES ** //
$app->run();