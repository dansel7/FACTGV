////////////Pueden usar tambien este dise�o de Formulario///////////////////
Ext.require([
    'Ext.ux.form.MultiSelect',
    'Ext.ux.form.ItemSelector'
]);

Ext.define('MvcClientes.view.Empresa.CapturaEdicionEmpresa', {
    extend: 'Ext.window.Window',
	alias:'widget.FormAddEdicionEmpresa',
    height: 400,
    width: 400,
    layout: {
        type: 'fit'
    },
	autoShow: true,
    closable: false,
    title: 'Captura/Edicion Empresa',
    modal: false,
	
    initComponent: function() {
        var ds = Ext.create('MvcClientes.Store.dsListTipoFactura');
var me = this;
Ext.applyIf(me, {
    items: [
            {
                xtype: 'form',
                height: 50,
                name: 'form',
                layout: {
                    type: 'auto'
                },
                items: 
                [   {xtype: 'displayfield',name: 'displayfield1',id:'empDetails',value: ''},
                    {xtype: 'displayfield',name: 'displayfield1',id:'empDetails',value: ''},
                    {xtype : "textfield", name : "id_empresa", fieldLabel : "ID",hidden: true},
                    {xtype : "textfield", name : "nombre", fieldLabel : "Nombre de Empresa", width: 350},
                    {xtype: 'itemselector', id:"ISempresas",store:ds, name: 'empresas',width:350 ,anchor: '30%',
                    fieldLabel: 'Seleccion',displayField: 'nombre',valueField: 'id_empresa',
                    value: ['1'], allowBlank: false, msgTarget: 'side'}
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
          ],
          listeners: {
            beforerender: {
            fn: me.onFormBeforeRender,
            scope: me
            }
           }
          }); 
          
     	  me.callParent(arguments);
          
          
         
                 
      }, //SE CONFIGURA UN LISTENER PARA INSTANCIAR EL STORE Y LUEGO CARGARLO EN EL ITEMSELECTOR
      onFormBeforeRender: function(abstractcomponent, options) {
          
          var ds = Ext.create('MvcClientes.Store.dsListEmpresa');

            ds.load(function(){
                Ext.getCmp("ISempresas").bindStore(ds);
               
            });
            }					
});	

//STORE DE LISTADO DE TIPOS DE FACTURA QUE ESTAN DISPONIBLES
Ext.define('MvcClientes.Store.dsListTipoFactura', {
    extend: 'Ext.data.Store', 
    root:"data",
    fields: ['id_empresa', 'nombre'],
    proxy: {
        type: 'ajax',
        url : 'Php/store/list_user_emp.php?opx=u1em1'
    },
    autoLoad: false
});  