<?php
  session_start();
  error_reporting(0);
// Conexion a la Bd
require '../../../Database_conf.php';
mysql_select_db($db_name,$connection) or die("Error de conexion a la base de datos");

	$info = $_POST["data"];

	$data = json_decode($info);
        $numero_partida=$data->numero_partida;
	$id_servicio = $data->id_servicio;
        $id_empresa=$_SESSION["idEmpresa"];
	
                 $SqlInsert ="INSERT INTO conta_partidas_servicios
                             SET
                            `numero_partida`='$numero_partida',
                            `id_servicio`=$id_servicio,
                            `id_empresa`=$id_empresa";
			
			$rs = mysql_query($SqlInsert);

				echo json_encode(array(
					"success" 	=> mysql_errno() == 0,
					"msg"		=> mysql_errno() == 0 ? "Datos Agregados Correctamente":mysql_error(),
					"data"		=> array(
                                            array(
                                                "id_partidas_servicios" => mysql_insert_id(),// <--- importantisimo regresar el ID asignado al record, para que funcione correctamente el metodo update y delete
                                                "numero_partida"=>$numero_partida,
                                                "id_servicio"=>$id_servicio,
                                            )
					)
				));
                                
                                              // Cerramos la conexion a la bd
 mysql_close($connection);
 ?>