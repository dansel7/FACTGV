<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="eng"> 

	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>Aplicacion Para Facturacion de Clientes </title>
		<link rel="stylesheet" type="text/css" href="/ext-4.0.7/resources/css/ext-all-access.css" />
		<!-- Iconos del Sistema -->  
		 <link rel="stylesheet" type="text/css" href="resources/css/mvcclientes.css" />
		
		<!-- En Esta Linea, para cuando se esta desarrollando se pone:ext-all-dev.js, en produccion ext-all.js--> 
		<script type="text/javascript" src="/ext-4.0.7/ext-all-dev.js"></script>
		<script type="text/javascript" src="/ext-4.0.7/bootstrap.js"></script>
		<script type="text/javascript" src="/ext-4.0.7/ext-all-debug.js"></script>
		<script type="text/javascript" src="/ext-4.0.7/locale/ext-lang-es.js"></script>
		<!-- Archivos Js--> 
		<script type="text/javascript" src="App/App.js"></script>
                
	</head>	
        <?php
 if(isset($_SESSION["user"])){
     //SE VERIFICA SI NO SE HA INICIADO SESION, PARA MOSTRAR CUADRO DE LOGIN
            ?>
<script>
  Ext.require([
    'Ext.form.*'
]);

Ext.onReady(function() {

    var win;
//ACA APARECE LA PANTALLA DE LOGIN
    function ShowLogin() {
        if (!win) {
            var form = Ext.widget('form', {
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                border: false,
                bodyPadding: 10,

                fieldDefaults: {
                    labelAlign: 'top',
                    labelWidth: 100,
                    labelStyle: 'font-weight:bold'
                },
                
                items: [{
                        
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Bienvenido',
                    labelStyle: 'font-weight:bold;padding:0',
                    layout: 'hbox',
                    defaultType: 'textfield',

                    fieldDefaults: {
                        labelAlign: 'top'
                    },

                    items: [{
                          width:200,       
                        name: 'benutzer',
                        fieldLabel: 'Usuario',
                        allowBlank: false
  
                    }]},{
                
                    xtype: 'fieldcontainer',
                    fieldLabel: '',
                    labelStyle: 'font-weight:bold;padding:0',
                    layout: 'hbox',
                    defaultType: 'textfield',

                    fieldDefaults: {
                        labelAlign: 'top'
                    },

                    items: [{
                        width:200,
                        name: 'kennwort',
                        inputType: 'password',
                        fieldLabel: 'Contrase&ntilde;a',
                        allowBlank: false
                     }]
                
                }],

                buttons: [{
                    text: 'Iniciar Sesion',
                    handler: function() {
                        if (this.up('form').getForm().isValid()) {
                            // In a real application, this would submit the form to the configured url
                            this.up('form').getForm().submit();
                            this.up('form').getForm().reset();
                            this.up('window').hide();
                            Ext.MessageBox.alert('Mensaje', 'Datos correctos');
                            
                        }
                    }
                }]
            });
            
           
            win = Ext.widget('window', {
                title: 'Login',
                closable: false,
                width: 250,
                height: 225,
                minHeight: 225,
                layout: 'fit',
                resizable: false,
                modal: true,
                items: form
            });
        }
        win.show();
    }
    
    ShowLogin();

});
 
  </script>

      <?php
}else{ //SI HAY UNO ABIERTO SE MUESTRA EL CONTENIDO 
 ?>


<?php
}	
?>	
        
        
</html>