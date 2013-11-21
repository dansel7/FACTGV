//TabFacturacion de la Aplicacion Hiber Tadeo Moreno Tovilla
Ext.define('MvcClientes.view.Dashboard.PanelDashboard', {
    extend: 'Ext.Panel',
	alias:'widget.panelGrdFacturacion',
	closable:   true,  
	title   :   'Dashboard',
    layout:'fit',
	itemId:'TabDashboard',
	initComponent: function() {
	    var me = this;
            Ext.define('PopulationPoint', {
        extend: 'Ext.data.Model',
        fields: ['state', 'population']
    });
 
var store = Ext.create('Ext.data.Store', {
    model: 'PopulationPoint',
    data: [{ state:"Alabama", population: 4802740},
           { state:"Alaska", population: 722718},
           { state:"Arizona", population: 6482505},
           { state:"Arkansas", population: 2937979},
           { state:"California", population: 37691912},
           { state:"Colorado", population: 5116796},
           { state:"Connecticut", population: 3580709},
           { state:"Delaware", population: 907135},
           { state:"DC", population: 617996} ]
  });
 
  me.items=Ext.create('Ext.chart.Chart', {
     renderTo: Ext.getBody(),
     width: 470,
     height: 300,
     store: store,
     series: [
     {
       type: 'pie',
       field: 'population',
       label: {
         field: 'state',
         display: 'outside',
         font: '12px Arial'
       }
     }]
  });
  
            //me.items = Ext.create('MvcClientes.view.Dashboard.GrdFacturacion'); //Agregamos el Grid al PanelTab
            this.callParent();
    }
	

});