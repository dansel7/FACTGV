
////////////Pueden usar tambien este diseno de Formulario///////////////////


Ext.define('MvcClientes.view.Facturacion.CapturaEdicionFacturacion', {
    extend: 'Ext.form.Panel',
	alias:'widget.FormAddEdicionFacturacion',
    height: 500,
    width: 400,
    layout: {
        type: 'fit'
    },itemId:"EdicionFacturacion",
	autoShow: true,
    closable: false,
    title: 'Formulario de Facturacion',
    modal: false,
	
    initComponent: function() {
        
        
        //STORE DE LOS CLIENTES
         var ListMaestroClientes = new Ext.data.Store({
            fields: ['idmaestroClientes', 'nom_cliente','gran_contribuyente'],
            proxy: {
                type: 'ajax',
                url : 'Php/store/list_Mclientes.php',
                reader: {
                    type: 'json'
                }
            },
            autoLoad: true
        });
        
    
//STORE DE LOS TIPOS DE CONDICION DE OPERACION
         var tp_cond_oper = new Ext.data.Store({
            fields: ['operacion'],
            data: [{'operacion':'Contado'},{'operacion':'Credito a 30'} ,{'operacion':'Credito a 60'} ,{'operacion':'Credito a 90'}],
            autoLoad: true
        });
        
//STORE DE LOS TIPOS DE FACTURACION
         var ListTpFact = new Ext.data.Store({
            fields: ['id_tipo_facturacion', 'tipo'],
            proxy: {
                type: 'ajax',
                url : 'Php/store/list_tipo_factura.php?opx=tp3f3ct',
                reader: {
                    type: 'json'
                }
            },
            autoLoad: true
        });
        
 //STORE DE LOS COMPROBANTES FACTURACION.
         var ListComprobantes = new Ext.data.Store({
            fields: ['idFact', 'comprobante'],
            proxy: {
                type: 'ajax',
                url : 'Php/store/list_comprobantes.php?opx=c0m7r0b4nt3',
                reader: {
                    type: 'json'
                }
            }
        });
        
 //STORE DE LOS TIPOS DE SERVICIO DE CARGA
         var TpServCarga = new Ext.data.Store({
            fields: ['tipo_serv','cod_serv'],
            data: [{'tipo_serv':'Courier','cod_serv':'COU'},{'tipo_serv':'Completo','cod_serv':'FCL'} ,{'tipo_serv':'Carga Aerea','cod_serv':'CAR'} ,{'tipo_serv':'Carga Maritima','cod_serv':'MAR'}],
            autoLoad: true
        });
        
  //STORE DE CATALOGO DE SERVICIOS
         var ListCatServ = new Ext.data.Store({
             fields: ['id_servicio','servicio'],
            proxy: {
                type: 'ajax',
                url : 'Php/store/list_CatServicio.php?opx=c4t53Rv1C3',
                reader: {
                    type: 'json'
                }
            },
            autoLoad: true
        });

        ListCatServ.load();
//STORE DE LOS DETALLES DE FACTURAS    
//Verificar que se envian datos para editar
var idfactura;
if(typeof(records) != "undefined" && typeof(records) != "string"){
 idfactura=records[0].data.idfacturacion;   
}else{idfactura='';}

 var factura_detalle = new Ext.data.Store({
            fields: [ {name:'idDetalle' , type: 'int'},{name:'cantidad' , type: 'int'},{name:'id_servicio' , type: 'int'},{name:'concepto', type: 'string'},{ name:'valor_concepto',   type: 'number'},{ name:'venta_nosujeta',   type: 'number'},{ name:'venta_exenta',   type: 'number'},{ name:'venta_gravada',   type: 'number'}],
            proxy: {
                type: 'ajax',
                url : 'Php/view/FactDetalle/FactDetalleRead.php?id='+ idfactura,
                reader: {
                    type: 'json'
                }
            },
            autoLoad: true
        });


 //FUNCION PARA MOSTRAR LOS TOTALES
           function totales_facturacion(){
               
            var sum=0;
            var sumExenta=0;
            var sumNoSuj=0;
            Ext.getCmp("gridDetalle").getStore().each(function(record){
               //VENTA GRAVADA
                record.set("venta_gravada",record.data.cantidad*record.data.valor_concepto);
                //SUBTOTAL
                sum+=record.data.venta_gravada;
                sumExenta+=record.data.venta_exenta;
                sumNoSuj+=record.data.venta_nosujeta;
                
              });            
             //COMPRUEBA QUE SEA UNA FACTURA DE EXPORTACION
             //PARA NO CALCULAR EL IVA
            if(Ext.getCmp("id_tipo_factura").getValue()==4 || Ext.getCmp("id_tipo_factura").getValue()==8){
              Ext.getCmp("iva").setValue(0);
              Ext.getCmp("iva_retenido").setValue(0); 
            }else{
              Ext.getCmp("iva").setValue(Math.round(sum * 0.13*100)/100);
              
              //CALCULOS SI ES GRAN CONTRIBUYENTE
              if(Ext.getCmp("idmaestroClientes").valueModels!=0){
              if(Ext.getCmp("idmaestroClientes").valueModels[0].data.gran_contribuyente==="Si" && sum>=100){
		//SI EL VALOR TOTAL A FACTURAR ES MAYOR A 100 SE RETIENE EL 1%
                Ext.getCmp("iva_retenido").setValue(Math.round(sum*0.01*100)/100);
		
              }else{
                Ext.getCmp("iva_retenido").setValue(0);    
              }
            }else{
                Ext.getCmp("iva_retenido").setValue(0);    
            }
          }
                 //MUESTRA EL TOTAL
              Ext.getCmp("venta_total").setValue(sumExenta+sumNoSuj+sum+Ext.getCmp("iva").getValue()-Ext.getCmp("iva_retenido").getValue());   
                 
             
           }
   /////// FIN DE FUNCION DE TOTALES     
   
   
   /////EFECTO AL ANULAR FACTURA//////
  
   /////EFECTO AL ANULAR FACTURA//////
   

        var me = this;
        Ext.applyIf(me, {
            items: [
                    {
                        xtype: 'form',
                        height: 580,
                        layout: {
                            type: 'auto'
                        },bodyPadding: 10,autoScroll:true,overflowY: 'scroll',
                        items: 
                        [   
                            //DATOS GENERALES
                            {xtype: 'fieldset',title: 'Datos Generales', width:900,
                            layout: {
                                    columns: 3,
                                    type: 'table'
                            },  
                            items:[
                            {xtype : "combobox", id:"id_tipo_factura", queryMode: 'local',fieldLabel: "Tipo Factura", store: ListTpFact,displayField: 'tipo',valueField: 'id_tipo_facturacion',
                                name:"id_tipo_facturacion", flex: 1, margin: '0 10 0 0',allowBlank : false,
                               listeners: {
                                        select: function (id) {
                                           totales_facturacion();
                                           //PARA QUE MUESTRE U OCULTE EL CAMPO DE N_COMPROBANTE_CREDITO A MENOS QUE SEA NOTA DE CREDITO
                                            if(this.value==="1"){
                                                Ext.getCmp("n_comprobante_credito").show();
                                                Ext.getCmp("n_comprobante_credito").enable();
                                                Ext.getCmp("GastosR").hide();
                                            }else{
                                                 Ext.getCmp("n_comprobante_credito").hide();
                                                 Ext.getCmp("n_comprobante_credito").reset();
                                                 Ext.getCmp("n_comprobante_credito").setValue(null);
                                                 Ext.getCmp("n_comprobante_credito").disable();
                                                 Ext.getCmp("GastosR").show();
                                            }
                                            //PARA QUE MUESTRE U OCULTE CUANDO SEA AIRBOX
                                            if(this.value==="6" || this.value==="7" || this.value==="8"){
                                                Ext.getCmp("tipo_servicio_carga").show();
                                                Ext.getCmp("awbDatos").show();
                                            }else{
                                                 Ext.getCmp("tipo_servicio_carga").hide();    
                                                 Ext.getCmp("awbDatos").hide();
                                            }
                                        }
                                    }
                                },    
                            {xtype : "textfield", name : "numero_factura", fieldLabel : "No. Factura", flex: 1,allowBlank : false},
                            {xtype : "combobox", queryMode: 'local', fieldLabel: " Cliente",
                                store: ListMaestroClientes,displayField: 'nom_cliente',valueField: 'idmaestroClientes',
                                name:"idmaestroClientes", id:"idmaestroClientes", flex: 1, margin: '0 10 0 0',width:340 ,allowBlank : false,
                               listeners: {
                                    select: function(combo, record, index) {
                                      totales_facturacion();
                                    }
                                  } 
                            },
                            {xtype : "datefield", format: 'd/m/Y', value: new Date(), name : "fecha_facturacion", fieldLabel : " Fecha Facturacion", flex: 1, margin: '0 10 0 0'},
                            {xtype : "textfield", name : "venta_acta_de", fieldLabel : " Venta A Cuenta De", flex: 1, margin: '0 10 0 0'},
                            {xtype : "combobox", queryMode: 'local', fieldLabel: "Condicion de Operacion",
                                store: tp_cond_oper,displayField: 'operacion',valueField: 'operacion',
                                name:"cond_operacion", id:"cond_operacion", flex: 1, margin: '0 10 0 0',width:340
                            },
                            {xtype : "textfield",id : "idfacturacion", name : "idfacturacion", fieldLabel : "Id",hidden: true, margin: '0 10 0 0'},
                            
/*CAMPO DE NOTA CREDITO*/   {xtype: "combobox",id : "n_comprobante_credito",displayField: 'comprobante',valueField: 'idFact',
                                   store: ListComprobantes,  name : "n_comprobante_credito", disabled:true,hidden: true, 
                                   fieldLabel : "No.Comprobante Credito", allowBlank : false,triggerAction: 'query',
                                   hideTrigger:true,typeAhead: true, minChars: 1,emptyText: 'Nº Comprobante',
                                   regex: /^(\d+\s\d+\D+)|(\d+)\s\|\|\s[0-3][0-9]\/[0-1][0-9]\/\d{4}$/,regexText:'Seleccione unicamente comprobantes del Listado',
                                   listeners:{
                                       afterrender: function(id){
                                         //CARGA DE STORE CON UN UNICO REGISTRO A PARTIR DEL ID TOMADO
                                         ListComprobantes.load({
                                            id: id, //set the id here
                                            scope:this,
                                            callback: function(records, operation, success){
                                              if(success){
                                                var ComprobanteCred = records[0];
                                              }
                                            }
                                          });
                                     }
                                   }
                               },
/*Tipo Servicio Carga AWB*/ {xtype : "combobox", queryMode: 'remote',fieldLabel: "Tipo de Servicio (Exclusivo ABX)",
                             store: TpServCarga,displayField: 'tipo_serv',valueField: 'cod_serv',hidden:true,
                                 name:"tipo_servicio_carga", id:"tipo_servicio_carga", flex: 1, margin: '0 10 0 0',width:340
                             },
                            
                            ]},
                        
                        
                            //Campos para AWB
                            {xtype: 'fieldset',title: 'Datos exclusivos para ABX', width:900,id:'awbDatos',
                            layout: {
                                    columns: 3,
                                    type: 'table'
                            },  hidden:true,
                            items:[
                            
                            {xtype : "textfield", name : "id_orden_servicio", fieldLabel : "Numero de Orden", flex: 1, margin: '0 10 5 0'},
                            {xtype : "datefield", format: 'd/m/Y', name : "fecha_orden_servicio", fieldLabel : "Fecha de Orden",  margin: '0 10 5 0'},
                            {xtype : "textfield", name : "sal", fieldLabel : "SAL", flex: 1, margin: '0 10 5 0'},
                            {xtype : 'numberfield', name : "peso", fieldLabel : "Peso", flex:1,decimalPrecision: 3,  hideTrigger: true, decimalSeparator: "." , margin: '0 10 5 0'},
                            {xtype : "numberfield", name : "nbultos", fieldLabel : "N. de Bultos", flex: 1 , allowDecimals: false, hideTrigger: true, margin: '0 10 5 0'},
                            {xtype : "textfield", name : "hbol", fieldLabel : "HBOL", flex: 1, margin: '0 10 5 0'},
                            {xtype : "textfield", name : "wr", fieldLabel : "WR", flex: 1, margin: '0 10 5 0'},
                            {xtype : "textfield", name : "hawb", fieldLabel : "HAWB", flex: 1, margin: '0 10 5 0'},
                            {xtype : "textfield", name : "mawb", fieldLabel : "MAWB", flex: 1, margin: '0 10 5 0'},
                            ]},
                        
                        
                            
                            //GRID DE FACTURACION
                            {xtype : 'grid',name:'gridDetalle',id:'gridDetalle', allowBlank : false,
                            title: 'Detalle Facturacion',
                            features  : [{
                                ftype : 'summary'       
                            }],
                            store: factura_detalle,
                            columns: [
                                {header: 'idDetalle',  dataIndex: 'idDetalle', hidden: true, 
                                    editor: {
                                        xtype: 'textfield',name:'idDetalle'
                                }},
                                {header: 'Cant.',  dataIndex: 'cantidad', editor: {
                                        xtype: 'numberfield',name:'cantidad',allowDecimals: false,
                                    allowBlank: false
                                },summaryRenderer: function(value, summaryData, dataIndex) {
                                  return 'SUB-TOTALES';
                                    }},
                                {header: 'Servicio',  dataIndex: 'id_servicio',flex:1, editor: {
                                    xtype : "combobox", id:"id_servicio",name:"id_servicio", 
                                queryMode: 'local', store: ListCatServ,
                                displayField: 'servicio',valueField: 'id_servicio',allowBlank : false
                                },renderer:function(id){//A PARTIR DEL ID DE SERVICIO SE MUESTRA EL NOMBRE DEL SERVICIO
                                 ListCatServ.clearFilter(); //SE LIMPIA EL STORE   
                                var index = ListCatServ.find('id_servicio',id);
                                    if(index>-1){
                                            var record = ListCatServ.getAt(index);
                                            return record.get('servicio');
                                    }
                                    return value;   
                                }},
                                {header: 'Concepto',  dataIndex: 'concepto',flex:1, editor: {
                                        xtype: 'textareafield',name:'concepto',height:'40px',
                                    allowBlank: false
                                }},
                                {header: 'Precio Unitario', dataIndex: 'valor_concepto',summaryType: 'sum',	
                                    editor: {
                                        xtype: 'numberfield',allowDecimals: true, name:'valor_concepto',
                                        decimalPrecision: 3 ,  hideTrigger: true,
                                        allowBlank: false, decimalSeparator: "."
                                }, summaryRenderer: function(value, summaryData, dataIndex) {
                                        return Math.round(value*100)/100;
                                        } },
                                {header: 'Venta No sujeta', dataIndex: 'venta_nosujeta',summaryType: 'sum',
                                    editor: {
                                        xtype: 'numberfield',allowDecimals: true, name:'venta_nosujeta',
                                        decimalPrecision: 3  ,  hideTrigger: true,
                                        allowBlank: true, decimalSeparator: "." 
                                }, summaryRenderer: function(value, summaryData, dataIndex) {
                                        return Math.round(value*100)/100;
                                        } },
                                {header: 'Valor Exenta', dataIndex: 'venta_exenta', summaryType: 'sum',
                                    editor: {
                                        xtype: 'numberfield',allowDecimals: true, name:'venta_exenta',
                                        decimalPrecision: 3  ,  hideTrigger: true,
                                        allowBlank: true, decimalSeparator: "." 
                                }, summaryRenderer: function(value, summaryData, dataIndex) {
                                        return Math.round(value*100)/100;
                                        } },
                                {header: 'Venta Gravada', dataIndex: 'venta_gravada',summaryType: 'sum', 
                                    editor: {
                                        xtype: 'numberfield',allowDecimals: true, name:'venta_gravada',
                                        decimalPrecision: 3  ,  hideTrigger: true,
                                        allowBlank: true, decimalSeparator: "."
                                },   summaryRenderer: function(value, summaryData, dataIndex) {
                                         return Math.round(value*100)/100;
                                        }}
                            ],
                            height: 250,
                            width:900,
				    tbar: [{
			            text: 'Adicionar Venta',
			            iconCls: 'add',
			            id: 'addRecord',
			            handler : function() {//AGREGANDO UN NUEVO DETALLE A LA FACTURACION
                                        var r = {
                                            cantidad: '1',
                                            concepto: '',
                                            id_servicio:'1',
                                            valor_concepto: '',
                                            venta_nosujeta: '0.0',
                                            venta_exenta: '0.0',
                                            venta_gravada: '0.0'
                                        };
                                
                                    Ext.getCmp("gridDetalle").store.insert(0,r);
			            }
                                    
			        }, {
			            itemId: 'removeRecord',
			            id: 'removeRecord',
			            text: 'Quitar Venta',
			            iconCls: 'delete',
			            handler: function() {// QUITA EL DETALLE SELECCIONADO Y ACTUALIZA
			            Ext.getCmp("gridDetalle").store.remove(Ext.getCmp("gridDetalle").getSelectionModel().getSelection());
			               totales_facturacion();
			            }
			        }],
                                plugins: [
                                    Ext.create('Ext.grid.plugin.RowEditing', {
                                        id:'rowedit',
                                        clickToEdit : 1,
                                        listeners: {
                                    'afteredit': function(e) {//CUANDO SE HACE UPDATE HACE LO SIGUIENTE
                                    totales_facturacion();
                                     e.grid.getView().refresh();
                                    }}
                                    }),
                                    
                                ]
                            },/////FIN GRID////////
                             
                            ////////INICIO  DE FIELDSET GASTOS///////
                            {xtype: 'fieldset',title: 'Gastos Reintegrables',id:'GastosR',width:900,height:45,
                            style: {color: 'red'},  
                              layout: {
                                    columns: 3,
                                    type: 'table'
                              },
                              items:[  
                                  
                                  {xtype : "textfield", id : "gastos_observaciones",name : "gastos_observaciones", fieldLabel : "Detalle Gastos", allowDecimals: true,width:515,flex: 2, margin: '0 15 0 0',decimalSeparator: "."},
                                  {xtype : "numberfield", id : "gastos_reintegro", name : "gastos_reintegro",fieldLabel : "Gastos Totales", flex: 1,allowDecimals: true,hideTrigger: true,decimalPrecision: 2, margin: '0 15 0 0',decimalSeparator: "."},
                                  
                               ]
                            },///////FIN DE FIELDSET GASTOS////////
                            
                            {xtype: 'fieldset',title: 'Totales',width:900,
                            style: {color: 'navy'},
                            layout: {
                                    columns: 3,
                                    type: 'table'
                            },            
                            //TOTALES 
                            items:[
                            {xtype : "numberfield", id : "iva", name : "iva", fieldLabel : "IVA", flex: 1,margin: '0 10 5 0',readOnly:true, allowDecimals: true,decimalPrecision: 3  ,  hideTrigger: true,allowBlank: true,decimalSeparator: "." },
                            {xtype : "numberfield", id : "iva_retenido",name : "iva_retenido", fieldLabel : " Iva Retenido",readOnly:true, allowDecimals: true,flex: 1, margin: '0 10 0 0',decimalSeparator: "."},
                            {xtype : "numberfield", id : "venta_total", name : "venta_total",fieldLabel : " Venta Total",readOnly:true, flex: 1,allowDecimals: true,decimalPrecision: 2 , margin: '0 10 0 0',decimalSeparator: "."},
                            ]},
                            {xtype: 'fieldset',title: 'Datos de Quedan y Pago',width:900,
                            layout: {
                                    columns: 3,
                                    type: 'table'
                            }, //DATOS DE QUEDAN Y PAGOS                          
                            items:[
                            {xtype : "datefield",format: 'd/m/Y', name : "fecha_quedan", fieldLabel : " Fecha Quedan", flex: 1, margin: '0 10 0 0'},
                            {xtype : "textfield", name : "comprobante_quedan", fieldLabel : " Comprobante Quedan", flex: 1, margin: '0 10 0 0'},
                            {xtype : "datefield",format: 'd/m/Y', name : "fecha_programada_pago", fieldLabel : " Fecha Programada de Pago", flex: 1, margin: '0 10 0 0'},
                            ]}
                        ],
            dockedItems : [{
                            xtype: 'toolbar',
                            dock: 'bottom',
                            height: 30,
                            maxHeight: 30,
                            id:'buttonFact',
                            ui: 'footer',
                            items: ['->',{xtype : "checkbox",id:"anulado", name : "anulado", fieldLabel : "Anular Factura",  inputValue: 'Si',uncheckedValue :'No',  style: {color: 'red',fontWeight:'bold'},    
                                    listeners: {
            change: function(field, newValue, oldValue, eOpts){
                console.log('change:' + field.fieldLabel + ' ' + newValue);
                if(Ext.getCmp("id_tipo_factura").value==1){
                                    Ext.getCmp("GastosR").hide();
                                    if(newValue){
                                    Ext.getCmp("n_comprobante_credito").reset();
                                    Ext.getCmp("n_comprobante_credito").setValue(null);
                                    Ext.getCmp("n_comprobante_credito").disable();
                                    }else{
                                    Ext.getCmp("n_comprobante_credito").show();
                                    Ext.getCmp("n_comprobante_credito").enable();
                                    }
                                }else{
                                    Ext.getCmp("GastosR").show();
                                }
                                    
            }}},'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;', {
                                    itemId: 'BtnClienteAceptar',
                                    text: 'Vista Previa',
                                    action: 'actGuardar',
                                    listeners: {
                                    click: function(){
                                       totales_facturacion();
                                    } }
                                    
                            },{
                                    itemId: 'BtnClienteCancelar',
                                    text: 'Cancelar',
                                    scope: this,
                                    handler: this.close
                            }]
                 }]
              }]
          }); 
		  me.callParent(arguments);
  
            

                  
      }					
});	

