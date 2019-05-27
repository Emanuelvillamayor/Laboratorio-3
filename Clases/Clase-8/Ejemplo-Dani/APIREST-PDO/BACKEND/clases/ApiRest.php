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
        $sueldo = $ArrayDeParametros['sueldo'];
        
        
        $objRes = new stdClass();
        $objRes->Mensaje = "";
        $estado = 500;

        $objUsuario = new stdClass();
        $objUsuario->apellido = $apellido;
        $objUsuario->nombre = $nombre;
        $objUsuario->correo = $correo;
        $objUsuario->legajo = $legajo;
        $objUsuario->sueldo = $sueldo;
        
        $archivos = $request->getUploadedFiles();
        $nombreAnterior=$archivos['foto']->getClientFilename(); // OJO con los ids 
        
        $destino="./fotos/";

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
            $consulta =$objetoAccesoDato->RetornarConsulta('INSERT into usuarios (nombre,apellido,legajo,sueldo,foto)values(:nombre,:apellido,:legajo,:sueldo,:foto)');
            
            $consulta->bindValue(':nombre', $objUsuario->nombre, PDO::PARAM_STR);
            $consulta->bindValue(':apellido', $objUsuario->apellido, PDO::PARAM_STR);
            $consulta->bindValue(':sueldo', $objUsuario->sueldo, PDO::PARAM_INT);
            $consulta->bindValue(':legajo', $objUsuario->legajo, PDO::PARAM_INT);
            $consulta->bindValue(':foto', $objUsuario->foto, PDO::PARAM_STR);
            $consulta->execute();
            if($consulta->rowCount())
            {
                $objRes->Mensaje = "Usuario agregado con exito!";
                $estado = 200;
                return $response->withJson($objRes,$estado);
            }
            else
            {
                $objRes->Mensaje = "Error al agregar usuario!";
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
            $consulta =$objetoAccesoDato->RetornarConsulta('SELECT * FROM usuarios');

            $consulta->execute();

            if($consulta->rowCount())
            {
                
                $objUsers = $consulta->fetchAll(PDO::FETCH_CLASS, "Usuario");
                
                return $response->withJson($objUsers,200);
            }
            else
            {
                $objRes->Mensaje = "Error listado";
                return $response->withJson($objRes,409);
            }

        }
        catch(Exception $e)
        {
            $objRes->Mensaje = $e->getMessage();
            return $response->withJson($objRes, 500);
        }

    }

    public static function TraerUno($id) //Se usa internamente para recuperar datos de un solo empleado
    {

        try
        {
            $objRes = new stdClass();
            $objRes->Mensaje = "";

            $objUsers = new stdClass();
            
            $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
            $consulta =$objetoAccesoDato->RetornarConsulta('SELECT * FROM usuarios WHERE id = :id');

            $consulta->bindParam(':id',$id);

            $consulta->execute();

            if($consulta->rowCount())
            {
                
                $objUsers = $consulta->fetchAll(PDO::FETCH_CLASS, "Usuario");
                
                return json_encode($objUsers);
            }
            else
            {
                $objRes->Mensaje = "Error";
                return json_encode($objRes);
            }

        }
        catch(Exception $e)
        {
            $objRes->Mensaje = $e->getMessage();
            return json_encode($objRes);
        }
    }

    public static function Login($request,$response,$next)
    {

        /* $ArrayDeParametros = $request->getParsedBody();  Es solo para POST*/
        $legajo = $_GET['legajo'];
        $clave = $_GET['clave'];

        //Creando objeto usuario
        $objUsuario = new stdClass();
        $objUsuario->legajo = $legajo;
        $objUsuario->clave = $clave;

        $objRes = new stdClass();
        $objRes->Mensaje = "";

        try 
        {
            $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
            $consulta =$objetoAccesoDato->RetornarConsulta('SELECT * FROM usuarios WHERE legajo=:legajo AND clave=:clave');
            $consulta->bindParam(':legajo',$objUsuario->legajo);
            $consulta->bindParam(':clave',$objUsuario->clave);
            $consulta->execute();
            
            if($consulta->rowCount())
            {
                
                $obj = $consulta->fetch(PDO::FETCH_LAZY);
                $usuario = array('id'=>$obj->id,'legajo'=>$obj->legajo,'clave'=>$obj->clave);
                
                $response->getBody()->write(json_encode($usuario));
                $response = $next($request,$response);
                return $response;
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
    
    public static function BorradoDeUsuarios($request,$response) # REHACER LO DE LA IMAGEN
    {
        $ArrayDeParametros = $request->getParsedBody();
        $id = $ArrayDeParametros['id'];
        

        $destino = "./fotos/";
        
        $objRes = new stdClass();
        $objRes->Mensaje = "Error";

        $usuario = new stdClass();
        $usuario->id = $id;

        try 
        {
            # Recupero objeto desde la BD para eliminar la foto

            $MiUsuario = json_decode(Usuario::TraerUno($id)); // Acá transformo para testear la respuesta
            if($MiUsuario->Mensaje == "Error")
            {
                $objRes->Mensaje = "Error al eliminar usuario!";
                return $response->withJson($objRes, 409);
            }
            //Si no tira error, se procede
            $MiUsuario = Usuario::TraerUno($id); // Recupero cadena json, ojo NO ES UN OBJETO
            // Atencion ! Para poder convertir cadena en objeto JSON tengo que limpiarla borrando los corchetes
            $dato1 = str_replace("[","",$MiUsuario);
            $dato2 = str_replace("]","",$dato1);
            $ObjUser = json_decode($dato2); // Al eliminar los corchetes queda algo como 
            //{"id": "6","nombre": "Vanessa","apellido": "Biol","legajo": "285","sueldo": "8300","foto": "285_Biol.jpg"}
            //por lo que ahora es muy fácil de transformarlo a objeto JSON y acceder a sus valores
            
# Puedo hacer de otra manera, pegando código de leer desde la BD directamente aquí, pero lo hago más prolijo

            $foto_a_eliminar = $ObjUser->foto; // Recupero la foto desde la BD

            $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
            $consulta =$objetoAccesoDato->RetornarConsulta('DELETE FROM usuarios WHERE id = :id');
            
            $consulta->bindValue(':id', $usuario->id, PDO::PARAM_INT);
            
            $consulta->execute();
            if($consulta->rowCount())
            {
                // Si llegué hasta acá, entonces elimino físicamente la foto

                unlink($destino.$foto_a_eliminar); 

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

    public static function ModificadoDeUsuarios($request,$response)
    {
        $ArrayDeParametros = $request->getParsedBody();
        $id = $ArrayDeParametros['id'];
        $apellido = $ArrayDeParametros['apellido'];
        $nombre = $ArrayDeParametros['nombre'];
        //$legajo = $ArrayDeParametros['legajo']; // No se puede modificar el legajo
        $sueldo = $ArrayDeParametros['sueldo'];

        $objRes = new stdClass();
        $objRes->Mensaje = "";

        $objUsuario = new stdClass();
        $objUsuario->id = $id;
        $objUsuario->apellido = $apellido;
        $objUsuario->nombre = $nombre;
        $objUsuario->correo = $correo;
        //$objUsuario->legajo = $legajo;
        $objUsuario->sueldo = $sueldo;

        $MiUsuario = json_decode(Usuario::TraerUno($id)); // Acá transformo para testear la respuesta
        if($MiUsuario->Mensaje == "Error")
        {
            $objRes->Mensaje = "Error al modificar usuario o el mismo no existe!";
            return $response->withJson($objRes, 409);
        }
        //Si no tira error, se procede
        $MiUsuario = Usuario::TraerUno($id); // Recupero cadena json, ojo NO ES UN OBJETO
        // Atencion ! Para poder convertir cadena en objeto JSON tengo que limpiarla borrando los corchetes
        $dato1 = str_replace("[","",$MiUsuario);
        $dato2 = str_replace("]","",$dato1);
        $ObjUser = json_decode($dato2); // Al eliminar los corchetes queda algo como 
        //{"id": "6","nombre": "Vanessa","apellido": "Biol","legajo": "285","sueldo": "8300","foto": "285_Biol.jpg"}
        //por lo que ahora es muy fácil de transformarlo a objeto JSON y acceder a sus valores
            
# Puedo hacer de otra manera, pegando código de leer desde la BD directamente aquí, pero lo hago más prolijo

        $foto_a_eliminar = $ObjUser->foto; // Recupero la foto desde la BD


        $archivos = $request->getUploadedFiles();
        $nombreAnterior=$archivos['foto']->getClientFilename(); // OJO con los ids 
        
        $destino="./fotos/";

        $extension= explode(".", $nombreAnterior)  ;
            
        $extension=array_reverse($extension);

        $foto= $legajo."_".$apellido.".".$extension[0]; //Seteo la imagen para la BD

        $objUsuario->foto = $foto;

        //Elimino la foto vieja

        unlink($destino . $foto_a_eliminar);

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
            $consulta =$objetoAccesoDato->RetornarConsulta("UPDATE usuarios set apellido=:apellido,nombre=:nombre,sueldo=:sueldo,foto=:foto WHERE id=:id");
            
            $consulta->bindValue(':id', $objUsuario->id, PDO::PARAM_INT);
            $consulta->bindValue(':apellido', $objUsuario->apellido, PDO::PARAM_STR);
            $consulta->bindValue(':nombre', $objUsuario->nombre, PDO::PARAM_STR);
            //$consulta->bindValue(':legajo', $objUsuario->legajo, PDO::PARAM_INT);
            $consulta->bindValue(':sueldo', $objUsuario->sueldo, PDO::PARAM_INT);
            $consulta->bindValue(':foto', $objUsuario->foto, PDO::PARAM_STR);
            
            $consulta->execute();
            $consulta->setFetchMode(PDO::FETCH_LAZY);
            
            if($consulta->rowCount() > 0)
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
            $consulta =$objetoAccesoDato->RetornarConsulta('SELECT * FROM usuarios WHERE legajo=:legajo'); // Si se encontró, entonces existe y no se ingresa el usuario
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