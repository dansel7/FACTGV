 //Lanzador de la Aplicacion Principal 24 de Noviembre del 2011 LIA. Hiber Tadeo Moreno Tovilla.
Ext.Loader.setConfig({
	enabled	: true,
	paths	: {
		MvcClientes	: "App" //<-Es el Nombre del Name Space Principal
	}
});
		
Ext.application({  
        name        : "MvcClientes", //<-MvcClientes es el Nombre del Name Space Principal 
            //<-HAY QUE REGISTRAR EL NOMBRE DEL CONTROLLER SINO NO CARGARA NADA
	   controllers	: ['Clientes.Clientes','Usuarios.Usuarios','Empresa.Empresa',
                          'Facturacion.Facturacion','AbonoClientes.AbonoClientes',
                          'AbonoBancos.AbonoBancos','CuentasBancos.CuentasBancos',
                          'CatServicios.CatServicios'],//<--Controladores de la aplicacion
		launch      : function(){  
		      var MyViewPrincipal = Ext.create("MvcClientes.view.Principal.MyViewport")
		     } 
});  
	