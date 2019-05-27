<?php
use Firebase\JWT\JWT;
#Clase Usuario
# nombre apellido legajo sueldo foto

class Usuario
{
    public static function AltaDeUsuario($request,$response) # Funciona
    {
        $ArrayDeParametros = $request->getParsedBody();
        $apellido = $ArrayDeParametros['apellido'];
        $nombre = $ArrayDeParametros['nombre'];
        $legajo = $ArrayDeParametros['legajo'];
        $clave = $ArrayDeParametros['clave'];
        $sueldo = $ArrayDeParametros['sueldo'];
        
        
        $objRes = new stdClass();
        $objRes->Mensaje = "";
        $estado = 500;

        $objUsuario = new stdClass();
        $objUsuario->apellido = $apellido;
        $objUsuario->nombre = $nombre;
        $objUsuario->legajo = $legajo;
        $objUsuario->clave = $clave;
        $objUsuario->sueldo = $sueldo;
        
        $archivos = $request->getUploadedFiles();
        $nombreAnterior=$archivos['foto']->getClientFilename(); // OJO con los ids 
        
        $destino="./BACKEND/fotos/";

        $extension= explode(".", $nombreAnterior)  ;
            
        $extension=array_reverse($extension);

        

        $foto= $legajo."_".$apellido.".".$extension[0]; //Seteo la imagen para la BD

        $objUsuario->foto = $foto;

        try 
        {
            $archivos['foto']->moveTo($destino.$legajo."_".$apellido.".".$extension[0]);
        } 
        catch (Exception $e) 
        {
            $objRes->Mensaje = $e->getMessage();
            $estado = 500;
            return $response->withJson($objRes,$estado);
        }

        try
        {
            $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
            $consulta =$objetoAccesoDato->RetornarConsulta('INSERT into empleados (nombre,apellido,legajo,clave,sueldo,foto)values(:nombre,:apellido,:legajo,:clave,:sueldo,:foto)');
            
            $consulta->bindValue(':nombre', $objUsuario->nombre, PDO::PARAM_STR);
            $consulta->bindValue(':apellido', $objUsuario->apellido, PDO::PARAM_STR);
            $consulta->bindValue(':sueldo', $objUsuario->sueldo, PDO::PARAM_INT);
            $consulta->bindValue(':legajo', $objUsuario->legajo, PDO::PARAM_INT);
            $consulta->bindValue(':clave', $objUsuario->clave, PDO::PARAM_STR);
            $consulta->bindValue(':foto', $objUsuario->foto, PDO::PARAM_STR);
            $consulta->execute();
            if($consulta->rowCount())
            {
                $objRes->Mensaje = "Empleado agregado con exito!";
                $estado = 200;
                return $response->withJson($objRes,$estado);
            }
            else
            {
                $objRes->Mensaje = "Error al agregar empleado!";
                $estado = 504;
                return $response->withJson($objRes,$estado);
            }
        }
        catch(Exception $e)
        {
            $objRes->Mensaje = $e->getMessage();
            $estado = 500;
            return $response->withJson($objRes,$estado);
        }
    }

    public static function ListadoDeUsuarios($request,$response) # Funciona
    {
        try
        {
            $objRes = new stdClass();
            $objRes->Mensaje = "";

            $objUsers = new stdClass();
            
            $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
            $consulta =$objetoAccesoDato->RetornarConsulta('SELECT * FROM empleados');

            $consulta->execute();

            if($consulta->rowCount())
            {
                
                $objUsers = $consulta->fetchAll(PDO::FETCH_CLASS, "Usuario");
                
                return $response->withJson($objUsers,200);
            }
            else
            {
                $objRes->Mensaje = "Error listado";
                return $response->withJson($objRes);
            }

        }
        catch(Exception $e)
        {
            $objRes->Mensaje = $e->getMessage();
            return $response->withJson($objRes, 500);
        }

    }

