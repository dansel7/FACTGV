<?php

// Conexion a la Bd
require '../../Database_conf.php';
mysql_select_db($db_name,$connection) or die("Error de conexion a la base de datos");

	$info = $_POST["data"];

	$data = json_decode($info);

	$fecha_remesa = $data->fecha_remesa;
        $numero_remesa=$data->numero_remesa;
        $id_cuenta=$data->id_cuenta;
        $id_abono_clientes=$data->id_abono_clientes;
        
                 $SqlInsert ="INSERT INTO abono_bancos
                             SET
                            `fecha_remesa`='$fecha_remesa',
                            `numero_remesa`='$numero_remesa',
                            `id_cuenta`=$id_cuenta,    
                            `id_abono_clientes`=$id_abono_clientes";
                 
			$rs = mysql_query($SqlInsert);
                        

				echo json_encode(array(
					"success" 	=> mysql_errno() == 0,
					"msg"		=> mysql_errno() == 0 ? "Datos Agregados Correctamente":mysql_error(),
					"data"		=> array(array(
                                           
                                        ))
				)); 
                                
              // Cerramos la conexion a la bd
 mysql_close($connection);
 ?>