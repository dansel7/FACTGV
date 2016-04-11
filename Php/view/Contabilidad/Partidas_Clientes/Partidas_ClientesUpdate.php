<?php

// Conexion a la Bd
require '../../../Database_conf.php';
mysql_select_db($db_name,$connection) or die("Error de conexion a la base de datos");

	$info = $_POST["data"];

	$data = json_decode($info);
        $id_partidas_cliente=$data->id_partidas_cliente;
        $numero_partida=$data->numero_partida;
	$idmaestroclientes = $data->idmaestroclientes;
	
	$SqlUpdate ="UPDATE conta_partidas_maestroclientes
                             SET
                             `numero_partida`='$numero_partida',
                            `idmaestroclientes`=$idmaestroclientes
			 WHERE id_partidas_cliente=$id_partidas_cliente";
        
	$rs = mysql_query($SqlUpdate);

	echo json_encode(array(
		"success" 	=> mysql_errno() == 0,
		"msg"		=> mysql_errno() == 0?"Datos Actualizados":mysql_error()
	));
        
        // Cerramos la conexion a la bd
 mysql_close($connection);
 ?>