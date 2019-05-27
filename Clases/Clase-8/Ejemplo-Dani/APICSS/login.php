<!doctype html>
<html lang="es">
    <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <link rel="shortcut icon" href="https://cdn.sstatic.net/Sites/stackoverflow/img/favicon.ico?v=4f32ecc8f43d" type="image/x-icon">
<!-- ESTOS LINKS SON ESENCIALES -->
  <link rel="stylesheet" href="./node_modules/bootstrap/dist/css/bootstrap.css"/>
  <link rel="stylesheet" href="./node_modules/bootstrapvalidator/dist/css/bootstrapValidator.css"/>

  <script type="text/javascript" src="./node_modules/jquery/dist/jquery.min.js"></script>
  <script type="text/javascript" src="./node_modules/bootstrap/dist/js/bootstrap.min.js"></script>
  <script type="text/javascript" src="./node_modules/bootstrapvalidator/dist/js/bootstrapValidator.js"></script>
<!-- /FIN DE LINKS ESENCIALES -->
<link rel="stylesheet" href="./node_modules/components-font-awesome/css/fontawesome.min.css"> <!-- FOR ICONS STYLE -->
<!-- New fontawesome -->
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous">
<link rel="stylesheet" href="CSS/login.css">
<script src="FRONTEND/login.js"></script>
    <title>Login</title>
    </head>
    <body class="text-center" style="background-color:rgb(242, 245, 205);">
    <div class="alert" style="font-size:500%;text-align:center;"><i id="spinner" class="fa fa-spinner hidden"></i></div>
    <div class="container">
        <div class="row">
            <div class="col-sm-2 col-xs-2 col-md-2" >&nbsp</div>
            <div class="col-sm-8 col-xs-8 col-md-8" >
            
                <div class="container well bg-light login_cont" style="width:98%;margin-top:10%; padding: 0 1% 0 1%; background-color:rgba(248, 219, 222, 0.719)">
                <h1 align="left" style="margin:0 -2% 0 0">LOGIN</h1><label id="alert" class="label label-warning hidden" style="font-size:18px">El usuario no existe</label>
                <form id="loginForm" method="post" class="well form-horizontal" style="background-color:rgba(240, 240, 240, 0.781)">
                
        
                    <div class="form-group">
                        <div class="col-md-2 col-sm-3 col-xs-4 lbl"><label class="control-label">Legajo</label></div>
                        
                        <div class="col-md-10 col-sm-12 col-xs-12 inputGroupContainer">
                            <div class="input-group">
                                <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
                                <input name="legajo" id="legajo" placeholder="Legajo" class="form-control" type="text">
                            </div>
                        </div>
                    </div>
        
                
                    <div class="form-group">
                            <div class="col-md-2 col-sm-3 col-xs-4 lbl"><label class="control-label">Clave</label></div>
                        
                        <div class="col-md-10 col-sm-12 col-xs-12 inputGroupContainer">
                            <div class="input-group">
                                <span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
                                <input name="clave" id="clave" class="form-control" type="password" placeholder="Clave">
                            </div>
                        </div>
                        <div class="col-sm-12 col-xs-12 col-md-12" >&nbsp</div>
                        <div>
                            <div class="col-sm-6 col-xs-12 col-md-6" ><button type="button" class="btn btn-primary btn-block" id="btnEnviar" onclick="Login()">Enviar</button></div>
                            
                            <div class="col-sm-6 col-xs-12 col-md-6" ><button type="reset" class="btn btn-warning btn-block" id="btnLimpiar">Limpiar</button></div>
                        </div>
                        
                    </div>
        
                </form>
                <br>
                <div style="background-color:rgba(255, 255, 255, 0)"><button type="button" class="btn btn-success btn-block" onclick="Registro()">Quiero Registrarme!</button></div>
                
                </div>
            </div>
            <div class="col-sm-2 col-xs-2 col-md-2" >&nbsp</div>
        </div>
    </div>
    </body>
</html>