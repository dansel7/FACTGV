<?php
  session_start();
 // error_reporting(0);
   require '../../Database_conf.php';
   mysql_select_db($db_name,$connection) or die("Error de conexion a la base de datos");

		$arr = array();
                $idempresa=isset($_SESSION["idEmpresa"])? $_SESSION["idEmpresa"]:"-1";
		// Llamamos a la Tabla y sus datos 
                //A PARTIR DE LA SEXTA LINEA DE LA CONSULTA SE 
                //HACEN LAs CONDICIONES PARA DARLE COLOR ROJO SI LA FECHA PROGRAMADA DE PAGO
                //ES MAYOR A LA FECHA ACTUAL, ES DECIR QUE SE HALLA PASADO.
                //Y SI ES IGUAL A LA FECHA ACTUAL SE PONE EN AZUL.
		$sql = "SELECT
                        f.idfacturacion,
                        f.numero_factura, 
                        tf.tipo tipo_facturacion,                  
                        mc.nom_cliente,
                        if(DATE_FORMAT(f.fecha_facturacion, '%d/%m/%Y') = '00/00/0000', null, DATE_FORMAT(f.fecha_facturacion, '%d/%m/%Y')) fecha_facturacion,
                        
                        if(DATE_FORMAT(f.fecha_programada_pago, '%d/%m/%Y') = '00/00/0000', 
							
                            if(NOW() >= ADDDATE(f.fecha_facturacion, INTERVAL 30 DAY),
                                if(DATE_FORMAT(NOW(), '%d/%m/%Y') = DATE_FORMAT(ADDDATE(f.fecha_facturacion, INTERVAL 30 DAY), '%d/%m/%Y')
				 ,CONCAT('<tt style=\"color:#4D14CC\">',DATE_FORMAT(ADDDATE(f.fecha_facturacion, INTERVAL 30 DAY), '%d/%m/%Y'),'</tt>')
                                 ,concat('<tt style=\"color:#CC4F14\">',DATE_FORMAT(ADDDATE(f.fecha_facturacion, INTERVAL 30 DAY), '%d/%m/%Y'),'</tt>'))
                             ,CONCAT('<tt>',DATE_FORMAT(ADDDATE(f.fecha_facturacion, INTERVAL 30 DAY), '%d/%m/%Y'),'</tt>')), 
                            
                            if(NOW() >= f.fecha_programada_pago,
                                if(DATE_FORMAT(NOW(), '%d/%m/%Y') = DATE_FORMAT(f.fecha_programada_pago, '%d/%m/%Y')
				,CONCAT('<b style=\"color:blue\">',DATE_FORMAT(f.fecha_programada_pago, '%d/%m/%Y'),'</b>')
                                ,concat('<b style=\"color:red\">',DATE_FORMAT(f.fecha_programada_pago, '%d/%m/%Y'),'</b>'))
                             ,CONCAT('<b>',DATE_FORMAT(f.fecha_programada_pago, '%d/%m/%Y'),'</b>'))) fecha_programada_pago,
                     
                        iFNull(sum(ac.monto_cheque),0) abonado,
                        f.venta_total total_factura,
                        f.gastos_reintegro,
                        ((f.venta_total+f.gastos_reintegro)-iFNull(sum(ac.monto_cheque),0)-iFNull((NotaC.venta_total),0)) saldo_pendiente,
                        IF(f.cond_operacion='Contado',DATEDIFF(ADDDATE(NOW(), INTERVAL 1 DAY),f.fecha_facturacion),
				IF(DATEDIFF(ADDDATE(NOW(), INTERVAL 1 DAY),f.fecha_facturacion)>30,DATEDIFF(ADDDATE(NOW(), INTERVAL 1 DAY),ADDDATE(f.fecha_facturacion, INTERVAL 30 DAY)),0) 
                         )  DiasMora
                        from facturacion f
                        left join abono_clientes ac on f.idfacturacion=ac.idfacturacion
                        inner join maestroclientes mc on f.idmaestroClientes=mc.idmaestroClientes 
                        inner join tipo_facturacion tf on f.id_tipo_facturacion=tf.id_tipo_facturacion
                        left join (select n_comprobante_credito idfactura, numero_factura numero_NotaC, sum(venta_total) venta_total from facturacion where id_tipo_facturacion=1 and anulado='No' AND id_empresa=".$idempresa." group by n_comprobante_credito) NotaC on f.idfacturacion=NotaC.idfactura

                        WHERE f.id_tipo_facturacion!=1 and f.anulado='No' and f.id_empresa=".$idempresa."
                        GROUP BY f.idfacturacion
                        HAVING saldo_pendiente>0
                        ORDER BY mc.nom_cliente ASC";
    //CONDICIONES PARA QUE MUESTRE SOLO LO QUE POR USUARIO SE HA REALIZADO
    //WHERE f.id_tipo_facturacion!=1 and f.anulado='No' and id_empresa=".$idempresa." and idbenutzer=".$_SESSION["idbenutzer"]."
    	
                $result = mysql_query($sql,$connection) or die('La consulta fall&oacute;: '.mysql_error());		
		//Formamos el Array de Datos, si ejecutamos este archivo PHP veremos el array formado
		while($obj = mysql_fetch_object($result)) {
						$arr[] = $obj;
					}
                            echo '{ metaData: { "root": "data"}';	
                            echo ',"success":true, "data":' . json_encode($arr) . '}';


// Cerramos la conexion a la bd
 mysql_close($connection);
?>
   
