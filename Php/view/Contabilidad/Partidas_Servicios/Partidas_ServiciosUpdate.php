<?php

// Conexion a la Bd
require '../../../Database_conf.php';
mysql_select_db($db_name,$connection) or die("Error de conexion a la base de datos");

	$info = $_POST["data"];

	$data = json_decode($info);
        $id_partidas_servicios=$data->id_partidas_servicios;
        $numero_partida=$data->numero_partida;
	$id_servicio = $data->id_servicio;
	
	$SqlUpdate ="UPDATE conta_partidas_servicios
                             SET
                            `numero_partida`='$numero_partida',
                            `id_servicio`=$id_servicio
			 WHERE id_partidas_servicios=$id_partidas_servicios";
        
	$rs = mysql_query($SqlUpdate);

	echo json_encode(array(
		"success" 	=> mysql_errno() == 0,
		"msg"		=> mysql_errno() == 0?"Datos Actualizados":mysql_error()
	));
        
        // Cerramos la conexion a la bd
 mysql_close($connection);
 ?>