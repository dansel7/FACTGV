Ext.define('MvcClientes.controller.Reportes.Reportes',{
	extend		: 'Ext.app.Controller',
        views		: ['Reportes.ShowReport1','Reportes.ShowReport2','Reportes.ShowReport3','Reportes.ShowReport4','Reportes.ShowReport5','Reportes.ShowPartidasDiarioVentas','Reportes.ShowPartidasDiarioBancos','Reportes.ShowLibroIVA','Reportes.ShowGraf1'],
	refs:[ //Esta linea se usa cuando se hace referencia a una Vista dentro de un grid en un Controller
	 
	  {
	    ref:'gridReportes',
		selector:'gridReportes'//<<--Vista dentro de un Grid
	  }
	
	],

	init	: function() {
		var me = this;
		me.control({
		    'ShowReport1 button[action=ShowReport1PDF]'://Usando Ext.Component.Query
			   {
				 click:this.ShowReport1PDF
			   },
                    'ShowReport1 button[action=ShowReport1EXCEL]'://Usando Ext.Component.Query
			   {
				 click:this.ShowReport1EXCEL
			   },       
                    'ShowReport2 button[action=ShowReport2PDF]'://Usando Ext.Component.Query
			   {
				 click:this.ShowReport2PDF
			   }
                           ,
                    'ShowReport2 button[action=ShowReport2EXCEL]'://Usando Ext.Component.Query
			   {
				 click:this.ShowReport2EXCEL
			   }
                           ,
                    'ShowReport3 button[action=ShowReport3PDF]'://Usando Ext.Component.Query
			   {
				 click:this.ShowReport3PDF
			   }
                           ,
                    'ShowReport3 button[action=ShowReport3EXCEL]'://Usando Ext.Component.Query
			   {
				 click:this.ShowReport3EXCEL
			   }      ,
                    'ShowReport4 button[action=ShowReport4PDF]'://Usando Ext.Component.Query
			   {
				 click:this.ShowReport4PDF
			   }
                           ,
                    'ShowReport4 button[action=ShowReport4EXCEL]'://Usando Ext.Component.Query
			   {
				 click:this.ShowReport4EXCEL
			   }
                           ,
                    'ShowReport5 button[action=ShowReport5PDF]'://Usando Ext.Component.Query
			   {
				 click:this.ShowReport5PDF
			   }
                           ,
                    'ShowReport5 button[action=ShowReport5EXCEL]'://Usando Ext.Component.Query
			   {
				 click:this.ShowReport5EXCEL
			   }
                           ,
                     'ShowPartidasDiarioVentas button[action=ShowPartidasDiarioVentasPDF]'://Usando Ext.Component.Query
			   {
				 click:this.ShowPartidasDiarioVentasPDF
			   }
                           ,
                    'ShowPartidasDiarioVentas button[action=ShowPartidasDiarioVentasEXCEL]'://Usando Ext.Component.Query
			   {
				 click:this.ShowPartidasDiarioVentasEXCEL
			   }
                           ,
                     'ShowPartidasDiarioBancos button[action=ShowPartidasDiarioBancosPDF]'://Usando Ext.Component.Query
			   {
				 click:this.ShowPartidasDiarioBancosPDF
			   }
                           ,
                    'ShowPartidasDiarioBancos button[action=ShowPartidasDiarioBancosEXCEL]'://Usando Ext.Component.Query
			   {
				 click:this.ShowPartidasDiarioBancosEXCEL
			   }
                           ,
                           
                     'ShowLibroIVA button[action=ShowLibroIVAPDF]'://Usando Ext.Component.Query
			   {
				 click:this.ShowLibroIVAPDF
			   }
                           ,
                     'ShowLibroIVA button[action=ShowLibroIVAEXCEL]'://Usando Ext.Component.Query
			   {
				 click:this.ShowLibroIVAEXCEL
			   }
                           ,
                    'ShowGraf1 button[action=ShowGraf1]'://Usando Ext.Component.Query
			   {
				 click:this.ShowGraf1
			   }
                          		  
		});
                
	},
        ShowReport1PDF: function(button){
            var win    = button.up('window'),
            form   = win.down('form'),
            values = form.getValues();
           window.open("/facturaciones/php/reportes/reporte_1.php?tipoliq="+values.tipo_pago+"&fecha_ini="+values.fecha_inicio+"&fecha_fin="+values.fecha_fin+"&idmc="+values.idmaestroClientes, "nuevo", "location=no, menubar=no, scrollbars=yes, statusbar=no, tittlebar=no");
	},
         ShowReport1EXCEL: function(button){
            var win    = button.up('window'),
            form   = win.down('form'),
            values = form.getValues();
           window.open("/facturaciones/php/reportes/reporte_1.php?tipoliq="+values.tipo_pago+"&fecha_ini="+values.fecha_inicio+"&exp=1&fecha_fin="+values.fecha_fin+"&idmc="+values.idmaestroClientes, "nuevo", "location=no, menubar=no, scrollbars=yes, statusbar=no, tittlebar=no");
	},
        
        
         ShowReport2PDF: function(button){
            var win    = button.up('window'),
            form   = win.down('form'),
            values = form.getValues();
           window.open("/facturaciones/php/reportes/reporte_2.php?tpf="+values.id_tipo_facturacion+"&idmc="+values.idmaestroClientes+"&fecha_ini="+values.fecha_inicio+"&fecha_fin="+values.fecha_fin, "nuevo", "location=no, menubar=no, scrollbars=yes, statusbar=no, tittlebar=no");
        },
         ShowReport2EXCEL: function(button){
            var win    = button.up('window'),
            form   = win.down('form'),
            values = form.getValues();
           window.open("/facturaciones/php/reportes/reporte_2.php?tpf="+values.id_tipo_facturacion+"&idmc="+values.idmaestroClientes+"&exp=1&fecha_ini="+values.fecha_inicio+"&fecha_fin="+values.fecha_fin, "nuevo", "location=no, menubar=no, scrollbars=yes, statusbar=no, tittlebar=no");
        },
        
        
         ShowReport3PDF: function(button){
            var win    = button.up('window'),
            form   = win.down('form'),
            values = form.getValues();
           window.open("/facturaciones/php/reportes/reporte_3.php?idmc="+values.idmaestroClientes+"&fecha_ini="+values.fecha_inicio+"&fecha_fin="+values.fecha_fin, "nuevo", "location=no, menubar=no, scrollbars=yes, statusbar=no, tittlebar=no");
	},
        ShowReport3EXCEL: function(button){
            var win    = button.up('window'),
            form   = win.down('form'),
            values = form.getValues();
           window.open("/facturaciones/php/reportes/reporte_3.php?idmc="+values.idmaestroClientes+"&exp=1&fecha_ini="+values.fecha_inicio+"&fecha_fin="+values.fecha_fin, "nuevo", "location=no, menubar=no, scrollbars=yes, statusbar=no, tittlebar=no");
	},
        
        
         ShowReport4PDF: function(button){
            var win    = button.up('window'),
            form   = win.down('form'),
            values = form.getValues();
           window.open("/facturaciones/php/reportes/reporte_4.php?idmc="+values.idmaestroClientes+"&fecha_ini="+values.fecha_inicio+"&fecha_fin="+values.fecha_fin, "nuevo", "location=no, menubar=no, scrollbars=yes, statusbar=no, tittlebar=no");
	},
        ShowReport4EXCEL: function(button){
            var win    = button.up('window'),
            form   = win.down('form'),
            values = form.getValues();
           window.open("/facturaciones/php/reportes/reporte_4.php?idmc="+values.idmaestroClientes+"&exp=1&fecha_ini="+values.fecha_inicio+"&fecha_fin="+values.fecha_fin, "nuevo", "location=no, menubar=no, scrollbars=yes, statusbar=no, tittlebar=no");
	},
        
         ShowReport5PDF: function(button){
            var win    = button.up('window'),
            form   = win.down('form'),
            values = form.getValues();
           window.open("/facturaciones/php/reportes/reporte_5.php?idmc="+values.idmaestroClientes+"&fecha_ini="+values.fecha_inicio+"&fecha_fin="+values.fecha_fin+"&idnf="+values.numfact, "nuevo", "location=no, menubar=no, scrollbars=yes, statusbar=no, tittlebar=no");
	},
        ShowReport5EXCEL: function(button){
            var win    = button.up('window'),
            form   = win.down('form'),
            values = form.getValues();
           window.open("/facturaciones/php/reportes/reporte_5.php?idmc="+values.idmaestroClientes+"&exp=1&fecha_ini="+values.fecha_inicio+"&fecha_fin="+values.fecha_fin+"&idnf="+values.numfact, "nuevo", "location=no, menubar=no, scrollbars=yes, statusbar=no, tittlebar=no");
	},
        
         ShowPartidasDiarioVentasPDF: function(button){
            var win    = button.up('window'),
            form   = win.down('form'),
            values = form.getValues();
           window.open("/facturaciones/php/contabilidad/PartidaDiario_Ventas.php?fecha_ini="+values.fecha_inicio+"&fecha_fin="+values.fecha_fin, "nuevo", "location=no, menubar=no, scrollbars=yes, statusbar=no, tittlebar=no");
	},
        ShowPartidasDiarioVentasEXCEL: function(button){
            var win    = button.up('window'),
            form   = win.down('form'),
            values = form.getValues();
           window.open("/facturaciones/php/contabilidad/PartidaDiario_Ventas.php?exp=1&fecha_ini="+values.fecha_inicio+"&fecha_fin="+values.fecha_fin, "nuevo", "location=no, menubar=no, scrollbars=yes, statusbar=no, tittlebar=no");
	},
         ShowPartidasDiarioBancosPDF: function(button){
            var win    = button.up('window'),
            form   = win.down('form'),
            values = form.getValues();
            if(values.tipoRep=='1'){
            window.open("/facturaciones/php/contabilidad/PartidaDiario_Bancos.php?fecha_ini="+values.fecha_inicio+"&fecha_fin="+values.fecha_fin, "nuevo", "location=no, menubar=no, scrollbars=yes, statusbar=no, tittlebar=no");
            }else{  
            window.open("/facturaciones/php/contabilidad/PartidaIngreso_Bancos.php?fecha_ini="+values.fecha_inicio+"&fecha_fin="+values.fecha_fin, "nuevo", "location=no, menubar=no, scrollbars=yes, statusbar=no, tittlebar=no");                
            }
	},
        ShowPartidasDiarioBancosEXCEL: function(button){
            var win    = button.up('window'),
            form   = win.down('form'),
            values = form.getValues();
            if(values.tipoRep=='1'){
            window.open("/facturaciones/php/contabilidad/PartidaDiario_Bancos.php?exp=1&fecha_ini="+values.fecha_inicio+"&fecha_fin="+values.fecha_fin, "nuevo", "location=no, menubar=no, scrollbars=yes, statusbar=no, tittlebar=no");
            }else{
            window.open("/facturaciones/php/contabilidad/PartidaIngreso_Bancos.php?exp=1&fecha_ini="+values.fecha_inicio+"&fecha_fin="+values.fecha_fin, "nuevo", "location=no, menubar=no, scrollbars=yes, statusbar=no, tittlebar=no");
            }
	},
        ShowLibroIVAPDF: function(button){
            var win    = button.up('window'),
            form   = win.down('form'),
            values = form.getValues();
            
            if(form.getForm().isValid()){
            window.open("/facturaciones/php/contabilidad/LibroIVA_Ventas.php?tpf="+values.id_tipo_facturacion+"&mes_inicio="+values.mes_inicio+"&mes_fin="+values.mes_fin+"&anio="+values.anio, "nuevo", "location=no, menubar=no, scrollbars=yes, statusbar=no, tittlebar=no");
            }
           
	},
        ShowLibroIVAEXCEL: function(button){
            var win    = button.up('window'),
            form   = win.down('form'),
            values = form.getValues();
            if(form.getForm().isValid()){
            window.open("/facturaciones/php/contabilidad/LibroIVA_Ventas.php?exp=1&tpf="+values.id_tipo_facturacion+"&mes_inicio="+values.mes_inicio+"&mes_fin="+values.mes_fin+"&anio="+values.anio, "nuevo", "location=no, menubar=no, scrollbars=yes, statusbar=no, tittlebar=no");
            }
        },
        
        
         ShowGraf1: function(button){
            var win    = button.up('window'),
            form   = win.down('form'),
            values = form.getValues();
           window.open("/facturaciones/php/graficas/graf_venta_servicio.php?fecha_ini="+values.fecha_inicio+"&fecha_fin="+values.fecha_fin, "nuevo", "location=no, menubar=no, scrollbars=yes, statusbar=no, tittlebar=no");
           
           
	}
});

 















