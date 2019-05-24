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

    public function VerificarEmp($request, $response, $args) 
    {
        $legajo=(string)$args['legajo'];
        $clave=$args['clave'];
        $objEmp=new emp($legajo,$clave,1);
       // var_dump($objEmp) ;die();

        $elEmpleado=$objEmp->VerificarEmpBaseDatos();
        var_dump($elEmpleado);die();
        
        $newResponse = $response->withJson($elEmpleado, 200);  
       return $newResponse;
     
    }

    public  function VerificarEmpBaseDatos()
    {
        $objetoAccesoDato = AccesoDatos::DameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM empleados WHERE legajo=:legajo and clave=:clave");
      //  var_dump($this);die();
     // echo $this->legajo;die();
        $consulta->bindValue(':legajo', $this->legajo, PDO::PARAM_INT);
        $consulta->bindValue(':clave', $this->clave, PDO::PARAM_STR);
        $consulta->execute();
        $fila = $consulta->fetch();
        $empleado= new emp($fila[1],$fila[2],$fila[0]);
        
        return $empleado;
    }
}
?>