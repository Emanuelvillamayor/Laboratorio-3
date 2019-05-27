<?php

echo("

<link rel='shortcut icon' href='https://cdn.sstatic.net/Sites/stackoverflow/img/favicon.ico?v=4f32ecc8f43d' type='image/x-icon'>
<!-- ESTOS LINKS SON ESENCIALES -->
  <link rel='stylesheet' href='./node_modules/bootstrap/dist/css/bootstrap.css'/>
  <link rel='stylesheet' href='./node_modules/bootstrapvalidator/dist/css/bootstrapValidator.css'/>

  <script type='text/javascript' src='./node_modules/jquery/dist/jquery.min.js'></script>
  <script type='text/javascript' src='./node_modules/bootstrap/dist/js/bootstrap.min.js'></script>
  <script type='text/javascript' src='./node_modules/bootstrapvalidator/dist/js/bootstrapValidator.js'></script>
<!-- /FIN DE LINKS ESENCIALES -->
<link rel='stylesheet' href='./node_modules/components-font-awesome/css/fontawesome.min.css'> <!-- FOR ICONS STYLE -->


<div class='container'>
    <div class='row'>
        
        <div class='col-md-4'></div>

        <div class='col-md-4'>
            <div class='container well bg-light login_cont' style='width:98%;margin-top:10%; padding: 0 1% 0 1%; background-color:rgba(186, 250, 166, 0.719)'>
                <h4 align='left' style='margin:0 -2% 0 0'>INGRESO</h4>
                <form id='loginForm' method='post' class='well form-horizontal' style='background-color:rgba(141, 252, 183, 0.781)'>
                
                <div class='form-group'>
                <div class='col-md-2 col-sm-3 col-xs-4 lbl'><label class='control-label'>Legajo</label></div>

                <div class='col-md-10 col-sm-12 col-xs-12 inputGroupContainer'>
                  <div class='input-group'>
                    <span class='input-group-addon'><i class='glyphicon glyphicon-asterisk'></i></span>
                    <input name='legajo' id='legajo' placeholder='Legajo' class='form-control' type='number'>
                  </div>
                </div>
              </div>

              <div class='form-group'>
                <div class='col-md-2 col-sm-3 col-xs-4 lbl'><label class='control-label'>Clave</label></div>

                <div class='col-md-10 col-sm-12 col-xs-12 inputGroupContainer'>
                  <div class='input-group'>
                    <span class='input-group-addon'><i class='glyphicon glyphicon-asterisk'></i></span>
                    <input name='clave' id='clave' placeholder='clave' class='form-control' type='password'>
                  </div>
                </div>

                <div class='col-sm-12 col-xs-12 col-md-12' >&nbsp</div>
                  <div>
                    <div class='col-sm-6 col-xs-12 col-md-6' ><button type='submit' id='btnIM' value='Aceptar' class='btn btn-success btn-block'>Aceptar</button></div>
                    <div class='col-sm-6 col-xs-12 col-md-6' ><button type='reset' class='btn btn-warning btn-block' id='btnLimpiar'>Cancelar</button></div>
                  </div>

              </div>

                </form>
            </div>
        </div>
        <div class='col-md-4'></div>
    </div>
</div>

"
);

?>