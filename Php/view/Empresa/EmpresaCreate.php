<?php

// Conexion a la Bd
require '../../Database_conf.php';
mysql_select_db($db_name,$connection) or die("Error de conexion a la base de datos");

	$info = $_POST["data"];

	$data = json_decode($info);

	$Nombre = addslashes($data->nombre);

	
                 $SqlInsert ="INSERT INTO empresa
                             SET
                            `nombre`='$Nombre'";
			
			$rs = mysql_query($SqlInsert);

				echo json_encode(array(
					"success" 	=> mysql_errno() == 0,
					"msg"		=> mysql_errno() == 0 ? "Datos Agregados Correctamente":mysql_error(),
					"data"		=> array(
                                            array(
                                                "id_empresa" => mysql_insert_id(),// <--- importantisimo regresar el ID asignado al record, para que funcione correctamente el metodo update y delete
                                                "nombre"=>$Nombre,
                                            )
					)
				));
                                
                                              // Cerramos la conexion a la bd
 mysql_close($connection);
 ?>