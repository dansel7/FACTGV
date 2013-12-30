<?php
error_reporting(0);
session_start();

if(!isset($_SESSION['benutzer']) || !isset($_SESSION["idEmpresa"]) ){
		$direccion = "Location: ../../index.php";
		header($direccion);
	}else{
require_once('../Database_conf.php');
require_once ('jpgraph/src/jpgraph.php');
require_once ('jpgraph/src/jpgraph_bar.php');

$fecha_inicio=$_GET["fecha_ini"];
$fecha_fin=$_GET["fecha_fin"];

$sql="select cs.servicio servicio,sum(df.venta_nosujeta + df.venta_exenta + df.venta_gravada) ventas 
from detalleFacturacion df inner join facturacion f on df.idfacturacion=f.idfacturacion 
inner join catalogo_servicios cs on cs.id_servicio=df.id_servicio where f.id_empresa={$_SESSION["idEmpresa"]} 
and f.fecha_facturacion between STR_TO_DATE('$fecha_inicio','%d/%m/%Y') and STR_TO_DATE('$fecha_fin','%d/%m/%Y')
 group by df.id_servicio";

$result = mysql_query($sql,$connection) or die('La consulta fall&oacute;: '.mysql_error());
$servicios[]=("");//SE INICIALIZAN
   $ventas[]=("");//EN EL CASO QUE DEVUELVA UN ARREGLO VACIO
while($row = mysql_fetch_assoc($result)){
   $servicios[]="{$row['servicio']} \n \${$row['ventas']}";
   $ventas[]=$row['ventas'];
}

// Creamos el grafico
$datos=$ventas;
$labels=$servicios;

require_once('../Database_conf.php');
  
$grafico = new Graph(1200, 600, "auto");
$grafico->SetScale("textint");
$grafico->title->Set("Ventas por Servicio del ".$fecha_inicio." al ".$fecha_fin);
$grafico->xaxis->title->Set("Servicios");
$grafico->xaxis->SetTickLabels($labels);
$grafico->yaxis->title->Set("Ventas Totales");
$barplot1 =new BarPlot($datos);
// Un gradiente Horizontal de morados
$barplot1->SetFillGradient("#BE81F7", "#E3CEF6", GRAD_HOR);
// 30 pixeles de ancho para cada barra
$barplot1->SetWidth(50);
$grafico->Add($barplot1);
$grafico->Stroke();

        }      
 
?>