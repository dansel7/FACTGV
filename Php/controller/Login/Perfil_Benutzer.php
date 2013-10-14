<?php
session_start();
   error_reporting(0);
if(isset($_SESSION["benutzer"])){
     

    echo $_SESSION["idperfil"];   
}

?>