<?php
  session_start();
  error_reporting(0);
// Conexion a la Bd
require '../../Database_conf.php';
mysql_select_db($db_name,$connection) or die("Error de conexion a la base de datos");

        $info = $_POST["data"];
	$data = json_decode($info);
        $idFacturacion=$_GET["idf"];
        
        $qry="";
        foreach($data as $fila){
        //SE ASIGNAN LOS VALORES AL ARRAY PARA PODER INSERTARLOS COMO VALUES en el formato ('val1','val2')
        $qry.= "(".$idFacturacion .",". $fila->id_servicio .",". $fila->cantidad .",'". addslashes($fila->concepto) ."',". $fila->valor_concepto .",". (($fila->venta_nosujeta !='') ? $fila->venta_nosujeta : '0.0') .",". (($fila->venta_exenta !='') ? $fila->venta_exenta : '0.0') .",". (($fila->venta_gravada !='') ? $fila->venta_gravada : '0.0') . ",".$_SESSION["idbenutzer"]."),";
        }
        
        $qry = preg_replace('/,$/', '', $qry);//para quitar la coma del final de la cadena
        
//Solo faltaria agregarlos a la tabla y crear bien el insert
	 $SqlDelete ="DELETE FROM detalleFacturacion where idFacturacion=$idFacturacion";
                            
		$delRs = mysql_query($SqlDelete);
        
        
         $SqlInsert ="INSERT INTO detalleFacturacion
                            (`idFacturacion`,
                            `id_servicio`,
                            `cantidad`,
                            `concepto`,
                            `valor_concepto`,
                            `venta_nosujeta`,
                            `venta_exenta`,
                            `venta_gravada`,
                            `idbenutzer`)
                            VALUES ".$qry;
			
		$rs = mysql_query($SqlInsert);
                                
        echo json_encode(array(
                "success" 	=> mysql_errno() == 0,
                "msg"		=> mysql_errno() == 0 ? " Datos Agregados Correctamente: " : mysql_error(),


        ));
        
                      // Cerramos la conexion a la bd
 mysql_close($connection);
 ?>