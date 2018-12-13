<?php
session_start();

$isLogged = $_SESSION["islogged"] ?? FALSE;

//si el usuario no está logeado o es de tipo Profesor, el sistema lo rediccionará a la página de inicio (Login)
if (!$isLogged || ($_SESSION["tipo"] == "prof"))
{
  header("Location: logout.php");
  exit;
}

include_once ('init.php');

//estos son los archivos que se ocuparán para el funcionamiento del módulo de AULAS
//se requiere tanto de los archivos de administrador y director porque estos son los usuarios que podrán ingresar a este módulo
use Horarios\model\manageAdmin;
use Horarios\model\manageDire;
use Horarios\model\aulas\adminAulas; //este archivo contiene los métodos que se mandarán llamar en este módulo

//se crea un objeto de la clase adminAulas que se encuentra en el archivo model/aulas/adminAulas
//se envía el tipo de usuario que haya ingresado
$au = new adminAulas($_SESSION["tipo"]);

//se crea un objeto que depende del tipo de usuario que haya ingresado, ya que para cada tipo existe una interfaz diferente
switch($_SESSION["tipo"]) {
  case 'admi':
    $panel = new manageAdmin($_SESSION["usuario"], $_SESSION["tipo"], $_SESSION["carrera"],$_SESSION["contrato"]);
    break;
  case 'dire':
    $panel = new manageDire($_SESSION["usuario"], $_SESSION["tipo"], $_SESSION["carrera"],$_SESSION["contrato"]);
    break;
  default:
    die ("Ha ocurrido un problema.");
    break;
}


?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="icon" href="img/favicon.ico">

    <title>Panel de Administración</title>

    <!-- Bootstrap core CSS -->
    <link href="style/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="style/font-awesome.min.css">

    <!-- Custom styles for this template -->
    <link href="style/dashboard.css" rel="stylesheet">
  </head>

  <body>

    <?php
    //el objeto $panel se creó de acuerdo al tipo de usuario y se ejecutan los siguientes métodos que se encargan de "dibujar" el menú lateral
    $panel->writeHTMLPanelBar();
    $panel->writeHTMLNavBar();
    ?>

    <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
     <div class="col-md-12 colarr">
               <div class="panel panel-default">
                   <div class="panel-heading main-color-bg">
                       <h3 class="panel-title">Aulas</h3>
                   </div>
                   <div class="panel-body">
                   	<!--Estas son las 3 opciones que aparecen cuando se selecciona el módulo de aulas, cada botón cuenta con un id que se encargará de ejecutar determinadas acciones que se encuentran en el archivo adminAulasActions.js  -->
                       <div class="row">
                           <div class="col-md-12">
                               <a class= "btn btn-success" type="button" id="btnAddAula"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span> Agregar nueva aula</a>
                               <a class= "btn btn-info" type="button" id="btnAddEquipo"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span> Agregar nuevo equipo</a>
                               <a class= "btn btn-light" type="button" id="btnAddCategoria"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span> Agregar nueva categoría</a>
                           </div>
                       </div>
                       <br>
                       <!--En este espacio se dibujará una tabla con los elementos que se encuentren registrados, es por eso que este div cuenta con un id-->
                       <div id="tableAulas">
                         
                       </div>
                   </div>
               </div>
           </div>
   </div>

  	<!--El objeto $au será el encargado de mandar llamar los métodos de su clase, los cuales contienen modales para registrar un nuevo equipo, una nueva categoría, una nueva aula y para modificar el aula-->
      
  	<!-- Agregar equipo -->
      <?php
      $au->writeHTMLAddEquipo();
      ?>

    <!-- Agregar categoría -->
      <?php
      $au->writeHTMLAddCategoria();
      ?>
      
    <!-- Modificar aula -->
      <?php
      $au->writeHTMLModAula();
      ?>

    <!-- Agregar aula -->
      <?php
      $au->writeHTMLAddAula();
      ?>
      

    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script src="js/jquery-3.3.1.min.js"></script>
    <script src="js/jquery.validate.min.js"></script>
    <script src="js/adminAulasActions.js"></script> <!--Este archivo es el que contiene las acciones que realizará cada uno de los elementos de la interfaz-->

    <!-- <script src="style/alertify/alertify.min.js"></script> -->
    <script src="js/bootstrap.min.js"></script>
  </body>
</html>
