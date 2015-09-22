<?php
//CREDITO FISCAL AWB


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
$pdf->SetMargins(-0.3, 0.4, 0.635);

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
$fontname = $pdf->addTTFfont('Calibri.ttf', 'TrueTypeUnicode', '', 32);
$pdf->SetFont($fontname, '', 10);

$orientacion="vertical";
// ---------------INICIO DEL REPORTE-----------------
	$sql = "SELECT 
               
                f.numero_factura,mc.nom_cliente,mc.direccion,DATE_FORMAT(f.fecha_facturacion,'%d/%m/%Y') fecha_facturacion,f.cond_operacion,f.venta_acta_de,mc.nit,mc.nrc,d.departamento,mc.giro,
               
                df.cantidad,concat(cs.servicio , '' , df.concepto) concepto,df.valor_concepto,venta_nosujeta,venta_exenta,venta_gravada,
               
                f.venta_total,f.iva,f.iva_retenido,peso,nbultos,embarcador,wr,hawb,mawb
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
            <table width="690px" cellspacing="3">
            <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td height="20px"  style="text-align:center;font-size:11pt" width="450px" colspan="3"><b>'.strtoupper($rows_e["nom_cliente"]).'</b></td>
                <td  style="text-align:center" colspan="2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'. $rows_e["fecha_facturacion"] .'</td>
            </tr>
            <tr>
                <td style="text-align:center;font-size:8pt" colspan="3" >'.strtoupper($rows_e["direccion"]).'</td>
                
                <td height="20px" style="text-align:right;font-size:10pt" width="165px">'. $rows_e["peso"] .'</td>
                <td style="text-align:right;font-size:10pt" width="95px">'. $rows_e["nbultos"] .'</td>
            </tr>
             <tr>
                <td  colspan="2" width="410px">&nbsp;</td>
                <td height="20px" style="text-align:left">'.strtoupper($rows_e["departamento"]).'</td>
                <td style="text-align:center;font-size:8pt" width="210px">'. $rows_e["embarcador"] .'</td>
                
            </tr>
             <tr>
                <td height="18px"  width="30px">&nbsp;</td>
                <td style="text-align:left"  width="110px">'. $rows_e["nit"] .'</td>
                <td style="text-align:center" width="100px">&nbsp;'. $rows_e["nrc"] .'</td>
                <td style="text-align:right;font-size:9pt" width="225px" >'.strtoupper($rows_e["giro"]).'</td>
                <td style="text-align:left;font-size:10pt" width="200px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'. strtoupper($rows_e["wr"]) .'</td>
            </tr>
            <tr>
                <td>&nbsp;</td>
                <td colspan="2" style="text-align:right" width="240px">'.strtoupper($rows_e["cond_operacion"]).'</td>
                <td style="text-align:right" width="230px">'.strtoupper($rows_e["venta_acta_de"]).'</td>
                <td  height="18px" style="text-align:left;font-size:10pt" width="200px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'. strtoupper($rows_e["hawb"]) .'</td>    
            </tr>
                <td colspan="4" width="515px"></td>
                <td style="text-align:left;font-size:10pt" width="200px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'. strtoupper($rows_e["mawb"]) .'</td>    
            <tr>
            
            </tr>
            </table><br>
            <table style="table-layout:fixed;font-size:11.2pt">
                 <tr><td colspan="4" height="40px"></td></tr>
                 <tr><td colspan="4" height="165px"><table>';
        
        $detalle_factura.='
                    <tr>
                        <td style="text-align:left;" width="80px">
                        '. $rows_e["cantidad"] .'
                        </td>  
                        <td width="370px">
                        '. strtoupper($rows_e["concepto"])  .'
                        </td>
                        <td width="70px" style="text-align:right">
                        '. sinZero($rows_e["valor_concepto"]) .'
                        </td>
                        <td width="60px" style="text-align:right">
                        '. sinZero($rows_e["venta_nosujeta"]) .'
                        </td>
                        <td width="60px" style="text-align:right">
                        '. sinZero($rows_e["venta_exenta"]) .'
                        </td>
                        <td width="60px" style="text-align:right">
                        '. sinZero($rows_e["venta_gravada"]) .'
                        </td>
                    </tr>';
        
        $subTotal+=$rows_e["venta_gravada"];
        $tot_venta_no_sujeta+=$rows_e["venta_nosujeta"];
        $tot_venta_exentas+=$rows_e["venta_exenta"];
        //ESTA ES LA PARTE QUE CONTIENE EL TOTAL EN LETRAS Y SUS DESGLOSES
        $pie_factura='</table></td></tr>
                       <tr><td colspan="2" width="470px"></td>
                          <td width="60px"></td>
                          <td width="62px" style="text-align:right">'. sinZero(number_format($tot_venta_no_sujeta,2)).'</td>
                          <td width="60px" style="text-align:right">'. sinZero(number_format($tot_venta_exentas,2)) .'</td>
                          <td width="60px"style="text-align:right">'. sinZero(number_format($subTotal,2)) .'</td>
                      </tr>
                      <tr><td colspan="6" style="text-align:left">
                        <table width="698px" cellspacing="4">
                        <tr>
                           <td>'. strtoupper($Total_enLetras->ValorEnLetras($rows_e["venta_total"],"Dolares")) .'</td>
                           <td height="18px" style="text-align:right">'.sinZero($rows_e["iva"]) .'</td>
                         </tr>
                         <tr>
                           <td height="18px" style="text-align:right" colspan="2" >'. sinZero(number_format($subTotal+$rows_e["iva"],2)) .'</td>
                         </tr>
                         <tr>
                           <td height="18px" style="text-align:right" colspan="2">'. sinZero(number_format($rows_e["iva_retenido"],2)) .'</td>
                         </tr>
                          <tr>
                           <td height="18px" style="text-align:right" colspan="2" >'. sinZero(number_format($tot_venta_no_sujeta,2)) .'</td>
                         </tr>
                         <tr>
                           <td height="18px" style="text-align:right" colspan="2" >'. sinZero(number_format($tot_venta_exentas,2)) .'</td>
                         </tr>
                         </table>
                     </td>
                     </tr>
                     <tr><td colspan="6" style="text-align:right">
                         <table>
                         <tr>    
                            <td width="694px">
                        '. sinZero(number_format($rows_e["venta_total"],2)) .'
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

function sinZero($valor){
 if($valor==0){
     return "&nbsp;&nbsp;&nbsp;";
 }else{
     return $valor;
 }   
}

?>

