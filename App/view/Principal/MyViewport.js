Ext.define('MvcClientes.view.Principal.MyViewport',{
	extend: 'Ext.container.Viewport',
	layout: 'border',
    width: 468,
    height: 549,
    initComponent: function() {
        
	var me=this;
        me.items = [
            {
                id:'PnlNorte',
		xtype: 'panel',
                title: 'Sistema de Facturacion - Grupo Villatoro',
                region: 'north',
                margins: '2,1,0,0',
                style: 'background:#15428B;font-size: 25px; text-align: left',
                activeItem: 0,
                bodyStyle: 'background: #cbddf3;',
                shadow: 'frame',
                shadowOffset: 10,
                autoLoad: 'Php/view/PanelSesion.php'
            },
            {
                id:'PnlEste',
     		xtype: 'panel',
                title: 'Menu Principal',
		split: true,
                region: 'east',
                width: 192,
                collapsible: true,
                margins: '3,3,0,0',
                layout: 'accordion',
			activeItem: 0,
                items: [
                    {
                        xtype: 'treepanel',
                        title: 'Facturacion y Cobros',
                        id:'UserAdminPanelFact',
                        height: 212,
			iconCls:'icon-facturacion',
                        forceLayout: true,
                        collapsed: true,
                        collapsible: false,
                        rootVisible: false,
                        border: false,
                        autoWidth: true,
                        hidden:true,
                        flex:1,
                        listeners:{//Listeners apuntando a cada node
                            itemclick:function(view, record, item, index, e)
                                        {
                 //DEPENDIENDO QUE OPCION SE QUIERE SE DEBE DE DEFINIR EL INDICE DE LA OPCION
                                        
                                        if (index==0)
                                           {
                                              addTabListadoFacturas();
                                           }
                                        if (index==1)
                                           {
                                              addTabListadoAbonoClientes();
                                           }
                                        if (index==2)
                                           {
                                              addTabListadoAbonoBancos();
                                           }
                            }
                        }  , 
                        root: {
                            text: '',
                            isTarget: false,
                            expanded: true,
                            checked: false,
                            allowDrag: false,
                            allowDrop: false,
                            editable: false,
                            qtip: 1,
                            children: [
                                {
                                    text: 'Facturacion',
                                    leaf: true,
                                    iconCls:'icon-facturas'
                                    
                                },
                                {
                                    text: 'Cuentas por Cobrar',
                                  
                                        leaf: true,
                                    iconCls:'icon-users'
                                }
                                ,
                                {
                                    text: 'Abono a Bancos',
                                  
                                        leaf: true,
                                    iconCls:'icon-users'
                                }
                            ]
                        },
                        loader: {

                        }
                    },       {
                        xtype: 'treepanel',
                        title: 'Cobros y Abonos',
                        id:'UserAsistPanelFact',
                        height: 212,
			iconCls:'movimientos',
                        forceLayout: true,
                        collapsed: false,
                        collapsible: false,
                        rootVisible: false,
                        border: false,
                        autoWidth: true,
                        hidden:true,
                        flex:1,
                        listeners:{//Listeners apuntando a cada node
                            itemclick:function(view, record, item, index, e)
                                        {
                 //DEPENDIENDO QUE OPCION SE QUIERE SE DEBE DE DEFINIR EL INDICE DE LA OPCION
 
                                        if (index==0)
                                           {
                                              addTabListadoAbonoClientes();
                                           }
                                        if (index==1)
                                           {
                                              addTabListadoAbonoBancos();
                                           }
                            }
                        }  , 
                        root: {
                            text: '',
                            isTarget: false,
                            expanded: true,
                            checked: false,
                            allowDrag: false,
                            allowDrop: false,
                            editable: false,
                            qtip: 1,
                            children: [
                                {
                                    text: 'Cuentas Por Cobrar',
                                  
                                        leaf: true,
                                    iconCls:'icon-users'
                                }
                                ,
                                {
                                    text: 'Abono a Bancos',
                                  
                                        leaf: true,
                                    iconCls:'icon-users'
                                        
                                    
                                }
                            ]
                        },
                        loader: {

                        }
                    },
                    {
                        xtype: 'treepanel',
                        title: 'Reportes',
                        id: 'panelReportes',
			iconCls:'reportes',
                        height: 212,
                        forceLayout: true,
                        collapsed: true,
                        collapsible: false,
                        rootVisible: false,
                        border: false,
                        autoWidth: true,
                        hidden:true,
                        flex:1,
                        listeners:{//Listeners apuntando a cada node
                            itemclick:function(view, record, item, index, e)
                                        {
                 //DEPENDIENDO QUE OPCION SE QUIERE SE DEBE DE DEFINIR EL INDICE DE LA OPCION
                                        
                                        if (index==0)
                                           {
                                               ShowReport_1();
                                           }
                                           if (index==1)
                                           {
                                                ShowReport_2();
                                              //addTabListadoAbonoBancos();
                                           }if (index==2)
                                           {
                                                ShowReport_3();
                                              //addTabListadoAbonoBancos();
                                           }
                                           if (index==3)
                                           {
                                                ShowReport_4();
                                              
                                           }
                                        if (index==4)
                                           {
                                             ShowGraf1() ;
                                            }
                                                                                    
                                        if (index==5)
                                           {
                                               addTabDashboard1();
                                      
                                           }
                                        if (index==6)
                                           {
                                               ShowReport_5();
                                      
                                           }
                            }
                        } ,
                        root: {
                            text: '',
                            isTarget: false,
                            expanded: true,
                            checked: false,
                            allowDrag: false,
                            allowDrop: false,
                            editable: false,
                            qtip: 1,
                            children: [
                                    {                                  
                                        text: 'Activos en Bancos',
                                        leaf: true,
                                        iconCls:'pdf'
                                        },
                                        {
                                        text: 'Facturas Realizadas',
                                        leaf: true,
                                        iconCls:'pdf'
                                        },
                                        {
                                        text: 'Facturas Pendientes de Pago',
                                        leaf: true,
                                        iconCls:'pdf'
                                        },
                                        {
                                        text: 'Detalle Servicios Facturados',
                                        leaf: true,
                                        iconCls:'pdf'
                                        },
                                        {
                                        text: 'Grafica de Ventas por Servicios',
                                        leaf: true,
                                        iconCls:'icon-grafica'
                                        },
                                        {
                                        text: 'Dashboard',
                                        leaf: true,
                                        iconCls:'icon-dashboard'
                                        },
                                        {
                                        text: 'Estado de Factura y Abonos',
                                        leaf: true,
                                        iconCls:'pdf'
                                        
                                        }
                                    ]
                        },
                        loader: {

                        }
                    },
                    {   xtype: 'treepanel',
                        title: 'Mantenimientos',
                        id: 'panelMantto',
                        height: 212,
			iconCls:'config',
                        forceLayout: true,
                        collapsed: true,
                        collapsible: true,
                        rootVisible: false,
                        border: false,
                        autoWidth: true,
                        hidden:true,
                        flex:1,
                        listeners:{//Listeners apuntando a cada node
                            itemclick:function(view, record, item, index, e)
                                        {
                 //DEPENDIENDO QUE OPCION SE QUIERE SE DEBE DE DEFINIR EL INDICE DE LA OPCION
                                        
                                       if (index==0)
                                       {
                                          addTabListadoClientes();
                                       }
                                       if (index==1)
                                       {
                                          addTabListadoUsuarios();
                                       }
                                       if (index==2)
                                       {
                                          addTabListadoEmpresa();
                                       }
                                       if (index==3)
                                       {
                                          addTabListadoCuentasBancos();
                                       }
                                       if (index==4)
                                       {
                                          addTabListadoCatServicios();
                                       }

                                        }
                                 },
                        root: {
                            text: '',
                            isTarget: false,
                            expanded: true,
                            checked: false,
                            allowDrag: false,
                            allowDrop: false,
                            editable: false,
                            qtip: 1,
                            children: [
                                {
                                    text: 'Clientes',
                                    leaf: true,
                                    iconCls:'icon-cliente'
                                    
                                },
                                {
                                    text: 'Usuarios',
                                  
                                        leaf: true,
                                    iconCls:'icon-users'
                                        
                                    
                                },
                                {
                                    text: 'Empresas',
                            
                                        leaf: true,
                                    iconCls:'icon-empresa'
                                },
                                {
                                    text: 'Cuentas Bancarias',
                            
                                        leaf: true,
                                    iconCls:'icon-empresa'
                                },
                                {
                                    text: 'Catalogo de Servicios',
                            
                                        leaf: true,
                                    iconCls:'icon-users'
                                }
                            ]	
                        },
                        loader: {
                                
                        }
                    },{
                        xtype: 'treepanel',
                        title: 'Contabilidad',
                        id:'PanelContabilidad',
                        height: 212,
			iconCls:'icon-contabilidad',
                        forceLayout: true,
                        collapsed: true,
                        collapsible: true,
                        rootVisible: false,
                        border: false,
                        autoWidth: true,
                        hidden:true,
                        flex:1,
                        listeners:{//Listeners apuntando a cada node
                            itemclick:function(view, record, item, index, e)
                                        {
                 //DEPENDIENDO QUE OPCION SE QUIERE SE DEBE DE DEFINIR EL INDICE DE LA OPCION
 
                                        if (index==0)
                                           {
                                              addTabPartidas_Clientes();
                                           }
                                        if (index==1)
                                           {
                                              addTabPartidas_Servicios();
                                           }
                                        if (index==2)
                                           {
                                              ShowPartidasDiarioVentas();
                                           }
                                        if (index==3)
                                           {
                                              ShowPartidasDiarioBancos();
                                           }
                                        if (index==4)
                                           {
                                              ShowLibroIVA();
                                           }
                            }
                        }  , 
                        root: {
                            text: '',
                            isTarget: false,
                            expanded: true,
                            checked: false,
                            allowDrag: false,
                            allowDrop: false,
                            editable: false,
                            qtip: 1,
                            children: [
                                {
                                    text: 'Partidas de Clientes',
                                  
                                        leaf: true,
                                    iconCls:'icon-cliente'
                                }
                                ,
                                {
                                    text: 'Partidas de Servicios',
                                  
                                        leaf: true,
                                    iconCls:'icon-users'
                                        
                                    
                                },
                                {
                                    text: 'Partida de Diario Ventas',
                                  
                                        leaf: true,
                                    iconCls:'icon-ventas'
                                        
                                    
                                },
                                {
                                    text: 'Partida de Diario Bancos',
                                  
                                        leaf: true,
                                    iconCls:'icon-bancos'
                                        
                                    
                                },
                                {
                                    text: 'Libros de IVA',
                                  
                                        leaf: true,
                                    iconCls:'icon-iva'
                                        
                                    
                                }
                            ]
                        },
                        loader: {

                        }
                    }
                ]
			
            },
            {
                id:'PnlSur',
		xtype: 'panel',
                title: '',
                region: 'south',
                tpl: '',
                height: 21,
                margins: '0',
                activeItem: 0,
                html: '<CENTER><p>Propiedad de Grupo Villatoro - Derechos Reservados 2014</p></CENTER>',
                style: 'font-size: 9px; text-align: left;',
                split: true
            },
			   
		 TabPanelMain
		];
                
                  me.callParent();	
                  
                  
   ///----OBTIENE PERFIL DE USUARIO PARA MOSTRAR MENUS----///
        Ext.Ajax.request({
          url: 'Php/controller/Login/Perfil_Benutzer.php',
          success: function(response) {
            outHTML = response.responseText;
            
             if(outHTML==1){//USUARIO ADMINISTRADOR
                           Ext.getCmp("panelMantto").show();  
                           Ext.getCmp("panelReportes").show(); 
                           Ext.getCmp("UserAdminPanelFact").show(); 
                           Ext.getCmp("btnListFact").show();  
                           Ext.getCmp("btnNuevaFact").show(); 
                           Ext.getCmp("titleAtajos").show();
                           Ext.getCmp("PanelContabilidad").show(); 
                          //Ext.Msg.alert('Evento MyViewport al dar enter al usuario');
                            }
                            if(outHTML==2){//USUARIO ASISTENTE
                           Ext.getCmp("panelReportes").show(); 
                           Ext.getCmp("UserAsistPanelFact").show();
                           Ext.getCmp("PanelContabilidad").show();
                          //Ext.Msg.alert('Evento MyViewport al dar enter al usuario');
                            }
                            if(outHTML==3){//USUARIO VISOR REPORTES
            
                            Ext.getCmp("panelReportes").show(); 
                            }if(outHTML==4){//USUARIO FACTURACION
                                
                            Ext.getCmp("btnListFact").show();  
                            Ext.getCmp("btnNuevaFact").show(); 
                            Ext.getCmp("titleAtajos").show();     
                            Ext.getCmp("UserAdminPanelFact").show();     
                            Ext.getCmp("panelReportes").show(); 
                            }
          }
        });
            //------------------FIN------------------//
           
             
           ////Funci			 
	 function addTabListadoClientes(){ 
      	 var tab=this.TabPanelMain.getComponent('TabListadoClientes');
		   if(!tab){ //si no existe lo creamos
				tab = Ext.create('MvcClientes.view.Clientes.PanelClientes', {});
				this.TabPanelMain.add(tab); //Se agrega el Panel Cliente al TabMain 
				this.TabPanelMain.doLayout(); //Redibujado del Panel 
				this.TabPanelMain.setActiveTab(tab); //Activamos el Tab
               			
             } 
			    this.TabPanelMain.setActiveTab(tab); //Se activa el Tab Clickeado 
				     		 
	    }
            
            //////////////
             function addTabListadoUsuarios(){ 
      	 var tab=this.TabPanelMain.getComponent('TabListadoUsuarios');
		   if(!tab){ //si no existe lo creamos
				tab = Ext.create('MvcClientes.view.Usuarios.PanelUsuarios', {});
				this.TabPanelMain.add(tab); //Se agrega el Panel Cliente al TabMain 
				this.TabPanelMain.doLayout(); //Redibujado del Panel 
				this.TabPanelMain.setActiveTab(tab); //Activamos el Tab
               			
             } 
			    this.TabPanelMain.setActiveTab(tab); //Se activa el Tab Clickeado 
				     		 
	    }
	   ///////////////////
             function addTabListadoEmpresa(){ 
      	 var tab=this.TabPanelMain.getComponent('TabListadoEmpresa');
		   if(!tab){ //si no existe lo creamos
				tab = Ext.create('MvcClientes.view.Empresa.PanelEmpresa', {});
				this.TabPanelMain.add(tab); //Se agrega el Panel Cliente al TabMain 
				this.TabPanelMain.doLayout(); //Redibujado del Panel 
				this.TabPanelMain.setActiveTab(tab); //Activamos el Tab
               			
             } 
			    this.TabPanelMain.setActiveTab(tab); //Se activa el Tab Clickeado 
				     		 
	    }
              function addTabListadoCuentasBancos(){
           var tab=this.TabPanelMain.getComponent('TabListadoCuentasBancos');
		   if(!tab){ //si no existe lo creamos
				tab = Ext.create('MvcClientes.view.CuentasBancos.PanelCuentasBancos', {});
				this.TabPanelMain.add(tab); //Se agrega el Panel Cliente al TabMain 
				this.TabPanelMain.doLayout(); //Redibujado del Panel 
				this.TabPanelMain.setActiveTab(tab); //Activamos el Tab
                   } 
			    this.TabPanelMain.setActiveTab(tab); //Se activa el Tab Clickeado 
       } 
       
	    function addTabListadoCatServicios(){
           var tab=this.TabPanelMain.getComponent('TabListadoCatServicios');
		   if(!tab){ //si no existe lo creamos
				tab = Ext.create('MvcClientes.view.CatServicios.PanelCatServicios', {});
				this.TabPanelMain.add(tab); //Se agrega el Panel Cliente al TabMain 
				this.TabPanelMain.doLayout(); //Redibujado del Panel 
				this.TabPanelMain.setActiveTab(tab); //Activamos el Tab
                   } 
			    this.TabPanelMain.setActiveTab(tab); //Se activa el Tab Clickeado 
       } 
       
	function addTabListadoFacturas(){ 
      	 var tab=this.TabPanelMain.getComponent('TabListadoFacturacion');
		   if(!tab){ //si no existe lo creamos
				tab = Ext.create('MvcClientes.view.Facturacion.PanelFacturacion', {});
				this.TabPanelMain.add(tab); //Se agrega el Panel Cliente al TabMain 
				this.TabPanelMain.doLayout(); //Redibujado del Panel 
				this.TabPanelMain.setActiveTab(tab); //Activamos el Tab
               			
                   } 
			    this.TabPanelMain.setActiveTab(tab); //Se activa el Tab Clickeado 
				     		 
	    }
            
       function addTabListadoAbonoClientes(){
           var tab=this.TabPanelMain.getComponent('TabListadoAbonoClientes');
		   if(!tab){ //si no existe lo creamos
				tab = Ext.create('MvcClientes.view.AbonoClientes.PanelAbonoClientes', {});
				this.TabPanelMain.add(tab); //Se agrega el Panel Cliente al TabMain 
				this.TabPanelMain.doLayout(); //Redibujado del Panel 
				this.TabPanelMain.setActiveTab(tab); //Activamos el Tab
               			
                   } 
			    this.TabPanelMain.setActiveTab(tab); //Se activa el Tab Clickeado 
       }
       
       function addTabListadoAbonoBancos(){
           var tab=this.TabPanelMain.getComponent('TabListadoAbonoBancos');
		   if(!tab){ //si no existe lo creamos
				tab = Ext.create('MvcClientes.view.AbonoBancos.PanelAbonoBancos', {});
				this.TabPanelMain.add(tab); //Se agrega el Panel Cliente al TabMain 
				this.TabPanelMain.doLayout(); //Redibujado del Panel 
				this.TabPanelMain.setActiveTab(tab); //Activamos el Tab
               			
                   } 
			    this.TabPanelMain.setActiveTab(tab); //Se activa el Tab Clickeado 
       } 
       
       
       ////////////////DASHBOARD/////////////
       //---------------------------------//
       
       function addTabDashboard1(){ 
      	 var tab=this.TabPanelMain.getComponent('TabDashb1');
		   if(!tab){ //si no existe lo creamos
				tab = Ext.create('MvcClientes.view.Dashboard.TabDashb1', {});
				this.TabPanelMain.add(tab); //Se agrega el Panel del Dashboard1 al TabMain 
				this.TabPanelMain.doLayout(); //Redibujado del Panel 
				this.TabPanelMain.setActiveTab(tab); //Activamos el Tab
               			
                   } 
			    this.TabPanelMain.setActiveTab(tab); //Se activa el Tab Clickeado 
				     		 
	    }
       
       //----------------------------------//
       /////////////FIN DASHBOARD////////////      
       
       /////////////////////////////////////////
       //---------------REPORTES-------------//
       function ShowReport_1(){
          var FrmReporte1= Ext.widget('ShowReport1');
       } 
       
       function ShowReport_2(){
          var FrmReporte2= Ext.widget('ShowReport2');
       } 
       function ShowReport_3(){
          var FrmReporte3= Ext.widget('ShowReport3');
       } 
       function ShowReport_4(){
          var FrmReporte4= Ext.widget('ShowReport4');
       } 
        function ShowReport_5(){
          var FrmReporte5= Ext.widget('ShowReport5');
       } 
        /////////////////////////////////////////
       //---------------GRAFICAS-------------//
       function ShowGraf1(){
          var FrmGraf1= Ext.widget('ShowGraf1');
       }
       
       ////////////////////////////////////////////
       //---------------CONTABILIDAD-------------//
       
       function ShowPartidasDiarioVentas(){
          var FrmPartD= Ext.widget('ShowPartidasDiarioVentas');
       }
       
         function ShowPartidasDiarioBancos(){
          var FrmPartD= Ext.widget('ShowPartidasDiarioBancos');
       }
       
       function ShowLibroIVA(){
          var FrmLibIVA= Ext.widget('ShowLibroIVA');
       }
       
       function addTabPartidas_Clientes(){ 
      	 var tab=this.TabPanelMain.getComponent('TabListadoPartidas_Clientes');
		   if(!tab){ //si no existe lo creamos
				tab = Ext.create('MvcClientes.view.Contabilidad.Partidas_Clientes.PanelPartidas_Clientes', {});
				this.TabPanelMain.add(tab); //Se agrega el Panel Cliente al TabMain 
				this.TabPanelMain.doLayout(); //Redibujado del Panel 
				this.TabPanelMain.setActiveTab(tab); //Activamos el Tab
               			
             } 
			    this.TabPanelMain.setActiveTab(tab); //Se activa el Tab Clickeado 
				     		 
	    }
        function addTabPartidas_Servicios(){ 
      	 var tab=this.TabPanelMain.getComponent('TabListadoPartidas_Servicios');
		   if(!tab){ //si no existe lo creamos
				tab = Ext.create('MvcClientes.view.Contabilidad.Partidas_Servicios.PanelPartidas_Servicios', {});
				this.TabPanelMain.add(tab); //Se agrega el Panel Cliente al TabMain 
				this.TabPanelMain.doLayout(); //Redibujado del Panel 
				this.TabPanelMain.setActiveTab(tab); //Activamos el Tab
               			
             } 
			    this.TabPanelMain.setActiveTab(tab); //Se activa el Tab Clickeado 
				     		 
	    }
        //---------------CONTABILIDAD-------------//    
       ////////////////////////////////////////////
	
    }
		
 });

this.TabPanelMain = Ext.create('MvcClientes.view.Principal.TabMain', {
						region: 'center',
						id:'TabMain'
			     });
	

	
 