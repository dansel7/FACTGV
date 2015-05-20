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
                        title: 'Facturaciones',
                        id:'UserAdminPanelFact',
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
                                    iconCls:'icon-facturacion'
                                    
                                },
                                {
                                    text: 'Abono a Clientes',
                                  
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
                        title: 'Abonos y Remesas',
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
                                    text: 'Abono a Clientes',
                                  
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
                                               addTabDashboard();
                                              //addTabListadoAbonoBancos();
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
                                        leaf: true
                                        },
                                        {
                                        text: 'Facturas Realizadas',
                                        leaf: true
                                        },
                                        {
                                        text: 'Facturas Pendientes de Pago',
                                        leaf: true
                                        },
                                        {
                                        text: 'Detalle Servicios Facturados',
                                        leaf: true
                                        },
                                        {
                                        text: 'Grafica de Ventas por Servicios',
                                        leaf: true
                                        },
                                        {
                                        text: 'Dashboard',
                                        leaf: true
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
			iconCls:'catalogos',
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
                          //Ext.Msg.alert('Evento MyViewport al dar enter al usuario');
                            }
                            if(outHTML==2){//USUARIO ASISTENTE
                           Ext.getCmp("panelReportes").show(); 
                           Ext.getCmp("UserAsistPanelFact").show();
                          //Ext.Msg.alert('Evento MyViewport al dar enter al usuario');
                            }
                            if(outHTML==3){//USUARIO VISOR REPORTES
            
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
        /////////////////////////////////////////
       //---------------GRAFICAS-------------//
       function ShowGraf1(){
          var FrmGraf1= Ext.widget('ShowGraf1');
       } 
	
    }
		
 });

this.TabPanelMain = Ext.create('MvcClientes.view.Principal.TabMain', {
						region: 'center',
						id:'TabMain'
			     });
	

	
 