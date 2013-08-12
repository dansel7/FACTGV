<?
	session_start();
        if(isset($_GET["var"])){
           unset($_SESSION["idEmpresa"]);
           unset($_SESSION["nombreEmpresa"]);
        }else{
	session_destroy(); // destruyo la sesión 
        }
    header("Location: ../../../"); //envío al usuario a la pag. de autenticación 
       
?>