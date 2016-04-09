<?php

// Conexion a la Bd
require '../../../Database_conf.php';
mysql_select_db($db_name,$connection) or die("Error de conexion a la base de datos");

	$info = $_POST["data"];

	$data = json_decode($info);

	$servicio = $data->servicio;
	$id = $data->id_servicio;
	
	$SqlUpdate ="UPDATE catalogo_servicios
                             SET
                            `servicio`='$servicio'
			 WHERE id_servicio=$id";
        
	$rs = mysql_query($SqlUpdate);

	echo json_encode(array(
		"success" 	=> mysql_errno() == 0,
		"msg"		=> mysql_errno() == 0?"Datos Actualizados":mysql_error()
	));
        
        // Cerramos la conexion a la bd
 mysql_close($connection);
 ?>