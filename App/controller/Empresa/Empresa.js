Ext.define('MvcClientes.controller.Empresa.Empresa',{
	extend		: 'Ext.app.Controller',
	stores		: ['Empresa.Empresa'],//Nota1: Carpeta + Archivo Empresa.js,ver en la funcion de eliminar el get
	models		: ['Empresa.Empresa'],//Nota2: Carpeta + Archivo Empresa.js,ver en la funcion de eliminar el get
	views		: ['Empresa.GrdEmpresa','Empresa.CapturaEdicionEmpresa'],
	refs:[ //Esta linea se usa cuando se hace referencia a una Vista dentro de un grid en un Controller
	 
	  {
	    ref:'gridEmpresa',
		selector:'gridEmpresa'//<<--Vista dentro de un Grid
	  }
	
	],

	init	: function() {
		var me = this;
		me.control({
		    'gridEmpresa dataview': { //Usando Ext.Component.Query,aca hacemos referencia a la vista del Grid
                            itemdblclick: this.Editar
			},
		    'gridEmpresa button[action=actAgregar]'://Usando Ext.Component.Query
			   {
				 click:this.Agregar
			   },
			'gridEmpresa button[action=actEditar]'://Usando Ext.Component.Query
			   {
				 click:this.Editar
			   },
		   'FormAddEdicionEmpresa button[action=actGuardar]'://Usando Ext.Component.Query
			   {
				 
				 click:this.ActualizarUsuario
			   },
		    'gridEmpresa button[action=actBorrar]'://Usando Ext.Component.Query
			   {
				 click:this.Eliminar
			   }
			
			
			   
				  
		});
	},
	//Inician Funciones
		
	Agregar: function(){
	    var FormAddEditarEmpresa= Ext.widget('FormAddEdicionEmpresa');
	},
	
	Editar: function(grid, record){
	    records = this.getGridEmpresa().getSelectionModel().getSelection();
	    if(records.length > 0){
		     var FormAddEditarEmpresa= Ext.widget('FormAddEdicionEmpresa');
		     var EditForm=FormAddEditarEmpresa.down('form');	
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
	if (values.id_empresa > 0){ //Si Hay algun Valor, entra en Modo de Actualizacion
			record.set(values);
		} else{ //De Lo contrario, si la accion fue para agregar, se inserta un registro
			record = Ext.create('MvcClientes.model.Empresa.Empresa');
			record.set(values);
			record.setId(0);
			this.getEmpresaEmpresaStore().add(record);
		}
        win.close();
       
    },
	
	Eliminar: function()
	{
	    //Para referirnos a un componente aca se utilizaran los Getters:
		var grid = this.getGridEmpresa();//Get+ Alias gridEmpresa (alias:'widget.gridEmpresa')
		record = grid.getSelectionModel().getSelection(); 
		Empresa=grid.getSelectionModel().getSelection()[0].data.nombre;
		//En esta parte automaticamente el Controller crea las Funciones Getters
		store = this.getEmpresaEmpresaStore();//Nota 1: Get+Carpeta.Empresa Store+La palabra Store
	    Ext.MessageBox.show({
           title : 'Eliminar Registro',
    	   buttons : Ext.MessageBox.YESNO,
		   msg : 'Desea Eliminar'+' '+ Empresa +'?',
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

 















