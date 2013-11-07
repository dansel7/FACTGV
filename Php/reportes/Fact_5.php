<?php
////NOTA DE REMISION

error_reporting(0);
session_start();

if(!isset($_SESSION['benutzer']) || !isset($_SESSION["idEmpresa"]) ){
		$direccion = "Location: ../../index.php";
		header($direccion);
	}else{
require_once('tcpdf/config/lang/eng.php');
require_once('tcpdf/tcpdf.php');

require_once('../funcionesFact.php');
$Total_enLetras=new EnLetras();
 
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
$pdf->SetMargins(-0.1, 0.9, 0.635);

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
$pdf->SetFont('helvetica', '', 10);

$orientacion="vertical";
// ---------------INICIO DEL REPORTE-----------------
	$sql = "SELECT 
               
                f.numero_factura,mc.nom_cliente,mc.direccion,DATE_FORMAT(f.fecha_facturacion,'%d/%m/%Y') fecha_facturacion,f.cond_operacion,f.venta_acta_de,mc.nit,mc.nrc,d.departamento,mc.giro,
               
                df.cantidad,concat(cs.servicio , '<br>  ' , df.concepto) concepto,df.valor_concepto,venta_nosujeta,venta_exenta,venta_gravada,
               
                f.venta_total,f.iva,f.iva_retenido
                FROM facturacion f 
                LEFT JOIN detalleFacturacion df on f.idFacturacion=df.idFacturacion 
                INNER JOIN maestroclientes mc on mc.idmaestroClientes=f.idmaestroClientes
                INNER JOIN departamento d on d.id_departamento=mc.id_departamento 
                INNER JOIN catalogo_servicios cs on cs.id_servicio=df.id_servicio
                WHERE f.idFacturacion=".hideunlock($_GET["idf"]);
    	$result = mysql_query($sql,$connection) or die('La consulta fall&oacute;: '.mysql_error());	
        
  $pdf->addpage($orientacion,'letter');      
  
  
  
        $subTotal=0;
        $tot_venta_no_sujeta=0;
        $tot_venta_exentas=0;
        while($rows_e = mysql_fetch_array($result)){ //CONSULTA PARA ENCABEZADO
       //style="border:solid 1px"
          $datos_factura='<br>
            <table width="690px" cellspacing="1">
            <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td style="text-align:center" width="450px" colspan="3"><b>'.strtoupper($rows_e["nom_cliente"]).'</b></td>
                <td  style="text-align:center" colspan="2">'. $rows_e["fecha_facturacion"] .'</td>
            </tr>
            <tr>
                <td style="text-align:center;font-size:7pt" colspan="3">'.strtoupper($rows_e["direccion"]).'</td>
                <td colspan="2">&nbsp;</td>
            </tr>
             <tr>
                <td  colspan="3" width="465px">&nbsp;</td>
                <td colspan="2" style="text-align:left">'.strtoupper($rows_e["departamento"]).'</td>
            </tr>
             <tr>
                <td  width="30px">&nbsp;</td>
                <td  width="170px">'. $rows_e["nit"] .'</td>
                <td style="text-align:center" width="100px">'. $rows_e["nrc"] .'</td>
                <td style="text-align:center" width="115px">&nbsp;</td>
                <td style="text-align:left" width="200px" >'.strtoupper($rows_e["giro"]).'</td>
            </tr>
            <tr>
            <td >&nbsp;</td>
            <td colspan="3" style="text-align:center" width="350px">
            '.strtoupper($rows_e["cond_operacion"]).'
            </td>
            <td width="100px">&nbsp;</td>
            <td style="text-align:center">
            '.strtoupper($rows_e["venta_acta_de"]).'
            </td>
            </tr>
            </table><br>
            <table>
                 <tr><td colspan="4" height="40px"></td></tr>
                 <tr><td colspan="4" height="160px"><table>';
            
        $detalle_factura.='
                    <tr>
                        <td style="text-align:left" width="100px">
                        '. $rows_e["cantidad"] .'
                        </td>  
                        <td width="425px" colspan="3">
                        '. strtoupper($rows_e["concepto"])  .'
                        </td>
                        <td width="70px" style="text-align:right">
                        '. number_format($rows_e["valor_concepto"]*1.13,2) .'
                        </td>
                         <td width="90px" style="text-align:right">
                        '. number_format($rows_e["venta_gravada"]*1.13,2) .'
                        </td>
                    </tr>';
        
        $subTotal+=$rows_e["venta_gravada"];
        $tot_venta_no_sujeta+=$rows_e["venta_nosujeta"];
        $tot_venta_exentas+=$rows_e["venta_exenta"];
        //ESTA ES LA PARTE QUE CONTIENE EL TOTAL EN LETRAS Y SUS DESGLOSES
        $pie_factura='</table></td></tr>
                        <tr><td colspan="6" height="10px"></td></tr>
                     <tr><td colspan="6" style="text-align:right">
                         <table>
                         <tr>    
                         <td>'. strtoupper($Total_enLetras->ValorEnLetras($rows_e["venta_total"],"Dolares")) .'</td>
                         <td width="340px">
                        '. $rows_e["venta_total"] .'
                            </td>
                         </tr>
                         </table>
                     </td>
                     </tr>
                     </table>';
        
        }
        $factura=$datos_factura.$detalle_factura.$pie_factura;
$pdf->writeHTML($factura, true, false, false, false, '');




/////////////////////////////////////////////////////////////////////

//Close and output PDF document
$pdf->Output('factura.pdf', 'I');
}

?>

