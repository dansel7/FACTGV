<?php
  session_start();
 // error_reporting(0);
   require '../../Database_conf.php';
   mysql_select_db($db_name,$connection) or die("Error de conexion a la base de datos");

		$arr = array();
                $idempresa=isset($_SESSION["idEmpresa"])? $_SESSION["idEmpresa"]:"-1";

                
            $sql = "SELECT
                        ac.id_abono_clientes,
                        f.numero_factura, 
			if(ac.numero_cheque=-1,'<b>Pago en Efectivo</b>',ac.numero_cheque) numero_cheque,
                        mc.nom_cliente,
                        if(DATE_FORMAT(f.fecha_facturacion, '%d/%m/%Y') = '00/00/0000', null, DATE_FORMAT(f.fecha_facturacion, '%d/%m/%Y')) fecha_facturacion,
			if(DATE_FORMAT(ac.fecha_pago, '%d/%m/%Y') = '00/00/0000', null, DATE_FORMAT(ac.fecha_pago, '%d/%m/%Y')) fecha_pago
                    FROM db_facturacion.abono_clientes  ac
                    left join  abono_bancos ab on ac.id_abono_clientes=ab.id_abono_clientes 
                    inner join facturacion f on f.idfacturacion=ac.idfacturacion
                    inner join maestroclientes mc on mc.idmaestroclientes=f.idmaestroclientes
                where isnull(ab.id_abono_clientes) and f.id_tipo_facturacion!=1 and id_empresa=".$idempresa." and numero_cheque!=0";
                //CONDICION PARA QUE MUESTRE LO QUE POR USUARIO SE HA HECHO
                //where isnull(ab.id_abono_clientes) and f.id_tipo_facturacion!=1 and id_empresa=".$idempresa." and idbenutzer=".$_SESSION["idbenutzer"]." and numero_cheque!=0";

                
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
   
