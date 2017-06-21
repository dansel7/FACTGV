<?php

// Conexion a la Bd
require '../../Database_conf.php';
mysql_select_db($db_name,$connection) or die("Error de conexion a la base de datos");

	$info = $_POST["data"];

	$data = json_decode($info);

		$num_cuenta = $data->numero_cuenta;
                $id_banco = $data->id_banco;
                $id_empresa = $data->id_empresa;
                $id= $data->id_cuenta;
                $partida_contable = $data->partida_contable;    

	
                 $SqlUpdate ="UPDATE cuentas
                             SET
                            `numero_cuenta`='$num_cuenta',
                            `id_banco`=$id_banco,
                            `id_empresa`=$id_empresa,
                            `partida_contable`='$partida_contable'
                             WHERE id_cuenta=$id";
                 
	$rs = mysql_query($SqlUpdate);

	echo json_encode(array(
		"success" 	=> mysql_errno() == 0,
		"msg"		=> mysql_errno() == 0?"Datos Actualizados":mysql_error()
	));
        
        // Cerramos la conexion a la bd
 mysql_close($connection);
 ?>