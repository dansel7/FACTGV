//TabUsuarios de la Aplicacion Hiber Tadeo Moreno Tovilla
Ext.define('MvcClientes.view.Usuarios.PanelUsuarios', {
    extend: 'Ext.Panel',
	alias:'widget.panelGrdUsuarios',
	closable:   true,  
	title   :   'Usuarios',
    layout:'fit',
	itemId:'TabListadoUsuarios',
	initComponent: function() {
	    var me = this;
            me.items = Ext.create('MvcClientes.view.Usuarios.GrdUsuarios'); //Agregamos el Grid al PanelTab
            this.callParent();
    }
	

});