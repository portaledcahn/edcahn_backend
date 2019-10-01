var proveedorId='';
var datosProveedor={};
$(function(){
    proveedorId=$('#proveedorId').val();
    $.datepicker.regional['es'] = {
        closeText: 'Cerrar',
        prevText: '< Ant',
        nextText: 'Sig >',
        currentText: 'Hoy',
        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        monthNamesShort: ['Ene','Feb','Mar','Abr', 'May','Jun','Jul','Ago','Sep', 'Oct','Nov','Dic'],
        dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
        dayNamesShort: ['Dom','Lun','Mar','Mié','Juv','Vie','Sáb'],
        dayNamesMin: ['Do','Lu','Ma','Mi','Ju','Vi','Sá'],
        weekHeader: 'Sm',
        dateFormat: 'dd/mm/yy',
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ''
        };
        $.datepicker.setDefaults( $.datepicker.regional[ "es" ] );
        $('.fecha').datepicker({
               "dateFormat": 'yy-mm-dd'
           });
        $('.fecha').mask('0000-00-00');
      
        $('.OpcionFiltroBusquedaNumerico input').on('change',function(evento){
          cambiarFiltroNumerico(evento.currentTarget);
        });


    AsignarOrdenTabla();
    AnadirSubtabla();
    AgregarToolTips();
    ObtenerProveedor();
    
});
function ObtenerProveedor(){
    DebugFecha();
    MostrarEspera('body .tamanoMinimo');
    $.get(api+"/proveedores/"+encodeURIComponent(proveedorId)/*url+"/static/"+procesoOcid+".json"*/,function(datos){
        DebugFecha();
        datosProveedor=datos;
        console.dir(datos)
        OcultarEspera('body .tamanoMinimo');
        if(datos.id){
            
            AnadirDatosProveedor();
            $('.contenedorTablas').show()
            CargarContratosProveedor();
            VerificarIntroduccion('INTROJS_PROVEEDOR',1);
        }else{
            $('#noEncontrado').show();
        }
        
    }).fail(function() {
    /*Error de Conexion al servidor */
    console.dir('error get');
    
    OcultarEspera('body .tamanoMinimo');
    $('#noEncontrado').show();
    
  });
}

