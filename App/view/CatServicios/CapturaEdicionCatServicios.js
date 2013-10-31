////////////Pueden usar tambien este dise�o de Formulario///////////////////

Ext.define('MvcClientes.view.CatServicios.CapturaEdicionCatServicios', {
    extend: 'Ext.window.Window',
	alias:'widget.FormAddEdicionCatServicios',
    height: 105,
    width: 400,
    layout: {
        type: 'fit'
    },
	autoShow: true,
    closable: false,
    title: 'Captura/Edicion Catalogo de Servicios',
    modal: true,
	
    initComponent: function() {
        
var me = this;
Ext.applyIf(me, {
    items: [
            {
                xtype: 'form',
               height: 71,
                name: 'form',
                layout: {
                    type: 'auto'
                },
                items: 
                [   {xtype: 'displayfield',name: 'displayfield1',id:'empDetails',value: ''},
                    {xtype: 'displayfield',name: 'displayfield1',id:'empDetails',value: ''},
                    {xtype : "textfield",id:"id_servicio", name : "id_servicio", fieldLabel : "ID",hidden: true},
                    {xtype : "textfield", name : "servicio", fieldLabel : "Nombre del Servicio", width: 350,allowBlank : false},
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
