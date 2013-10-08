Ext.define('MvcClientes.controller.AbonoClientes.AbonoClientes',{
	extend		: 'Ext.app.Controller',
	stores		: ['AbonoClientes.AbonoClientes'],//Nota1: Carpeta + Archivo AbonoClientes.js,ver en la funcion de eliminar el get
	models		: ['Abono.AbonoClientes'],//Nota2: Carpeta + Archivo AbonoClientes.js,ver en la funcion de eliminar el get
	views		: ['AbonoClientes.GrdAbonoClientes','AbonoClientes.CapturaEdicionAbonoClientes'],
	refs:[ //Esta linea se usa cuando se hace referencia a una Vista dentro de un grid en un Controller
	 
	  {
	    ref:'gridAbonoClientes',
		selector:'gridAbonoClientes'//<<--Vista dentro de un Grid
	  }
	
	],

	init : function() {
		var me = this;
		me.control({
                        'gridAbonoClientes dataview': { //Usando Ext.Component.Query,aca hacemos referencia a la vista del Grid
                                 itemdblclick: this.Liquidar
                           },
			'gridAbonoClientes button[action=actLiquidar]'://Usando Ext.Component.Query
			   {
				 click:this.Liquidar
			   },
                         'FormAddEdicionAbonoClientes button[action=actGuardar]'://Usando Ext.Component.Query
			   {
				 click:this.GuardarLiquidacion
			   }
				  
		});
	},
	//Inician Funciones
	Liquidar: function(grid, record){
            records="null";
	   /* records = this.getGridAbonoClientes().getSelectionModel().getSelection();
	    if(records.length > 0){*/
	   var FormAddEditarAbonoClientes= Ext.widget('FormAddEdicionAbonoClientes');
		    /* var EditForm=FormAddEditarAbonoClientes.down('form');	
		     var record=records[0];
		     EditForm.loadRecord(record);
		}	 */
	},
	
	GuardarLiquidacion: function(button) {
        var win    = button.up('window'),
            form   = win.down('form'),
            record = form.getRecord(),
            values = form.getValues();
            if(form.getForm().isValid()){
       //De Lo contrario, si la accion fue para agregar, se inserta un registro
           
                record = Ext.create('MvcClientes.model.Abono.AbonoClientes');
                record.set(values);
                record.setId(0);
                this.getAbonoClientesAbonoClientesStore().add(record);
                win.close();
             
            }
        }
});

 















