
////////////Pueden usar tambien este dise�o de Formulario///////////////////


Ext.define('MvcClientes.view.Facturacion.CapturaEdicionFacturacion', {
    extend: 'Ext.form.Panel',
	alias:'widget.FormAddEdicionFacturacion',
    height: 500,
    width: 400,
    layout: {
        type: 'fit'
    },
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
Ext.create('Ext.data.Store', {
    storeId:'simpsonsStore',
    fields:['concepto', 'valor_concepto', 'valor_nosujeta','valor_exenta','valor_gravada'],
    data: [
        {"concepto":"Concepto de Prueba1", "valor_concepto":"213", "valor_nosujeta":"232"},
        {"concepto":"Concepto de Prueba2", "valor_concepto":"12", "valor_nosujeta":"23"},
        {"concepto":"Concepto de Prueba3", "valor_concepto":"23", "valor_nosujeta":"23"},
        {"concepto":"Concepto de Prueba4", "valor_concepto":"23", "valor_nosujeta":"455"}
    ]
});

        var me = this;
        Ext.applyIf(me, {
            items: [
                    {
                        xtype: 'form',
                        height: 500,
                        layout: {
                            type: 'auto'
                        },bodyPadding: 10,
                        items: 
                        [   
                            //DATOS GENERALES
                            {xtype: 'fieldset',title: 'Datos Generales', width:900,
                            layout: {
                                    columns: 3,
                                    type: 'table'
                            },  
                            items:[
                            {xtype : "combobox", id:"tipo_factura", fieldLabel: "Tipo Factura",queryMode: 'local', store: ListTpFact,displayField: 'tipo',valueField: 'id_tipo_facturacion',name:"id_tipo_facturacion", flex: 1, margin: '0 10 0 0',flex:1,allowBlank : false},    
                            {xtype : "textfield", name : "numero_factura", fieldLabel : "No. Factura", flex: 1,allowBlank : false},
                            {xtype : "combobox", fieldLabel: " Cliente",queryMode: 'local', store: ListMaestroClientes,displayField: 'nom_cliente',valueField: 'idmaestroClientes',name:"idmaestroClientes", flex: 1, margin: '0 10 0 0',width:340 ,allowBlank : false},
                            {xtype : "textfield", name : "comprobante", fieldLabel : " No. Comprobante", flex: 1, margin: '0 10 0 0'},
                            {xtype : "datefield", format: 'd/m/Y', value: new Date(), name : "fecha_facturacion", fieldLabel : " Fecha Facturacion", flex: 1, margin: '0 10 0 0'},
                            {xtype : "textfield", name : "venta_acta_de", fieldLabel : " Venta A Cuenta De", flex: 1, margin: '0 10 0 0'},
                            {xtype : "textfield", name : "idfacturacion", fieldLabel : "Id",hidden: true, margin: '0 10 0 0'}
                            ]},
                            
                            //GRID DE FACTURACION
                            {xtype : 'grid',name:'gridDetalle',id:'gridDetalle', allowBlank : false,
                            title: 'Detalle Facturacion',
                            store: Ext.data.StoreManager.lookup('simpsonsStore'),
                            columns: [
                                {header: 'Concepto',  dataIndex: 'concepto',flex:1, editor: {
                                        xtype: 'textfield',
                                    allowBlank: false
                                }},
                                {header: 'Valor Concepto', dataIndex: 'valor_concepto', editor: {
                                        xtype: 'textfield',
                                    allowBlank: false
                                }},
                                {header: 'Venta No sujeta', dataIndex: 'valor_nosujeta', editor: {
                                        xtype: 'textfield',
                                    allowBlank: true
                                }},
                                {header: 'Valor Exenta', dataIndex: 'valor_exenta', editor: {
                                        xtype: 'textfield',
                                    allowBlank: true
                                }},
                                {header: 'Venta Gravada', dataIndex: 'valor_gravada', editor: {
                                        xtype: 'textfield',
                                    allowBlank: true
                                }}
                            ],
                            height: 250,
                            width:900,
				    tbar: [{
			            text: 'Adicionar Venta',
			            iconCls: 'add',
			            id: 'addRecord',
			            handler : function() {
                                        var r = {
                                            concepto: '',
                                            valor_concepto: '',
                                            valor_nosujeta: '0.0',
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
			                loadCountries();


			             
			            }
			        }],
                                plugins: [
                                    Ext.create('Ext.grid.plugin.RowEditing', {
                                        id:'rowedit',
                                        clickToEdit : 1
                                    })
                                ]
                            },
                            
                            
                            //DATOS FINALES
                            {xtype: 'fieldset',title: 'Datos ',width:900,
                            layout: {
                                    columns: 3,
                                    type: 'table'
                            },                            
                            items:[
                            {xtype : "textfield", name : "iva", fieldLabel : "IVA", flex: 1},
                            {xtype : "textfield", name : "iva_retenido", fieldLabel : " Iva Retenido", flex: 1, margin: '0 10 0 0'},
                            {xtype : "textfield", name : "venta_total", fieldLabel : " Venta Total", flex: 1, margin: '0 10 0 0'},
                            {xtype : "datefield",format: 'd/m/Y', name : "fecha_quedan", fieldLabel : " Fecha Quedan", flex: 1, margin: '0 10 0 0'},
                            {xtype : "textfield", name : "comprobante_quedan", fieldLabel : " Comprobante Quedan", flex: 1, margin: '0 10 0 0'},
                            {xtype : "datefield",format: 'd/m/Y', name : "fecha_programada_pago", fieldLabel : " Fecha Programada de Pago", flex: 1, margin: '0 10 0 0'},
                            ]}
                        ],
            dockedItems : [{
                            xtype: 'toolbar',
                            dock: 'bottom',
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
									