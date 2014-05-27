    Ext.define('MvcClientes.store.Facturacion.Facturacion', {
    extend: 'Ext.data.Store',
    model: 'MvcClientes.model.Facturacion.Facturacion',//Llamamos el Modelo Antes Creado
    autoSync: true,//Sincronizacion con el Servidor
    autoSave: true,	//<--- hace las peticiones al servidor autom�ticamente
    pageSize: 25,
    autoLoad: {start: 0, limit: 100},
        proxy: {
type: 'ajax',
api: { //Declaramos la API y Comienzan en estas lineas las operaciones CRUD
                     read    : "Php/view/Facturacion/FacturacionRead.php",
                     create  : "Php/view/Facturacion/FacturacionCreate.php",
                     update  : "Php/view/Facturacion/FacturacionUpdate.php",
                     destroy : "Php/view/Facturacion/FacturacionDestroy.php"
            },
            /*actionMethods:{
                read:'POST'
            },*/
reader: {
    type: 'json',
                    idProperty: 'idfacturacion',
                    successProperty	: function()
                       {
          // Alguna Funcion o mensaje que quieras agregar cuando la operacion es exitosa
                       },
    root:'data' //Json_encode root:Datos del Servidor desde desde TCD.php

},

writer:{
               encode: true,  
   writeAllFields: true,//decide si se manda al servidor solamente los campos modificados o todo  
               type: 'json',
               root: 'data'		 		
            },
//Mensajes Extras si deseas agregarlos
            afterRequest: function (request, success)
            {

                            if (request.action == 'read')
                            {
                                            //Ext.Msg.alert('Title','Read');
                            }
                            else 
                                if (request.action == 'update')
                                    {
                                       //ESTA PARTE ES CUANDO SE HA MODIFICADO UN DATO Y SE GUARDA EL REGISTRO.
                                        var idFact=Ext.getCmp("idfacturacion").getValue();  
                                        var idtf=Ext.getCmp("id_tipo_factura").getValue(); 
                                        //PREGUNTA MOSTRAR VISTA PREVIA
                                        Ext.MessageBox.show({
                                        title : 'Vista Previa',
                                        buttons : Ext.MessageBox.YESNO,
                                                msg : 'Mostrar Vista Previa?',
                                                icon : Ext.Msg.WARNING,
                                        fn : function(btn)
                                         {var tab;
                                             if(btn == 'yes')
                                             {			
                                            window.open("php/reportes/factura.php?tpf="+hidelockjs(idtf)+"&idf="+hidelockjs(idFact),"Vista Previa de Factura","status=1,toolbar=1");
                                            Ext.getCmp("gridDetalle").up('form').up('panel').close();
                                               if(this.TabPanelMain.getComponent('TabListadoFacturacion'))
                                            TabPanelMain.setActiveTab(this.TabPanelMain.getComponent('TabListadoFacturacion'));
                                             }
                                                if(btn == 'no')
                                             {
                                                 Ext.getCmp("gridDetalle").up('form').up('panel').close();
                                               if(this.TabPanelMain.getComponent('TabListadoFacturacion'))
                                               TabPanelMain.setActiveTab(this.TabPanelMain.getComponent('TabListadoFacturacion'));
                                        
                                                 Ext.Msg.alert('Mensaje','Registro Actualizado Exitosamente');
                                                 
                                             }

                                         }	
                                     });
                                     //MOSTRAR VISTA PREVIA ---- FIN
                                     
                                  
                                        
                            }	
                            else 
                                if (request.action == 'create')
                                    {
                                     
                   ///////---INGRESO DE DETALLE----//////
                         
                      //ACA SE OBTIENE EL ID QUE RETORNA AL CREAR UN NUEVO REGISTRO DE FACTURACION
                      //LUEGO SE PASARA ESTE VALOR PARA PODER RELACIONARLO CON EL DETALLE                        
                       var idNuevaFact=Ext.decode(request.callback.arguments[2].responseText).data[0].idfacturacion;
                       var idtf=Ext.getCmp("id_tipo_factura").getValue(); 
                       //OBTENER LOS VALORES DEL GRID Y CONVERTIRLOS A JSON PARA PASARLOS
                       var grid = Ext.getCmp("gridDetalle").getStore().getRange();
                       var JsonDatos = [];
                        for (var i in grid) {
                            JsonDatos.push({
                                'cantidad':         grid[i].get('cantidad'),
                                'id_servicio':      grid[i].get('id_servicio'),
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
                                  url: 'Php/view/FactDetalle/FactDetalleCreate.php?idf='+idNuevaFact,
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
                                    
                                    
                                   
                                   
                                   
                                    //PREGUNTA MOSTRAR VISTA PREVIA
                                        Ext.MessageBox.show({
                                        title : 'Vista Previa',
                                        buttons : Ext.MessageBox.YESNO,
                                                msg : 'Mostrar Vista Previa?',
                                                icon : Ext.Msg.WARNING,
                                        fn : function(btn)
                                         { var tab;
                                             if(btn == 'yes')
                                             {			
                                            window.open("php/reportes/factura.php?tpf="+hidelockjs(idtf)+"&idf="+hidelockjs(''+idNuevaFact),"Vista Previa de Factura","status=1,toolbar=1");
                                            Ext.getCmp("gridDetalle").up('form').up('panel').close();
                                              if(this.TabPanelMain.getComponent('TabListadoFacturacion'))
                                               TabPanelMain.setActiveTab(this.TabPanelMain.getComponent('TabListadoFacturacion'));
                                        
                                             }
                                             if(btn == 'no')
                                             {			
                                              //SE CIERRA EL FORM DE FACTURACION
                                            Ext.getCmp("gridDetalle").up('form').up('panel').close();
                                              if(this.TabPanelMain.getComponent('TabListadoFacturacion'))
                                               TabPanelMain.setActiveTab(this.TabPanelMain.getComponent('TabListadoFacturacion'));
                                        
                                            Ext.Msg.alert('Mensaje','Registro Ingresado Exitosamente');
                                             }
                                         }	
                                     });
                                     //MOSTRAR VISTA PREVIA ---- FIN

                                }
                            else 
                                if (request.action == 'destroy')
                                    {
                                         if(Ext.decode(request.callback.arguments[2].responseText).success){
                                                        Ext.Msg.alert('Mensaje','Registro Eliminado Exitosamente');
                                                    }else{
                                                        Ext.Msg.alert('Mensaje','Error al eliminar: Factura Asociado a Abono Clientes y/o Abono Bancos');
                                                    }
							
                                }
            }
            ,
            listeners: {
                               exception: function(proxy, response, operation){
                                            Ext.MessageBox.show({
                                                    title: 'ERROR',
                                                    msg: operation.getError(),
                                                    icon: Ext.MessageBox.ERROR,
                                                    buttons: Ext.Msg.OK
                                            });
                                    }
                      }

    }
});