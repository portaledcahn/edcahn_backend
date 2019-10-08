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
    var configuracionNumerica={ 
      decimalCharacter:'.',
      decimalPlaces:0,
      digitalGroupSpacing:3,
      digitGroupSeparator:','
      }
     var elementosNumericos=[];
     for(let i=0;i<$('.elementoNumerico').length;i++){
      elementosNumericos[i]= new AutoNumeric($('.elementoNumerico')[i], configuracionNumerica );
     }
/*
    $('#cajonContratos .OpcionFiltroBusquedaNumerico input').on('change',function(evento){
      cambiarFiltroNumerico(evento.currentTarget);
    });*/
    
    $('#cajonContratos input.campoAzulBusqueda').on('change',function(evento){
      var elemento=$('#cajonContratos input.campoAzulBusqueda');
      var filtros={};
      filtros=ObtenerFiltrosContratos();
      filtros[elemento.attr('filtro')]=(elemento.val());
      if(!ValidarCadena(filtros[elemento.attr('filtro')])){
        delete filtros[elemento.attr('filtro')];
      }
      filtros['paginaCon']=1;
      InputFiltroContratos(filtros,true);
    });
    $('#buscarInformacionContratos').on('click',function(evento){
      var elemento=$('#cajonContratos input.campoAzulBusqueda');
      var filtros={};
      filtros=ObtenerFiltrosContratos();
      filtros[elemento.attr('filtro')]=(elemento.val());
      if(!ValidarCadena(filtros[elemento.attr('filtro')])){
        delete filtros[elemento.attr('filtro')];
      }
      filtros['paginaCon']=1;
      InputFiltroContratos(filtros,true);
    });
    AsignarEventosFiltroContratos();
    AsignarOrdenTablaFiltros(OrdenFiltroContratos,'#cajonContratos .ordenEncabezado');
    NumeroResultadosContrato();
    //paginacionBusquedaContrato
});
function NumeroResultadosContrato(){
  $('#paginacionBusquedaContrato').on('change',function(e){
    CantidadResultadosContrato($('#paginacionBusquedaContrato').val()?$('#paginacionBusquedaContrato').val():5);
  });
}
function CantidadResultadosContrato(numero){
  PushDireccionContratos(AccederUrlPagina({paginaCon:1,paginarPorCon:numero}));
}
function AsignarEventosFiltroContratos(){
  $('#cajonContratos .campoFiltrado input[type="text"]').on(
    {'change': function(e){
      var elemento=$(e.currentTarget);
      var elementoPadre=elemento.closest('.campoFiltrado');
      var filtros={};
      filtros=ObtenerFiltrosContratos();
      switch(elementoPadre.attr('tipo')){
        case 'fecha':
            filtros[elementoPadre.attr('filtro')]=ValidarCadena(elemento.val())?(elemento.attr('opcion')+elemento.val()):'';
            if(!ValidarCadena(filtros[elementoPadre.attr('filtro')])){
              delete filtros[elementoPadre.attr('filtro')];
            }
            filtros['paginaCon']=1;
            InputFiltroContratos(filtros,true);
        break;
        case 'numero':
            filtros[elementoPadre.attr('filtro')]=ValidarCadena(elemento.val())?(elemento.attr('opcion')+elemento.val()):'';
            if(!ValidarCadena(filtros[elementoPadre.attr('filtro')])){
              delete filtros[elementoPadre.attr('filtro')];
            }
            filtros['paginaCon']=1;
            InputFiltroContratos(filtros,true);
        break;
        default:
            filtros[elementoPadre.attr('filtro')]=(elemento.val());
            if(!ValidarCadena(filtros[elementoPadre.attr('filtro')])){
              delete filtros[elementoPadre.attr('filtro')];
            }
            filtros['paginaCon']=1;
            InputFiltroContratos(filtros,true);
        break;
      }

    }}
  )
}
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
       (datosProveedor.contactPoint&&(datosProveedor.contactPoint.name||datosProveedor.contactPoint.telephone||datosProveedor.contactPoint.faxNumber||datosProveedor.contactPoint.email))? $('<div>',{class:'row'}).append(
            $('<h4>',{class:'text-primary-edcax titularCajonSombreado  col-md-12 mt-5'}).text(
                'Datos de Contacto'
            )
            ):null,
            (datosProveedor.contactPoint&&(datosProveedor.contactPoint.name||datosProveedor.contactPoint.telephone||datosProveedor.contactPoint.faxNumber||datosProveedor.contactPoint.email))?$('<div>',{class:'row'}).append(
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
        ):null




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

  function AgregarResultadosContratosProveedor(datos,selector){
    var resultados=datos.resultados;
    $(selector).html('');
    for(var i=0;i<resultados.length;i++){
      $(selector).append(
        $('<tr>').append(
          $('<td>',{'data-label':'Comprador'}).append(
            resultados[i]&&resultados[i]._source&&resultados[i]._source.buyer&&resultados[i]._source.buyer.name?$('<a>',{class:'enlaceTablaGeneral',href:'/comprador/'+encodeURIComponent(resultados[i]._source.buyer.id)}).text(resultados[i]._source.buyer.name):''
          ),
          $('<td>',{'data-label':'Título de Contrato',class:'textoAlineadoCentrado'}).append(
            resultados[i]&&resultados[i]._source&&resultados[i]._source.title?$('<a>',{class:'enlaceTablaGeneral',href:'/proceso/'+encodeURIComponent(resultados[i]._source.buyer.name)+'/?contrato='+resultados[i]._source.id}).text(resultados[i]._source.title):''
          ),
          $('<td>',{'data-label':'Descripción' ,class:'textoAlineadoJustificado'}).text(
            resultados[i]&&resultados[i]._source&&resultados[i]._source.description?resultados[i]._source.description:''
          ),
        $('<td>',{'data-label':'Nombre del Proceso' ,class:'textoAlineadoCentrado'}).text(''),
        $('<td>',{'data-label':'Categoría de Compras' ,class:'textoAlineadoCentrado'}).text(''
                ),
                $('<td>',{'data-label':'Monto del Contrato' ,class:'textoAlineadoDerecha'}).append(
                resultados[i]&&resultados[i]._source&&resultados[i]._source.value&&Validar(resultados[i]._source.value.amount)?
                [ValorMoneda(resultados[i]._source.value.amount),$('<span>',{class:'textoColorPrimario',text:' '+resultados[i]._source.value.currency})]:''
                
                
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
    PushDireccionContratos(AccederUrlPagina({paginaCon:numero}));
  }

  function PushDireccionContratos(direccion){
    window.history.pushState({}, document.title,direccion);
    CargarContratosProveedor();
  }
  function InputFiltroContratos(filtros,desUrl){
    PushDireccionContratos(AccederUrlPagina(filtros,desUrl));
  }

  function AccederUrlPagina(opciones,desUrl){
    var direccion=('/proveedor/'+encodeURIComponent(proveedorId)+'/?'+
  
    'paginaCon='+(opciones.paginaCon?opciones.paginaCon:(ObtenerNumero(ObtenerValor('paginaCon')) ? ObtenerNumero(ObtenerValor('paginaCon')) : 1))+
    '&paginarPorCon='+(opciones.paginarPorCon?opciones.paginarPorCon:(ObtenerNumero(ObtenerValor('paginarPorCon')) ? ObtenerNumero(ObtenerValor('paginarPorCon')) : 5))+
    (ValidarCadena(opciones.compradorCon)? '&compradorCon='+encodeURIComponent(opciones.compradorCon): (ValidarCadena(ObtenerValor('compradorCon'))&&!desUrl?'&compradorCon='+ObtenerValor('compradorCon'):''))+
    (ValidarCadena(opciones.tituloCon)? '&tituloCon='+encodeURIComponent(opciones.tituloCon): (ValidarCadena(ObtenerValor('tituloCon'))&&!desUrl?'&tituloCon='+ObtenerValor('tituloCon'):''))+
   
    (ValidarCadena(opciones.descripcionCon)? '&descripcionCon='+encodeURIComponent(opciones.tmc): (ValidarCadena(ObtenerValor('descripcionCon'))&&!desUrl?'&descripcionCon='+ObtenerValor('descripcionCon'):''))+
    (ValidarCadena(opciones.categoriaCompraCon)? '&categoriaCompraCon='+encodeURIComponent(opciones.categoriaCompraCon): (ValidarCadena(ObtenerValor('categoriaCompraCon'))&&!desUrl?'&categoriaCompraCon='+ObtenerValor('categoriaCompraCon'):''))+
    (ValidarCadena(opciones.fechaFirmaCon)? '&fechaFirmaCon='+encodeURIComponent(opciones.fechaFirmaCon): (ValidarCadena(ObtenerValor('fechaFirmaCon'))&&!desUrl?'&fechaFirmaCon='+ObtenerValor('fechaFirmaCon'):''))+
    (ValidarCadena(opciones.fechaInicioCon) ? '&fechaInicioCon='+encodeURIComponent(opciones.fechaInicioCon):(ValidarCadena(ObtenerValor('fechaInicioCon'))&&!desUrl?'&fechaInicioCon='+ObtenerValor('fechaInicioCon'):''))+
    (ValidarCadena(opciones.montoCon) ? '&montoCon='+encodeURIComponent(reemplazarValor(opciones.montoCon,',','')):(ValidarCadena(ObtenerValor('montoCon'))&&!desUrl?'&montoCon='+ObtenerValor('montoCon'):''))+
    (ValidarCadena(opciones.estadoCon) ? '&estadoCon='+encodeURIComponent(opciones.estadoCon):(ValidarCadena(ObtenerValor('estadoCon'))&&!desUrl?'&estadoCon='+ObtenerValor('estadoCon'):''))+
    (ValidarCadena(opciones.ordenarPorCon) ? '&ordenarPorCon='+encodeURIComponent(opciones.ordenarPorCon):(ValidarCadena(ObtenerValor('ordenarPorCon'))&&!desUrl?'&ordenarPorCon='+ObtenerValor('ordenarPorCon'):''))
  
    );
  
  
    
    return direccion;
  }
  function ObtenerFiltrosContratos(sufijo){
    var parametros={}
    parametros[sufijo?'pagina'+sufijo:'pagina']= ObtenerNumero(ObtenerValor('paginaCon')) ? ObtenerNumero(ObtenerValor('paginaCon')) : 1;
    parametros[sufijo?'paginarPor'+sufijo:'paginarPor']= ObtenerNumero(ObtenerValor('paginarPorCon')) ? ObtenerNumero(ObtenerValor('paginarPorCon')) : 5;
    if(Validar(ObtenerValor('compradorCon'))){
      parametros[sufijo?'comprador'+sufijo:'comprador']=decodeURIComponent(ObtenerValor('compradorCon'));
    }
    if(Validar(ObtenerValor('tituloCon'))){
      parametros[sufijo?'titulo'+sufijo:'titulo']= decodeURIComponent(ObtenerValor('tituloCon'));
    }
    if(Validar(ObtenerValor('descripcionCon'))){
      parametros[sufijo?'descripcion'+sufijo:'descripcion']=decodeURIComponent(ObtenerValor('descripcionCon')) ;
    }
    if(Validar(ObtenerValor('categoriaCompraCon'))){
      parametros[sufijo?'categoriaCompra'+sufijo:'categoriaCompra']=decodeURIComponent(ObtenerValor('categoriaCompraCon')) ;
    }
    if(Validar(ObtenerValor('fechaFirmaCon'))){
      parametros[sufijo?'fechaFirma'+sufijo:'fechaFirma']=decodeURIComponent(ObtenerValor('fechaFirmaCon'));
    }
    if(Validar(ObtenerValor('fechaInicioCon'))){
      parametros[sufijo?'fechaInicio'+sufijo:'fechaInicio']=decodeURIComponent(ObtenerValor('fechaInicioCon'));
    }
    if(Validar(ObtenerValor('montoCon'))){
      parametros[sufijo?'monto'+sufijo:'monto']=decodeURIComponent(ObtenerValor('montoCon'));
    }
    if(Validar(ObtenerValor('estadoCon'))){
      parametros[sufijo?'estado'+sufijo:'estado']=decodeURIComponent(ObtenerValor('estadoCon'));
    }
    if(Validar(ObtenerValor('ordenarPorCon'))){
      parametros[sufijo?'ordenarPor'+sufijo:'ordenarPor']=decodeURIComponent(ObtenerValor('ordenarPorCon'));
    }
    return parametros;
  }


  function OrdenFiltroContratos(filtro,orden){
    switch(orden){
      case 'ascendente':
          PushDireccion(AccederUrlPagina({pagina:1,ordenarPor:'asc('+filtrosAPropiedades[filtro]+')'}));
        break;
      case 'descendente':
          PushDireccion(AccederUrlPagina({pagina:1,ordenarPor:'desc('+filtrosAPropiedades[filtro]+')'}));
        break;
      case 'neutro':
          var filtros=ObtenerFiltrosContratos('Con');
          if(filtros['ordenarPor']){
            delete filtros['ordenarPor'];
          }
          filtros['pagina']=1;
          PushDireccion(AccederUrlPaginas(filtros,true));
        break;
      default:
          var filtros=ObtenerFiltrosContratos('Con');
          if(filtros['ordenarPor']){
            delete filtros['ordenarPor'];
          }
          filtros['pagina']=1;
          PushDireccion(AccederUrlPagina(filtros,true));
        break;
  
    }
  }