Ext.define('MvcClientes.view.Reportes.ShowPartidasDiarioVentas', {
    extend: 'Ext.window.Window',
	alias:'widget.ShowPartidasDiarioVentas',
      height: 140,
    width: 360,
    layout: {
        type: 'fit'
    },
    autoShow: true,
    closable: false,
    title: 'Partida de Diario Ventas',
    modal: true,
	
    initComponent: function() {

var me = this;
Ext.applyIf(me, {
   items: [
            {
                xtype: 'form',
                height: 350,
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
                            id:'BottomPartidaDiario',
                            ui: 'footer',
                            items: ['->', {
                                    itemId: 'BtnPartidasDiarioPDF',
                                    text: 'PDF',
                                    action: 'ShowPartidasDiarioVentasPDF'
                            },{
                                    itemId: 'BtnPartidasDiarioEXCEL',
                                    text: 'EXCEL',
                                    action: 'ShowPartidasDiarioVentasEXCEL'
                            },{
                                    itemId: 'BtnCancelarPartDiario',
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
