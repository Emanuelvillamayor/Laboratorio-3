<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
use \Firebase\JWT\JWT as JWT;

require 'vendor/autoload.php';

$config['displayErrorDetails'] = true;
$config['addContentLengthHeader'] = false;

$app = new \Slim\App(["settings" => $config]);

$app->group('/login', function () {
    $this->post('/', function (Request $request, Response $response, array $args) {
        $params = $request->getParsedBody();
        $key = "example_key";
        $fecha = time();
        $payload = array(
            "correo" => $params['correo'],
            "clave" => $params['clave'],
            "iat" => $fecha,
            "exp" => $fecha + 15000
        );
        $jwt = JWT::encode($payload, $key);
        http_response_code(200);
        return json_encode($jwt);
    });
    $this->post('/validarToken', function (Request $request, Response $response, array $args) {
        $elToken = $request->getHeader('miToken');
        try {
            $jwtDecode = JWT::decode($elToken[0], 'example_key', array('HS256'));
            return $response->withJson(['correo' => $jwtDecode->correo]);
        } catch (Exception $e) {
            return $response->withJson((["mensaje" => "invalido"]));
        }
    });

});


$app->run();

?>