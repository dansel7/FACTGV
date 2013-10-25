Ext.define('MvcClientes.controller.CuentasBancos.CuentasBancos',{
	extend		: 'Ext.app.Controller',
	stores		: ['CuentasBancos.CuentasBancos'],//Nota1: Carpeta + Archivo CuentasBancos.js,ver en la funcion de eliminar el get
	models		: ['CuentasBancos.CuentasBancos'],//Nota2: Carpeta + Archivo CuentasBancos.js,ver en la funcion de eliminar el get
	views		: ['CuentasBancos.GrdCuentasBancos','CuentasBancos.CapturaEdicionCuentasBancos'],
	refs:[ //Esta linea se usa cuando se hace referencia a una Vista dentro de un grid en un Controller
	 
	  {
	    ref:'gridCuentasBancos',
		selector:'gridCuentasBancos'//<<--Vista dentro de un Grid
	  }
	
	],

	init : function() {
		var me = this;
		me.control({
		    'gridCuentasBancos dataview': { //Usando Ext.Component.Query,aca hacemos referencia a la vista del Grid
                            itemdblclick: this.Editar
			},
		    'gridCuentasBancos button[action=actAgregar]'://Usando Ext.Component.Query
			   {
				 click:this.Agregar
			   },
			'gridCuentasBancos button[action=actEditar]'://Usando Ext.Component.Query
			   {
				 click:this.Editar
			   },
		   'FormAddEdicionCuentasBancos button[action=actGuardar]'://Usando Ext.Component.Query
			   { 
				 click:this.ActualizarCuentasBancos
			   },
		    'gridCuentasBancos button[action=actBorrar]'://Usando Ext.Component.Query
			   {
				 click:this.Eliminar
			   }
			
		});
	},
	//Inician Funciones
		
	Agregar: function(){
            records="null";
            var FormAddEditarCuentasBancos= Ext.widget('FormAddEdicionCuentasBancos');
	},
	
	Editar: function(grid, record){
	    records = this.getGridCuentasBancos().getSelectionModel().getSelection();
	    if(records.length > 0){
		     var FormAddEditarCuentasBancos= Ext.widget('FormAddEdicionCuentasBancos');
		     var EditForm=FormAddEditarCuentasBancos.down('form');	
		     var record=records[0];
		     EditForm.loadRecord(record);
		}
	},
	
	ActualizarCuentasBancos: function(button) {
        var win    = button.up('window'),
            form   = win.down('form'),
            record = form.getRecord(),
            values = form.getValues();
            //IMPORTANTE COLOCAR EL NOMBRE DEL ID CORRECTO DEL REGISTRO
        if(form.getForm().isValid()){
	if (values.id_cuenta > 0){ //Si Hay algun Valor, entra en Modo de Actualizacion
			record.set(values);
		} else{ //De Lo contrario, si la accion fue para agregar, se inserta un registro
			record = Ext.create('MvcClientes.model.CuentasBancos.CuentasBancos');
			record.set(values);
			record.setId(0);
			this.getCuentasBancosCuentasBancosStore().add(record);
		}
        win.close();
            }
    },
	
	Eliminar: function()
	{
	    //Para referirnos a un componente aca se utilizaran los Getters:
		var grid = this.getGridCuentasBancos();//Get+ Alias gridCuentasBancos (alias:'widget.gridCuentasBancos')
		record = grid.getSelectionModel().getSelection(); 
		CuentasBancos=grid.getSelectionModel().getSelection()[0].data.numero_cuenta;
		//En esta parte automaticamente el Controller crea las Funciones Getters
		store = this.getCuentasBancosCuentasBancosStore();//Nota 1: Get+Carpeta.CuentasBancos Store+La palabra Store
	    Ext.MessageBox.show({
           title : 'Eliminar Registro',
    	   buttons : Ext.MessageBox.YESNO,
		   msg : 'Desea Eliminar la Cuenta'+' '+ CuentasBancos +'?',
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