Ext.define('MvcClientes.controller.Facturacion.Facturacion',{
	extend		: 'Ext.app.Controller',
	stores		: ['Facturacion.Facturacion'],//Nota1: Carpeta + Archivo Facturacion.js,ver en la funcion de eliminar el get
	models		: ['Facturacion.Facturacion'],//Nota2: Carpeta + Archivo Facturacion.js,ver en la funcion de eliminar el get
	views		: ['Facturacion.GrdFacturacion','Facturacion.CapturaEdicionFacturacion'],
	refs:[ //Esta linea se usa cuando se hace referencia a una Vista dentro de un grid en un Controller
	 
	  {
	    ref:'gridFacturacion',
		selector:'gridFacturacion'//<<--Vista dentro de un Grid
	  }
	
	],

	init	: function() {
		var me = this;
		me.control({
		    'gridFacturacion dataview': { //Usando Ext.Component.Query,aca hacemos referencia a la vista del Grid
                            itemdblclick: this.Editar
			},
		    'gridFacturacion button[action=actAgregar]'://Usando Ext.Component.Query
			   {
				 click:this.Agregar
			   },
			'gridFacturacion button[action=actEditar]'://Usando Ext.Component.Query
			   {
				 click:this.Editar
			   },
		   'FormAddEdicionFacturacion button[action=actGuardar]'://Usando Ext.Component.Query
			   {
				 
				 click:this.ActualizarFactura
			   },
		    'gridFacturacion button[action=actBorrar]'://Usando Ext.Component.Query
			   {
				 click:this.Eliminar
			   }
				  
		});
	},
	//Inician Funciones
		
	Agregar: function(){
             var tab=TabPanelMain.getComponent('EdicionFacturacion');
             if(tab){
                 tab.close();
             }
            records="null";
            var FormAddEditarFacturacion= Ext.widget('FormAddEdicionFacturacion',{closable: true});
            TabPanelMain.add(FormAddEditarFacturacion);
            TabPanelMain.setActiveTab(FormAddEditarFacturacion); //Activamos el Tab  
            
	    
           
	},
	
	Editar: function(grid, record){
           
	    records = this.getGridFacturacion().getSelectionModel().getSelection();
	    if(records.length > 0){
                 var tab=TabPanelMain.getComponent('EdicionFacturacion');
                if(tab){
                 tab.close();
                }
                var FormAddEditarFacturacion= Ext.widget('FormAddEdicionFacturacion',{closable: true});
                var EditForm=FormAddEditarFacturacion.down('form');	
                var record=records[0];
                EditForm.loadRecord(record);
                //PARA QUE MUESTRE U OCULTE EL CAMPO DE N_COMPROBANTE_CREDITO A MENOS QUE SEA NOTA DE CREDITO
                 if(Ext.getCmp("id_tipo_factura").value==1){
                    Ext.getCmp("n_comprobante_credito").show();
                    Ext.getCmp("n_comprobante_credito").enable();
                }else{
                     Ext.getCmp("n_comprobante_credito").hide();
                     Ext.getCmp("n_comprobante_credito").reset();
                     Ext.getCmp("n_comprobante_credito").setValue(null);
                     Ext.getCmp("n_comprobante_credito").disable();                     
                }
                //PARA QUE MUESTRE U OCULTE CUANDO SEA AIR WAY BILL
                if(Ext.getCmp("id_tipo_factura").value==6){
                    Ext.getCmp("tipo_servicio_carga").show();
                    Ext.getCmp("awbDatos").show();
                }else{
                     Ext.getCmp("tipo_servicio_carga").hide();    
                     Ext.getCmp("awbDatos").hide();
                }
                
                TabPanelMain.add(FormAddEditarFacturacion);
                TabPanelMain.setActiveTab(FormAddEditarFacturacion); //Activamos el Tab
                
               
            }
             
         	 
	},
	
	ActualizarFactura: function(button) {
        var form = button.up('form'),
            record = form.getRecord(),
            values = form.getValues();
    //VALIDACION PARA RELACIONAR NOTA DE CREDITO, Y SI ESTA DESHABILITADO
     values.n_comprobante_credito=(values.n_comprobante_credito==null)?'':values.n_comprobante_credito;

            //IMPORTANTE COLOCAR EL NOMBRE DEL ID CORRECTO DEL REGISTRO
	if (values.idfacturacion > 0){ //Si Hay algun Valor, entra en MODO UPDATE
                //SE VALIDA EL FORMULARIO
                if(button.up('form').getForm().isValid()){
			record.set(values);
                    
                       
                       //INGRESO DEL DETALLE AL ACTUALIZAR
                       var idFact=Ext.getCmp("idfacturacion").getValue();
                       var idtf=Ext.getCmp("id_tipo_factura").getValue(); 
                       
                      //OBTENER LOS VALORES DEL GRID Y CONVERTIRLOS A JSON PARA PASARLOS
                       var grid = Ext.getCmp("gridDetalle").getStore().getRange();
                       var JsonDatos = [];
                       
                        for (var i in grid) {
                            JsonDatos.push({
                                'idDetalle':        grid[i].get('idDetalle'),
                                'id_servicio':      grid[i].get('id_servicio'),
                                'cantidad':         grid[i].get('cantidad'),
                                'concepto':         grid[i].get('concepto'),
                                'valor_concepto':   grid[i].get('valor_concepto'),
                                'venta_nosujeta':   grid[i].get('venta_nosujeta'),
                                'venta_exenta':     grid[i].get('venta_exenta'),
                                'venta_gravada':    grid[i].get('venta_gravada') 
                            });
                        }

                       JsonDatos=Ext.encode(JsonDatos)
                      ///---SE ENVIAN LOS DATOS DEL DETALLE PARA SER INGRESADOS----///
                                Ext.Ajax.request({
                                  url: 'Php/view/FactDetalle/FactDetalleCreate.php?idf='+idFact,
                                  params: {data:JsonDatos},
                                  method: "POST",
                                   success: function(response) {
                                  var outHTML = response.responseText;
                                  },
                                  failure: function(response) {

                                  }
                                });
                      /////------------------FIN------------------/////

                      
                  ///////--- FIN -- INGRESO DE DETALLE----////// 
                       
                      //SE CIERRA EL FORM DE FACTURACION 
                                              
                       
                         
                           //PREGUNTA MOSTRAR VISTA PREVIA
                           //ESTA PARTE ES CUANDO NO SE HA MODIFICADO UN DATO Y SE GUARDA EL REGISTRO.
                                        Ext.MessageBox.show({
                                        title : 'Vista Previa',
                                        buttons : Ext.MessageBox.YESNO,
                                                msg : 'Mostrar Vista Previa?',
                                                icon : Ext.Msg.WARNING,
                                        fn : function(btn)
                                         {
                                             if(btn == 'yes')
                                             {			
                                           window.open("php/reportes/factura.php?tpf="+hidelockjs(idtf)+"&idf="+hidelockjs(idFact),"Vista Previa de Factura","status=1,toolbar=1");
                                            form.up('panel').close(); 
                                            if(this.TabPanelMain.getComponent('TabListadoFacturacion'))
                                            TabPanelMain.setActiveTab(this.TabPanelMain.getComponent('TabListadoFacturacion'));
                                             }
                                               if(btn == 'no')
                                             {			
                                            form.up('panel').close(); 
                                        
                                            if(this.TabPanelMain.getComponent('TabListadoFacturacion')) 
                                            TabPanelMain.setActiveTab(this.TabPanelMain.getComponent('TabListadoFacturacion'));
                                        
                                            Ext.Msg.alert('Mensaje','Registro Actualizado Exitosamente');
                                             }

                                         }	
                                     }); 
                            //MOSTRAR VISTA PREVIA ---- FIN
                                     
                                    
                                
                         
                    }
		} else{ //De Lo contrario, si la accion fue para agregar, MODO INSERT
                    //SE VALIDA EL FORMULARIO
                   if(button.up('form').getForm().isValid()){
			record = Ext.create('MvcClientes.model.Facturacion.Facturacion');
                        
			record.set(values);
			record.setId(0);
			this.getFacturacionFacturacionStore().add(record);
                        
                        //UNA VEZ GUARDADO SE CIERRA Y SE MUESTRA EL LISTADO DE FACTURACIONES
                        
                        if(this.TabPanelMain.getComponent('TabListadoFacturacion')) 
                        TabPanelMain.setActiveTab(this.TabPanelMain.getComponent('TabListadoFacturacion'));
                      
                      ///GENERA ERROR EL IDNUEVO
                      
                    }
                    
		}

       
    },
	
	Eliminar: function()
	{
	    //Para referirnos a un componente aca se utilizaran los Getters:
		var grid = this.getGridFacturacion();//Get+ Alias gridFacturacion (alias:'widget.gridFacturacion')
		record = grid.getSelectionModel().getSelection(); 
		Facturacion=grid.getSelectionModel().getSelection()[0].data.numero_factura;
		//En esta parte automaticamente el Controller crea las Funciones Getters
		store = this.getFacturacionFacturacionStore();//Nota 1: Get+Carpeta.Facturacion Store+La palabra Store
	    Ext.MessageBox.show({
           title : 'Eliminar Registro',
    	   buttons : Ext.MessageBox.YESNO,
		   msg : 'Desea Eliminar Factura con Numero:'+' '+ Facturacion +'?',
		   icon : Ext.Msg.WARNING,
           fn : function(btn)
            {
                if (btn == 'yes')
                {			
               store.remove(record);
                }

            }	
        });
	}
});

 















