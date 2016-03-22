<?php
//REPORTE PAGOS DE FACTURAS PENDIENTES


error_reporting(0);
session_start();

if(!isset($_SESSION['benutzer']) || !isset($_SESSION["idEmpresa"]) ){
		$direccion = "Location: ../../index.php";
		header($direccion);
	}else{
require_once('tcpdf/config/lang/eng.php');
require_once('tcpdf/tcpdf.php');
require_once('../Database_conf.php');
$pdf = new TCPDF("vertical", "cm", "Letter", true, 'UTF-8', false); 

// set document information
$pdf->SetCreator(PDF_CREATOR);
$pdf->SetAuthor('Daniel E. Diaz');
$pdf->SetTitle('GV');
$pdf->SetSubject('Control');
$pdf->SetKeywords('TCPDF, PDF, factura, control, contabilidad');
$pdf->setPrintHeader(false);
$pdf->SetPrintFooter(false);
// set default header data
//$pdf->SetHeaderData(PDF_HEADER_LOGO, PDF_HEADER_LOGO_WIDTH, PDF_HEADER_TITLE, PDF_HEADER_STRING);

// set header and footer fonts
//$pdf->setHeaderFont(Array(PDF_FONT_NAME_MAIN, '', PDF_FONT_SIZE_MAIN));
//$pdf->setFooterFont(Array(PDF_FONT_NAME_DATA, '', PDF_FONT_SIZE_DATA));

// set default monospaced font
//$pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);

//set margins
//$pdf->SetMargins(PDF_MARGIN_LEFT, PDF_MARGIN_TOP, PDF_MARGIN_RIGHT);
$pdf->SetMargins(0.6, 1.7, 2);

//$pdf->SetHeaderMargin(0);
//$pdf->SetFooterMargin(15);

//set auto page breaks
$pdf->SetAutoPageBreak(TRUE, 5);

//set image scale factor
$pdf->setImageScale(PDF_IMAGE_SCALE_RATIO); 

//set some language-dependent strings
//$pdf->setLanguageArray($l); 
// ---------------------------------------------------------
// set font
$pdf->SetFont('helvetica', '', 9);


$fecha_inicio=$_GET["fecha_ini"];
$fecha_fin=$_GET["fecha_fin"];
$idmc=($_GET["idmc"]>0)? " AND mc.idmaestroclientes=".$_GET["idmc"]:"";
$orientacion="vertical";
$idempresa=isset($_SESSION["idEmpresa"])? $_SESSION["idEmpresa"]:"-1";
// ---------------INICIO DEL REPORTE-----------------

$sql = "SELECT
                f.numero_factura,                   
                mc.nom_cliente,
                tpf.tipo,
                if(DATE_FORMAT(f.fecha_facturacion, '%d/%m/%Y') = '00/00/0000', null, DATE_FORMAT(f.fecha_facturacion, '%d/%m/%Y')) fecha_facturacion,
                if( DATE_FORMAT(f.fecha_programada_pago, '%d/%m/%Y') = '00/00/0000', null, 
                    DATE_FORMAT(f.fecha_programada_pago, '%d/%m/%Y') ) fecha_programada_pago,
                f.venta_total total_facturado,
                (f.venta_total-iFNull(sum(ac.monto_cheque),0)-iFNull(sum(NotaC.venta_total),0)) saldo_pendiente,
                DATEDIFF(ADDDATE(NOW(), INTERVAL 1 DAY),f.fecha_facturacion) DiasMora
                from facturacion f
                left join abono_clientes ac on f.idfacturacion=ac.idfacturacion
                inner join maestroclientes mc on f.idmaestroClientes=mc.idmaestroClientes 
                inner join tipo_facturacion tpf on f.id_tipo_facturacion=tpf.id_tipo_facturacion
                left join (select n_comprobante_credito idfactura, numero_factura numero_NotaC, venta_total from facturacion where id_tipo_facturacion=1 AND id_empresa=".$idempresa." and anulado='No') NotaC on f.idfacturacion=NotaC.idfactura
                WHERE f.anulado='No' AND f.id_empresa=".$idempresa." $idmc
                AND f.id_tipo_facturacion!=1 and f.fecha_facturacion between STR_TO_DATE('$fecha_inicio','%d/%m/%Y') and STR_TO_DATE('$fecha_fin','%d/%m/%Y')
                GROUP BY f.idfacturacion
                HAVING saldo_pendiente>0 order by f.fecha_facturacion asc";
        //QUEDA PENDIENTE EL FILTRADO POR FECHA.

  $result = mysql_query($sql,$connection) or die('La consulta fall&oacute;: '.mysql_error());	
   
  $pdf->addpage($orientacion,'letter');      
  
  $encabezado="<h2><img src=\"/facturaciones/resources/imagenes/gvlogo.png\" align=\"left\">
      &nbsp;Reporte de Pagos Pendientes - {$_SESSION["nombreEmpresa"]}<hr></h2>";
  
  $cuerpo_detalle.= '<table width="700px" cellpadding="1">
                     <tr>
                     <td width="60px" style="text-align:center"><b>No. FACTURA</b></td> 
                     <td width="110px" style="text-align:center"><b>TIPO FACTURA</b></td> 
                     <td width="190px" style="text-align:center" ><b>CLIENTE</b></td>
                     <td width="70px" style="text-align:center"><b>FECHA DE FACTURA</b></td>
                     <td width="70px" style="text-align:center"><b>FECHA DE PAGO</b></td>
                     <td width="80px" style="text-align:right" ><b>VALOR DE FACTURA&nbsp;&nbsp;</b></td>
                     <td width="80px" style="text-align:center" ><b>SALDO PENDIENTE</b></td>
                     <td width="50px" style="text-align:right" ><b>DIAS DE MORA</b></td>
                     </tr>
                     <tr><td colspan="5"></td></tr>';
   $subTpendiente=0;
   $nclient="";
  while($rows_e = mysql_fetch_array($result)){
      
      $cuerpo_detalle.= "<tr>
                             <td  style=\"text-align:center\">".$rows_e["numero_factura"] ."</td>
                             <td  style=\"text-align:left\">".$rows_e["tipo"] ."</td>
                             <td  style=\"text-align:left;font-size:8pt\">".$rows_e["nom_cliente"] ."</td>
                             <td  style=\"text-align:center\"> ".substr($rows_e["fecha_facturacion"],0,11) ."</td> 
                             <td  style=\"text-align:center\"> ".substr($rows_e["fecha_programada_pago"],0,11) ."</td> 
                             <td  style=\"text-align:right\">$ ".number_format($rows_e["total_facturado"],2) ."</td>
                             <td  style=\"text-align:right\">$ ".number_format($rows_e["saldo_pendiente"],2) ."</td>
                             <td  style=\"text-align:right\">".$rows_e["DiasMora"] ."</td>
                        </tr>";

                $subTpendiente+=$rows_e["saldo_pendiente"];
                
       if($idmc!="") $nclient= "ESTADO DE CUENTA: <b>".$rows_e["nom_cliente"]."</b> <br>DESDE: <b>$fecha_inicio</b> HASTA: <b>$fecha_fin</b><br><br> ";//Se guarda el nombre del cliente si es que se ha filtrado por uno.
       //Si se filtro para todos nos almacenara nada ni mostrara nada.
        }
        $cuerpo_detalle.='<tr><td colspan="5"></td></tr>';
        $cuerpo_detalle.='<tr><td style="text-align:right" colspan="5"><b>TOTAL PENDIENTE DE PAGO</b></td><td></td><td style="text-align:right"><b>$ '.number_format($subTpendiente,2).'</b></td></tr>';
        $cuerpo_detalle.='<tr><td colspan="5"></td></tr>';
        $cuerpo_detalle.= "</table>";
        $Reporte=$encabezado.$nclient.$cuerpo_detalle.$pie_factura;
 
$exp=isset($_GET["exp"])? $_GET["exp"]:"-1";//Tipo de Exportacion
/////////////////////////////////////////////////////////////////////
if($exp!="-1"){
header("Content-Type: application/vnd.ms-excel");
header("Expires: 0");
header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
header("content-disposition: attachment;filename=REP_PENDIENTES_$fecha_inicio-$fecha_fin.xls");
echo $Reporte;

}else{
/////////////////////////////////////////////////////////////////////
$pdf->writeHTML($Reporte, true, false, false, false, '');
//Close and output PDF document
$pdf->Output('Reporte_Bancos.pdf', 'I');
}
}

?>

