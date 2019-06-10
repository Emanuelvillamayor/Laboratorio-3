<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
     <!--AGREGO REFERENCIA DE ESTILOS-->
     <link type="text/css" rel="stylesheet" href="login.css" />
         <!-- AGREGO LA LIBRERIA DE JQUERY -->
    <script
  src="https://code.jquery.com/jquery-3.2.1.js"
  integrity="sha256-DZAnKJ/6XZ9si04Hgrsxu/8s717jcIzLy3oi35EouyE="
  crossorigin="anonymous"></script>
        
    <!-- AGREGO FUNCIONES PROPIAS CON USO DE JQUERY -->
    <script type="text/javascript" src="login.js"></script>
    <!-- Latest compiled and minified CSS -->
<link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.0.3/css/bootstrap.min.css">

<!-- Optional theme -->
<link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.0.3/css/bootstrap-theme.min.css">

<!-- Latest compiled and minified JavaScript -->
<script src="//netdna.bootstrapcdn.com/bootstrap/3.0.3/js/bootstrap.min.js"></script>
    <title>Clase 09</title>
</head>



<body>
    <br><br><br>
<div class="container-fluid" >
    <div class="row">
        <div class="col-md-4 col-sm-3 col-xs-3 "></div>
            <div class="col-md-4 col-sm-6 col-xs-6" style="background-color:lime;" >
                <form >
                    <div class ="row" >
                        <div class="col-md-12 col-sm-12 col-xs-12" style="background-color:blue"><strong style="color:white;font-size: 20pt;">Ingreso</strong></div>
                    </div>

                    <div class ="row">
                        <div class="col-md-4 col-sm-4 col-xs-4"><span >Legajo:</span></div>
                        <div class="col-md-8 col-sm-8 col-xs-8"><input type="text" class="form-control" id="txtLegajo"></div>
                    </div><br>

                    <div class ="row">
                        <div class="col-md-4 col-sm-4 col-xs-4"><span >Clave:</span></div>
                        <div class="col-md-8 col-sm-8 col-xs-8"><input type="text" class="form-control" id="txtClave"></div>
                    </div><br>

                    <div class ="row">
                        <div class="col-md-4 col-sm-4 col-xs-6"><input type="button" id="btnAceptar" value="Enviar" class ="Aceptar" onclick="Login()"></div>
                        <div class="col-md-4 col-sm-4 col-xs-6"></div>
                        <div class="col-md-4 col-sm-4 col-xs-6"><input type="button" value="Cancelar" class ="Cancelar"></div>
                    </div><br>

                    <div class="row">
                        <div class ="col-md-4 col-sm-4 col-xs-4"></div> 
                        <div class ="col-md-4 col-sm-4 col-xs-4"><input type="button" class="btn btn-success" data-toggle="modal" data-target="#modalRegistro" id="btnRegistrar" value="Registrarme"></div> 
                    </div>
                    
                    
                    <!--Modal para registrarse-->
                    <div id="modalRegistro" class="modal fade" role="dialog">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                                            <h4 class="modal-title">Ingrese los datos para registrarse:</h4>
                                        </div>
                                        <div class="modal-body">
                                            <div class ="row">
                                                <div class="col-md-4 col-sm-4 col-xs-4"><span >Nombre:</span></div>
                                                <div class="col-md-8 col-sm-8 col-xs-8"><input type="text" class="form-control" id="txtNombreReg"></div>
                                            </div><br>
                                            <div class ="row">
                                                <div class="col-md-4 col-sm-4 col-xs-4"><span >Apellido:</span></div>
                                                <div class="col-md-8 col-sm-8 col-xs-8"><input type="text" class="form-control" id="txtApellidoReg"></div>
                                            </div><br>
                                            <div class ="row">
                                                <div class="col-md-4 col-sm-4 col-xs-4"><span >Legajo:</span></div>
                                                <div class="col-md-8 col-sm-8 col-xs-8"><input type="text" class="form-control" id="numLegajoReg"></div>
                                            </div><br>
                                            <div class ="row">
                                                <div class="col-md-4 col-sm-4 col-xs-4"><span >Sueldo:</span></div>
                                                <div class="col-md-8 col-sm-8 col-xs-8"><input type="text" class="form-control" id="numSueldoReg"></div>
                                            </div><br>
                                            <div class ="row">
                                                <div class="col-md-4 col-sm-4 col-xs-4"><span >Clave:</span></div>
                                                <div class="col-md-8 col-sm-8 col-xs-8"><input type="text" class="form-control" id="txtClaveReg"></div>
                                            </div><br>
                                            <div class ="row">
                                                <div class="col-md-4 col-sm-4 col-xs-4"><span >Imagen de perfil:</span></div>
                                                <div class="col-md-8 col-sm-8 col-xs-8"><input type="file" name="fileFoto" id="fileFoto"></div>
                                            </div><br>
                                        </div>
                                        <div class="modal-footer">
                                            <div class="col-md-4 col-sm-4 col-xs-6"><input type="button" id="btnAceptar" value="Enviar" class ="btn btn-success" onclick="Registro()"></div>
                                            <div class="col-md-4 col-sm-4 col-xs-6"></div>
                                            <div class="col-md-4 col-sm-4 col-xs-6"><input type="button" value="Cerrar" data-dismiss="modal" class ="btn btn-danger"></div>
                                           <!-- <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>-->
                                    </div>
                                </div>
                        </div>
                    </div>
                    <br>
                </form>
            </div>
       </div>
    <div class="col-md-4 col-sm-4 col-xs-4"></div>
</div>
</div>


    
</body>
</html>