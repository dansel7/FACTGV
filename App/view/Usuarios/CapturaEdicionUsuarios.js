////////////Pueden usar tambien este dise�o de Formulario///////////////////
Ext.require([
    'Ext.ux.form.MultiSelect',
    'Ext.ux.form.ItemSelector'
]);

Ext.define('MvcClientes.view.Usuarios.CapturaEdicionUsuarios', {
    extend: 'Ext.window.Window',
	alias:'widget.FormAddEdicionUsuarios',
    height: 450,
    width: 400,
    layout: {
        type: 'fit'
    },
	autoShow: true,
    closable: false,
    title: 'Captura/Edicion Usuarios',
    modal: false,
	
    initComponent: function() {
        
        //STORE DE LOS DEPARTAMENTOS
         var list_perfil = new Ext.data.Store({
            fields: ['id_perfil', 'perfil'],
            proxy: {
                type: 'ajax',
                url : 'Php/store/list_perfil.php',
                reader: {
                    type: 'json'
                }
            },
            autoLoad: true
        });



 var ds = Ext.create('MvcClientes.Store.dsListEmpresa');

       //LISTADO DE EMPRESAS QUE YA ESTAN SELECCIONADAS
        ////////////////////////////////////////////////
 


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
                    {xtype : "textfield", name : "idbenutzer", fieldLabel : "Id",hidden: true},
                    {xtype : "textfield", name : "Nombre", fieldLabel : "Nombre", width: 350},
                    {xtype : "textfield", name : "Apellido", fieldLabel : "Apellido", width: 350},
                    {xtype : "textfield", name : "benutzer", fieldLabel : "Usuario", width: 250},
                    {xtype : "textfield", name : "kennwort", fieldLabel : "Contrase&ntilde;a", width: 250,inputType: 'password'},
                    {xtype : "combobox", fieldLabel: "Perfil",queryMode: 'local', store: list_perfil, displayField: 'perfil',valueField: 'id_perfil',name:"id_perfil", width: 300},
                    {xtype : "textfield", name : "perfil", fieldLabel : "perfil", width: 350,hidden: true},                  
                    {
				xtype: 'itemselector',
	                        name: 'userEmp',
                                id: 'userEmp',
	                        width: 375, 
                                fieldLabel: 'Empresa',
	                        store: ds,
                                buttons: ['add', 'remove'],
                                buttonsText: {
                                    add: "Agregar",
                                    remove: "Remover"
                                },
	                        displayField: 'nombre',
	                        valueField: 'id_empresa',
	                        allowBlank: false,
	                        msgTarget: 'side',
                                scope: this
		    }
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
              }],
          listeners: {
            beforerender: {
            fn: me.onFormBeforeRender,
            scope: me
            }
           }
          }); 
          
     	  me.callParent(arguments);
                 
      }	, //SE CONFIGURA UN LISTENER PARA INSTANCIAR EL STORE Y LUEGO CARGARLO EN EL ITEMSELECTOR
      onFormBeforeRender: function(abstractcomponent, options) {
          
          var ds = Ext.create('MvcClientes.Store.dsListEmpresa');
          var ds2= Ext.create('MvcClientes.Store.dsListEmpresa2');

//NO CARGA LOS SELECCIONADOS 
            ds.load(function(){
                Ext.getCmp("userEmp").bindStore(ds);
                Ext.getCmp("userEmp").setValue(ds2);
            });
            }					
});	

//STORE DE LISTADO DE EMPRESAS QUE ESTAN DISPONIBLES
Ext.define('MvcClientes.Store.dsListEmpresa', {
    extend: 'Ext.data.Store', 
    root:"data",
    fields: ['id_empresa', 'nombre'],
    proxy: {
        type: 'ajax',
        url : 'Php/store/list_user_emp.php?opx=u1em1'
    },
    autoLoad: false
});  

Ext.define('MvcClientes.Store.dsListEmpresa2', {
    extend: 'Ext.data.ArrayStore', 
    fields: ['id_empresa'],
    proxy: {
        type: 'ajax',
        url : 'Php/store/list_user_emp.php?opx=em2u2'
    },
    autoLoad: true
});  