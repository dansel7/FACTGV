Ext.define('MvcClientes.controller.Dashboard.Dashboard',{
	extend		: 'Ext.app.Controller',
        views		: ['Dashboard.TabDashb1'],
	refs:[ //Esta linea se usa cuando se hace referencia a una Vista dentro de un grid en un Controller
	 
	  {
	    ref:'gridDashboard',
		selector:'gridDashboard'//<<--Vista dentro de un Grid
	  }
	
	],

	init	: function() {
		var me = this;
		me.control({
		    'Dashb1 button[action=Dashb1]'://Usando Ext.Component.Query
			   {
				 click:this.Dashb1
			   }
                          		  
		});
                
	},
        Dashb1: function(button){
           }
        
        
});

 















