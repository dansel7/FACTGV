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
			activeItem: 1,
                items: [
                    {
                        xtype: 'treepanel',
                        title: 'Facturaciones',
                        height: 212,
			iconCls:'movimientos',
                        forceLayout: true,
                        collapsed: true,
                        collapsible: true,
                        rootVisible: false,
                        border: false,
                        autoWidth: true,
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
                    },
                    {
                        xtype: 'treepanel',
                        title: 'Reportes',
			iconCls:'reportes',
                        height: 212,
                        forceLayout: true,
                        collapsed: true,
                        collapsible: true,
                        rootVisible: false,
                        border: false,
                        autoWidth: true,
                        listeners:{//Listeners apuntando a cada node
                            itemclick:function(view, record, item, index, e)
                                        {
                 //DEPENDIENDO QUE OPCION SE QUIERE SE DEBE DE DEFINIR EL INDICE DE LA OPCION
                                        
                                        if (index==0)
                                           {
                                              window.open("http://localhost/facturaciones/php/reportes/reporte_1.php", "nuevo", "location=no, menubar=no, scrollbars=yes, statusbar=no, tittlebar=no");
                                           }
                                        if (index==1)
                                           {
                                              //addTabListadoAbonoClientes();
                                           }
                                        if (index==2)
                                           {
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
                                        text: 'Cheques Pendientes',
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
                        collapsed: false,
                        collapsible: true,
                        rootVisible: false,
                        border: false,
                        autoWidth: true,
                        hidden:true,
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
                html: '<CENTER><p>Propiedad de Grupo Villatoro - Derechos Reservados 2013</p></CENTER>',
                style: 'font-size: 9px; text-align: left;',
                split: true
            },
			   
		 TabPanelMain
		];
                
   ///----OBTIENE PERFIL DE USUARIO PARA MOSTRAR MENUS----///
        Ext.Ajax.request({
          url: 'Php/controller/Login/Perfil_Benutzer.php',
          success: function(response) {
            outHTML = response.responseText;
            
            if(outHTML==1){
                
           Ext.getCmp("panelMantto").show();     
            }

          }
        });
            //------------------FIN------------------//
             me.callParent();	
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
        
	
    }
		
 });

this.TabPanelMain = Ext.create('MvcClientes.view.Principal.TabMain', {
						region: 'center',
						id:'TabMain'
			     });
	

	
 