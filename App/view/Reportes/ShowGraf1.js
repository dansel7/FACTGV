Ext.define('MvcClientes.view.Reportes.ShowGraf1', {
    extend: 'Ext.window.Window',
	alias:'widget.ShowGraf1',
      height: 130,
    width: 300,
    layout: {
        type: 'fit'
    },
    autoShow: true,
    closable: false,
    title: 'Ventas Por Servicio',
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
                            id:'ButtonGraf1',
                            ui: 'footer',
                            items: ['->', {
                                    itemId: 'BtnGraf1Aceptar',
                                    text: 'Aceptar',
                                    action: 'ShowGraf1'
                            },{
                                    itemId: 'BtnGraf1Cancelar',
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