    public static function Login($request,$response,$args)
    {
        /* $ArrayDeParametros = $request->getParsedBody();  Es solo para POST*/
        $legajo = $args['legajo'];
        $clave = $args['clave'];

        //Creando objeto usuario
        $objUsuario = new stdClass();
        $objUsuario->legajo = $legajo;
        $objUsuario->clave = $clave;

        $objRes = new stdClass();
        $objRes->Mensaje = "";

        try 
        {
            $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
            $consulta =$objetoAccesoDato->RetornarConsulta('SELECT * FROM empleados WHERE legajo=:legajo AND clave=:clave');
            $consulta->bindParam(':legajo',$objUsuario->legajo);
            $consulta->bindParam(':clave',$objUsuario->clave);
            $consulta->execute();
            
            if($consulta->rowCount())
            {
                
                $obj = $consulta->fetch(PDO::FETCH_LAZY);
                $objUsuario = array('id'=>$obj->id,'legajo'=>$obj->legajo,'clave'=>$obj->clave);
                
                return $response->withJson($objUsuario);
            }
            else
            {
                $objRes->Mensaje = "Usuario no existe";
                return $response->withJson($objRes); 
            }
        } 
        catch(Exception $e) 
        {
            $objRes->Mensaje = $e->getMessage();
            return $response->withJson($objRes, 500);
        }

    
        return null;
    }
    
    public static function BorradoDeUsuarios($request,$response) # Funciona
    {
        $ArrayDeParametros = $request->getParsedBody();
        $id = $ArrayDeParametros['id'];
        $foto_vieja = $ArrayDeParametros['foto_vieja']; //Esta foto viene desde el objeto (desde javaScript), pero si uso Postman
        //pasarla manualmente en el body, osea el path

        $destino = "./BACKEND/fotos/";
        
        $objRes = new stdClass();
        $objRes->Mensaje = "Error";

        $usuario = new stdClass();
        $usuario->id = $id;

        try 
        {
            $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
            $consulta =$objetoAccesoDato->RetornarConsulta('DELETE FROM empleados WHERE id = :id');
            
            $consulta->bindValue(':id', $usuario->id, PDO::PARAM_INT);
            
            $consulta->execute();
            if($consulta->rowCount())
            {
                // Si llegué hasta acá, entonces elimino físicamente la foto

                unlink($destino.$foto_vieja); 

                $objRes->Mensaje = "Usuario eliminado con exito!";
                
                return $response->withJson($objRes,200);
            }
            else
            {
                $objRes->Mensaje = "Error al eliminar usuario!";
                
                return $response->withJson($objRes,200); //200 para poder mostrar el mensaje por consola, pero que no se rompa
            }
        } 
        catch (Exception $e) 
        {
            $objRes->Mensaje = $e->getMessage();
            return $response->withJson($objRes, 500);
        }
    }

    public static function ModificadoDeUsuarios($request,$response) # VER LO DE PUT, NO SE PUEDE USAR LA FOTO EN POSTMAN
    {
        $ArrayDeParametros = $request->getParsedBody();
        $id = $ArrayDeParametros['id'];
        $apellido = $ArrayDeParametros['apellido'];
        $nombre = $ArrayDeParametros['nombre'];
        $legajo = $ArrayDeParametros['legajo']; // No se puede modificar el legajo
        $sueldo = $ArrayDeParametros['sueldo'];
        $clave = $ArrayDeParametros['clave'];
        $foto_vieja = $ArrayDeParametros['foto_vieja'];

        $objRes = new stdClass();
        $objRes->Mensaje = "";

        $objUsuario = new stdClass();
        $objUsuario->id = $id;
        $objUsuario->apellido = $apellido;
        $objUsuario->nombre = $nombre;
        //$objUsuario->legajo = $legajo;
        $objUsuario->sueldo = $sueldo;
        $objUsuario->clave = $clave;

        
        $archivos = $request->getUploadedFiles();
        $nombreAnterior=$archivos['foto']->getClientFilename(); // OJO con los ids 
        
        $destino="./BACKEND/fotos/";

        $extension= explode(".", $nombreAnterior)  ;
            
        $extension=array_reverse($extension);

        $foto= $legajo."_".$apellido.".".$extension[0]; //Seteo la imagen para la BD

        $objUsuario->foto = $foto;

        //Elimino la foto vieja

        unlink($destino . $foto_vieja);

        //Trato de mover la nueva foto al destino
        try 
        {
            $archivos['foto']->moveTo($destino.$legajo."_".$apellido.".".$extension[0]);
        } 
        catch (Exception $e) 
        {
            $objRes->Mensaje = $e->getMessage();
            return $response->withJson($objRes, 409);
        }

        try //En el caso si se movio correctamente
        {
            $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
            $consulta =$objetoAccesoDato->RetornarConsulta("UPDATE empleados set apellido=:apellido,nombre=:nombre,clave=:clave,sueldo=:sueldo,foto=:foto WHERE id=:id");
            
            $consulta->bindValue(':id', $objUsuario->id, PDO::PARAM_INT);
            $consulta->bindValue(':apellido', $objUsuario->apellido, PDO::PARAM_STR);
            $consulta->bindValue(':nombre', $objUsuario->nombre, PDO::PARAM_STR);
            //$consulta->bindValue(':legajo', $objUsuario->legajo, PDO::PARAM_INT);            
            $consulta->bindValue(':clave', $objUsuario->clave, PDO::PARAM_STR);
            $consulta->bindValue(':sueldo', $objUsuario->sueldo, PDO::PARAM_INT);
            $consulta->bindValue(':foto', $objUsuario->foto, PDO::PARAM_STR);
            
            $consulta->execute();
            $consulta->setFetchMode(PDO::FETCH_LAZY);
            
            if($consulta->rowCount())
            {
                $objRes->Mensaje = "Usuario modificado con exito!";
            }
            else
            {
                $objRes->Mensaje = "Error al modificar usuario!";
            }
        } 
        catch (Exception $e) 
        {
            $objRes->Mensaje = $e->getMessage();
            return $response->withJson($objRes, 409);
        }

        return $response->withJson($objRes);
    }
}
#Clase MW
class MW
{
    
