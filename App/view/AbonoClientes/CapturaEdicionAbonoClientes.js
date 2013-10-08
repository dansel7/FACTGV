////////////Pueden usar tambien este dise�o de Formulario///////////////////
Ext.define('MvcClientes.view.AbonoClientes.CapturaEdicionAbonoClientes', {
    extend: 'Ext.window.Window',
	alias:'widget.FormAddEdicionAbonoClientes',
    height: 200,
    width: 300,
    layout: {
        type: 'fit'
    },
    autoShow: true,
    closable: false,
    title: 'Abono a Clientes',
    modal: true,
	
    initComponent: function() {
        
    //Se obtienen los valores del registro seleccionado idfactura y numero_factura
var idfacturacion=Ext.getCmp("gridAbonoClientes").getSelectionModel().getSelection()[0].data.idfacturacion;
var num_fact=Ext.getCmp("gridAbonoClientes").getSelectionModel().getSelection()[0].data.numero_factura;
var me = this;
Ext.applyIf(me, {
    items: [
            {
                xtype: 'form',
                height: 166,
                name: 'form',
                layout: {
                    type: 'auto'
                },
                items: 
                [   {xtype: 'displayfield',name: 'displayfield1',id:'empDetails1',value: 'Liquidacion de Factura #'+ num_fact},
                    {xtype: 'displayfield',name: 'displayfield1',id:'empDetails2',value: '' },
                    {xtype : "textfield",id:"id_abono_clientes", name : "id_abono_clientes", fieldLabel : "ID",hidden: true},
                    {xtype : "textfield",id:"idfacturacion", name : "idfacturacion", value: idfacturacion,fieldLabel : "ID",hidden: true},
                    {xtype : "datefield", format: 'd/m/Y', value: new Date(), name :"fecha_pago", fieldLabel : " Fecha de Pago", flex: 1,allowBlank : false},
                    {xtype : "numberfield", name : "numero_cheque", fieldLabel : "No. Cheque", hideTrigger: true,flex: 1,allowDecimals: false,allowBlank : false},
                    {xtype : "numberfield", id : "monto_cheque", name :"monto_cheque",fieldLabel : "Monto del Cheque",hideTrigger: true,flex: 1,allowDecimals: true,decimalPrecision: 2, margin: '0 10 0 0',decimalSeparator: ".",allowBlank : false}
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
              }
          ]
          }); 
          
     	  me.callParent(arguments);
         
                 
      }
     
     
});	
