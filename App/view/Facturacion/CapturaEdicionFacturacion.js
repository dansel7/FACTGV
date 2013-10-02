
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
        
//STORE DE LOS DETALLES DE FACTURAS    
//Verificar que se envian datos para editar
var idfactura;
if(typeof(records) != "undefined" && typeof(records) != "string"){
 idfactura=records[0].data.idfacturacion;   
}else{idfactura='';}

 var factura_detalle = new Ext.data.Store({
            fields: [ {name:'idDetalle' , type: 'int'},{name:'cantidad' , type: 'int'},{name:'concepto', type: 'string'},{ name:'valor_concepto',   type: 'number'},{ name:'venta_nosujeta',   type: 'number'},{ name:'venta_exenta',   type: 'number'},{ name:'venta_gravada',   type: 'number'}],
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
               //VENTA GRAVADA
                record.set("venta_gravada",record.data.cantidad*record.data.valor_concepto);
                //SUBTOTAL
                sum+=record.data.venta_gravada;
                
              });
              Ext.getCmp("iva").setValue(sum*0.13);
              
              //CALCULOS SI ES GRAN CONTRIBUYENTE
              if(Ext.getCmp("idmaestroClientes").valueModels[0].data.gran_contribuyente=="Si"){
                Ext.getCmp("iva_retenido").setValue(Math.round(sum*0.01*100)/100);
              }else{
                Ext.getCmp("iva_retenido").setValue(0);    
              }
                 //MUESTRA EL TOTAL
                Ext.getCmp("venta_total").setValue(sum+Ext.getCmp("iva").getValue()+Ext.getCmp("iva_retenido").getValue());   
                 
            }
   /////// FIN DE FUNCION DE TOTALES         

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
                            {xtype : "combobox", id:"id_tipo_factura", queryMode: 'local',fieldLabel: "Tipo Factura",queryMode: 'local', store: ListTpFact,displayField: 'tipo',valueField: 'id_tipo_facturacion',name:"id_tipo_facturacion", flex: 1, margin: '0 10 0 0',flex:1,allowBlank : false},    
                            {xtype : "textfield", name : "numero_factura", fieldLabel : "No. Factura", flex: 1,allowBlank : false},
                            {xtype : "combobox", queryMode: 'local', fieldLabel: " Cliente",
                                queryMode: 'local', store: ListMaestroClientes,displayField: 'nom_cliente',valueField: 'idmaestroClientes',
                                name:"idmaestroClientes", id:"idmaestroClientes", flex: 1, margin: '0 10 0 0',width:340 ,allowBlank : false
                            },
                            {xtype : "datefield", format: 'd/m/Y', value: new Date(), name : "fecha_facturacion", fieldLabel : " Fecha Facturacion", flex: 1, margin: '0 10 0 0'},
                            {xtype : "textfield", name : "venta_acta_de", fieldLabel : " Venta A Cuenta De", flex: 1, margin: '0 10 0 0'},
                            {xtype : "combobox", queryMode: 'local', fieldLabel: "Condicion de Operacion",
                                queryMode: 'local', store: tp_cond_oper,displayField: 'operacion',valueField: 'operacion',
                                name:"cond_operacion", id:"cond_operacion", flex: 1, margin: '0 10 0 0',width:340
                            },
                            {xtype : "textfield",id : "idfacturacion", name : "idfacturacion", fieldLabel : "Id",hidden: true, margin: '0 10 0 0'},
                            {xtype : "textfield", name : "n_comprobante_credito", fieldLabel : "No.Comprobante Credito", flex: 1},
                            
                            ]},
                            
                            
                            //GRID DE FACTURACION
                            {xtype : 'grid',name:'gridDetalle',id:'gridDetalle', allowBlank : false,
                            title: 'Detalle Facturacion',
                            features  : [{
                                ftype : 'summary'       
                            }],
                            store: factura_detalle,
                            columns: [
                                {header: 'idDetalle',  dataIndex: 'idDetalle', hidden: true, editor: {
                                        xtype: 'textfield',name:'idDetalle'
                                }},
                                {header: 'Cant.',  dataIndex: 'cantidad', editor: {
                                        xtype: 'numberfield',name:'cantidad',allowDecimals: false,
                                    allowBlank: false
                                },summaryRenderer: function(value, summaryData, dataIndex) {
                                  return 'SUB-TOTALES';
                                    }},
                                {header: 'Concepto',  dataIndex: 'concepto',flex:1, editor: {
                                        xtype: 'textfield',name:'concepto',
                                    allowBlank: false
                                }},
                                {header: 'Precio Unitario', dataIndex: 'valor_concepto',summaryType: 'sum',	
                                    editor: {
                                        xtype: 'numberfield',allowDecimals: true, name:'valor_concepto',
                                        decimalPrecision: 2,  hideTrigger: true,
                                        allowBlank: false, decimalSeparator: "."
                                }, summaryRenderer: function(value, summaryData, dataIndex) {
                                        return Math.round(value*100)/100;
                                        } },
                                {header: 'Venta No sujeta', dataIndex: 'venta_nosujeta', editor: {
                                        xtype: 'numberfield',allowDecimals: true, name:'venta_nosujeta',
                                        decimalPrecision: 2 ,  hideTrigger: true,
                                        allowBlank: true, decimalSeparator: "." 
                                }},
                                {header: 'Valor Exenta', dataIndex: 'venta_exenta', editor: {
                                        xtype: 'numberfield',allowDecimals: true, name:'venta_exenta',
                                        decimalPrecision: 2 ,  hideTrigger: true,
                                        allowBlank: true, decimalSeparator: "." 
                                }},
                                {header: 'Venta Gravada', dataIndex: 'venta_gravada',summaryType: 'sum', editor: {
                                        xtype: 'numberfield',allowDecimals: true, name:'venta_gravada',
                                        decimalPrecision: 2 ,  hideTrigger: true,
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
                            
                            
                            
                            {xtype: 'fieldset',title: 'Totales',width:900,
                            layout: {
                                    columns: 3,
                                    type: 'table'
                            },              
                            //TOTALES 
                            items:[
                            {xtype : "numberfield", id : "iva", name : "iva", fieldLabel : "IVA", flex: 1,margin: '0 10 0 0',readOnly:true, allowDecimals: true,decimalPrecision: 2 ,  hideTrigger: true,allowBlank: true,decimalSeparator: "." },
                            {xtype : "numberfield", id : "iva_retenido",name : "iva_retenido", fieldLabel : " Iva Retenido",readOnly:true, allowDecimals: true,flex: 1, margin: '0 10 0 0',decimalSeparator: "."},
                            {xtype : "numberfield", id : "venta_total", name : "venta_total",fieldLabel : " Venta Total",readOnly:true, flex: 1,allowDecimals: true,decimalPrecision: 2, margin: '0 10 0 0',decimalSeparator: "."},
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
                            maxHeight: 30,
                            id:'buttons',
                            ui: 'footer',
                            items: ['->',{xtype : "checkbox", name : "anulado", fieldLabel : "Anular Factura",  inputValue: 'Si',uncheckedValue :'No'}, {
                                    itemId: 'BtnClienteAceptar',
                                    text: 'Vista Previa',
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

