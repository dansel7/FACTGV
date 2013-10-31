//TabCatServicios de la Aplicacion Hiber Tadeo Moreno Tovilla
Ext.define('MvcClientes.view.CatServicios.PanelCatServicios', {
    extend: 'Ext.Panel',
	alias:'widget.panelGrdCatServicios',
	closable:   true,  
	title   :   'Catalogo de Servicios',
    layout:'fit',
	itemId:'TabListadoCatServicios',
	initComponent: function() {
	    var me = this;
            me.items = Ext.create('MvcClientes.view.CatServicios.GrdCatServicios'); //Agregamos el Grid al PanelTab
            this.callParent();
    }
	

});