<?php

if(isset($_GET["opx"])){
  //VARIABLES
    $idEmp=isset($_GET["idEmp"])? $_GET["idEmp"] :"";
    $idbenutzer=isset($_GET["idbenutzer"])? $_GET["idbenutzer"] :"";
    
       session_start();
       error_reporting(0);
       require '../../../Database_conf.php';
       //SE VALIDA QUE EL USUARIO Y PASSWORD SEAN LOS CORRECTOS Y DEVUELVE UN RESULTADO 1 o 0
       mysql_select_db($db_name,$connection) or die("Error de conexion a la base de datos");
       if($_GET["opx"]=="addUserEmp"){
          $sql = "INSERT INTO empresa_perfil SET id_empresa=".$idEmp.",id_benutzer=".$idbenutzer; 
       }
       
       if($_GET["opx"]=="rmvUserEmp"){
         $sql = "DELETE FROM empresa_perfil WHERE id_empresa=".$idEmp." AND id_benutzer=".$idbenutzer;  
       }
       if($_GET["opx"]==""){
         $sql = "select 1";
       }
           
       $Qryres = mysql_query($sql,$connection) or die('La consulta fall&oacute;: '.mysql_error());
       $resultado=  mysql_fetch_row($Qryres);

    if(mysql_affected_rows($Qryres)=="1"){
        echo '{"success":true}'; 
       }else {
        echo '{"success":false}';  
       }

    mysql_close($connection);

}else {
        echo '{"success":false}';  
       }

?>