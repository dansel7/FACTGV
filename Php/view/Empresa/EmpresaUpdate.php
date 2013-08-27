<?php

// Conexion a la Bd
require '../../Database_conf.php';
mysql_select_db($db_name,$connection) or die("Error de conexion a la base de datos");

	$info = $_POST["data"];

	$data = json_decode($info);

	$Nombre = $data->Nombre;
	$Apellido = $data->Apellido;
	$benutzer = $data->benutzer;
        $kennwort = $data->kennwort;
        $id_perfil =$data->id_perfil;
	$id = $data->idbenutzer;
	
	$SqlUpdate ="UPDATE benutzer
                             SET
                            `Nombre`='$Nombre',
                            `Apellido`='$Apellido',
                            `benutzer`='$benutzer',
                            `id_perfil`=$id_perfil
			 WHERE idbenutzer=$id";
        
	$rs = mysql_query($SqlUpdate);

	echo json_encode(array(
		"success" 	=> mysql_errno() == 0,
		"msg"		=> mysql_errno() == 0?"Datos Actualizados":mysql_error()
	));