    public function VerificarLegajo($request,$response,$next)
    {
        $ArrayDeParametros = $request->getParsedBody();
        
        $legajo = isset($ArrayDeParametros['legajo']);

        $objRes = new stdClass();
        $objRes->Mensaje = "";
        $estado = 409;

        if($legajo)
        {
            $response = $next($request,$response); //ok si seteado, ejecuta otro middleware (el de Vacio)
        }
        else
        {
            $objRes->Mensaje = "El legajo no esta seteado!";
            $Newresponse = $response->withJson($objRes,$estado); //409
            return $Newresponse;
        }

        return $response; //200
    }

    public static function EstaVacio($request,$response,$next)
    {
        $ArrayDeParametros = $request->getParsedBody();
        
        $legajo = $ArrayDeParametros['legajo'];

        $objRes = new stdClass();
        $objRes->Mensaje = "";
        $estado = 409;

        if($legajo !== "")
        {
            $response = $next($request,$response); //ok si no es vacío. Se ejecuta el sig. middleware (Existe)
        }
        else
        {
            $objRes->Mensaje = "El legajo está vacío!";
            $Newresponse = $response->withJson($objRes,$estado); //409
            return $Newresponse;
        }

        return $response; //200
    }

    public function Existe($request,$response,$next)
    {
        $ArrayDeParametros = $request->getParsedBody();
        $legajo= $ArrayDeParametros['legajo'];
        
        $objRes = new stdClass();
        $objRes->Mensaje = "";
        

        $objUsuario = new stdClass();
        $objUsuario->Legajo = $legajo;
        
        try
        {
            $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
            $consulta =$objetoAccesoDato->RetornarConsulta('SELECT * FROM empleados WHERE legajo=:legajo'); // Si se encontró, entonces existe y no se ingresa el usuario
            $consulta->bindParam(':legajo',$objUsuario->Legajo);
            
            $consulta->execute();
            if($consulta->rowCount())
            {
                $objRes->Mensaje = "El usuario con el legajo [ ".$objUsuario->Legajo." ] ya existe!";
                $Newresponse = $response->withJson($objRes,200); //200 para mostrar un mensaje
                return $Newresponse;
            }
            else
            {
                $response = $next($request,$response); # Ejecuto el sig. middleware (IngresarUsuario)
                return $response; //200 si no encontrado, permito el ingreso
            }
            
        }
        catch(Exception $e)
        {
            $objRes->Mensaje = $e->getMessage();
            return $response->withJson($objRes, 500); //500
        }
    }
# El el futuro voy a necesitar
    /* public static function ValidarToken($request,$response)
    {
        $ArrayDeParametros = $request->getParsedBody();
        $token = $ArrayDeParametros['token'];

        $obj = new stdClass();
		$obj->Mensaje = "";

		
		try
		{
			//Decodifico el token
			$decodificado = JWT::decode(
				$token,
				"ClaveSecreta",
				['HS256']
			);
		}
		catch (Exception $e)
		{
			$obj->Mensaje = $e->getMessage();
            return $response->withJson($obj,500);
		}

		$obj->Mensaje = "Token OK";
		return $response->withJson($obj, 200);
    } */
}


?>