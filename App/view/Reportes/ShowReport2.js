Ext.define('MvcClientes.view.Reportes.ShowReport2', {
    extend: 'Ext.window.Window',
	alias:'widget.ShowReport2',
    height: 400,
    width: 400,
    layout: {
        type: 'fit'
    },
    autoShow: true,
    closable: false,
    title: 'Facturas Realizadas',
    modal: true,
	
    initComponent: function() {

var me = this;
Ext.applyIf(me, {
    items: [
            {
                xtype: 'form',
                height: 365,
                name: 'form',
                layout: {
                    type: 'auto'
                },
                items: 
                [   {xtype: 'displayfield',name: 'displayfield1',id:'empDetails',value: ''},
                    {xtype: 'displayfield',name: 'displayfield1',id:'empDetails',value: ''},
                    ],
            dockedItems : [{
                            xtype: 'toolbar',
                            dock: 'bottom',
                            id:'buttons',
                            ui: 'footer',
                            items: ['->', {
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
