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

	
                 $SqlInsert ="INSERT INTO benutzer
                             SET
                            `Nombre`='$Nombre',
                            `Apellido`='$Apellido',
                            `benutzer`='$benutzer',
                            `kennwort`= AES_ENCRYPT('$kennwort','*6v!114t0rO'),
                            `id_perfil`=$id_perfil";
			
			$rs = mysql_query($SqlInsert);

				echo json_encode(array(
					"success" 	=> mysql_errno() == 0,
					"msg"		=> mysql_errno() == 0 ? "Datos Agregados Correctamente":mysql_error(),
					"data"		=> array(
                                            array(
                                                "idbenutzer" => mysql_insert_id(),// <--- importantisimo regresar el ID asignado al record, para que funcione correctamente el metodo update y delete
                                                "Nombre"=>$Nombre,
                                                "Apellido"=>$Apellido,
                                                "benutzer"=>$benutzer,
                                                "kennwort"=>$kennwort,
                                                "id_perfil"=>$id_perfil
                                            )
					)
				));
                                
                                              // Cerramos la conexion a la bd
 mysql_close($connection);
 ?>