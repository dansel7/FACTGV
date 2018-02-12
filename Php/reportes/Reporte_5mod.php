<?php
//REPORTE ESTADO DE CUENTA FACTURAS PAGADAS O ABONADAS


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
$pdf->SetMargins(0.2, 1.5, 2);

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
$RangoFechas=" and f.fecha_facturacion between STR_TO_DATE('$fecha_inicio','%d/%m/%Y') and STR_TO_DATE('$fecha_fin','%d/%m/%Y')";
$idmc=($_GET["idmc"]>0)? " AND mc.idmaestroclientes=".$_GET["idmc"]:"";
$idnf=($_GET["idnf"]>0)? " AND f.numero_factura=".$_GET["idnf"]:"";

if($idnf!=""){
   $idmc="";
   $RangoFechas="";
}

$orientacion="landscape";
$idempresa=isset($_SESSION["idEmpresa"])? $_SESSION["idEmpresa"]:"-1";
// ---------------INICIO DEL REPORTE-----------------

$sql = "SELECT      
                f.idfacturacion,
                f.numero_factura,                   
                mc.nom_cliente,
                tpf.tipo,
                if(DATE_FORMAT(f.fecha_facturacion, '%d/%m/%Y') = '00/00/0000', null, DATE_FORMAT(f.fecha_facturacion, '%d/%m/%Y')) fecha_facturacion,
                f.gastos_observaciones det_gastos,
                f.gastos_reintegro gastos,
                f.venta_total,
                GROUP_CONCAT(DISTINCT ac.id_abono_clientes,';', ac.numero_cheque,';',iFNull((ac.monto_cheque),0),';',DATE_FORMAT(ac.fecha_pago, '%d/%m/%Y') order by ac.fecha_pago) abonos,
                GROUP_CONCAT(DISTINCT idNotaCred,';', NotaC.numero_NotaC,';', iFNull((NotaC.venta_total),0),';',DATE_FORMAT(NotaC.fecha_Nota, '%d/%m/%Y')) NotasCredito,
                venta_acta_de
                from facturacion f
                left join abono_clientes ac on f.idfacturacion=ac.idfacturacion
                inner join maestroclientes mc on f.idmaestroClientes=mc.idmaestroClientes 
                inner join tipo_facturacion tpf on f.id_tipo_facturacion=tpf.id_tipo_facturacion
                left join (select idfacturacion idNotaCred,n_comprobante_credito idfactura, numero_factura numero_NotaC, venta_total,fecha_facturacion fecha_Nota from facturacion where id_tipo_facturacion=1 AND id_empresa=".$idempresa." and anulado='No') NotaC on f.idfacturacion=NotaC.idfactura
                WHERE f.anulado='No' AND f.id_empresa=".$idempresa." $idmc $idnf $RangoFechas
                AND f.id_tipo_facturacion!=1                 
                group by f.idfacturacion
                order by f.fecha_facturacion,f.idfacturacion,ac.fecha_pago asc";
        //QUEDA PENDIENTE EL FILTRADO POR FECHA.

  $result = mysql_query($sql,$connection) or die('La consulta fall&oacute;: '.mysql_error());	
   
  $pdf->addpage($orientacion,'letter');      
  
  $encabezado="<h3><img src=\"/gv_facturaciones/resources/imagenes/gvlogo.png\" align=\"left\">
      &nbsp;ESTADO DE CUENTA Y MOVIMIENTOS DE FACTURAS - {$_SESSION["nombreEmpresa"]}<hr></h3>";
  
  $cuerpo_detalle.= '<table width="800px" cellpadding="1">
                     <tr>
                     <td width="70px" style="text-align:center"><b>No. FACTURA</b></td> 
                     <td width="115px" style="text-align:center"><b>TIPO FACTURA</b></td> 
                     <td width="200px" style="text-align:center" ><b>CLIENTE</b></td>
                     <td width="110px" style="text-align:center"><b>FECHA DE FACTURA</b></td>
                     <td width="110px" style="text-align:right" ><b>VALOR DE FACTURA&nbsp;&nbsp;</b></td>
                     <td colspan="2">REGISTRO DE GASTOS ABONOS</td>
                     <td colspan="2" style="text-align:left" ><b>FECHA ABONO</b></td></tr>';
   
   
    function registro_abono($num){
       if($num=="0"){
           return "Transferencia";
       }else if($num=="-1"){
           return "Abono en Efectivo";
       }else{
           return "Cheque: # ".$num;
       }
    }
   //INICIANDO VARIABLES
   $subTabonado=0;
   $SubTnotaCred=0;
   $total_ant=0;
   $nclient="";
   $nom_cliente="";
   $abonos_array=null;
   $NotasCred_array=null;
   $primero=true;
   $a=1;
 
  while($rows_e = mysql_fetch_array($result)){

      if(!$primero){
         $cuerpo_detalle.='<tr><td style="text-align:right;border-bottom: solid 1px black" colspan="2">&nbsp;</td>
         <td style="text-align:left;font-size:8pt;border-bottom: solid 1px black">'.$nom_cliente.'</td>  <td style="text-align:right;border-bottom: solid 1px black">&nbsp;</td>
         <td style="text-align:right;border-bottom: solid 1px black" colspan="2"><b>TOTAL ABONOS</b></td><td style="text-align:right;border-bottom: solid 1px black;"><b>$ '.number_format($subTabonado,2).'</b></td><td style="text-align:center;border-bottom: solid 1px black;"><b>SALDO FINAL</b></td><td style="text-align:right;border-bottom: solid 1px black;"><b>$ '.number_format($total_ant-$subTabonado-$SubTnotaCred,2).'</b></td></tr>';
         $subTabonado=0;
         $SubTnotaCred=0;
         $total_ant=0;
         $a=1;
         }
         
  $total_ant=$rows_e["venta_total"];           
  
       
          
          //////////////////SE COMPRUEBA SI TIENE GASTOS/////////////////
         if($rows_e["gastos"]!=0){
          $total_ant=$rows_e["venta_total"]+$rows_e["gastos"];  
          $cuerpo_detalle.="
                       <tr>
							 <td  style=\"text-align:center;font-size:10pt\"><b>".$rows_e["numero_factura"] ."</b></td>
                             <td  style=\"text-align:left;\"><b>".$rows_e["tipo"] ."</b></td>
                             <td  style=\"text-align:left;font-size:8pt\"><b>".$rows_e["nom_cliente"].(($rows_e["venta_acta_de"]!="")?(": ".$rows_e["venta_acta_de"]):"")  ."</b></td>
                             <td  style=\"text-align:center\"><b>".substr($rows_e["fecha_facturacion"],0,11) ."</b></td> 
                             <td  style=\"text-align:right\"><b>$ ".number_format($rows_e["venta_total"],2) ."</b></td>
                        

                             <td style=\"text-align:center\">GASTOS</td>
                             <td colspan=\"2\" style=\"text-align:center\">".$rows_e["det_gastos"] ."</td>
                             <td  style=\"text-align:right\"><b>$".number_format($rows_e["gastos"],2). "</b></td> 
                        </tr>";      
         }
   
//////////////////SE OBTIENEN LOS ABONOS O NOTAS DE CREDITO DE LA FACTURA ACTUAL//////

       /////////////RECORRE TODOS LOS ABONOS SI EXISTEN/////////////  
        if(!is_null($rows_e["abonos"])){
            $abonos_array=  explode(",", $rows_e["abonos"]);

            foreach($abonos_array as $val){
                 $abono=  explode(";", $val);
                 $subTabonado+=$abono[2];  
                 
               $cuerpo_detalle.= "

                               <tr>  
							 <td  style=\"text-align:center;font-size:10pt\"><b>".$rows_e["numero_factura"] ."</b></td>
                             <td  style=\"text-align:left;\"><b>".$rows_e["tipo"] ."</b></td>
                             <td  style=\"text-align:left;font-size:8pt\"><b>".$rows_e["nom_cliente"].(($rows_e["venta_acta_de"]!="")?(": ".$rows_e["venta_acta_de"]):"")  ."</b></td>
                             <td  style=\"text-align:center\"><b>".substr($rows_e["fecha_facturacion"],0,11) ."</b></td> 
                             <td  style=\"text-align:right\"><b>$ ".number_format($rows_e["venta_total"],2) ."</b></td>
                        
							   
									 

                                     <td colspan=\"2\" style=\"text-align:left\"> ".registro_abono($abono[1]) ."</td>  
                                     <td  style=\"text-align:center\"> ".substr($abono[3],0,11) ."</td> 
                                     <td  style=\"text-align:right\">$ ".number_format($abono[2],2) ."</td>
                                </tr>";  

					
            }         
            /////////////////////////////////////////////////////////////            
        }

           /////////////RECORRE TODAS LAS NOTAS DE CREDITO SI EXISTEN/////////////
    if(!is_null($rows_e["NotasCredito"])){
        $NotasCred_array= explode(",", $rows_e["NotasCredito"]);
      
        foreach($NotasCred_array as $val){
             $notaCred= explode(";", $val);
             $SubTnotaCred+=$notaCred[2];  
                $cuerpo_detalle.= "

                           <tr> 
							 <td  style=\"text-align:center;font-size:10pt\"><b>".$rows_e["numero_factura"] ."</b></td>
                             <td  style=\"text-align:left;\"><b>".$rows_e["tipo"] ."</b></td>
                             <td  style=\"text-align:left;font-size:8pt\"><b>".$rows_e["nom_cliente"].(($rows_e["venta_acta_de"]!="")?(": ".$rows_e["venta_acta_de"]):"")  ."</b></td>
                             <td  style=\"text-align:center\"><b>".substr($rows_e["fecha_facturacion"],0,11) ."</b></td> 
                             <td  style=\"text-align:right\"><b>$ ".number_format($rows_e["venta_total"],2) ."</b></td>
                        

                             <td colspan=\"2\" style=\"text-align:left\">Nota Cred. ".$notaCred[1] ."</td>  
                             <td  style=\"text-align:center\"> ".$notaCred[3] ."</td> 
                             <td  style=\"text-align:right\">$ ".number_format($notaCred[2],2) ."</td>
                            </tr>";  


        }         
        /////////////////////////////////////////////////////////      
    
    }
	
	//SI NO HAY ABONO SOLO MUESTRE LA LINEA
	IF($subTabonado==0){
	   $cuerpo_detalle.= "
                       <tr>
                             <td  style=\"text-align:center;font-size:10pt\"><b>".$rows_e["numero_factura"] ."</b></td>
                             <td  style=\"text-align:left;\"><b>".$rows_e["tipo"] ."</b></td>
                             <td  style=\"text-align:left;font-size:8pt\"><b>".$rows_e["nom_cliente"].(($rows_e["venta_acta_de"]!="")?(": ".$rows_e["venta_acta_de"]):"")  ."</b></td>
                             <td  style=\"text-align:center\"><b>".substr($rows_e["fecha_facturacion"],0,11) ."</b></td> 
                             <td  style=\"text-align:right\"><b>$ ".number_format($rows_e["venta_total"],2) ."</b></td>
							
							<td style=\"text-align:center\" colspan=\"4\">--------- SIN ABONO ---------</td>
						</tr>"; 
						}

 $a++;
     
       $primero=false;
       if($idmc!="") $nclient= "ESTADO DE CUENTA: <b>".$rows_e["nom_cliente"]."</b> <br>DESDE: <b>$fecha_inicio</b> HASTA: <b>$fecha_fin</b><br><br> ";//Se guarda el nombre del cliente si es que se ha filtrado por uno.
       //Si se filtro para todos no almacenara nada ni mostrara nada.

        $nom_cliente=$rows_e["nom_cliente"];
          $abonos_array=null;
      $NotasCred_array=null;
}
        
        ///////  PIE DE DETALLE DE ABONO DEL ULTIMO REGISTRO //////////
        $cuerpo_detalle.='<tr><td style="text-align:right;border-bottom: solid 1px black" colspan="2">&nbsp;</td>
         <td style="text-align:left;font-size:8pt;border-bottom: solid 1px black">'.$nom_cliente.'</td>  <td style="text-align:right;border-bottom: solid 1px black">&nbsp;</td>
         <td style="text-align:right;border-bottom: solid 1px black" colspan="2"><b>TOTAL ABONOS</b></td><td style="text-align:right;border-bottom: solid 1px black;"><b>$ '.number_format($subTabonado,2).'</b></td><td style="text-align:center;border-bottom: solid 1px black;"><b>SALDO FINAL</b></td><td style="text-align:right;border-bottom: solid 1px black;"><b>$ '.number_format($total_ant-$subTabonado-$SubTnotaCred,2).'</b></td></tr>';
        ///////  FIN PIE DE DETALLE DE ABONO DEL ULTIMO REGISTRO //////////        
        
        $cuerpo_detalle.='<tr><td colspan="8"></td></tr>';
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
$pdf->Output('Reporte_Movimientos_Facturas.pdf', 'I');
}
}
mysql_free_result($result);
mysql_close();
?>

