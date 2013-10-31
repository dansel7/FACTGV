Ext.define('MvcClientes.controller.CatServicios.CatServicios',{
	extend		: 'Ext.app.Controller',
	stores		: ['CatServicios.CatServicios'],//Nota1: Carpeta + Archivo CatServicios.js,ver en la funcion de eliminar el get
	models		: ['CatServicios.CatServicios'],//Nota2: Carpeta + Archivo CatServicios.js,ver en la funcion de eliminar el get
	views		: ['CatServicios.GrdCatServicios','CatServicios.CapturaEdicionCatServicios'],
	refs:[ //Esta linea se usa cuando se hace referencia a una Vista dentro de un grid en un Controller
	 
	  {
	    ref:'gridCatServicios',
		selector:'gridCatServicios'//<<--Vista dentro de un Grid
	  }
	
	],

	init	: function() {
		var me = this;
		me.control({
		    'gridCatServicios dataview': { //Usando Ext.Component.Query,aca hacemos referencia a la vista del Grid
                            itemdblclick: this.Editar
			},
		    'gridCatServicios button[action=actAgregar]'://Usando Ext.Component.Query
			   {
				 click:this.Agregar
			   },
			'gridCatServicios button[action=actEditar]'://Usando Ext.Component.Query
			   {
				 click:this.Editar
			   },
		   'FormAddEdicionCatServicios button[action=actGuardar]'://Usando Ext.Component.Query
			   {
				 
				 click:this.ActualizarCatServicios
			   },
		    'gridCatServicios button[action=actBorrar]'://Usando Ext.Component.Query
			   {
				 click:this.Eliminar
			   }
			
			
			   
				  
		});
	},
	//Inician Funciones
		
	Agregar: function(){
            records="null";
            var FormAddEditarCatServicios= Ext.widget('FormAddEdicionCatServicios');
	},
	
	Editar: function(grid, record){
	    records = this.getGridCatServicios().getSelectionModel().getSelection();
	    if(records.length > 0){
		     var FormAddEditarCatServicios= Ext.widget('FormAddEdicionCatServicios');
		     var EditForm=FormAddEditarCatServicios.down('form');	
		     var record=records[0];
		     EditForm.loadRecord(record);
		}
         	 
	},
	
	ActualizarCatServicios: function(button) {
        var win    = button.up('window'),
            form   = win.down('form'),
            record = form.getRecord(),
            values = form.getValues();
            //IMPORTANTE COLOCAR EL NOMBRE DEL ID CORRECTO DEL REGISTRO
	if(form.getForm().isValid()){
         if (values.id_servicio > 0){ //Si Hay algun Valor, entra en Modo de Actualizacion
			record.set(values);
		} else{ //De Lo contrario, si la accion fue para agregar, se inserta un registro
			record = Ext.create('MvcClientes.model.CatServicios.CatServicios');
			record.set(values);
			record.setId(0);
			this.getCatServiciosCatServiciosStore().add(record);
		}
        win.close();
            }
    },
	
	Eliminar: function()
	{
	    //Para referirnos a un componente aca se utilizaran los Getters:
		var grid = this.getGridCatServicios();//Get+ Alias gridCatServicios (alias:'widget.gridCatServicios')
		record = grid.getSelectionModel().getSelection(); 
		Servicio=grid.getSelectionModel().getSelection()[0].data.servicio;
		//En esta parte automaticamente el Controller crea las Funciones Getters
		store = this.getCatServiciosCatServiciosStore();//Nota 1: Get+Carpeta.CatServicios Store+La palabra Store
	    Ext.MessageBox.show({
           title : 'Eliminar Registro',
    	   buttons : Ext.MessageBox.YESNO,
		   msg : 'Desea Eliminar El Servicio '+' '+ Servicio +'?',
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

 















