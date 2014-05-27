<?php

// Conexion a la Bd
require '../../Database_conf.php';
mysql_select_db($db_name,$connection) or die("Error de conexion a la base de datos");

	$info = $_POST["data"];

	$data = json_decode($info);

	$nom_cliente = addslashes($data->nom_cliente);
	$direccion = addslashes($data->direccion); 
	$NIT = addslashes($data->NIT);
        $NRC = addslashes($data->NRC);
        $id_departamento=$data->id_departamento;
        $giro=addslashes($data->giro);
        $gran_contribuyente=$data->gran_contribuyente;
        $activo=$data->activo;
	
                 $SqlInsert ="INSERT INTO maestroClientes
                             SET
                            `nom_cliente`='$nom_cliente',
                            `direccion`='$direccion',
                            `NIT`='$NIT',
                            `NRC`='$NRC',
                            `id_departamento`=$id_departamento,
                            `giro`='$giro',
                            `gran_contribuyente`='$gran_contribuyente',
                            `activo`='$activo'";
			
			
			$rs = mysql_query($SqlInsert);

				echo json_encode(array(
					"success" 	=> mysql_errno() == 0,
					"msg"		=> mysql_errno() == 0 ? "Datos Agregados Correctamente":mysql_error(),
					"data"		=> array(
                                            array(
                                                "idmaestroClientes" => mysql_insert_id(),	// <--- importantisimo regresar el ID asignado al record, para que funcione correctamente el metodo update y delete
                                                "nom_cliente"=>$nom_cliente,
                                                "direccion"=>$direccion,
                                                "NIT"=>$NIT,
                                                "NRC"=>$NRC,
                                                "id_departamento"=>$id_departamento,
                                                "giro"=> $giro,
                                                "gran_contribuyente"=> $gran_contribuyente,
                                                "activo"=> $activo
                                            )
					)
				));
                                
                                              // Cerramos la conexion a la bd
 mysql_close($connection);
 ?>