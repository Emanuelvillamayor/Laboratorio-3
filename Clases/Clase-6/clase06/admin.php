<?php
require "Empleado.php";

$op = isset($_POST["op"]) ? $_POST["op"] : null;


switch ($op) {

    case "subirFoto":

    $objRetorno= new stdClass();

    $objRetorno->Ok= false;
    
    $extension=pathinfo($_FILES["foto"]["name"],PATHINFO_EXTENSION);
    
    
    //voy a obtener el dato de destino de imagen
    $destino ="fotos_empleados/" .$_POST["numLegajo"] ."_" . $_POST["txtApellido"] . "." .$extension;
    
    $empleado = new Empleado($_POST["numLegajo"],$_POST["txtApellido"],$_POST["txtNombre"],$_POST["numSueldo"],$destino);
    Empleado::Agregar($empleado);
    
    //muevo el archivo temporal a una carpeta fisica $destino
    if(move_uploaded_file($_FILES["foto"]["tmp_name"],$destino))
    {
        $objRetorno->Ok=true;
        $objRetorno->Path=$destino;
        $objRetorno->nombre=$_POST["txtNombre"];
        $objRetorno->apellido=$_POST["txtApellido"];
        $objRetorno->legajo=$_POST["numLegajo"];
        $objRetorno->sueldo=$_POST["numSueldo"];
    }
    echo json_encode($objRetorno);
        break;

    case 'mostrarListado':
    $tabla ="";
    $tabla.= "<table border=1>";
    $tabla.= "<thead>";
    $tabla.= "<tr>";
    $tabla.= "<td>Nombre</td>";
    $tabla.= "<td>Legajo</td>";
    $tabla.= "<td>Foto</td>";
    $tabla.= "<td>Accion</td>";
    $tabla.= "</tr>";
    $tabla.= "</thead>";
    $empleado= new Empleado("as","as","g","t","t");
    $arrayEmpleados = $empleado->TraerTodos();
    if($arrayEmpleados!==null && count($arrayEmpleados)!==0)
    {
        foreach($arrayEmpleados as $emp)
        {
           
            $tabla.= "<tr>";

            $tabla.= "<td>";
            $tabla.= $emp->legajo;
            $tabla.= "</td>";

            $tabla.= "<td>";
            $tabla.= $emp->nombre;
            $tabla.= "</td>";

            $tabla.= "<td>";
            if($emp->path_foto!= "")
            {
                //hago esto para eliminar el \r\n y para que el programa pueda verificar si la imagen existe
                $path =  explode("\r\n",$emp->path_foto); 
                if(file_exists($path[0])) 
                {
                    //aca no debe tener el \r\n para poder verlo 
                    $tabla.= '<img src=./'.$emp->path_foto.'" alt=./"'.$emp->path_foto.'" height="100px" width="100px">'; 
                }
               else {
                $tabla.= 'no hay imagen '.$emp->path_foto; 
                }
            }
            $tabla.= "</td>";

            $JsonRetorno = new stdClass();
            $JsonRetorno->nombre= $emp->nombre;
            $JsonRetorno->apellido=$emp->apellido;
            $JsonRetorno->legajo = $emp->legajo;
            $JsonRetorno->sueldo=$emp->sueldo;
            $JsonRetorno->path_foto=$emp->path_foto;

            $cadenaEmpleado = json_encode($JsonRetorno);
            $tabla.= "<td><input type='button' onclick='Eliminar(".json_encode($cadenaEmpleado).")' value='Enviar'</td>";

            //echo "<td><input type='button' onclick='Eliminar(".json_encode($emp).")' value='Enviar'</td>";

            $tabla.= "</tr>";
            
        }
        $tabla.= "</table>";
        echo $tabla;
    }
        break;

    case 'Eliminar':

    $objEmpleado = json_decode($_POST["obj"]) ;


    $empleado= new Empleado($objEmpleado->legajo,$objEmpleado->apellido,$objEmpleado->nombre,$objEmpleado->sueldo,$objEmpleado->path_foto);
    if($empleado->Existe($empleado))
    {
        echo "si";
    }
    else
    {
        echo "no";
    }

       break;

    default:
        echo ":(";
        break;
}

?>