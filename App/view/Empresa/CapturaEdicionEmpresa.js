////////////Pueden usar tambien este dise�o de Formulario///////////////////
Ext.require([
    'Ext.ux.form.MultiSelect',
    'Ext.ux.form.ItemSelector'
]);

Ext.define('MvcClientes.view.Empresa.CapturaEdicionEmpresa', {
    extend: 'Ext.window.Window',
	alias:'widget.FormAddEdicionEmpresa',
    height: 125,
    width: 400,
    layout: {
        type: 'fit'
    },
	autoShow: true,
    closable: false,
    title: 'Captura/Edicion Empresa',
    modal: false,
	
    initComponent: function() {
        
        //STORE DE LOS DEPARTAMENTOS
         var list_perfil = new Ext.data.Store({
            fields: ['id_perfil', 'perfil'],
            proxy: {
                type: 'ajax',
                url : 'Php/store/list_perfil.php',
                reader: {
                    type: 'json'
                }
            },
            autoLoad: true
        });



        //LISTADO DE EMPRESAS QUE ESTAN DISPONIBLES
       
          /*      var ds = Ext.create('Ext.data.ArrayStore', {
                    root:"data",
                    fields: ['id_empresa', 'nombre'],
                    proxy: {
                        type: 'ajax',
                        url : 'Php/store/list_user_emp.php?opx=u1em1'
                    },
                    autoLoad: true
                });  */

        
         //////////////////////////////////////////////
        var ds = Ext.create('Ext.data.Store', {
                    fields: ['id_empresa', 'nombre'],
                    //SE DEJA ASI EL CATALOGO DE EMPRESAS, CON EL FIN QUE 
                    //POSTERIORMENTE SE PUEDA CARGAR DESDE UN STORE EXTERNO
                    //EL INCONVENIENTE ES QUE AL HACERLO DESDE UN STORE NO CARGA.
                    data:  [{"id_empresa":"1","nombre":"Villatoro Asociados S.A de C.V"},{"id_empresa":"2","nombre":"eFacilitadora Aduanera S.A de C.V"},{"id_empresa":"3","nombre":"SEALES S.A de C.V"},{"id_empresa":"4","nombre":"Hector Gustavo Villatoro"}],
                    autoLoad: true
                }); 
                

       //LISTADO DE EMPRESAS QUE YA ESTAN SELECCIONADAS
   var ds2="";
        Ext.Ajax.request({
          url: 'Php/store/list_user_emp.php?opx=em2u2',
          success: function(response) {
            outHTML = response.responseText;
            ds2=outHTML;                      
          }
        }); 
        ////////////////////////////////////////////////
 


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
                    {xtype : "textfield", name : "id_empresa", fieldLabel : "ID",hidden: true},
                    {xtype : "textfield", name : "nombre", fieldLabel : "Nombre de Empresa", width: 350},
                    
                    //{xtype: 'itemselector', name: 'empresas',anchor: '10%',
                   // fieldLabel: 'Seleccion',store: ds,displayField: 'text',valueField: 'value',
                    //value: ['3', '4', '6'], allowBlank: false, msgTarget: 'side'}
                    //
                    //La idea de esto es que los checkbox se van a activar enviado por ajax el valor del id de la empresa 
                    //y lo iran guardando pero para eso se necesita enviar el id de usuario tambien
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
              }]
          }); 
          
     	  me.callParent(arguments);
                 
      }					
});	
