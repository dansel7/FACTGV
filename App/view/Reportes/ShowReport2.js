Ext.define('MvcClientes.view.Reportes.ShowReport2', {
    extend: 'Ext.window.Window',
	alias:'widget.ShowReport2',
      height: 130,
    width: 300,
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
                    {xtype : "datefield",format: 'd/m/Y', value: new Date(), name :"fecha_inicio", fieldLabel : " Fecha de Inicio", allowBlank : false},
                    {xtype : "datefield",format: 'd/m/Y', value: new Date(), name :"fecha_fin", fieldLabel : " Fecha de Fin", allowBlank : false},
                    ],
            dockedItems : [{
                            xtype: 'toolbar',
                            dock: 'bottom',
                            id:'ButtonReport',
                            ui: 'footer',
                            items: ['->', {
                                    itemId: 'BtnReport2Aceptar',
                                    text: 'Aceptar',
                                    action: 'ShowReport2'
                            },{
                                    itemId: 'BtnReport2Cancelar',
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
