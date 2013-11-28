Ext.define('MvcClientes.controller.Clientes.Clientes',{
	extend		: 'Ext.app.Controller',
	stores		: ['Clientes.Clientes'],//Nota1: Carpeta + Archivo Clientes.js,ver en la funcion de eliminar el get
	models		: ['Clientes.Clientes'],//Nota2: Carpeta + Archivo Clientes.js,ver en la funcion de eliminar el get
	views		: ['Clientes.GrdClientes','Clientes.CapturaEdicionClientes'],
	refs:[ //Esta linea se usa cuando se hace referencia a una Vista dentro de un grid en un Controller
	 
	  {
	    ref:'gridClientes',
		selector:'gridClientes'//<<--Vista dentro de un Grid
	  }
	
	],

	init	: function() {
		var me = this;
		me.control({
		    'gridClientes dataview': { //Usando Ext.Component.Query,aca hacemos referencia a la vista del Grid
                            itemdblclick: this.Editar
			},
		    'gridClientes button[action=actAgregar]'://Usando Ext.Component.Query
			   {
				 click:this.Agregar
			   },
			'gridClientes button[action=actEditar]'://Usando Ext.Component.Query
			   {
				 click:this.Editar
			   },
		   'FormAddEdicionClientes button[action=actGuardar]'://Usando Ext.Component.Query
			   {
				 
				 click:this.ActualizarCliente
			   },
		    'gridClientes button[action=actBorrar]'://Usando Ext.Component.Query
			   {
				 click:this.Eliminar
			   }
			
			
			   
				  
		});
	},
	//Inician Funciones
		
	Agregar: function(){
	    var FormAddEditarClientes= Ext.widget('FormAddEdicionClientes');
	},
	
	Editar: function(grid, record){
	    records = this.getGridClientes().getSelectionModel().getSelection();
	    if(records.length > 0){
		     var FormAddEditarClientes= Ext.widget('FormAddEdicionClientes');
		     var EditForm=FormAddEditarClientes.down('form');	
		     var record=records[0];
		     EditForm.loadRecord(record);
		}
         	 
	},
	
	ActualizarCliente: function(button) {
        var win    = button.up('window'),
            form   = win.down('form'),
            record = form.getRecord(),
            values = form.getValues();
        if(form.getForm().isValid()){
	if (values.idmaestroClientes > 0){ //Si Hay algun Valor, entra en Modo de Actualizacion
			record.set(values);
		} else{ //De Lo contrario, si la accion fue para agregar, se inserta un registro
			record = Ext.create('MvcClientes.model.Clientes.Clientes');
			record.set(values);
			record.setId(0);
			this.getClientesClientesStore().add(record);
		}   
        win.close();
        }
    },
	
	Eliminar: function()
	{
	    //Para referirnos a un componente aca se utilizaran los Getters:
		var grid = this.getGridClientes();//Get+ Alias gridClientes (alias:'widget.gridClientes')
		record = grid.getSelectionModel().getSelection(); 
		Cliente=grid.getSelectionModel().getSelection()[0].data.nom_cliente;
		//En esta parte automaticamente el Controller crea las Funciones Getters
		store = this.getClientesClientesStore();//Nota 1: Get+Carpeta.Clientes Store+La palabra Store
	    Ext.MessageBox.show({
           title : 'Eliminar Registro',
    	   buttons : Ext.MessageBox.YESNO,
		   msg : 'Desea Eliminar'+' '+Cliente+'?',
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

 















