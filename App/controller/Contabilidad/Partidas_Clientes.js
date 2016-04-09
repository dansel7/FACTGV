Ext.define('MvcClientes.controller.Contabilidad.Partidas_Clientes',{
	extend		: 'Ext.app.Controller',
	stores		: ['Contabilidad.Partidas_Clientes'],//Nota1: Carpeta + Archivo Partidas_Clientes.js,ver en la funcion de eliminar el get
	models		: ['Contabilidad.Partidas_Clientes'],//Nota2: Carpeta + Archivo Partidas_Clientes.js,ver en la funcion de eliminar el get
	views		: ['Contabilidad.Partidas_Clientes.GrdPartidas_Clientes'],
	refs:[ //Esta linea se usa cuando se hace referencia a una Vista dentro de un grid en un Controller
	 
	  {
	    ref:'gridPartidas_Clientes',
		selector:'gridPartidas_Clientes'//<<--Vista dentro de un Grid
	  }
	
	],

	init	: function() {
		var me = this;
		me.control({
		    'gridPartidas_Clientes dataview': { //Usando Ext.Component.Query,aca hacemos referencia a la vista del Grid
                            itemdblclick: this.Editar
			},
		    'gridPartidas_Clientes button[action=actAgregar]'://Usando Ext.Component.Query
			   {
				 click:this.Agregar
			   },
			'gridPartidas_Clientes button[action=actEditar]'://Usando Ext.Component.Query
			   {
				 click:this.Editar
			   },
		   'FormAddEdicionPartidas_Clientes button[action=actGuardar]'://Usando Ext.Component.Query
			   {
				 
				 click:this.ActualizarPartidas_Clientes
			   },
		    'gridPartidas_Clientes button[action=actBorrar]'://Usando Ext.Component.Query
			   {
				 click:this.Eliminar
			   }
			
			
			   
				  
		});
	},
	//Inician Funciones
		
	Agregar: function(){
            records="null";
            var FormAddEditarPartidas_Clientes= Ext.widget('FormAddEdicionPartidas_Clientes');
	},
	
	Editar: function(grid, record){
	    records = this.getGridPartidas_Clientes().getSelectionModel().getSelection();
	    if(records.length > 0){
		     var FormAddEditarPartidas_Clientes= Ext.widget('FormAddEdicionPartidas_Clientes');
		     var EditForm=FormAddEditarPartidas_Clientes.down('form');	
		     var record=records[0];
		     EditForm.loadRecord(record);
		}
         	 
	},
	
	ActualizarPartidas_Clientes: function(button) {
        var win    = button.up('window'),
            form   = win.down('form'),
            record = form.getRecord(),
            values = form.getValues();
            //IMPORTANTE COLOCAR EL NOMBRE DEL ID CORRECTO DEL REGISTRO
	if(form.getForm().isValid()){
         if (values.id_partidas_cliente > 0){ //Si Hay algun Valor, entra en Modo de Actualizacion
			record.set(values);
		} else{ //De Lo contrario, si la accion fue para agregar, se inserta un registro
			record = Ext.create('MvcClientes.model.Contabilidad.Partidas_Clientes');
			record.set(values);
			record.setId(0);
			this.getPartidas_ClientesStore().add(record);
		}
        win.close();
            }
    },
	
	Eliminar: function()
	{
	    //Para referirnos a un componente aca se utilizaran los Getters:
		var grid = this.getGridPartidas_Clientes();//Get+ Alias gridPartidas_Clientes (alias:'widget.gridPartidas_Clientes')
		record = grid.getSelectionModel().getSelection(); 
		Partida=grid.getSelectionModel().getSelection()[0].data.numero_partida;
		//En esta parte automaticamente el Controller crea las Funciones Getters
		store = this.getPartidas_ClientesStore();//Nota 1: Get+Carpeta.Partidas_Clientes Store+La palabra Store
	    Ext.MessageBox.show({
           title : 'Eliminar Registro',
    	   buttons : Ext.MessageBox.YESNO,
		   msg : 'Desea Eliminar la Partida '+' '+ Partida +'?',
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

 















