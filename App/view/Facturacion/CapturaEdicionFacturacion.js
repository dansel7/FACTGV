
////////////Pueden usar tambien este dise�o de Formulario///////////////////


Ext.define('MvcClientes.view.Facturacion.CapturaEdicionFacturacion', {
    extend: 'Ext.form.Panel',
	alias:'widget.FormAddEdicionFacturacion',
    height: 400,
    width: 400,
    layout: {
        type: 'fit'
    },
	autoShow: true,
    closable: false,
    title: 'Formulario de Facturacion',
    modal: false,
	
    initComponent: function() {
        //STORE DE LOS DEPARTAMENTOS
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

        var me = this;
        Ext.applyIf(me, {
            items: [
                    {
                        xtype: 'form',
                        height: 50,
                        layout: {
                            type: 'auto'
                        },
                        items: 
                        [   {xtype: 'displayfield',name: 'displayfield1',id:'empDetails',value: ''},
                            {xtype : "textfield", name : "idFacturacion", fieldLabel : "Id",hidden: true},
                            {xtype : "textfield", name : "numero_factura", fieldLabel : "No. Factura", width: 350},
                            {xtype : "combobox", fieldLabel: "Cliente",queryMode: 'local', store: ListMaestroClientes,displayField: 'nom_cliente',valueField: 'idmaestroClientes',name:"idmaestroClientes", width: 300},
                            {xtype : "textfield", name : "comprobante", fieldLabel : "No. Comprobante", width: 350},
                            {xtype : "textfield", name : "fecha_facturacion", fieldLabel : "Fecha Facturacion", width: 350},
                            {xtype : "textfield", name : "venta_acta_de", fieldLabel : "Venta A Cuenta De", width: 350},
                            {xtype : "textfield", name : "iva", fieldLabel : "IVA", width: 350},
                            {xtype : "textfield", name : "iva_retenido", fieldLabel : "Iva Retenido", width: 350},
                            {xtype : "textfield", name : "venta_total", fieldLabel : "Venta Total", width: 350},
                            {xtype : "textfield", name : "fecha_quedan", fieldLabel : "Fecha Quedan", width: 350},
                            {xtype : "textfield", name : "comprobante_quedan", fieldLabel : "Comprobante Quedan", width: 350},
                            {xtype : "textfield", name : "fecha_programada_pago", fieldLabel : "Fecha Programada de Pago", width: 350},
                            
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
									