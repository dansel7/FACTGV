<?php
session_start();
error_reporting(0); 

   $benutzer=isset($_SESSION["benutzer"])?$_SESSION["benutzer"]:"";
if(isset($_GET["token"]) && $benutzer!="" ){ 
    
   $idempresa=isset($_SESSION["idEmpresa"]) ? $_SESSION["idEmpresa"]:"";
    $filtros=json_decode (stripslashes ($_GET["filter"]), true);
    $anio="";
    $dmes="";
    $hmes="";             
    $mes="";
    foreach ($filtros as $key => $value) {
      if($value["property"]=="Anio"){
         $anio=" and year(fecha_facturacion)=".$value["value"];
      }
      if($value["property"]=="dMes"){
         $dmes=" and MONTH(fecha_facturacion)>=".$value["value"];
      }
      if($value["property"]=="hMes"){
         $hmes=" and MONTH(fecha_facturacion)<=".$value["value"]; 
      }
      if($value["property"]=="Mes"){
         $mes=" and MONTH(fecha_facturacion)=".$value["value"]; 
      }
      
    }
   
   
   require '../Database_conf.php';
   mysql_select_db($db_name,$connection) or die("Error de conexion a la base de datos");

		$arr = array();
		// Llamamos a la Tabla maestro clientes y filtramos solo los que esten activos
		$sql = "SELECT concat(T1.anio,' ',CASE(T2.mes)
                        when 01 then 'Enero'
                        when 02 then 'Febrero'
                        when 03 then 'Marzo'
                        when 04 then 'Abril'
                        when 05 then 'Mayo'
                        when 06 then 'Junio'
                        when 07 then 'Julio'
                        when 08 then 'Agosto'
                        when 09 then 'Septiembre'
                        when 10 then 'Octubre'
                        when 11 then 'Noviembre'
                        when 12 then 'Diciembre' END ) Fecha,
                        T1.Anio,T2.mes Mes,
                        ifnull(facturado,0) Facturado,
                        ifnull(gastos,0) Gastos,
                        ifnull(abonado,0) Abonado,
                        ifnull(nota_credito,0) Nota_Credito,
                        ((ifnull(facturado,0)+ifnull(gastos,0))-ifnull(abonado,0)-ifnull(nota_credito,0)) Pendiente,
                        round(ifnull(abonado,0)/(ifnull(facturado,0)+ifnull(gastos,0)),3)*100 Porcentaje_Abonado, 
                        round(ifnull(nota_credito,0)/(ifnull(facturado,0)+ifnull(gastos,0)),3)*100 Porcentaje_Nota_Credito ,
                        round(((ifnull(facturado,0)+ifnull(gastos,0))-ifnull(abonado,0)-ifnull(nota_credito,0))/ifnull(facturado,0),3)*100 Porcentaje_Pendiente
                         FROM
                        (select year(fecha_facturacion) anio,MONTH(fecha_facturacion) mes,sum(venta_total) facturado, sum(gastos_reintegro) gastos 
                                    from facturacion
                                    WHERE id_tipo_facturacion!=1 and anulado='No' and id_empresa=".$idempresa ."
                                    ".$mes." ".$dmes ." ".$hmes ." ".$anio ."
                                    group by year(fecha_facturacion),month(fecha_facturacion)
                        ) T1 
                        LEFT JOIN
                        (select year(fecha_facturacion) anio,MONTH(fecha_facturacion) mes,sum(monto_cheque) abonado
                                    from facturacion f 
                                    left join  abono_clientes ac on f.idfacturacion=ac.idfacturacion
                                    WHERE id_tipo_facturacion!=1 and anulado='No' and id_empresa=".$idempresa ."
                                    ".$mes." ".$dmes ." ".$hmes ." ".$anio ."
                                    group by year(fecha_facturacion),month(fecha_facturacion)
                        ) T2 ON T1.anio=T2.anio AND T1.mes=T2.mes
                        LEFT JOIN
                        (select year(fecha_facturacion) anio,MONTH(fecha_facturacion) mes,sum(venta_total) nota_credito
                                    from facturacion 
                                    where id_tipo_facturacion=1  and anulado='No' AND id_empresa=".$idempresa ."
                                    ".$mes." ".$dmes ." ".$hmes ." ".$anio ."
                                    group by year(fecha_facturacion),month(fecha_facturacion)
                        )T3 ON T1.anio=T3.anio AND T1.mes=T3.mes
                        order by T2.anio,T2.mes";

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