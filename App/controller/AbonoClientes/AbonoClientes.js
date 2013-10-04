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

	init	: function() {
		var me = this;
		me.control({
		    'gridAbonoClientes dataview': { //Usando Ext.Component.Query,aca hacemos referencia a la vista del Grid
                            itemdblclick: this.Editar
			},
		    'gridAbonoClientes button[action=actAgregar]'://Usando Ext.Component.Query
			   {
				 click:this.Agregar
			   },
			'gridAbonoClientes button[action=actEditar]'://Usando Ext.Component.Query
			   {
				 click:this.Editar
			   },
		   'FormAddEdicionAbonoClientes button[action=actGuardar]'://Usando Ext.Component.Query
			   {
				 
				 click:this.ActualizarUsuario
			   },
		    'gridAbonoClientes button[action=actBorrar]'://Usando Ext.Component.Query
			   {
				 click:this.Eliminar
			   }
			
			
			   
				  
		});
	},
	//Inician Funciones
		
	Agregar: function(){
            records="null";
            var FormAddEditarAbonoClientes= Ext.widget('FormAddEdicionAbonoClientes');
	},
	
	Editar: function(grid, record){
	    records = this.getGridAbonoClientes().getSelectionModel().getSelection();
	    if(records.length > 0){
		     var FormAddEditarAbonoClientes= Ext.widget('FormAddEdicionAbonoClientes');
		     var EditForm=FormAddEditarAbonoClientes.down('form');	
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
	if (values.id_AbonoClientes > 0){ //Si Hay algun Valor, entra en Modo de Actualizacion
			record.set(values);
		} else{ //De Lo contrario, si la accion fue para agregar, se inserta un registro
			record = Ext.create('MvcClientes.model.AbonoClientes.AbonoClientes');
			record.set(values);
			record.setId(0);
			this.getAbonoClientesAbonoClientesStore().add(record);
		}
        win.close();
       
    },
	
	Eliminar: function()
	{
	    //Para referirnos a un componente aca se utilizaran los Getters:
		var grid = this.getGridAbonoClientes();//Get+ Alias gridAbonoClientes (alias:'widget.gridAbonoClientes')
		record = grid.getSelectionModel().getSelection(); 
		AbonoClientes=grid.getSelectionModel().getSelection()[0].data.nombre;
		//En esta parte automaticamente el Controller crea las Funciones Getters
		store = this.getAbonoClientesAbonoClientesStore();//Nota 1: Get+Carpeta.AbonoClientes Store+La palabra Store
	    Ext.MessageBox.show({
           title : 'Eliminar Registro',
    	   buttons : Ext.MessageBox.YESNO,
		   msg : 'Desea Eliminar'+' '+ AbonoClientes +'?',
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

 















