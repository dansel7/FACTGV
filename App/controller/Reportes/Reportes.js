Ext.define('MvcClientes.controller.Reportes.Reportes',{
	extend		: 'Ext.app.Controller',
        views		: ['Reportes.ShowReport1','Reportes.ShowReport2'],
	refs:[ //Esta linea se usa cuando se hace referencia a una Vista dentro de un grid en un Controller
	 
	  {
	    ref:'gridReportes',
		selector:'gridReportes'//<<--Vista dentro de un Grid
	  }
	
	],

	init	: function() {
		var me = this;
		me.control({
		    'ShowReport1 button[action=ShowReport1]'://Usando Ext.Component.Query
			   {
				 click:this.ShowReport1
			   },
                    'ShowReport2 button[action=ShowReport2]'://Usando Ext.Component.Query
			   {
				 click:this.ShowReport2
			   }
                          		  
		});
                
	},
        ShowReport1: function(button){
            var win    = button.up('window'),
            form   = win.down('form'),
            values = form.getValues();
           window.open("/facturaciones/php/reportes/reporte_1.php?fecha_ini="+values.fecha_inicio+"&fecha_fin="+values.fecha_fin, "nuevo", "location=no, menubar=no, scrollbars=yes, statusbar=no, tittlebar=no");
	},
         ShowReport2: function(button){
            var win    = button.up('window'),
            form   = win.down('form'),
            values = form.getValues();
           window.open("/facturaciones/php/reportes/reporte_2.php?fecha_ini="+values.fecha_inicio+"&fecha_fin="+values.fecha_fin, "nuevo", "location=no, menubar=no, scrollbars=yes, statusbar=no, tittlebar=no");
           
           
	},
});

 















