////////////Pueden usar tambien este dise�o de Formulario///////////////////

Ext.define('MvcClientes.view.CuentasBancos.CapturaEdicionCuentasBancos', {
    extend: 'Ext.window.Window',
	alias:'widget.FormAddEdicionCuentasBancos',
    height: 190,
    width: 400,
    layout: {
        type: 'fit'
    },
	autoShow: true,
    closable: false,
    title: 'Captura/Edicion Cuentas Bancarias',
    modal: true,
	
    initComponent: function() {
        
//STORE DE LISTADO DE BANCOS

 var list_bancos = new Ext.data.Store({
            fields: ['id_banco', 'nombre_banco'],
            proxy: {
                type: 'ajax',
                url : 'Php/store/list_bancos.php',
                reader: {
                    type: 'json'
                }
            },
            autoLoad: true
        });
        
//STORE DE LISTADO DE EMPRESA
 var list_empresa = new Ext.data.Store({
            fields: ['id_empresa', 'nombre'],
            proxy: {
                type: 'ajax',
                url : 'Php/store/list_empresa.php',
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
                height: 161,
                name: 'form',
                layout: {
                    type: 'auto'
                },
                items: 
                [   {xtype: 'displayfield',name: 'displayfield1',id:'empDetails',value: ''},
                    {xtype: 'displayfield',name: 'displayfield1',id:'empDetails',value: ''},
                    {xtype : "textfield",id:"id_cuenta", name : "id_cuenta", fieldLabel : "ID",hidden: true},
                    {xtype : "textfield", name : "numero_cuenta", fieldLabel : "Numero de Cuenta", width: 350,allowBlank : false},
                    {xtype : "combobox", queryMode: 'local', fieldLabel: "Banco",
                                queryMode: 'local', store: list_bancos,displayField: 'nombre_banco',valueField: 'id_banco',
                                name:"id_banco", id:"id_banco", flex: 1,width:350 ,allowBlank : false
                     },
                    {xtype : "combobox", queryMode: 'local', fieldLabel: "Empresa",
                               queryMode: 'local', store: list_empresa,displayField: 'nombre',valueField: 'id_empresa',
                               name:"id_empresa", id:"id_empresa", flex: 1, width:350 ,allowBlank : false
                           },
                    {xtype : "textfield", name : "partida_contable", fieldLabel : "Partida Contable", width: 350,allowBlank : false},
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
