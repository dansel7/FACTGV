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

$sql="select cs.servicio servicio,sum(df.venta_gravada) ventas from detalleFacturacion df 
inner join facturacion f on df.idfacturacion=f.idfacturacion
inner join catalogo_servicios cs on cs.id_servicio=df.id_servicio where f.id_empresa={$_SESSION["idEmpresa"]} group by df.id_servicio";
$result = mysql_query($sql,$connection) or die('La consulta fall&oacute;: '.mysql_error());

while($row = mysql_fetch_assoc($result)){
   $servicios[]=$row['servicio'];
   $ventas[]=$row['ventas'];
}
// Creamos el grafico
$datos=$ventas;
$labels=$servicios;

require_once('../Database_conf.php');
  
$grafico = new Graph(800, 600, 'auto');
$grafico->SetScale("textint");
$grafico->title->Set("Ventas por Servicio");
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