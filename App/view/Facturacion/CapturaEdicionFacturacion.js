
////////////Pueden usar tambien este dise�o de Formulario///////////////////


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
        //STORE DE LOS Clientes
         var ListMaestroClientes = new Ext.data.Store({
            fields: ['idmaestroClientes', 'nom_cliente'],
            proxy: {
                type: 'ajax',
                url : 'Php/store/list_Mclientes.php',
                reader: {
                    type: 'json'
                }
            },
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
        
//STORE DE LOS DETALLES DE FACTURAS    
//Verificar que se envian datos para editar
var idfactura;
if(typeof(records) != "undefined"){
 idfactura=records[0].data.idfacturacion;   
}else{idfactura='';}

 var factura_detalle = new Ext.data.Store({
            fields: ['idDetalle', 'concepto','valor_concepto','venta_nosujeta','valor_exenta','valor_gravada'],
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
            Ext.getCmp("gridDetalle").getStore().each(function(record){
                sum+=record.data.valor_concepto;
              });
              Ext.getCmp("iva").setValue(sum*0.13);
              Ext.getCmp("venta_total").setValue(sum);
            
            }
            

        var me = this;
        Ext.applyIf(me, {
            items: [
                    {
                        xtype: 'form',
                        height: 500,
                        layout: {
                            type: 'auto'
                        },bodyPadding: 25,
                        items: 
                        [   
                            //DATOS GENERALES
                            {xtype: 'fieldset',title: 'Datos Generales', width:900,
                            layout: {
                                    columns: 3,
                                    type: 'table'
                            },  
                            items:[
                            {xtype : "combobox", id:"tipo_factura", queryMode: 'local',fieldLabel: "Tipo Factura",queryMode: 'local', store: ListTpFact,displayField: 'tipo',valueField: 'id_tipo_facturacion',name:"id_tipo_facturacion", flex: 1, margin: '0 10 0 0',flex:1,allowBlank : false},    
                            {xtype : "textfield", name : "numero_factura", fieldLabel : "No. Factura", flex: 1,allowBlank : false},
                            {xtype : "combobox", queryMode: 'local', fieldLabel: " Cliente",queryMode: 'local', store: ListMaestroClientes,displayField: 'nom_cliente',valueField: 'idmaestroClientes',name:"idmaestroClientes", flex: 1, margin: '0 10 0 0',width:340 ,allowBlank : false},
                            {xtype : "textfield", name : "comprobante", fieldLabel : " No. Comprobante", flex: 1, margin: '0 10 0 0'},
                            {xtype : "datefield", format: 'd/m/Y', value: new Date(), name : "fecha_facturacion", fieldLabel : " Fecha Facturacion", flex: 1, margin: '0 10 0 0'},
                            {xtype : "textfield", name : "venta_acta_de", fieldLabel : " Venta A Cuenta De", flex: 1, margin: '0 10 0 0'},
                            {xtype : "textfield",id : "idfacturacion", name : "idfacturacion", fieldLabel : "Id",hidden: true, margin: '0 10 0 0'}
                            ]},
                            
                            
                            //GRID DE FACTURACION
                            {xtype : 'grid',name:'gridDetalle',id:'gridDetalle', allowBlank : false,
                            title: 'Detalle Facturacion',
                            store: factura_detalle,
                            columns: [
                                {header: 'idDetalle',  dataIndex: 'idDetalle', hidden: true, editor: {
                                        xtype: 'textfield',name:'idDetalle'
                                }},
                                {header: 'Concepto',  dataIndex: 'concepto',flex:1, editor: {
                                        xtype: 'textfield',name:'concepto',
                                    allowBlank: false
                                }},
                                {header: 'Valor Concepto', dataIndex: 'valor_concepto',	
                                    editor: {
                                        xtype: 'numberfield',allowDecimals: true, name:'valor_concepto',
                                        decimalPrecision: 2 ,  hideTrigger: true,
                                        allowBlank: false, decimalSeparator: "." 
                                }},
                                {header: 'Venta No sujeta', dataIndex: 'venta_nosujeta', editor: {
                                        xtype: 'numberfield',allowDecimals: true, name:'venta_nosujeta',
                                        decimalPrecision: 2 ,  hideTrigger: true,
                                        allowBlank: true, decimalSeparator: "." 
                                }},
                                {header: 'Valor Exenta', dataIndex: 'valor_exenta', editor: {
                                        xtype: 'numberfield',allowDecimals: true, name:'valor_exenta',
                                        decimalPrecision: 2 ,  hideTrigger: true,
                                        allowBlank: true, decimalSeparator: "." 
                                }},
                                {header: 'Venta Gravada', dataIndex: 'valor_gravada', editor: {
                                        xtype: 'numberfield',allowDecimals: true, name:'venta_agravada',
                                        decimalPrecision: 2 ,  hideTrigger: true,
                                        allowBlank: true, decimalSeparator: "." 
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
                                            concepto: '',
                                            valor_concepto: '',
                                            venta_nosujeta: '0.0',
                                            valor_exenta: '0.0',
                                            valor_gravada: '0.0'
                                        };
                                
                                    Ext.getCmp("gridDetalle").store.insert(0,r);
			            }
                                    
			        }, {
			            itemId: 'removeRecord',
			            id: 'removeRecord',
			            text: 'Quitar Venta',
			            iconCls: 'delete',
			            handler: function() {
			            Ext.getCmp("gridDetalle").store.remove(Ext.getCmp("gridDetalle").getSelectionModel().getSelection());
			               totales_facturacion();
			            }
			        }],
                                plugins: [
                                    Ext.create('Ext.grid.plugin.RowEditing', {
                                        id:'rowedit',
                                        clickToEdit : 1,
                                        listeners: {
                                    'afteredit': function(e) {
                                    totales_facturacion();
                                    }}
                                    }),
                                    
                                ]
                            },/////FIN GRID////////
                            
                            
                            //TOTALES 
                            {xtype: 'fieldset',title: 'Totales',width:900,
                            layout: {
                                    columns: 3,
                                    type: 'table'
                            },                            
                            items:[
                            {xtype : "numberfield", id : "iva", name : "iva", fieldLabel : "IVA", flex: 1,margin: '0 10 0 0',readOnly:true, allowDecimals: true,decimalPrecision: 2 ,  hideTrigger: true,allowBlank: true,decimalSeparator: "." },
                            {xtype : "textfield", id : "iva_retenido",name : "iva_retenido", fieldLabel : " Iva Retenido", flex: 1, margin: '0 10 0 0'},
                            {xtype : "textfield", id : "venta_total", name : "venta_total",fieldLabel : " Venta Total",readOnly:true, flex: 1, margin: '0 10 0 0'},
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
                            id:'buttons',
                            ui: 'footer',
                            items: ['->', {
                                    itemId: 'BtnClienteAceptar',
                                    text: 'Guardar',
                                    action: 'actGuardar'
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