function AnadirDatosProveedor(){
    $('#nombreProveedor').text(datosProveedor.name);
    $('.contenedorInformacion').append(
        $('<div>',{class:'row mt-5'}).append(
            $('<div>',{class:'col-md-12'}).append(
                $('<h1>',{class:'textoColorPrimario mt-3 tituloDetalleProceso',toolTexto:'parties[n].name'}).text(
                    datosProveedor.name
                )
            )
        ),
        $('<div>',{class:'row'}).append(
            $('<h4>',{class:'text-primary-edcax titularCajonSombreado  col-md-12'}).text(
                'Información del Proveedor'
            )
            ),
        $('<div>',{class:'row'}).append(
            $('<div>',{class:'col-md-12'}).append(
                $('<div>',{class:'cajonSombreado contenedorDetalleProcesoDatos','data-step':"1",'data-intro':"Puedes visualizar la dirección de un proveedor en esta sección, en caso de que este disponible."}).append(
                    $('<div>',{class:'contenedorProceso informacionProceso'}).append(

                        (datosProveedor.id?
                            $('<div>',{class:'contenedorTablaCaracteristicas',style:'width:100%'}).append(
                                $('<table>').append(
                                  $('<tbody>').append(
                                    $('<tr>').append(
                                        $('<td>',{class:'tituloTablaCaracteristicas',toolTexto:"parties[n].id"}).text('Identificación:'),
                                        $('<td>',{class:'contenidoTablaCaracteristicas'})).append(
                                            VerificarCadenaRTN(datosProveedor.id)? 
                                            $('<span>',{class:'botonGeneral fondoColorPrimario'}).text('RTN'):$('<span>').text(datosProveedor.id),
                                            VerificarCadenaRTN(datosProveedor.id)?
                                            $('<span>').text(datosProveedor.id.replace('HN-RTN-',' ')):null
                                                
                                        )
                                  ))):null),
                        (datosProveedor.address&&datosProveedor.address.streetAddress?
                        $('<div>',{class:'contenedorTablaCaracteristicas',style:'width:100%'}).append(
                            $('<table>').append(
                                $('<tbody>').append(
                                $('<tr>').append(
                                    $('<td>',{class:'tituloTablaCaracteristicas',toolTexto:"parties[n].address.streetAddress"}).text('Dirección:'),
                                    $('<td>',{class:'contenidoTablaCaracteristicas'})).append(
                                        datosProveedor.address.streetAddress
                                    )
                                ))):null)
                    )
                )
            )
        ),
        $('<div>',{class:'row'}).append(
            $('<h4>',{class:'text-primary-edcax titularCajonSombreado  col-md-12 mt-5'}).text(
                'Datos de Contacto'
            )
            ),
        $('<div>',{class:'row'}).append(
            $('<div>',{class:'col-md-12 mt-2'}).append(
                $('<div>',{class:'cajonSombreado contenedorDetalleProcesoDatos','data-step':"2",'data-intro':"Puedes visualizar los datos de contacto de un proveedor en esta sección, en caso de que este disponible."}).append(
                    $('<div>',{class:'contenedorProceso informacionProceso'}).append(

                        (datosProveedor.contactPoint&&datosProveedor.contactPoint.name?
                            $('<div>',{class:'contenedorTablaCaracteristicas',style:'width:100%'}).append(
                                $('<table>').append(
                                  $('<tbody>').append(
                                    $('<tr>').append(
                                        $('<td>',{class:'tituloTablaCaracteristicas',toolTexto:"parties[n].contactPoint.name"}).text('Nombre:'),
                                        $('<td>',{class:'contenidoTablaCaracteristicas'})).append(
                                            datosProveedor.contactPoint.name
                                        )
                                  ))):null),
                        (datosProveedor.contactPoint&&datosProveedor.contactPoint.telephone?
                        $('<div>',{class:'contenedorTablaCaracteristicas',style:'width:100%'}).append(
                            $('<table>').append(
                                $('<tbody>').append(
                                $('<tr>').append(
                                    $('<td>',{class:'tituloTablaCaracteristicas',toolTexto:"parties[n].contactPoint.telephone"}).text('Telefono:'),
                                    $('<td>',{class:'contenidoTablaCaracteristicas'})).append(
                                        datosProveedor.contactPoint.telephone
                                    )
                                ))):null),
                        (datosProveedor.contactPoint&&datosProveedor.contactPoint.faxNumber?
                            $('<div>',{class:'contenedorTablaCaracteristicas',style:'width:100%'}).append(
                                $('<table>').append(
                                    $('<tbody>').append(
                                    $('<tr>').append(
                                        $('<td>',{class:'tituloTablaCaracteristicas',toolTexto:"parties[n].contactPoint.faxNumber"}).text('FAX:'),
                                        $('<td>',{class:'contenidoTablaCaracteristicas'})).append(
                                            datosProveedor.contactPoint.faxNumber
                                        )
                                    ))):null),
                        (datosProveedor.contactPoint&&datosProveedor.contactPoint.email?
                        $('<div>',{class:'contenedorTablaCaracteristicas',style:'width:100%'}).append(
                            $('<table>').append(
                                $('<tbody>').append(
                                $('<tr>').append(
                                    $('<td>',{class:'tituloTablaCaracteristicas',toolTexto:"parties[n].contactPoint.email"}).text('Correo Electrónico:'),
                                    $('<td>',{class:'contenidoTablaCaracteristicas'})).append(
                                        datosProveedor.contactPoint.email
                                    )
                                ))):null)
                    )
                )
            )
        )




    )
}
function CargarContratosProveedor(){
    $('#resultadosContratosProveedor').html(
      $('<tr>').append(
        $('<td>',{style:'height:300px;position:relative',colspan:'8',id:'cargando'})
      ));
    MostrarEspera('#cargando');
    var parametros=ObtenerFiltrosContratos();
    $.get(api+"/proveedores/"+encodeURIComponent(proveedorId)+'/contratos',parametros).done(function( datos ) {
      console.dir(datos);
    
      AgregarResultadosContratosProveedor(datos,'#resultadosContratosProveedor');
      MostrarPaginacionContratosProveedor(datos);
      
      
        AgregarToolTips();

        
    
      
    }).fail(function() {
        /*Error de Conexion al servidor */
        console.dir('error de api');
        AgregarResultadosContratosProveedor({resultados:[]},'#resultadosContratosProveedor');
        AgregarToolTips();
        //VerificarIntroduccion('INTROJS_PROVEEDOR',1);
        
      });
    }
