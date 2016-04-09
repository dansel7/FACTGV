<?php
	// Conexion a la Bd
    require '../../../Database_conf.php';
	mysql_select_db($db_name,$connection) or die("Error de conexion a la base de datos");

	$info = $_POST["data"];
	$data = json_decode(stripslashes($info));
	$id = $data->id_servicio;

	$SqlDelete = sprintf("DELETE FROM catalogo_servicios WHERE `id_servicio`=%d LIMIT 1;",
		mysql_real_escape_string($id));

	$rs  = mysql_query($SqlDelete);
	
	echo json_encode(array(
		"success" 	=> mysql_errno() == 0,
		"msg"		=> mysql_errno() == 0?"Datos Borrados Correctamente":mysql_error()
	));
        
                      // Cerramos la conexion a la bd
 mysql_close($connection);
 ?>