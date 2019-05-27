<?php
include_once "AccesoDatos.php";
include_once "Empleado.php";

$op = isset($_POST["op"]) ? $_POST["op"] : null;


switch ($op) {

    case "subirFoto":

        $objRetorno = new stdClass();
        $objRetorno->Exito = "ERROR";

        $destino = "./archivos/".date("Ymd_His").".".$_POST["legajo"] . "_" . $_POST["apellido"] . ".jpg";

        $foto = date("Ymd_His").".".$_POST["legajo"] . "_" . $_POST["apellido"] . ".jpg"; //Para setear el objeto

        if(move_uploaded_file($_FILES["foto"]["tmp_name"], $destino) ){

            $empleado = new Empleado($_POST["legajo"],$_POST["apellido"],$_POST["nombre"],$_POST["sueldo"],$foto);

            $ok = json_decode(Empleado::Agregar($empleado));

            if($ok->Mensaje == TRUE)
            {
                $objRetorno->Exito = "OK";
                $objRetorno->Path = $destino;
            }
            
        }

        echo json_encode($objRetorno);

        break;

    case "MostrarListado":
        
        
        $tabla ="<table border = '8' class='table table-condensed' style='text-align:center'><thead><th>Legajo</th><th>Apellido</th><th>Nombre</th><th>Sueldo</th><th>Foto</th><th>Acciones</th></thead>";

        foreach (Empleado::TraerTodos() as $key) {

            $Objempleado = new StdClass();
            $Objempleado->legajo = $key->legajo;
            $Objempleado->apellido = $key->apellido;
            $Objempleado->nombre = $key->nombre;
            $Objempleado->sueldo = $key->sueldo;
            $Objempleado->path_foto = $key->path_foto;

    
            $tabla .= "<td>".$key->legajo."</td><td>".$key->apellido ."</td><td>".$key->nombre."</td><td>".$key->sueldo ."</td><td>"."<img src='./archivos/".$key->path_foto."'width='100px' height='100px'></td>"."<td><input class='btn btn-danger' type='button' onclick='Eliminar(".json_encode($Objempleado).")' value='Eliminar'><input class='btn btn-primary' type='button' onclick='Modificar(".json_encode($Objempleado).")' value='Modificar'><tr>";
        
        }

        $tabla .= "<tr></table>";
        
        echo $tabla;
        break;

    case "Eliminar": # Funciona

        $objRetorno = new stdClass();
        $objRetorno->Exito = FALSE;

        $cadenaJSON = isset($_POST['cadenaJson']) ? $_POST['cadenaJson'] : null;
        $obj = json_decode($cadenaJSON);

        $ar = fopen("Empleados.txt","r");

        $string = ''; //Para guardar los strings no eliminados

        while (!feof($ar)) {
            
            $cadena = fgets($ar);

            $cadena = trim($cadena);

            if($cadena == "")
            {
                continue;
            }

            $bloques = explode(" - ",$cadena);
            
            if($bloques[0] == $obj->legajo && $bloques[1] == $obj->apellido && $bloques[2] == $obj->nombre && $bloques[3] == $obj->sueldo && $bloques[4] == $obj->path_foto)
            {
                //Elimino la foto
                unlink("./archivos/".$obj->path_foto); // Cualquiera de los puedo pasar, tanto $bloques como objeto
                continue;
            }

            $string .= $cadena . "\r\n";
            
        }

        fclose($ar);

        $ar = fopen("Empleados.txt","w"); // Para sobreescribir con datos nuevos
        $cont = fwrite($ar,$string);

        fclose($ar);

        if($cont > 0)
        {
            $objRetorno->Exito = TRUE;
        }
        
        echo json_encode($objRetorno);

        break;

    case "Modificar": #Funciona

        $objRetorno = new stdClass();
        $objRetorno->Exito = FALSE;

        //Este caso es diferente al de todos los otros en donde se pasaba un objeto de una clase

        $legajo = isset($_POST["legajo"]) ? $_POST["legajo"] : NULL;
        $apellido = isset($_POST["apellido"]) ? $_POST["apellido"] : NULL;
        $nombre = isset($_POST["nombre"]) ? $_POST["nombre"] : NULL;
        $sueldo = isset($_POST["sueldo"]) ? $_POST["sueldo"] : NULL;
        
        $destino = "./archivos/".date("Ymd_His").".".$legajo . "_" . $apellido . ".jpg";
        $foto = date("Ymd_His").".".$legajo . "_" . $apellido . ".jpg"; //Para setear el objeto

        $arrayEmpleados = Empleado::TraerTodos();


        $empleado = new Empleado($legajo, $apellido, $nombre, $sueldo, $foto);


        foreach ($arrayEmpleados as $key) {

            if($key->legajo == $legajo) // hago el mismo proceso que con el eliminar
            {
                //Elimino la foto
                unlink("./archivos/".$key->foto);

                
            }
            
            
        }

        fclose($ar);

        if($cont > 0)
        {
            //Si se pudo escribir, procedo a subir la foto
            if(move_uploaded_file($_FILES["foto"]["tmp_name"], $destino))
            {
                $objRetorno->Exito = TRUE;
                $objRetorno->Path = $destino;
            }
        }

        echo json_encode($objRetorno);

        break;

    default:
        echo ":(";
        break;
}



/* $archivo = $_FILES["archivo"]["name"];

$extension = pathinfo($archivo, PATHINFO_EXTENSION);

$destino = "./archivos/".$_POST["legajo"] . "_" . $_POST["apellido"] . "." . $extension;

$empleado = new Empleado($_POST["legajo"],$_POST["apellido"],$_POST["nombre"],$_POST["sueldo"],$destino);

if(move_uploaded_file($_FILES["archivo"]["tmp_name"],$destino))
{
    $subido = TRUE;
}
else
{
    $subido = FALSE;
}

$ok = $empleado::Agregar($empleado);

if($ok == TRUE && $subido == TRUE)
{
    echo "Los datos se guardaron con exito";
}
else
{
    echo "Error al guardar empleado";
}
echo "<br><br>";
 /* var_dump($empleado->TraerTodos()); */

/*$tabla ="<table style='border: 1px solid black'><tr><th>Legajo</th><th>Apellido</th><th>Nombre</th><th>Sueldo</th><th>Foto</th></tr>";

 foreach ($empleado->TraerTodos() as $key) {
     
    $tabla .= "<td>".$key->legajo."</td><td>".$key->apellido ."<td>".$key->nombre."<td>".$key->sueldo ."<td>"."<img src='".$key->path_foto."'width='100px' height='100px'>"

 }
$table . = "</tr></table>";
echo $tabla; */
?>