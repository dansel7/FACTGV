<?php

 session_start();
  error_reporting(0);
// Conexion a la Bd
require '../../Database_conf.php';
   mysql_select_db($db_name,$connection) or die("Error de conexion a la base de datos");

		$arr = array();
		if($_GET["id"]!="")  $idFact=$_GET["id"]; else $idFact = "-1";
                    $sql = "select * from detalleFacturacion where idFacturacion = ".$idFact;
                   
                    $result = mysql_query($sql,$connection) or die('La consulta fall&oacute;: '.mysql_error());		

                    while($obj = mysql_fetch_object($result)) {
			$arr[] = $obj;
                    }
                   
                    echo json_encode($arr);

    	

// Cerramos la conexion a la bd
 mysql_close($connection);

?>
   