<?php


   session_start();
   error_reporting(0);
   
   $benutzer=isset($_SESSION["idbenutzer"])?$_SESSION["idbenutzer"]:"";
   require '../Database_conf.php';
   mysql_select_db($db_name,$connection) or die("Error de conexion a la base de datos");

		$arr = array();
		// Llamamos a la Tabla y sus datos 
		$sql = "select e.id_empresa,e.nombre from empresa e inner join empresa_perfil ep on e.id_empresa=ep.id_empresa
                    inner join benutzer b on b.idbenutzer=ep.id_benutzer
                    where b.idbenutzer='".$benutzer."'";
    	$result = mysql_query($sql,$connection) or die('La consulta fall&oacute;: '.mysql_error());		
		//Formamos el Array de Datos, si ejecutamos este archivo PHP veremos el array formado
                
		while($obj = mysql_fetch_object($result)) {
                    
			    $arr[] = $obj;
					}
                            echo json_encode($arr);

// Cerramos la conexion a la bd
 mysql_close($connection);

?>
   