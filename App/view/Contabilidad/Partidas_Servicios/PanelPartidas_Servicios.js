//TabCatServicios de la Aplicacion Hiber Tadeo Moreno Tovilla
Ext.define('MvcClientes.view.Contabilidad.Partidas_Servicios.PanelPartidas_Servicios', {
    extend: 'Ext.Panel',
	alias:'widget.panelGrdPartidas_Servicios',
	closable:   true,  
	title   :   'Partidas Contables de Servicios',
    layout:'fit',
	itemId:'TabListadoPartidas_Servicios',
	initComponent: function() {
	    var me = this;
            me.items = Ext.create('MvcClientes.view.Contabilidad.Partidas_Servicios.GrdPartidas_Servicios'); //Agregamos el Grid al PanelTab
            this.callParent();
    }
	

});