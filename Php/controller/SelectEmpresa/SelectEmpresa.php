<?php

if(isset($_POST["id_empresa"])){
  
       session_start();
       error_reporting(0);
       require '../../Database_conf.php';
       //SE VALIDA QUE EL USUARIO Y PASSWORD SEAN LOS CORRECTOS Y DEVUELVE UN RESULTADO 1 o 0
       mysql_select_db($db_name,$connection) or die("Error de conexion a la base de datos");
       
       $sql = "select nombre,direccion,nit,nrc
           from empresa where id_empresa='{$_POST["id_empresa"]}' limit 1";
           
       $Qryres = mysql_query($sql,$connection) or die('La consulta fall&oacute;: '.mysql_error());
       $resultado=  mysql_fetch_row($Qryres);

    if(mysql_num_rows($Qryres)=="1"){
         $_SESSION["nombreEmpresa"]=$resultado[0];
         $_SESSION["direccionEmp"]=  utf8_encode($resultado[1]);
         $_SESSION["nitEmp"]=$resultado[2];
         $_SESSION["nrcEmp"]=$resultado[3];
         $_SESSION["idEmpresa"]=$_POST["id_empresa"];
        echo '{"success":true}'; 
       }else {
        echo '{"success":false}';  
       }

    mysql_close($connection);


}else {
        echo '{"success":false}';  
       }

?>