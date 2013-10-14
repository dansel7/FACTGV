<?php
session_start();
error_reporting(0);
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="eng"> 

	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>Facturacion de Clientes </title>
		<link rel="stylesheet" type="text/css" href="/ext-4.0.7/resources/css/ext-all.css" />
		<!-- Iconos del Sistema -->  
		 <link rel="stylesheet" type="text/css" href="resources/css/mvcclientes.css" />
                 <link rel="stylesheet" type="text/css" href="ux/css/ItemSelector.css" />
		 <link rel="stylesheet" type="text/css" href="ux/css/LiveSearchGridPanel.css" />
		<!-- En Esta Linea, para cuando se esta desarrollando se pone:ext-all-dev.js, en produccion ext-all.js--> 
		<script type="text/javascript" src="/ext-4.0.7/ext-all-dev.js"></script>
                <script type="text/javascript" src="App/ext-code.js"></script>
		<script type="text/javascript" src="/ext-4.0.7/bootstrap.js"></script>
		<script type="text/javascript" src="/ext-4.0.7/ext-all-debug.js"></script>
                
		<script type="text/javascript" src="/ext-4.0.7/locale/ext-lang-es.js"></script>
                
		<!-- Archivos Js--> 
		<script type="text/javascript" src="App/App.js"></script>
                
	</head>	
