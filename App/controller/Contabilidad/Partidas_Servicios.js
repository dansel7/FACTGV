Ext.define('MvcClientes.controller.Contabilidad.Partidas_Servicios',{
	extend		: 'Ext.app.Controller',
	stores		: ['Contabilidad.Partidas_Servicios'],//Nota1: Carpeta + Archivo Partidas_Servicios.js,ver en la funcion de eliminar el get
	models		: ['Contabilidad.Partidas_Servicios'],//Nota2: Carpeta + Archivo Partidas_Servicios.js,ver en la funcion de eliminar el get
	views		: ['Contabilidad.Partidas_Servicios.GrdPartidas_Servicios'],
	refs:[ //Esta linea se usa cuando se hace referencia a una Vista dentro de un grid en un Controller
	 
	  {
	    ref:'gridPartidas_Servicios',
		selector:'gridPartidas_Servicios'//<<--Vista dentro de un Grid
	  }
	
	],

	init	: function() {
		var me = this;
		me.control({
		   'FormAddEdicionPartidas_Servicios button[action=actGuardar]'://Usando Ext.Component.Query
			   {
				 
				 click:this.ActualizarPartidas_Servicios
			   },
		    'gridPartidas_Servicios button[action=actBorrar]'://Usando Ext.Component.Query
			   {
				 click:this.Eliminar
			   }
			
			
			   
				  
		});
	},
	//Inician Funciones
	
	ActualizarPartidas_Servicios: function(button) {
        var win    = button.up('window'),
            form   = win.down('form'),
            record = form.getRecord(),
            values = form.getValues();
            //IMPORTANTE COLOCAR EL NOMBRE DEL ID CORRECTO DEL REGISTRO
	if(form.getForm().isValid()){
         if (values.id_partidas_servicios > 0){ //Si Hay algun Valor, entra en Modo de Actualizacion
			record.set(values);
		} else{ //De Lo contrario, si la accion fue para agregar, se inserta un registro
			record = Ext.create('MvcClientes.model.Contabilidad.Partidas_Servicios');
			record.set(values);
			record.setId(0);
			this.getContabilidadPartidas_ServiciosStore().add(record);
		}
        win.close();
            }
    },
	
	Eliminar: function()
	{
	    //Para referirnos a un componente aca se utilizaran los Getters:
		var grid = this.getGridPartidas_Servicios();//Get+ Alias gridPartidas_Servicios (alias:'widget.gridPartidas_Servicios')
		record = grid.getSelectionModel().getSelection(); 
		Partida=grid.getSelectionModel().getSelection()[0].data.numero_partida;
		//En esta parte automaticamente el Controller crea las Funciones Getters
		store = this.getContabilidadPartidas_ServiciosStore();//Nota 1: Get+Carpeta.Partidas_Servicios Store+La palabra Store
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

 















