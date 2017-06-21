<?php

// Conexion a la Bd
require '../../Database_conf.php';
mysql_select_db($db_name,$connection) or die("Error de conexion a la base de datos");

	$info = $_POST["data"];

	$data = json_decode($info);

	$num_cuenta = $data->numero_cuenta;
        $id_banco = $data->id_banco;
        $id_empresa = $data->id_empresa;
        $partida_contable = $data->partida_contable;

	
                 $SqlInsert ="INSERT INTO cuentas
                             SET
                            `numero_cuenta`='$num_cuenta',
                            `id_banco`=$id_banco,
                            `id_empresa`=$id_empresa,
                            `partida_contable`='$partida_contable'";
			
			$rs = mysql_query($SqlInsert);

				echo json_encode(array(
					"success" 	=> mysql_errno() == 0,
					"msg"		=> mysql_errno() == 0 ? "Datos Agregados Correctamente":mysql_error(),
					"data"		=> array(
                                            array(
                                                "id_cuenta" => mysql_insert_id(),// <--- importantisimo regresar el ID asignado al record, para que funcione correctamente el metodo update y delete
                                                "numero_cuenta"=>$num_cuenta,
                                                "id_banco"=>$id_banco,
                                                "id_empresa"=>$id_empresa,
                                                "partida_contable"=>$partida_contable
                                            )
					)
				));
                                
                                              // Cerramos la conexion a la bd
 mysql_close($connection);
 ?>