<?php
//require_once "IApiUsable.php";
require_once "AccesoDatos.php";
class emp
{
    public $id;
    public $legajo;
    public $clave;

    function __construct($legajo=null,$clave=null, $id=null )
    {
        $this->id=$id;
        $this->legajo=$legajo;
        $this->clave=$clave;
    }

    /*En esta funcion recibo los datos desde el "url" de la pagina por "get"*/
    
    public function VerificarEmpGet1($request, $response, $args) 
    {
        //obtengo el legajo y la clave por get
        $legajo=$args['legajo'];
        $clave=$args['clave'];

        //creo una instancia de ese empleado para podes utilizar la funcion "VerificarEmpBaseDatos"
        $objEmp=new emp($legajo,$clave,1);

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
        $objEmp=new emp($legajo,$clave,1);

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
        $consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM emp WHERE legajo=:legajo and clave=:clave");
        $consulta->bindValue(':legajo', $this->legajo, PDO::PARAM_INT);
        $consulta->bindValue(':clave', $this->clave, PDO::PARAM_STR);
        $consulta->execute();
        $fila = $consulta->fetch();
        $empleado= new emp($fila[1],$fila[2],$fila[0]);

        return $empleado;
    }
}
?>