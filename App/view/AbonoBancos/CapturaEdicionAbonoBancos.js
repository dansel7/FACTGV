////////////Pueden usar tambien este dise�o de Formulario///////////////////
Ext.require([
    'Ext.ux.form.MultiSelect',
    'Ext.ux.form.ItemSelector'
]);

Ext.define('MvcClientes.view.AbonoBancos.CapturaEdicionAbonoBancos', {
    extend: 'Ext.window.Window',
	alias:'widget.FormAddEdicionAbonoBancos',
    height: 400,
    width: 400,
    layout: {
        type: 'fit'
    },
	autoShow: true,
    closable: false,
    title: 'Captura/Edicion AbonoBancos',
    modal: true,
	
    initComponent: function() {
        
        
//STORE DE LISTADO DE TIPOS DE FACTURA QUE ESTAN DISPONIBLES
Ext.define('MvcClientes.Store.dsListTipoFactura', {
    extend: 'Ext.data.Store', 
    root:"data",
    fields: ['id_tipo_facturacion', 'tipo'],
    proxy: {
        type: 'ajax',
        url : 'Php/store/list_tipo_factura.php?opx=tp1f1'
    },
    autoLoad: false
});  


//Verificar que se envian datos para editar
var idemp;
if(typeof(records) != "undefined" && typeof(records) != "string"){
 idemp=records[0].data.id_AbonoBancos;   
}else{idemp='';}

//STORE DE LISTADO DE TIPOS DE FACTURA QUE ESTAN SELECCIONADOS
Ext.define('MvcClientes.Store.dsListTipoFactura2', {
    extend: 'Ext.data.Store', 
    fields: ['id_tipo_facturacion'],
    proxy: {
        type: 'ajax',
        url : 'Php/store/list_tipo_factura.php?opx=f2tp2&id=' + idemp
    },
    autoLoad: false
});  
        
          
        //SE CREA ANTES PARA QUE NO CARGUE NULL
        var ds = Ext.create('MvcClientes.Store.dsListTipoFactura');
var me = this;
Ext.applyIf(me, {
    items: [
            {
                xtype: 'form',
                height: 50,
                name: 'form',
                layout: {
                    type: 'auto'
                },
                items: 
                [   {xtype: 'displayfield',name: 'displayfield1',id:'empDetails',value: ''},
                    {xtype: 'displayfield',name: 'displayfield1',id:'empDetails',value: ''},
                    {xtype : "textfield",id:"id_AbonoBancos", name : "id_AbonoBancos", fieldLabel : "ID",hidden: true},
                    {xtype : "textfield", name : "nombre", fieldLabel : "Nombre de AbonoBancos", width: 350},
                    {xtype: 'itemselector', id:"ISTipoFactura",
                     store:ds, name: 'tipo_factura',
                     width:350 ,anchor: '30%',
                     fieldLabel: 'Seleccion',displayField: 'tipo',
                     valueField: 'id_tipo_facturacion',
                     buttons: ['add', 'remove'],
                     buttonsText: {add: "Agregar",remove: "Remover"},
                     allowBlank: false, msgTarget: 'side',
                        onAddBtnClick: function() {
                        //SOBRECARGA FUNCION ORIGINAL//
                        var me = this,
                        fromList = me.fromField.boundList,
                        selected = this.getSelections(fromList);
                        fromList.getStore().remove(selected);
                        this.toField.boundList.getStore().add(selected);
                        ////////////////////////////////////////////////

                        //////INICIO FUNCION AGREGAR//////////
                        Ext.Ajax.request({
                        url: 'Php/view/AbonoBancos/AbonoBancos_TipoFact/Op_Emp_TpF.php?opx=addEmpTpF&idEmp=' + Ext.getCmp("id_AbonoBancos").getValue() + '&idTpFact=' + selected[0].data.id_tipo_facturacion,
                        success: function(response) {           
                        }
                        });

                        //////////////////////////////////////
                        },
                        onRemoveBtnClick: function() {
                            //SOBRECARGA FUNCION ORIGINAL//                               }
                        var me = this,
                        toList = me.toField.boundList,
                        selected = this.getSelections(toList);
                        toList.getStore().remove(selected);
                        this.fromField.boundList.getStore().add(selected);
                        ////////////////////////////////////////////////

                        //////INICIO FUNCION REMOVER/////
                        Ext.Ajax.request({
                        url: 'Php/view/AbonoBancos/AbonoBancos_TipoFact/Op_Emp_TpF.php?opx=rmvEmpTpF&idEmp=' + Ext.getCmp("id_AbonoBancos").getValue()  + '&idTpFact=' + selected[0].data.id_tipo_facturacion,
                        success: function(response) {           
                        }
                        });
                        //////////////////////////////////////
                        }
                     
                    }
                ],
            dockedItems : [{
                            xtype: 'toolbar',
                            dock: 'bottom',
                            id:'buttons',
                            ui: 'footer',
                            items: ['->', {
                                    itemId: 'BtnClienteAceptar',
                                    text: 'Guardar',
                                    action: 'actGuardar'
                            },{
                                    itemId: 'BtnClienteCancelar',
                                    text: 'Cancelar',
                                    scope: this,
                                    handler: this.close
                            }]
                 }]
              }
          ],
          listeners: {
            beforerender: {
            fn: me.onFormBeforeRender,
            scope: me
            }
           }
          }); 
          
     	  me.callParent(arguments);
          
          
         
                 
      }, //SE CONFIGURA UN LISTENER PARA INSTANCIAR EL STORE Y LUEGO CARGARLO EN EL ITEMSELECTOR
      onFormBeforeRender: function(abstractcomponent, options) {
          
          var ds = Ext.create('MvcClientes.Store.dsListTipoFactura');
          var ds2 = Ext.create('MvcClientes.Store.dsListTipoFactura2');
          
var jds2=""; //VARIABLE PARA ALMACENAR LA CADENA DEL STRING DEL STORE
var c=1; //CONTADOR PARA DETERMINAR EL PRINCIPIO DEL ARREGLO

//AMBOS STORE SE CARGAN DESDE PAGINAS PHP QUE DEVUELVEN UNA CADENA EN FORMATO JSON

            //PRIMERO SE CARGA EL STORE PRINCIPAL
            ds.load(function(){   
                
                Ext.getCmp("ISTipoFactura").bindStore(ds);
            //LUEGO SE CARGAN LOS VALORES SELECCIONADOS A PARTIR DEL STORE ANTERIOR
                ds2.load(function(){
                  ds2.each(function(item){
                      if(c!=1) { jds2+=","; }
                    jds2+=item.get("id_tipo_facturacion");   
                    c++;
                  });

                   Ext.getCmp("ISTipoFactura").setValue(jds2.split(","));
                });
            
            });  
            //LUEGO SE CARGAN LOS VALORES SELECCIONADOS A PARTIR DEL STORE ANTERIOR
            ds2.load(function(){
              ds2.each(function(item){
                  if(c!=1) { jds2+=","; }
                jds2+=item.get("id_tipo_facturacion");   
                c++;
              });
               
               Ext.getCmp("ISTipoFactura").setValue(jds2.split(","));
            });
     }		
     
     
});	
