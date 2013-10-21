Ext.define('MvcClientes.controller.AbonoBancos.AbonoBancos',{
	extend		: 'Ext.app.Controller',
	stores		: ['AbonoBancos.AbonoBancos'],//Nota1: Carpeta + Archivo AbonoBancos.js,ver en la funcion de eliminar el get
	models		: ['Abono.AbonoBancos'],//Nota2: Carpeta + Archivo AbonoBancos.js,ver en la funcion de eliminar el get
	views		: ['AbonoBancos.GrdAbonoBancos','AbonoBancos.CapturaEdicionAbonoBancos'],
	refs:[ //Esta linea se usa cuando se hace referencia a una Vista dentro de un grid en un Controller
	 
	  {
	    ref:'gridAbonoBancos',
		selector:'gridAbonoBancos'//<<--Vista dentro de un Grid
	  }
	
	],

	init : function() {
		var me = this;
		me.control({
                        'gridAbonoBancos dataview': { //Usando Ext.Component.Query,aca hacemos referencia a la vista del Grid
                                 itemdblclick: this.Abonar
                           },
			'gridAbonoBancos button[action=actAbonar]'://Usando Ext.Component.Query
			   {
				 click:this.Abonar
			   },
                         'FormAddEdicionAbonoBancos button[action=actGuardar]'://Usando Ext.Component.Query
			   {
				 click:this.GuardarAbono
			   }
				  
		});
	},
	//Inician Funciones
	Abonar: function(grid, record){
            records="null";
	   /* records = this.getGridAbonoBancos().getSelectionModel().getSelection();
	    if(records.length > 0){*/
	   var FormAddEditarAbonoBancos= Ext.widget('FormAddEdicionAbonoBancos');
		    /* var EditForm=FormAddEditarAbonoBancos.down('form');	
		     var record=records[0];
		     EditForm.loadRecord(record);
		}	 */
	},
	
	GuardarAbono: function(button) {
        var win    = button.up('window'),
            form   = win.down('form'),
            record = form.getRecord(),
            values = form.getValues();
            if(form.getForm().isValid()){
       //De Lo contrario, si la accion fue para agregar, se inserta un registro
           
                record = Ext.create('MvcClientes.model.Abono.AbonoBancos');
                record.set(values);
                record.setId(0);
                this.getAbonoBancosAbonoBancosStore().add(record);
                win.close();
             
            }
        }
});

 















