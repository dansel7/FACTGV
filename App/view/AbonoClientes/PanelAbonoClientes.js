//TabAbonoClientes de la Aplicacion Hiber Tadeo Moreno Tovilla
Ext.define('MvcClientes.view.AbonoClientes.PanelAbonoClientes', {
    extend: 'Ext.Panel',
	alias:'widget.panelGrdAbonoClientes',
	closable:   true,  
	title   :   'Abonar a Clientes',
    layout:'fit',
	itemId:'TabListadoAbonoClientes',
	initComponent: function() {
	    var me = this;
            me.items = Ext.create('MvcClientes.view.AbonoClientes.GrdAbonoClientes'); //Agregamos el Grid al PanelTab
            this.callParent();
    }
	

});