<?php

 if(!isset($_SESSION["benutzer"])){
     //SE VERIFICA SI NO SE HA INICIADO SESION, PARA MOSTRAR CUADRO DE LOGIN
            ?>
<script>
/////////////////////////////PANTALLA DE SELECCION DE EMPRESA/////////////////////////////    
  Ext.require([
    'Ext.form.*'
]);

Ext.onReady(function() {

     var win;
     var winList;
     var list_empresas = new Ext.data.Store({
            fields: ['id_empresa', 'nombre'],
            proxy: {
                type: 'ajax',
                url : 'Php/store/list_empresa.php',
                reader: {
                    type: 'json'
                }
            },
            autoLoad: true
        });
        
/////////////////////////////LISTADO EMPRESA/////////////////////////////
    function ShowListEmpresa() {
        list_empresas.load();//RECARGAMOS EL STORE
        if (!winList) {
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
                
                items: [ 
                 {   xtype : "combobox",id:"cmbxListEmpresa",defaultValue: 0,
                     fieldLabel: "Seleccione Empresa",queryMode: 'local', 
                     store: list_empresas,displayField: 'nombre',
                     valueField: 'id_empresa',name:"id_empresa",
                     width: 300
                  },
                    ],

                buttons: [{
                    text: 'Seleccione la Empresa a facturar',
                    handler: function() {
                        if (this.up('form').getForm().isValid()) {
                            
                            var Campos=this.up('form').getForm().getFieldValues();
                            //SE ENVIA EL FORM A VALIDAR
                            form.submit({
                            url: 'Php/controller/SelectEmpresa/SelectEmpresa.php',
                            waitMsg: 'Iniciando Sesion...',
                            success: function(fp, o) {
                            winList.hide();
                            
                           ///----Actualiza el contenido de la sesion----///
                            Ext.Ajax.request({
                              url: 'Php/view/PanelSesion.php',
                              success: function(response) {
                                outHTML = response.responseText;
                                Ext.getCmp('PnlNorte').update(outHTML);                      
                              },
                              failure: function(response) {
                               Ext.getCmp('PnlNorte').update("Grupo Aduanero Villatoro - Error Solicite Asistencia de IT")
                              }
                            });
                            //------------------FIN------------------//
                            
                            }
                            ,failure: function(fp,o){
                            Ext.Msg.alert('Error', 'Seleccione una opcion Valida, Intente de nuevo');
                            }
                            });          
                            
                        }
                        
                    }
                }]
            });
            
          
              
           
            winList = Ext.widget('window', {
                title: 'Facturacion',
                closable: false,
                width: 250,
                height: 125,
                minHeight: 125,
                layout: 'fit',
                resizable: false,
                modal: true,
                items: form
            });
        }
        winList.show();
    }
///////////////////////////////////////////////////////////////////////////////////////
    
    
///////////////////////////////ACA APARECE LA PANTALLA DE LOGIN/////////////////////////////
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
                        id:'benutzer',
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
                    name: 'btnSubmit',
                    text: 'Iniciar Sesion',
                    handler: function() {
                        if (this.up('form').getForm().isValid()) {
                            
                            var Campos=this.up('form').getForm().getFieldValues();
                            //SE ENVIA EL FORM A VALIDAR
                            form.submit({
                            url: 'Php/controller/Login/LogIn.php',
                            waitMsg: 'Iniciando Sesion...',
                            success: function(fp, o) {
                            win.hide();
                            ShowListEmpresa();
                            Ext.getCmp("panelMantto").show();
                            
                            }
                            ,failure: function(fp,o){
                            Ext.Msg.alert('Error', 'Usuario/Contrase&ntilde;a Incorrecta');
                            this.up('form').getForm().reset();
                               }
                            });                         
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

///////////////////////////////////////////////////////////////////////////////////////
 
  </script>

<?php
}	

        
 if(isset($_SESSION["benutzer"]) && !isset($_SESSION["idEmpresa"])){
     //SE VERIFICA SI NO SE HA INICIADO SESION, PARA MOSTRAR CUADRO DE LOGIN
            ?>
<script>
///////////////////////////////////////////////////////////////////////////////////////
  Ext.require([
    'Ext.form.*'
]);

Ext.onReady(function() {

     var winList;
     var list_empresas = new Ext.data.Store({
            fields: ['id_empresa', 'nombre'],
            proxy: {
                type: 'ajax',
                url : 'Php/store/list_empresa.php',
                reader: {
                    type: 'json'
                }
            },
            autoLoad: true
        });
        
///////////////////////////////ACA APARECE LA PANTALLA DE listado empresa/////////////////////////////
    function ShowListEmpresa() {
        list_empresas.load();//RECARGAMOS EL STORE
        if (!winList) {
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
                
                items: [ 
                 {xtype : "combobox", fieldLabel: "Seleccione Empresa",queryMode: 'local', store: list_empresas,displayField: 'nombre',valueField: 'id_empresa',name:"id_empresa", width: 300},
                    ],

                buttons: [{
                    text: 'Seleccione la Empresa a facturar',
                    handler: function() {
                        if (this.up('form').getForm().isValid()) {
                            
                            var Campos=this.up('form').getForm().getFieldValues();
                            //SE ENVIA EL FORM A VALIDAR
                            form.submit({
                            url: 'Php/controller/SelectEmpresa/SelectEmpresa.php',
                            waitMsg: 'Iniciando Sesion...',
                            success: function(fp, o) {
                            winList.hide();
                            
                            ///----Actualiza el contenido de la sesion----///
                            Ext.Ajax.request({
                              url: 'Php/view/PanelSesion.php',
                              success: function(response) {
                                outHTML = response.responseText;
                                Ext.getCmp('PnlNorte').update(outHTML);    
                               
                              },
                              failure: function(response) {
                               Ext.getCmp('PnlNorte').update("Grupo Aduanero Villatoro - Error Solicite Asistencia de IT")
                              }
                            });
                            //------------------FIN------------------//
                            
                            }
                            ,failure: function(fp,o){
                            Ext.Msg.alert('Error', 'Seleccione una opcion Valida, Intente de nuevo');
                            
                               }
                            });
                            
                            
                            
                            
                        }
                    }
                }]
            });
            
           
            winList = Ext.widget('window', {
                title: 'Facturacion',
                closable: false,
                width: 250,
                height: 125,
                minHeight: 125,
                layout: 'fit',
                resizable: false,
                modal: true,
                items: form
            });
        }
        winList.show();
    }
    
    ShowListEmpresa();

});
 
 ///////////////////////////////////////////////////////////////////////////////////////
  </script>

<?php
}

?>
</html>