Ext.define('MvcClientes.view.Reportes.ShowLibroIVA', {
    extend: 'Ext.window.Window',
	alias:'widget.ShowLibroIVA',
      height: 170,
    width: 360,
    layout: {
        type: 'fit'
    },
    autoShow: true,
    closable: false,
    title: 'Generacion de Libros de IVA',
    modal: true,
	
    initComponent: function() {
        
        
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
        
  ////STORE MESES///
      var Meses = new Ext.data.Store({
            fields: ['Mes','CodMes'],
            data: [
         {
            'Mes': 'Enero',
            'CodMes': '1'
         }, {
            'Mes': 'Febrero',
            'CodMes': '2'
         }, {
            'Mes': 'Marzo',
            'CodMes': '3'
        }, {
            'Mes': 'Abril',
            'CodMes': '4'
        }, {
            'Mes': 'Mayo',
            'CodMes': '5'
        }, {
            'Mes': 'Junio',
            'CodMes': '6'
        }, {
            'Mes': 'Julio',
            'CodMes': '7'
        }, {
            'Mes': 'Agosto',
            'CodMes': '8'
        }, {
            'Mes': 'Septiembre',
            'CodMes': '9'
        }, {
            'Mes': 'Octubre',
            'CodMes': '10'
        }, {
            'Mes': 'Noviembre',
            'CodMes': '11'
        }, {
            'Mes': 'Diciembre',
            'CodMes': '12'
        }]
        });
/////////-////////
        
/////STORE AÑOS////
        var years = [];
        var currentTime = new Date();
        var now = currentTime.getFullYear();
        y = 2013;
        while (y<=now){
             years.push([y]);
             y++;
        }

        var anio = new Ext.data.SimpleStore
        ({
              fields : ['Anio'],
              data : years
        });
/////////-////////        
        
var me = this;
Ext.applyIf(me, {
   items: [
            {
                xtype: 'form',
                height: 136,
                name: 'form',
                layout: {
                    type: 'auto'
                },
                items: 
                [   {xtype: 'displayfield',name: 'displayfield1',id:'empDetails',value: ''},
                    {xtype: 'displayfield',name: 'displayfield1',id:'empDetails',value: ''},
                    {
                        xtype : "combobox",name:"anio", queryMode: 'local', fieldLabel: "Seleccione Año",value:now,
                    store: anio,displayField: 'Anio',valueField: 'Anio', flex: 1,allowBlank : false,
                    margin: '0 10 0 20'
                    },{
                        xtype : "combobox",name:"mes_inicio", queryMode: 'local', fieldLabel: "Desde el Mes de",
                    store: Meses,displayField: 'Mes',valueField: 'CodMes',flex: 1, allowBlank : false,
                    margin: '0 10 0 20'
                    },{
                        xtype : "combobox",name:"mes_fin", queryMode: 'local', fieldLabel: "Hasta el Mes de",
                    store: Meses,displayField: 'Mes',valueField: 'CodMes',flex: 1, allowBlank : false,
                    margin: '0 10 0 20'
                    },
                    {xtype : "combobox", id:"id_tipo_facturacion", queryMode: 'local',fieldLabel: "Comprobante", 
                      store: ListTpFact,displayField: 'tipo',valueField: 'id_tipo_facturacion',
                      name:"id_tipo_facturacion", margin: '0 10 0 20',allowBlank : false,value:"Todas las Facturas"
                    }
                    ],
            dockedItems : [{
                            xtype: 'toolbar',
                            dock: 'bottom',
                            id:'BottomLibroIVA',
                            ui: 'footer',
                            items: ['->', {
                                    itemId: 'BtnLibroIVAPDF',
                                    text: 'PDF',
                                    action: 'ShowLibroIVAPDF'
                            },{
                                    itemId: 'BtnLibroIVAEXCEL',
                                    text: 'EXCEL',
                                    action: 'ShowLibroIVAEXCEL'
                            },{
                                    itemId: 'BtnCancelarLibroIVA',
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
