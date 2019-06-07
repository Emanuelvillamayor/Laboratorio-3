<?php
//require_once "IApiUsable.php";
require_once "AccesoDatos.php";
class Empleado
{
    public $apellido;
    public $nombre;
    public $clave;
    public $legajo;
    public $sueldo;
    public $path_foto;

    function __construct($legajo=null,$apellido=null,$nombre=null,$sueldo=null,$clave=null,$path=null)
    {
        $this->apellido=$apellido;
        $this->nombre=$nombre;
        $this->legajo=$legajo;
        $this->sueldo=$sueldo;
        $this->path_foto=$path;
        $this->clave=$clave;
    }

    public function ToString()
    {   
       return $this->apellido . "-" . $this->nombre."-".$this->legajo . "-" . $this->sueldo . "-" .$this->clave."-". $this->path_foto;
    }

    public static function TraerTodos()
    {

       $empleados =[];

       $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
       
       $consulta = $objetoAccesoDato->RetornarConsulta("SELECT * FROM empleados");

       $consulta->execute();
       
       while($fila = $consulta->fetch())
       {
         $empleado= new Empleado($fila[1],$fila[3],$fila[2],$fila[4],$fila[5],$fila[6]);
         array_push($empleados,$empleado);
       }


       return $empleados;
    }

    public static function Agregar($empleado)
    {

       $objetoDatos = AccesoDatos::DameUnObjetoAcceso();

       $consulta =$objetoDatos->RetornarConsulta("INSERT INTO empleados (legajo, nombre, apellido, sueldo, clave, path_foto)"
                                                       . "VALUES(:legajo, :nombre, :apellido, :sueldo, :clave, :path_foto)"); 
           
       $consulta->bindValue(':legajo', $empleado->legajo, PDO::PARAM_INT);
       $consulta->bindValue(':nombre', $empleado->nombre, PDO::PARAM_STR);
       $consulta->bindValue(':apellido', $empleado->apellido, PDO::PARAM_STR);
       $consulta->bindValue(':sueldo', $empleado->sueldo, PDO::PARAM_INT);
       $consulta->bindValue(':clave', $empleado->clave, PDO::PARAM_STR);
       $consulta->bindValue(':path_foto', $empleado->path_foto, PDO::PARAM_STR);

       return $consulta->execute();
    }
    
    public static function Existe($empleado)
    {
       $empleados =Empleado::TraerTodos();
       $auxReturn = false;
       
       foreach($empleados as $emp) {
           if($emp->legajo == $empleado->legajo) {
               $auxReturn = true;
           }
       }

       return $auxReturn;
    }

    public static function EliminarArchivo($empleado)
    {
       $objetoDatos = AccesoDatos::DameUnObjetoAcceso();

       //ejecuto la consulta de eliminar un usuario en el "legajo" especificado en la base de datos
       $consulta =$objetoDatos->RetornarConsulta("DELETE FROM empleados WHERE legajo= :legajo");

       $consulta->bindValue(':legajo', $empleado->legajo, PDO::PARAM_INT);

       return $consulta->execute();
   
    }

    
    public static function ModificarArchivo($empleado)
    {
     $objetoDatos = AccesoDatos::DameUnObjetoAcceso();

     //ejecuto la consulta de eliminar un usuario en el "legajo" especificado en la base de datos
     $consulta =$objetoDatos->RetornarConsulta('UPDATE empleados SET nombre = :nombre, apellido = :apellido, sueldo = :sueldo, clave = :clave, path_foto = :path_foto WHERE legajo = :legajoAUX' );

     $consulta->bindValue(':nombre', $empleado->nombre, PDO::PARAM_STR);
     $consulta->bindValue(':apellido', $empleado->apellido, PDO::PARAM_STR);
     $consulta->bindValue(':sueldo', $empleado->sueldo, PDO::PARAM_INT);
     $consulta->bindValue(':clave', $empleado->clave, PDO::PARAM_STR);
     $consulta->bindValue(':path_foto', $empleado->path_foto, PDO::PARAM_STR);

     $consulta->bindValue(':legajoAUX', $empleado->legajo, PDO::PARAM_INT);

     return $consulta->execute();

    }

    public static function EliminarFoto($empleado)
    {
       $arrayEmpleados = Empleado::TraerTodos();

       foreach($arrayEmpleados as $emp)
       {
          if($emp->legajo == $empleado->legajo)
          {
             unlink($emp->path_foto);
          }
       }
    }

    /*En esta funcion recibo los datos desde el "url" de la pagina por "get"*/
    
    public function VerificarEmpGet1($request, $response, $args) 
    {
        //obtengo el legajo y la clave por get
        $legajo=$args['legajo'];
        $clave=$args['clave'];

        //creo una instancia de ese empleado para podes utilizar la funcion "VerificarEmpBaseDatos"
        $objEmp=new Empleado($legajo,"a","a",1,$clave);

        //creo un objeto de retorno
        $retorno = new stdClass();
        $retorno->Exito=false;
        $retorno->objEmp= null;

        //obtengo el empleado desde la base de datos
        $elEmpleado=$objEmp->VerificarEmpBaseDatos();
        
        //verifico me devolvio un usuario correcto la base de datos
        if($elEmpleado->legajo!=null)
        {

            $retorno->Exito=true;
            //retorno el objeto de tipo "empleado"
            $retorno->objEmp= $elEmpleado;
        }
 
        
        $newResponse = $response->withJson($retorno, 200);  
       return $newResponse;
    }

    /*En esta funcion recibo los datos pasados desde "params" por "get"*/
    public function VerificarEmpGet2($request, $response, $args) 
    {
        //obtengo el legajo y la clave por get
        $legajo=$_GET['legajo'];
        $clave=$_GET['clave'];

        //creo una instancia de ese empleado para podes utilizar la funcion "VerificarEmpBaseDatos"
        $objEmp=new Empleado($legajo,"a","a",1,$clave);

        //creo un objeto de retorno
        $retorno = new stdClass();
        $retorno->Exito=false;
        $retorno->objEmp= null;

        //obtengo el empleado desde la base de datos
        $elEmpleado=$objEmp->VerificarEmpBaseDatos();
        
        //verifico me devolvio un usuario correcto la base de datos
        if($elEmpleado->legajo!=null)
        {

            $retorno->Exito=true;
            //retorno el objeto de tipo "empleado"
            $retorno->objEmp= $elEmpleado;
        }
 
        
        $newResponse = $response->withJson($retorno, 200);  
       return $newResponse;
    }

    public  function VerificarEmpBaseDatos()
    {
        $objetoAccesoDato = AccesoDatos::DameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM empleados WHERE legajo=:legajo and clave=:clave");
        $consulta->bindValue(':legajo', $this->legajo, PDO::PARAM_INT);
        $consulta->bindValue(':clave', $this->clave, PDO::PARAM_STR);
        $consulta->execute();
        $fila = $consulta->fetch();
        $empleado= new Empleado($fila[1],$fila[3],$fila[2],$fila[4],$fila[5],$fila[6]);


        return $empleado;
    }
}
?>