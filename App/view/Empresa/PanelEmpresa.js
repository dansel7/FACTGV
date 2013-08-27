//TabEmpresa de la Aplicacion Hiber Tadeo Moreno Tovilla
Ext.define('MvcClientes.view.Empresa.PanelEmpresa', {
    extend: 'Ext.Panel',
	alias:'widget.panelGrdEmpresa',
	closable:   true,  
	title   :   'Empresa',
    layout:'fit',
	itemId:'TabListadoEmpresa',
	initComponent: function() {
	    var me = this;
            me.items = Ext.create('MvcClientes.view.Empresa.GrdEmpresa'); //Agregamos el Grid al PanelTab
            this.callParent();
    }
	

});