/*

$('<div>',{class:''})

*/
function ObtenerFiltrosContratos(){
    var parametros={
      pagina : ObtenerNumero(ObtenerValor('pagina')) ? ObtenerNumero(ObtenerValor('pagina')) : 1,
      paginarPor : ObtenerNumero(ObtenerValor('paginarPor')) ? ObtenerNumero(ObtenerValor('paginarPor')) : 5
    }
    if(Validar(ObtenerValor('nombre'))){
      parametros['nombre']=decodeURIComponent(ObtenerValor('nombre'));
    }
    if(Validar(ObtenerValor('identificacion'))){
      parametros['identificacion']= decodeURIComponent(ObtenerValor('identificacion'));
    }
    if(Validar(ObtenerValor('tmc'))){
      parametros['tmc']=decodeURIComponent(ObtenerValor('tmc')) ;
    }
    if(Validar(ObtenerValor('pmc'))){
      parametros['pmc']=decodeURIComponent(ObtenerValor('pmc')) ;
    }
    if(Validar(ObtenerValor('mamc'))){
      parametros['mamc']=decodeURIComponent(ObtenerValor('mamc'));
    }
    if(Validar(ObtenerValor('fua'))){
      parametros['fua']=decodeURIComponent(ObtenerValor('fua'));
    }
    if(Validar(ObtenerValor('memc'))){
      parametros['memc']=decodeURIComponent(ObtenerValor('memc'));
    }
    if(Validar(ObtenerValor('cp'))){
      parametros['cp']=decodeURIComponent(ObtenerValor('cp'));
    }
    if(Validar(ObtenerValor('orderBy'))){
      parametros['orderBy']=decodeURIComponent(ObtenerValor('orderBy'));
    }
    return parametros;
  }

  function AgregarResultadosContratosProveedor(datos,selector){
    var resultados=datos.resultados;
    $(selector).html('');
    for(var i=0;i<resultados.length;i++){
      $(selector).append(
        $('<tr>').append(
          $('<td>',{'data-label':'Comprador'}).append(
            resultados[i]&&resultados[i]._source&&resultados[i]._source.buyer&&resultados[i]._source.buyer.name?$('<a>',{class:'enlaceTablaGeneral',href:'/comprador/'+encodeURIComponent(resultados[i]._source.buyer.id)}).text(resultados[i]._source.buyer.name):''
          ),
          $('<td>',{'data-label':'Título de Contrato'}).append(
            resultados[i]&&resultados[i]._source&&resultados[i]._source.title?$('<a>',{class:'enlaceTablaGeneral',href:'/proceso/'+encodeURIComponent(resultados[i]._source.buyer.name)+'/?contrato='+resultados[i]._source.id}).text(resultados[i]._source.title):''
          ),
          $('<td>',{'data-label':'Descripción' ,class:'textoAlineadoDerecha'}).text(
            resultados[i]&&resultados[i]._source&&resultados[i]._source.description?resultados[i]._source.description:''
          ),
        $('<td>',{'data-label':'Nombre del Proceso' ,class:'textoAlineadoDerecha'}).text(''),
        $('<td>',{'data-label':'Categoría de Compras' ,class:'textoAlineadoDerecha'}).text(''
                ),
                $('<td>',{'data-label':'Monto del Contrato' ,class:'textoAlineadoDerecha'}).append(
                resultados[i]&&resultados[i]._source&&resultados[i]._source.value&&Validar(resultados[i]._source.value.amount)?
                (ValorMoneda(resultados[i]._source.value.amount),$('<span>',{class:'textoColorPrimario',text:' '+resultados[i]._source.value.currency})):''
                
                
                ),
          
          $('<td>',{'data-label':'Fecha de Firma del Contrato' ,class:'textoAlineadoCentrado'}).append(
            $('<span>',{class:resultados[i]&&resultados[i]._source&&resultados[i]._source.period&&resultados[i]._source.period.startDate&&resultados[i]._source.period.startDate!='NaT'?'':'textoColorGris' }).text(
                resultados[i]&&resultados[i]._source&&resultados[i]._source.period&&resultados[i]._source.period.startDate&&resultados[i]._source.period.startDate!='NaT'?ObtenerFecha(resultados[i]._source.period.startDate,'fecha'):'No Disponible'
            )
            
            ),
          $('<td>',{'data-label':'Fecha de Inicio del Contrato' ,class:'textoAlineadoCentrado'}).append(
            $('<span>',{class:resultados[i]&&resultados[i]._source&&resultados[i]._source.period&&resultados[i]._source.period.startDate&&resultados[i]._source.period.startDate!='NaT'?'':'textoColorGris' }).text(
                resultados[i]&&resultados[i]._source&&resultados[i]._source.period&&resultados[i]._source.period.startDate&&resultados[i]._source.period.startDate!='NaT'?ObtenerFecha(resultados[i]._source.period.startDate,'fecha'):'No Disponible'
            )
            
            ),
            $('<td>',{'data-label':'Estado' ,class:'textoAlineadoCentrado'}).append(
                resultados[i]&&resultados[i]._source&&resultados[i]._source.status?resultados[i]._source.status:''
                ),
        )
      )
    }
    if(!resultados.length){
      $(selector).append(
        $('<tr>',{style:''}).append(
          $('<td>',{'data-label':'','colspan':8}).append(
            $('<h4>',{class:'titularColor textoColorPrimario mt-3 mb-3'}).text('No se Encontraron Contratos')
          )))
    }
  }


  function MostrarPaginacionContratosProveedor(datos){
  
    var paginacion=ObtenerPaginacion(datos.paginador.page, datos.paginador.num_pages)
    $('.navegacionTablaGeneral.ContratosProveedor').html('');
    if(datos.paginador.has_previous){
      $('.navegacionTablaGeneral.ContratosProveedor').append(
        $('<a href="javascript:void(0)"  pagina="'+datos.paginador.previous_page_number+'"  class="numerosNavegacionTablaGeneral"><span><i class="fa fa-angle-left"></i></span></a>').on({
          click:function(e){
            PaginaContratosProveedor($(e.currentTarget).attr('pagina'))
          }
          
        })
      );
    }
    
    for(var i=0; i<paginacion.length;i++){
      if(paginacion[i]=='...'){
        $('.navegacionTablaGeneral.ContratosProveedor').append(
          $('<a href="javascript:void(0)" class="numerosNavegacionTablaGeneral numeroNormalNavegacionTablaGeneral">').append($('<span>').text(paginacion[i]))
        );
      }else{
        $('.navegacionTablaGeneral.ContratosProveedor').append(
          $('<a href="javascript:void(0)" pagina="'+paginacion[i]+'"  class="numerosNavegacionTablaGeneral '+((paginacion[i]==datos.paginador.page)?'current':'')+'">').on({
            click:function(e){
                PaginaContratosProveedor($(e.currentTarget).attr('pagina'))
            }
            
          }).append($('<span>').text(paginacion[i]))
        );
      }
    }
    if(datos.paginador.has_next){
      $('.navegacionTablaGeneral.ContratosProveedor').append(
        $('<a href="javascript:void(0)" pagina="'+datos.paginador.next_page_number+'" class="numerosNavegacionTablaGeneral"><span><i class="fa fa-angle-right"></i></span></a>').on({
          click:function(e){
            PaginaContratosProveedor($(e.currentTarget).attr('pagina'))
          }
          
        })
      );
    }
  
    $('#totalResultadoContratosProveedor').html(datos.paginador['total.items']);
    $('#inicioResultadoContratosProveedor').html((ObtenerNumero(datos.parametros.paginarPor)*(ObtenerNumero(datos.parametros.pagina)))-ObtenerNumero(datos.parametros.paginarPor));
    $('#finResultadoContratosProveedor').html(((ObtenerNumero(datos.parametros.paginarPor)*(ObtenerNumero(datos.parametros.pagina))>ObtenerNumero(datos.paginador['total.items'])) ? ObtenerNumero(datos.paginador['total.items']): (ObtenerNumero(datos.parametros.paginarPor)*(ObtenerNumero(datos.parametros.pagina))) ));
    
    
  }
  function PaginaContratosProveedor(numero){
    PushDireccion(AccederProveedores({pagina:numero}));
  }

  function PushDireccion(direccion){
    window.history.pushState({}, document.title,direccion);
    CargarContratosProveedores();
  }

  function AccederContratosProveedor(opciones,desUrl){
    var direccion=('/proveedores/'+encodeURIComponent(proveedorId)+'/contratos/?'+
  
    'paginaC='+(opciones.pagina?opciones.pagina:(ObtenerNumero(ObtenerValor('paginaC')) ? ObtenerNumero(ObtenerValor('paginaC')) : 1))+
    '&paginarPorC='+(opciones.paginarPor?opciones.paginarPor:(ObtenerNumero(ObtenerValor('paginarPorC')) ? ObtenerNumero(ObtenerValor('paginarPorC')) : 5))+
  
    (ValidarCadena(opciones.nombre)? '&nombre='+encodeURIComponent(opciones.nombre): (ValidarCadena(ObtenerValor('nombre'))&&!desUrl?'&nombre='+ObtenerValor('nombre'):''))+
    (ValidarCadena(opciones.identificacion)? '&identificacion='+encodeURIComponent(opciones.identificacion): (ValidarCadena(ObtenerValor('identificacion'))&&!desUrl?'&identificacion='+ObtenerValor('identificacion'):''))+
    (ValidarCadena(opciones.tmc)? '&tmc='+encodeURIComponent(opciones.tmc): (ValidarCadena(ObtenerValor('tmc'))&&!desUrl?'&tmc='+ObtenerValor('tmc'):''))+
    (ValidarCadena(opciones.pmc)? '&pmc='+encodeURIComponent(opciones.pmc): (ValidarCadena(ObtenerValor('pmc'))&&!desUrl?'&pmc='+ObtenerValor('pmc'):''))+
    (ValidarCadena(opciones.mamc)? '&mamc='+encodeURIComponent(opciones.mamc): (ValidarCadena(ObtenerValor('mamc'))&&!desUrl?'&mamc='+ObtenerValor('mamc'):''))+
    (ValidarCadena(opciones.fua) ? '&fua='+encodeURIComponent(opciones.fua):(ValidarCadena(ObtenerValor('fua'))&&!desUrl?'&fua='+ObtenerValor('fua'):''))+
    (ValidarCadena(opciones.memc) ? '&memc='+encodeURIComponent(opciones.memc):(ValidarCadena(ObtenerValor('memc'))&&!desUrl?'&memc='+ObtenerValor('memc'):''))+
    (ValidarCadena(opciones.memc) ? '&cp='+encodeURIComponent(opciones.memc):(ValidarCadena(ObtenerValor('cp'))&&!desUrl?'&cp='+ObtenerValor('cp'):''))+
    (ValidarCadena(opciones.orderBy) ? '&orderBy='+encodeURIComponent(opciones.orderBy):(ValidarCadena(ObtenerValor('orderBy'))&&!desUrl?'&orderBy='+ObtenerValor('orderBy'):''))
  
    );
  
  
    
    return direccion;
  }