<?php

// Conexion a la Bd
require '../../Database_conf.php';
mysql_select_db($db_name,$connection) or die("Error de conexion a la base de datos");

	$info = $_POST["data"];

	$data = json_decode($info);

	$fecha_pago = $data->fecha_pago;
        $numero_cheque=$data->numero_cheque;
	$monto_cheque=$data->monto_cheque;
        $idFacturacion=$data->idfacturacion;
        
                 $SqlInsert ="INSERT INTO abono_clientes
                             SET
                            `fecha_pago`='$fecha_pago',
                            `numero_cheque`='$numero_cheque',
                            `monto_cheque`=$monto_cheque,
                            `idfacturacion`=$idFacturacion";
			$rs = mysql_query($SqlInsert);

				echo json_encode(array(
					"success" 	=> mysql_errno() == 0,
					"msg"		=> mysql_errno() == 0 ? "Datos Agregados Correctamente":mysql_error(),
					"data"		=> array(array(
                                           
                                        ))
				));