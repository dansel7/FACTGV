<?php
session_start();
error_reporting(0); 
      
   $benutzer=isset($_SESSION["benutzer"])?$_SESSION["benutzer"]:"";
if(isset($_GET["token"]) && $benutzer!="" ){ 
    
   $idempresa=isset($_SESSION["idEmpresa"]) ? $_SESSION["idEmpresa"]:"";
   $anio=isset($_GET["anio"]) ? $_GET["anio"]:"2013";
   $mes=isset($_GET["mes"]) ? $_GET["mes"]:"1";
   
   require '../Database_conf.php';
   mysql_select_db($db_name,$connection) or die("Error de conexion a la base de datos");

		$arr = array();
		// Llamamos a la Tabla maestro clientes y filtramos solo los que esten activos
		$sql = "SELECT concat(T1.anio,' ',CASE(T2.mes)
                        when 1 then 'Enero'
                        when 2 then 'Febrero'
                        when 3 then 'Marzo'
                        when 4 then 'Abril'
                        when 5 then 'Mayo'
                        when 6 then 'Junio'
                        when 7 then 'Julio'
                        when 8 then 'Agosto'
                        when 9 then 'Septiembre'
                        when 10 then 'Octubre'
                        when 11 then 'Noviembre'
                        when 12 then 'Diciembre' END ) Fecha,
                        T1.Anio,CASE(T2.mes)
                        when 1 then 'Enero'
                        when 2 then 'Febrero'
                        when 3 then 'Marzo'
                        when 4 then 'Abril'
                        when 5 then 'Mayo'
                        when 6 then 'Junio'
                        when 7 then 'Julio'
                        when 8 then 'Agosto'
                        when 9 then 'Septiembre'
                        when 10 then 'Octubre'
                        when 11 then 'Noviembre'
                        when 12 then 'Diciembre' END Mes,
                        ifnull(facturado,0) Facturado,
                        ifnull(abonado,0) Abonado,
                        ifnull(nota_credito,0) Nota_Credito,
                        (ifnull(facturado,0)-ifnull(abonado,0)-ifnull(nota_credito,0)) Pendiente,
                        round(ifnull(abonado,0)/ifnull(facturado,0),3)*100 Porcentaje_Abonado, 
                        round(ifnull(nota_credito,0)/ifnull(facturado,0),3)*100 Porcentaje_Nota_Credito ,
                        round((ifnull(facturado,0)-ifnull(abonado,0)-ifnull(nota_credito,0))/ifnull(facturado,0),3)*100 Porcentaje_Pendiente
                         FROM
                        (select year(fecha_facturacion) anio,MONTH(fecha_facturacion) mes,sum(venta_total) facturado 
                                    from facturacion
                                    WHERE id_tipo_facturacion!=1 and anulado='No' and id_empresa=".$idempresa ."
                                    and MONTH(fecha_facturacion)>".$mes ." and year(fecha_facturacion)>".$anio ."
                                    group by year(fecha_facturacion),month(fecha_facturacion)
                        ) T1 
                        LEFT JOIN
                        (select year(fecha_facturacion) anio,MONTH(fecha_facturacion) mes,sum(monto_cheque) abonado
                                    from facturacion f 
                                    left join  abono_clientes ac on f.idfacturacion=ac.idfacturacion
                                    WHERE id_tipo_facturacion!=1 and anulado='No' and id_empresa=".$idempresa ."
                                    and MONTH(fecha_facturacion)>".$mes ." and year(fecha_facturacion)>".$anio ."
                                    group by year(fecha_facturacion),month(fecha_facturacion)
                        ) T2 ON T1.anio=T2.anio AND T1.mes=T2.mes
                        LEFT JOIN
                        (select year(fecha_facturacion) anio,MONTH(fecha_facturacion) mes,sum(venta_total) nota_credito
                                    from facturacion 
                                    where id_tipo_facturacion=1  and anulado='No' AND id_empresa=".$idempresa ."
                                    and MONTH(fecha_facturacion)>".$mes ." and year(fecha_facturacion)>".$anio ."
                                    group by year(fecha_facturacion),month(fecha_facturacion)
                        )T3 ON T1.anio=T3.anio AND T1.mes=T3.mes";
                
    	$result = mysql_query($sql,$connection) or die('La consulta fall&oacute;: '.mysql_error());	
      
		//Formamos el Array de Datos, si ejecutamos este archivo PHP veremos el array formado
		while($obj = mysql_fetch_assoc($result)) {
						$arr[] = $obj;
					}
                            echo json_encode($arr);


// Cerramos la conexion a la bd
 mysql_close($connection);
}
?>