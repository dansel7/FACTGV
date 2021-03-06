Ext.define('MvcClientes.view.Reportes.ShowPartidasDiarioBancos', {
    extend: 'Ext.window.Window',
	alias:'widget.ShowPartidasDiarioBancos',
      height: 160,
    width: 360,
    layout: {
        type: 'fit'
    },
    autoShow: true,
    closable: false,
    title: 'Partida de Diario Bancos',
    modal: true,
	
    initComponent: function() {

var me = this;
Ext.applyIf(me, {
   items: [
            {
                xtype: 'form',
                height: 160,
                name: 'form',
                layout: {
                    type: 'auto'
                },
                items: 
                [   {xtype: 'displayfield',name: 'displayfield1',id:'empDetails',value: ''},
                    {xtype: 'displayfield',name: 'displayfield1',id:'empDetails',value: ''},
                    {xtype : "datefield",format: 'd/m/Y', value: new Date(), name :"fecha_inicio", fieldLabel : " Fecha de Inicio", allowBlank : false},
                    {xtype : "datefield",format: 'd/m/Y', value: new Date(), name :"fecha_fin", fieldLabel : " Fecha de Fin", allowBlank : false},
                    { defaultType: 'radiofield', fieldLabel : 'Reporte',
                            defaults: {
                                flex: 1
                            },
                            layout: 'hbox',
                            items: [
                                {
                                    boxLabel  : 'Partida de Bancos',
                                    name      : 'tipoRep',
                                    inputValue: '1',
                                    id        : 'radio1',
                                    checked:true
                                }, {
                                    boxLabel  : 'Movimientos de Ingreso',
                                    name      : 'tipoRep',
                                    inputValue: '2',
                                    id        : 'radio2'
                                } 
                            ]},
                    ],
            dockedItems : [{
                            xtype: 'toolbar',
                            dock: 'bottom',
                            id:'BottomPartidaDiario',
                            ui: 'footer',
                            items: ['->', {
                                    itemId: 'BtnPartidasDiarioPDF',
                                    text: 'PDF',
                                    action: 'ShowPartidasDiarioBancosPDF'
                            },{
                                    itemId: 'BtnPartidasDiarioEXCEL',
                                    text: 'EXCEL',
                                    action: 'ShowPartidasDiarioBancosEXCEL'
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
