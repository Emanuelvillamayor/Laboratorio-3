<?php

$accion = $_POST["accion"];

switch($accion)
{
    case "agregar":
        AgregarCiudadano();
        break;
    case "mostrar":
        MostrarCiudadanos();
        break;
    case "eliminar":
         EliminarCiudadano();
         break;
    case "modificar":
         ModificarCiudadano();
         break;
    case "filtrar":
         FiltrarCiudadano();
         break;
    case "paises":
         CargarPaises();
         break;
    default:
        echo "=(";
        break;
}

function AgregarCiudadano()
{
    $ciudadano =  $_POST["obJSON"];
    $file = fopen("ciudadanos.json","a");
    if(fwrite($file,$ciudadano . "\n") > 0)
    {
        echo "1";
    }
    fclose($file);
}
function MostrarCiudadanos()
{
    $tabla = "<table border = '2'><tr><td>DNI</td><td>Apellido</td><td>Nombre</td><td>Edad</td><td>Nacionalidad</td><td>Accion</td></tr>";
    $ciudadanos = ArrayCiudadanos();
    
    foreach($ciudadanos as $element)
    {
        $obJSON = json_encode($element);
        $tabla .= "<tr>
               <td>{$element->_dni}</td>
               <td>{$element->_apellido}</td>
               <td>{$element->_nombre}</td>
               <td>{$element->_edad}</td>
               <td>{$element->_nacionalidad}</td>
               <td><input type = 'button' value = 'Eliminar' onclick = 'Test.Manejadora.EliminarCiudadanos({$obJSON})'><br>
               <input type = 'button' value = 'Modificar' onclick = 'Test.Manejadora.ObtenerCiudadano({$obJSON})'></td>
        
        </tr>";
    }
    $tabla .= "</table>";
    echo $tabla;
}
function EliminarCiudadano()
{
    $obJSON = json_decode($_POST["obJSON"]);
    $ciudadanos = ArrayCiudadanos();
    $archivo = fopen("ciudadanos.json","w");
    $datos = "";

    foreach($ciudadanos as $element)
    {
        if($element->_dni != $obJSON->_dni)
        {
            $datos .= json_encode($element) . "\n";
        }
    }
    if(fwrite($archivo,$datos) > 0)
    {
        echo "1";
    }
}
function ModificarCiudadano()
{
    $obJSON = json_decode($_POST["obJSON"]);
    $ciudadanos = ArrayCiudadanos();
    $archivo = fopen("ciudadanos.json","w");
    $datos = "";

    foreach($ciudadanos as $element)
    {
        if($element->_dni == $obJSON->_dni)
        {
            $element->_nombre = $obJSON->_nombre;
            $element->_apellido = $obJSON->_apellido;
            $element->_edad = $obJSON->_edad;
            $element->_nacionalidad = $obJSON->_nacionalidad;
            
            $datos .= json_encode($element) . "\n";
        }
        else
        {
            $datos .= json_encode($element) . "\n";
        }
    }
    if(fwrite($archivo,$datos) > 0)
    {
        echo "1";
    }


}
function FiltrarCiudadano()
{
    $nac = $_POST["pais"];
    $tabla = "<table border = '2'><tr><td>DNI</td><td>Apellido</td><td>Nombre</td><td>Edad</td><td>Nacionalidad</td><td>Accion</td></tr>";
    $ciudadanos = ArrayCiudadanos();
    
    foreach($ciudadanos as $element)
    {
        if($element->_nacionalidad == $nac)
        {
            $obJSON = json_encode($element);
            $tabla .= "<tr>
               <td>{$element->_dni}</td>
               <td>{$element->_apellido}</td>
               <td>{$element->_nombre}</td>
               <td>{$element->_edad}</td>
               <td>{$element->_nacionalidad}</td>
               <td><input type = 'button' value = 'Eliminar' onclick = 'Test.Manejadora.EliminarCiudadanos({$obJSON})'><br>
               <input type = 'button' value = 'Modificar' onclick = 'Test.Manejadora.ObtenerCiudadano({$obJSON})'></td>
        
            </tr>";
        }
    }
    $tabla .= "</table>";
    echo $tabla;
}
function ArrayCiudadanos()
{
    $archivo = fopen("ciudadanos.json","r");
    $ciudadanos = array();
    while(!feof($archivo))
    {
       
       $dato = json_decode(fgets($archivo));
       if($dato == null)
       {
           continue;
       }
       
       array_push($ciudadanos,$dato);
    }
    fclose($archivo);
    return $ciudadanos;
}
function CargarPaises()
{
    $archivo = fopen("paises.json","r");
    echo fread($archivo,filesize("paises.json"));
    fclose($archivo);
}