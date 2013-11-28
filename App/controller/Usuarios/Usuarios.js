Ext.define('MvcClientes.controller.Usuarios.Usuarios',{
	extend		: 'Ext.app.Controller',
	stores		: ['Usuarios.Usuarios'],//Nota1: Carpeta + Archivo Usuarios.js,ver en la funcion de eliminar el get
	models		: ['Usuarios.Usuarios'],//Nota2: Carpeta + Archivo Usuarios.js,ver en la funcion de eliminar el get
	views		: ['Usuarios.GrdUsuarios','Usuarios.CapturaEdicionUsuarios'],
	refs:[ //Esta linea se usa cuando se hace referencia a una Vista dentro de un grid en un Controller
	 
	  {
	    ref:'gridUsuarios',
		selector:'gridUsuarios'//<<--Vista dentro de un Grid
	  }
	
	],

	init	: function() {
		var me = this;
		me.control({
		    'gridUsuarios dataview': { //Usando Ext.Component.Query,aca hacemos referencia a la vista del Grid
                            itemdblclick: this.Editar
			},
		    'gridUsuarios button[action=actAgregar]'://Usando Ext.Component.Query
			   {
				 click:this.Agregar
			   },
			'gridUsuarios button[action=actEditar]'://Usando Ext.Component.Query
			   {
				 click:this.Editar
			   },
		   'FormAddEdicionUsuarios button[action=actGuardar]'://Usando Ext.Component.Query
			   {
				 
				 click:this.ActualizarUsuario
			   },
		    'gridUsuarios button[action=actBorrar]'://Usando Ext.Component.Query
			   {
				 click:this.Eliminar
			   }
			
			
			   
				  
		});
	},
	//Inician Funciones
		
	Agregar: function(){
            records="null";
	    var FormAddEditarUsuarios= Ext.widget('FormAddEdicionUsuarios');
	},
	
	Editar: function(grid, record){
	    records = this.getGridUsuarios().getSelectionModel().getSelection();
	    if(records.length > 0){
		     var FormAddEditarUsuarios= Ext.widget('FormAddEdicionUsuarios');
		     var EditForm=FormAddEditarUsuarios.down('form');	
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
                if(form.getForm().isValid()){
	if (values.idbenutzer > 0){ //Si Hay algun Valor, entra en Modo de Actualizacion
			record.set(values);
		} else{ //De Lo contrario, si la accion fue para agregar, se inserta un registro
			record = Ext.create('MvcClientes.model.Usuarios.Usuarios');
			record.set(values);
			record.setId(0);
			this.getUsuariosUsuariosStore().add(record);
		}
        win.close();
                }
    },
	
	Eliminar: function()
	{
	    //Para referirnos a un componente aca se utilizaran los Getters:
		var grid = this.getGridUsuarios();//Get+ Alias gridUsuarios (alias:'widget.gridUsuarios')
		record = grid.getSelectionModel().getSelection(); 
		Usuario=grid.getSelectionModel().getSelection()[0].data.Nombre + " " + grid.getSelectionModel().getSelection()[0].data.Apellido;
		//En esta parte automaticamente el Controller crea las Funciones Getters
		store = this.getUsuariosUsuariosStore();//Nota 1: Get+Carpeta.Usuarios Store+La palabra Store
	    Ext.MessageBox.show({
           title : 'Eliminar Registro',
    	   buttons : Ext.MessageBox.YESNO,
		   msg : 'Desea Eliminar'+' '+Usuario+'?',
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

 















