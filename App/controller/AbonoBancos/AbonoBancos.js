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

	init	: function() {
		var me = this;
		me.control({
		    'gridAbonoBancos dataview': { //Usando Ext.Component.Query,aca hacemos referencia a la vista del Grid
                            itemdblclick: this.Editar
			},
		    'gridAbonoBancos button[action=actAgregar]'://Usando Ext.Component.Query
			   {
				 click:this.Agregar
			   },
			'gridAbonoBancos button[action=actEditar]'://Usando Ext.Component.Query
			   {
				 click:this.Editar
			   },
		   'FormAddEdicionAbonoBancos button[action=actGuardar]'://Usando Ext.Component.Query
			   {
				 
				 click:this.ActualizarUsuario
			   },
		    'gridAbonoBancos button[action=actBorrar]'://Usando Ext.Component.Query
			   {
				 click:this.Eliminar
			   }
			
			
			   
				  
		});
	},
	//Inician Funciones
		
	Agregar: function(){
            records="null";
            var FormAddEditarAbonoBancos= Ext.widget('FormAddEdicionAbonoBancos');
	},
	
	Editar: function(grid, record){
	    records = this.getGridAbonoBancos().getSelectionModel().getSelection();
	    if(records.length > 0){
		     var FormAddEditarAbonoBancos= Ext.widget('FormAddEdicionAbonoBancos');
		     var EditForm=FormAddEditarAbonoBancos.down('form');	
		     var record=records[0];
		     EditForm.loadRecord(record);
		}
         	 
	},
	
	ActualizarUsuario: function(button) {
        var win    = button.up('window'),
            form   = win.down('form'),
            record = form.getRecord(),
            values = form.getValues();
            //IMPORTANTE COLOCAR EL NOMBRE DEL ID CORRECTO DEL REGISTRO
	if (values.id_AbonoBancos > 0){ //Si Hay algun Valor, entra en Modo de Actualizacion
			record.set(values);
		} else{ //De Lo contrario, si la accion fue para agregar, se inserta un registro
			record = Ext.create('MvcClientes.model.AbonoBancos.AbonoBancos');
			record.set(values);
			record.setId(0);
			this.getAbonoBancosAbonoBancosStore().add(record);
		}
        win.close();
       
    },
	
	Eliminar: function()
	{
	    //Para referirnos a un componente aca se utilizaran los Getters:
		var grid = this.getGridAbonoBancos();//Get+ Alias gridAbonoBancos (alias:'widget.gridAbonoBancos')
		record = grid.getSelectionModel().getSelection(); 
		AbonoBancos=grid.getSelectionModel().getSelection()[0].data.nombre;
		//En esta parte automaticamente el Controller crea las Funciones Getters
		store = this.getAbonoBancosAbonoBancosStore();//Nota 1: Get+Carpeta.AbonoBancos Store+La palabra Store
	    Ext.MessageBox.show({
           title : 'Eliminar Registro',
    	   buttons : Ext.MessageBox.YESNO,
		   msg : 'Desea Eliminar'+' '+ AbonoBancos +'?',
		   icon : Ext.Msg.WARNING,
           fn : function(btn)
							{
                                            if (btn == 'yes')
                                            {			
		                           store.remove(record);
                                            }
								
							}	
        });
	}
});

 















