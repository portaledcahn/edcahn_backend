var filtrosAplicables={
  categorias:{titulo:'Categoría',parametro:'categoria'},
  monedas: {titulo:'Moneda',parametro:'moneda'},
  instituciones: {titulo:'Institución Compradora',parametro:'institucion'},
  metodos_de_seleccion: {titulo:'Método de Selección',parametro:'metodo_seleccion'},
  años: {titulo:'Año',parametro:'year'},
  proveedor: {titulo:'Proveedor',parametro:'proveedor'}
};
$('#textoTotalBusqueda').html(
  $('#textoTotalBusqueda').html()+
  ((ObtenerValor('metodo')==='proceso')?'Procesos de Contratación:':(ObtenerValor('metodo')==='contrato')?'Contratos:':(ObtenerValor('metodo')==='pago')?'Procesos de Pagos:':'Procesos de Contratación:')
  )
function ObtenerMetodo(){
  return ['proceso','contrato','pago'].includes(ObtenerValor('metodo'))?ObtenerValor('metodo'):'proceso'
}
function EliminarFiltrosMetodo(datos){
  if(!(datos&&datos.filtros)){
    return datos;
  }
  switch(ObtenerMetodo()){
    case 'pago':
    
    if(datos.filtros.metodos_de_seleccion){
      delete datos.filtros.metodos_de_seleccion
    }
    if(datos.filtros.categorias){
      delete datos.filtros.categorias
    }
    break;
    case 'contrato':
    break;
    default://case proceso

    break;
  }
}
var traducciones={
  'goods':{titulo:'Bienes y provisiones',descripcion:'El proceso de contrataciones involucra bienes o suministros físicos o electrónicos.'},
  'works':{titulo:'Obras',descripcion:'El proceso de contratación involucra construcción reparación, rehabilitación, demolición, restauración o mantenimiento de algún bien o infraestructura.'},
  'services':{titulo:'Servicios',descripcion:'El proceso de contratación involucra servicios profesionales de algún tipo, generalmente contratado con base de resultados medibles y entregables. Cuando el código de consultingServices está disponible o es usado por datos en algún conjunto da datos en particular, el código de servicio sólo debe usarse para servicios no de consultoría.'},
  'consultingServices':{titulo:'Servicios de consultoría',descripcion:'Este proceso de contratación involucra servicios profesionales provistos como una consultoría.'}
}
var listaElastica={};
var resultadosElastic=[];

window.onpopstate = function(e){
  location.reload();
  console.dir('popiando')
}
$('.opcionFiltroBusquedaPagina').on('click',function(e){
  
    if($(e.currentTarget).hasClass('activo')){
      $(e.currentTarget).removeClass('activo');
    }else{
      $(e.currentTarget).addClass('activo');
    }
  });
  $('.botonAzulFiltroBusqueda,.cerrarContenedorFiltrosBusqueda').on('click',function(e){
    if($('.contenedorFiltrosBusqueda').hasClass('cerrado')){
      $('.contenedorFiltrosBusqueda').removeClass('cerrado');
    }else{
      $('.contenedorFiltrosBusqueda').addClass('cerrado');
    }
  });
/*
  $('.metodoBusquedaContenedor input[type="radio"]').on('change',function(e){
    if($(e.currentTarget).is(':checked')){
      location.href='/busqueda?q='+$('#campoBusquedaProceso').val()+'&metodo='+$(e.currentTarget).attr('metodo')
    }
  });*/
  $('.metodoBusquedaContenedor a[name="metodoBusqueda"]').on('click',function(e){
    console.dir('click')
      //location.href='/busqueda?term='+$('#campoBusquedaProceso').val()+'&metodo='+$(e.currentTarget).attr('metodo');
      location.href=AccederBusqueda({metodo:$(e.currentTarget).attr('metodo')},true);
  });

$('#botonBusquedaProceso').on('click',function(e){
    //window.location.href="/busqueda?term="+$('#botonBusquedaProceso').val()+'&metodo=proceso';
    location.href=AccederBusqueda({term:encodeURIComponent($('#campoBusquedaProceso').val().trim())});
});
$('#campoBusquedaProceso').on('keydown',function(e){
    teclaCodigo=e.keyCode ? e.keyCode : e.which;
    if(teclaCodigo=='13'){
        //window.location.href="/busqueda?term="+$('#campoBusquedaProceso').val()+'&metodo=proceso';
        location.href=AccederBusqueda({term: encodeURIComponent($('#campoBusquedaProceso').val().trim()) });
    }
});  



function CargarElementosBusqueda(cargaFiltro){
  var parametros={
    pagina : ObtenerNumero(ObtenerValor('pagina')) ? ObtenerNumero(ObtenerValor('pagina')) : 1,
    term : decodeURIComponent(ObtenerTexto(ObtenerValor('term'))),
    metodo : ['proceso','contrato','pago'].includes(ObtenerValor('metodo'))?ObtenerValor('metodo'):'proceso'
  }
  if(Validar(ObtenerValor('moneda'))){
    parametros['moneda']=ObtenerValor('moneda');
  }
  if(Validar(ObtenerValor('metodo_seleccion'))){
    parametros['metodo_seleccion']= decodeURIComponent(ObtenerValor('metodo_seleccion'));
  }
  if(Validar(ObtenerValor('institucion'))){
    parametros['institucion']=decodeURIComponent(ObtenerValor('institucion')) ;
  }
  if(Validar(ObtenerValor('categoria'))){
    parametros['categoria']=decodeURIComponent(ObtenerValor('categoria')) ;
  }
  if(Validar(ObtenerValor('year'))){
    parametros['year']=ObtenerValor('year');
  }
  $.get(api+"/buscador",parametros).done(function( datos ) {
    console.dir(datos);

    EliminarFiltrosMetodo(datos);
    MostrarResumen(datos)
    MostrarResultados(datos)
    MostrarPaginacion(datos);
    AgregarToolTips();
    //if(!cargaFiltro){
     //InicializarElastic(datos);
      
      MostrarListaElastica(datos,'#elastic-list');
      MostrarEtiquetaListaElasticaAplicada();
      MostrarListaElasticaAplicados();
   // }
    
    VerificarIntroduccion('INTROJS_BUSQUEDA',1);
  }).fail(function() {
      /*Error de Conexion al servidor */
      $('#listaResultadosBusqueda').html('<h4 class="titularColor textoColorNegro mt-3">No se encontraron resultados.</h4>')
      AgregarToolTips();
      console.dir('error de api')
      
    });
}
function MostrarResumen(datos){
  $('#totalCompradores').html(ObtenerNumero(datos.resumen.compradores_total));
    $('#totalProcesos').html(ObtenerNumero(datos.resumen.procesos_total));
    $('#totalProveedores').html(ObtenerNumero(datos.resumen.proveedores_total));
    $('#promedioMonto').html(ValorMoneda(datos.resumen.monto_promedio)+' HNL');
}
function MostrarResultados(datos){
  $('#listaResultadosBusqueda').html('')
  for(var i=0;i<datos.resultados.length;i++){
    switch(ObtenerValor('metodo')){
      case 'contrato':
      AgregarResultadoContrato(datos.resultados[i]._source.doc.compiledRelease);
      break;
      case 'pago':
      AgregarResultadoPago(datos.resultados[i]._source.doc.compiledRelease);
      break;
      case 'proceso':
      AgregarResultadoProceso(datos.resultados[i]._source.doc.compiledRelease);
      break;
    }
  }
  if(!datos.resultados.length){
    $('#listaResultadosBusqueda').html('<h4 class="titularColor textoColorNegro mt-3">No se encontraron resultados.</h4>')
  }
}
function MostrarPaginacion(datos){
  
  var paginacion=ObtenerPaginacion(datos.paginador.page, datos.paginador.num_pages)
  $('.navegacionTablaGeneral').html('');
  if(datos.paginador.has_previous){
    $('.navegacionTablaGeneral').append(
      $('<a href="'+AccederBusqueda({pagina:datos.paginador.previous_page_number})+'" class="numerosNavegacionTablaGeneral"><span><i class="fa fa-angle-left"></i></span></a>')
    );
  }
  
  for(var i=0; i<paginacion.length;i++){
    if(paginacion[i]=='...'){
      $('.navegacionTablaGeneral').append(
        $('<a href="javascript:void(0)" class="numerosNavegacionTablaGeneral numeroNormalNavegacionTablaGeneral">').append($('<span>').text(paginacion[i]))
      );
    }else{
      $('.navegacionTablaGeneral').append(
        $('<a href="'+AccederBusqueda({pagina:paginacion[i]})+'" class="numerosNavegacionTablaGeneral '+((paginacion[i]==datos.paginador.page)?'current':'')+'">').append($('<span>').text(paginacion[i]))
      );
    }
  }
  if(datos.paginador.has_next){
    $('.navegacionTablaGeneral').append(
      $('<a href="'+AccederBusqueda({pagina:datos.paginador.next_page_number})+'" class="numerosNavegacionTablaGeneral"><span><i class="fa fa-angle-right"></i></span></a>')
    );
  }
  
}
function AccederBusqueda(opciones,desUrl){
  var direccion=('/busqueda?term='+
  (Validar(opciones.term)? opciones.term:ObtenerTexto(ObtenerValor('term'))) +

  '&metodo='+(['proceso','contrato','pago'].includes(opciones.metodo?opciones.metodo:ObtenerValor('metodo'))?(opciones.metodo ? opciones.metodo: ObtenerValor('metodo')) :'proceso')
  +

  '&pagina='+(opciones.pagina?opciones.pagina:(ObtenerNumero(ObtenerValor('pagina')) ? ObtenerNumero(ObtenerValor('pagina')) : 1))+

  (Validar(opciones.moneda)? '&moneda='+opciones.moneda: (Validar(ObtenerValor('moneda'))&&!desUrl?'&moneda='+ObtenerValor('moneda'):''))+

  (Validar(opciones.metodo_seleccion)? '&metodo_seleccion='+opciones.metodo_seleccion: (Validar(ObtenerValor('metodo_seleccion'))&&!desUrl?'&metodo_seleccion='+ObtenerValor('metodo_seleccion'):''))+

  (Validar(opciones.institucion) ? '&institucion='+opciones.institucion:(Validar(ObtenerValor('institucion'))&&!desUrl?'&institucion='+ObtenerValor('institucion'):''))+

  (Validar(opciones.categoria) ? '&categoria='+opciones.categoria:(Validar(ObtenerValor('categoria'))&&!desUrl?'&categoria='+ObtenerValor('categoria'):''))+

  (Validar(opciones.year) ? '&year='+opciones.year:(Validar(ObtenerValor('year'))&&!desUrl?'&year='+ObtenerValor('year'):''))

  );
  return direccion;
}

function AsignarValor(arreglo,propiedad,valor,cantidad){
  var contador=0;
  for(var i=0;i<arreglo.length;i++){
      if(!Validar(arreglo[i][propiedad])){
        arreglo[i][propiedad]=valor;
        contador++;
        if(contador>=cantidad){
          break;
        }
      }
  }
  return arreglo;
}
CargarElementosBusqueda()
  $(function () {
    console.dir('inicio')/*
    switch( ObtenerValor('metodo') ){
      case 'contrato':
          MostrarResultados(arregloContratos)
      break;
      case 'pago':
          MostrarResultados(arregloPagos)
      break;
      case 'proceso':
        MostrarResultados(arregloProcesos)
      break;
      default:
          MostrarResultados(arregloProcesos)
      break;
    }*/
    $('#quitarFiltros').on('click',function(e){
      window.history.pushState({}, document.title,AccederBusqueda({pagina:1},true) );
      CargarElementosBusqueda(true);
    });
    
  });


function ObtenerJsonFiltrosAplicados(parametros){
  if(Validar(ObtenerValor('year'))){
    parametros['años']=ObtenerValor('year');
  }
  if(Validar(ObtenerValor('categoria'))){
    parametros['categorias']=decodeURIComponent(ObtenerValor('categoria'));
  }
  if(Validar(ObtenerValor('institucion'))){
    parametros['instituciones']=decodeURIComponent(ObtenerValor('institucion'));
  }
  if(Validar(ObtenerValor('metodo_seleccion'))){
    parametros['metodos_de_seleccion']=decodeURIComponent(ObtenerValor('metodo_seleccion'));
  }
  if(Validar(ObtenerValor('moneda'))){
    parametros['monedas']=ObtenerValor('moneda');
  }
  return parametros;
}

function MostrarEtiquetasFiltrosAplicados(parametros){
  if(!$.isEmptyObject(parametros)){
    $('#contenedorSinFiltros').hide();
    $('#contenedorFiltros').show();
  }else{
    $('#contenedorFiltros').hide();
    $('#contenedorSinFiltros').show();
  }
  $('#listaFiltrosAplicados').html('');
  $.each(parametros,function(llave,filtro){
    $('#listaFiltrosAplicados').append(
      $('<div>',{class:'grupoEtiquetaFiltro col-md-12 mb-1'}).append(
        $('<div>',{class:'grupoEtiquetaTitulo mr-1',text:filtrosAplicables[llave].titulo +':'}),
        $('<div>',{class:'filtrosAplicados'}).append(
          $('<div>',{class:'etiquetaFiltro','llave':llave,'valor':filtro}).append(
            filtro,
            '&nbsp;',
            $('<i>',{class:'fas fa-times'}).on('click',function(e){
              var filtros={
                pagina:1
              };
              $('li.list-group-item.active').each(function(cla,val){
                filtros[filtrosAplicables[$(val).attr('llave')]?filtrosAplicables[$(val).attr('llave')].parametro:'' ]=$(val).attr('valor');
              });
              delete filtros[filtrosAplicables[$(e.currentTarget).parent().attr('llave')]?filtrosAplicables[$(e.currentTarget).parent().attr('llave')].parametro:''];
              window.history.pushState({}, document.title,AccederBusqueda(filtros,true) );
              CargarElementosBusqueda(true);
            })
          )
        )
      )
    )
  });
}
function MostrarEtiquetaListaElasticaAplicada(){
  
  var parametros={
  };
  parametros=ObtenerJsonFiltrosAplicados(parametros);
  MostrarEtiquetasFiltrosAplicados(parametros);
}


function MostrarListaElasticaAplicados(){
  var filtros={
  };
  filtros=ObtenerJsonFiltrosAplicados(filtros);
  $.each(filtros,function(llave,valor){
    $('ul#ul'+llave).find(
      'li[formato="'+(valor).toString().toLowerCase()+'"]'
    ).addClass('active');
  });
}





function AgregarResultadoProceso(datos){
  $('#listaResultadosBusqueda').append(
    $('<div>',{class:'resultadoBusquedaProceso  transicion cajonSombreado anchoTotal'}).append(
      $('<div>',{class:'p-1'}).append(
        $('<div>',{class:'textoTituloResultadoBusqueda'}).append(
          $('<div>',{class:'row'}).append(
            $('<div>',{class:'col-12 col-sm-8 col-md-8 col-lg-9'}).append(
              $('<a>',{class:'enlaceTablaGeneral',text:ReducirTexto(datos.tender&&datos.tender.description?datos.tender.description:datos.tender&&datos.tender.title?datos.tender.title:'',140),href:
              ('/proceso/'+datos.ocid)
              ,toolTexto:datos.tender&&datos.tender.description?datos.tender.description:datos.tender&&datos.tender.title?datos.tender.title:'',
              toolPosicion:'bottom'
              }).append()
            ),
            $('<div>',{class:'col-12 col-sm-4 col-md-4 col-lg-3'}).append(
              $('<div>',{class:'textoAlineadoDerecha'}).append(
                $('<span>',{class:'textoColorGris textoAlineadoDerecha toolTip enLinea',toolTexto:'Fecha de Recepción de Ofertas'
                ,text: (datos.tender&&datos.tender.tenderPeriod&&datos.tender.tenderPeriod.endDate)?ObtenerFecha(datos.tender.tenderPeriod.endDate):'' })
              )
            )
          )
        )
      ),
      $('<div>',{class:'contenedorProceso'}).append(
        $('<div>',{class:'contenedorTablaCaracteristicas'}).append(
          $('<table>',{class:''}).append(
            $('<tbody>',{class:''}).append(
              datos.ocid?$('<tr>',{class:''}).append(
                $('<td>',{class:'tituloTablaCaracteristicas',text:'ID Proceso (OCID):',toolTexto:'ocid'}).append(),
                $('<td>',{class:'contenidoTablaCaracteristicas'}).append(
                  $('<a>',{class:'enlaceTablaGeneral',text:datos.ocid,href:'/proceso/'+datos.ocid})
                )
              ):null,
              datos.buyer?$('<tr>',{class:''}).append(
                $('<td>',{class:'tituloTablaCaracteristicas',text:'Comprador:',toolTexto:'buyer.name'}).append(),
                $('<td>',{class:'contenidoTablaCaracteristicas'}).append(
                  ObtenerElementosParte(datos.buyer.id,datos)
                )
              ):null,
              $('<tr>',{class:''}).append(
                $('<td>',{class:'tituloTablaCaracteristicas',text:'Estado:'}),
                $('<td>',{class:'contenidoTablaCaracteristicas',text:ObtenerEstadoProceso(datos)})
              )
              
            )
          )
        ),
        datos.tender&&datos.tender.value&&datos.tender.value.amount?
        $('<div>',{class:'contenedorTablaCaracteristicas'}).append(
          $('<table>',{class:'anchoTotal'}).append(
            $('<tbody>',{class:''}).append(
              $('<tr>',{class:''}).append(
                $('<td>',{class:'textoAlineadoDerecha'}).append(
                  $('<div>',{class:'montoTotalProceso'}).append(
                    $('<div>',{class:'contenedorMonto'}).append(
                      $('<div>',{class:'textoColorGris',text:'Monto Licitado'}),
                      $('<div>',{class:'valorMonto'}).append(
                        ValorMoneda(datos.tender.value.amount),
                        $('<span>',{class:'textoColorPrimario',text:' '+datos.tender.value.currency})
                      )
                    )
                  )
                )
              )
            )
          )
        ):
        datos.planning&&datos.planning.budget&&datos.planning.budget.amount?
        $('<div>',{class:'contenedorTablaCaracteristicas'}).append(
          $('<table>',{class:'anchoTotal'}).append(
            $('<tbody>',{class:''}).append(
              $('<tr>',{class:''}).append(
                $('<td>',{class:'textoAlineadoDerecha'}).append(
                  $('<div>',{class:'montoTotalProceso'}).append(
                    $('<div>',{class:'contenedorMonto'}).append(
                      $('<div>',{class:'textoColorGris',text:'Monto Presupuestado'}),
                      $('<div>',{class:'valorMonto'}).append(
                        ValorMoneda(datos.planning.budget.amount.amount),
                        $('<span>',{class:'textoColorPrimario',text:datos.planning.budget.amount.currency})
                      )
                    )
                  )
                )
              )
            )
          )
        )
        :datos.contracts&&datos.contracts.length&&TotalContratos(datos).length?
        
        $('<div>',{class:'contenedorTablaCaracteristicas'}).append(
          $('<table>',{class:'anchoTotal'}).append(
            $('<tbody>',{class:''}).append(
              $('<tr>',{class:''}).append(
                $('<td>',{class:'textoAlineadoDerecha'}).append(
                  $('<div>',{class:'montoTotalProceso'}).append(
                    $('<div>',{class:'contenedorMonto'}).append(
                      $('<div>',{class:'textoColorGris',text:'Monto Contratado'}),
                      MostrarTotalContratos(TotalContratos(datos))/*
                      $('<div>',{class:'valorMonto'}).append(
                        ValorMoneda(datos.tender.value.amount),
                        $('<span>',{class:'textoColorPrimario',text:datos.tender.value.currency})
                      )*/
                    )
                  )
                )
              )
            )
          )
        ):
        $('<div>',{class:'contenedorTablaCaracteristicas'}).append(
          $('<table>',{class:'anchoTotal'}).append(
            $('<tbody>',{class:''}).append(
              $('<tr>',{class:''}).append(
                $('<td>',{class:'textoAlineadoDerecha'}).append(
                  $('<div>',{class:'montoTotalProceso'}).append(
                    $('<div>',{class:'contenedorMonto'}).append(
                      $('<div>',{class:'textoColorGris',text:'Monto Estimado'}),
                      $('<div>',{class:'valorMonto'}).append(
                        $('<span>',{class:'textoColorGris',text:'No Disponible'}),
                        $('<span>',{class:'textoColorPrimario',text:''})
                      )
                    )
                  )
                )
              )
            )
          )
        )//null
        
      )
    )
  );
}

function ObtenerEstadoProceso(datos){
  var estado='';
  if(datos.planning){
    estado='Planificación';
  }
  if(datos.tender){
    estado='Licitación';
  }
  if(datos.awards){
    estado='Adjudicación';
  }
  if(datos.contracts){
    estado='Contrato';
  }
  return estado;
}

function AgregarResultadoContrato(datos){
  var contrato=datos.contracts[0];
  console.dir(contrato);
  $('#listaResultadosBusqueda').append(
    $('<div>',{class:'resultadoBusquedaProceso  transicion cajonSombreado anchoTotal'}).append(
      $('<div>',{class:'p-1'}).append(
        $('<div>',{class:'textoTituloResultadoBusqueda'}).append(
          $('<div>',{class:'row'}).append(
            $('<div>',{class:'col-12 col-sm-8 col-md-8 col-lg-9'}).append(
              $('<a>',{class:'enlaceTablaGeneral',text: contrato.description?ReducirTexto(contrato.description,140):ReducirTexto(contrato.title,140),href:
                '/proceso/'+datos.ocid+'?contrato='+contrato.id,
                toolTexto:contrato.description?contrato.description:contrato.title?contrato.title:'',
                toolPosicion:'bottom'
              }).append()
            ),
            $('<div>',{class:'col-12 col-sm-4 col-md-4 col-lg-3'}).append(
              $('<div>',{class:'textoAlineadoDerecha'}).append(
                $('<span>',{class:'textoColorGris textoAlineadoDerecha toolTip enLinea',toolTexto:
                'Fecha de Inicio del Contrato'
                ,text:contrato.period&&contrato.period.startDate?ObtenerFecha(contrato.period.startDate):''}).append(
                )
              )
            )
          )
        )
      ),
      $('<div>',{class:'contenedorProceso'}).append(
        $('<div>',{class:'contenedorTablaCaracteristicas'}).append(
          $('<table>',{class:''}).append(
            $('<tbody>',{class:''}).append(
              datos.ocid?$('<tr>',{class:''}).append(
                $('<td>',{class:'tituloTablaCaracteristicas',text:'ID Proceso (OCID):',toolTexto:'ocid'}).append(),
                $('<td>',{class:'contenidoTablaCaracteristicas'}).append(
                  $('<a>',{class:'enlaceTablaGeneral',text:datos.ocid,href:'/proceso/'+datos.ocid})
                )
              ):null,
              datos.buyer?$('<tr>',{class:''}).append(
                $('<td>',{class:'tituloTablaCaracteristicas',text:'Comprador:',toolTexto:'buyer.name'}).append(),
                $('<td>',{class:'contenidoTablaCaracteristicas'}).append(
                  ObtenerElementosParte(datos.buyer.id,datos)
                )
              ):null,
              contrato.status?$('<tr>',{class:''}).append(
                $('<td>',{class:'tituloTablaCaracteristicas',text:'Estado:',toolTexto:'contracts[n].status'}),
                $('<td>',{class:'contenidoTablaCaracteristicas'}).append($('<span>',{text: estadosContrato[contrato.status]?estadosContrato[contrato.status].titulo:'',toolTexto:estadosContrato[contrato.status]?estadosContrato[contrato.status].descripcion:''}))
              ):null,
              contrato.suppliers?$('<tr>',{class:''}).append(
                $('<td>',{class:'tituloTablaCaracteristicas',text:'Proveedor:',toolTexto:'contracts[n].suppliers[n].name'}).append(),
                $('<td>',{class:'contenidoTablaCaracteristicas'}).append(
                  ObtenerProveedores(contrato.suppliers,datos)
                )
              ):null,
              contrato.dateSigned?$('<tr>',{class:''}).append(
                $('<td>',{class:'tituloTablaCaracteristicas',text:'Fecha de Firma:',toolTexto:'contracts[n].dateSigned'}),
                $('<td>',{class:'contenidoTablaCaracteristicas'}).append(
                  $('<span>',{toolTexto:'Fecha en que fue firmado el contrato por todas las partes',text:ObtenerFecha(datos.dateSigned)})
                )
              ):null
              
            )
          )
        ),
        contrato.value!=undefined&&contrato.value!=null?
        $('<div>',{class:'contenedorTablaCaracteristicas'}).append(
          $('<table>',{class:'anchoTotal'}).append(
            $('<tbody>',{class:''}).append(
              $('<tr>',{class:''}).append(
                $('<td>',{class:'textoAlineadoDerecha'}).append(
                  $('<div>',{class:'montoTotalProceso'}).append(
                    $('<div>',{class:'contenedorMonto'}).append(
                      $('<div>',{class:'textoColorGris',text:'Monto del Contrato'}),
                      $('<div>',{class:'valorMonto'}).append(
                        ValorMoneda(contrato.value.amount),
                        $('<span>',{class:'textoColorPrimario',text:' '+contrato.value.currency})
                      )
                    )
                  )
                )
              )
            )
          )
        )
        :null
        
      )
    )
  );
}


function AgregarResultadoPago(datos){
  console.dir('resultados de pago')
  console.dir(TotalTransacciones(datos))
  $('#listaResultadosBusqueda').append(

    $('<div>',{class:'resultadoBusquedaProceso  transicion cajonSombreado anchoTotal'}).append(
      $('<div>',{class:'p-1'}).append(
        $('<div>',{class:'textoTituloResultadoBusqueda'}).append(
          $('<div>',{class:'row'}).append(
            $('<div>',{class:'col-12 col-sm-8 col-md-8 col-lg-9'}).append(
              $('<a>',{class:'enlaceTablaGeneral',text:datos.planning&&datos.planning.rationale? ReducirTexto(datos.planning.rationale,140):'',href:
              '/proceso/'+datos.ocid
              ,toolTexto:datos.planning&&datos.planning.rationale? datos.planning.rationale:'',
              toolPosicion:'bottom'
              })
            ),
            $('<div>',{class:'col-12 col-sm-4 col-md-4 col-lg-3'}).append(
              $('<div>',{class:'textoAlineadoDerecha'}).append(
                $('<span>',{class:'textoColorGris textoAlineadoDerecha toolTip enLinea',toolTexto:
                'Última Fecha de Pago'
                ,text:ObtenerTransacciones(datos)?ObtenerFecha(ObtenerTransacciones(datos)[ObtenerTransacciones(datos).length-1].date):''}).append(
                )
              )
            )
          )
        )
      ),
      $('<div>',{class:'contenedorProceso'}).append(
        $('<div>',{class:'contenedorTablaCaracteristicas'}).append(
          $('<table>',{class:''}).append(
            $('<tbody>',{class:''}).append(
              datos.ocid?$('<tr>',{class:''}).append(
                $('<td>',{class:'tituloTablaCaracteristicas',text:'ID Proceso (OCID):',toolTexto:'ocid'}).append(),
                $('<td>',{class:'contenidoTablaCaracteristicas'}).append(
                  $('<a>',{class:'enlaceTablaGeneral',text:datos.ocid,href:'/proceso/'+datos.ocid})
                )
              ):null,
              datos.buyer?$('<tr>',{class:''}).append(
                $('<td>',{class:'tituloTablaCaracteristicas',text:'Comprador:',toolTexto:'buyer.name'}).append(),
                $('<td>',{class:'contenidoTablaCaracteristicas'}).append(
                  ObtenerElementosParte(datos.buyer.id,datos)
                )
              ):null,
              TotalContratos(datos)&&TotalContratos(datos).length?$('<tr>',{class:''}).append(
                $('<td>',{class:'tituloTablaCaracteristicas',text:'Comprometido:',toolTexto:'buyer.name'}).append(),
                $('<td>',{class:'contenidoTablaCaracteristicas'}).append(

                  TotalContratos(datos)&&TotalContratos(datos).length?MostrarTotalComprometido(TotalContratos(datos)):$('<span>',{class:'textoColorGris',text:'No Disponible'})
                )
              ):null
              /*datos.status?$('<tr>',{class:''}).append(
                $('<td>',{class:'tituloTablaCaracteristicas',text:'Estado:'}),
                $('<td>',{class:'contenidoTablaCaracteristicas',text:datos.status})
              ):null,*/
              /*contrato.suppliers?$('<tr>',{class:''}).append(
                $('<td>',{class:'tituloTablaCaracteristicas',text:'Proveedor:',toolTexto:'contracts[n].suppliers[n].name'}).append(),
                $('<td>',{class:'contenidoTablaCaracteristicas'}).append(
                  ObtenerProveedores(contrato.suppliers,datos)
                )
              ):null,*/
              /*datos.compromiseAmount?$('<tr>',{class:''}).append(
                $('<td>',{class:'tituloTablaCaracteristicas',text:'Comprometido:'}),
                $('<td>',{class:'contenidoTablaCaracteristicas'}).append(
                  ValorMoneda(datos.compromiseAmount),
                  '&nbsp;',
                  $('<span>',{class:'textoColorPrimario',text:datos.compromiseCurrency})
                )
              ):null*/
              
            )
          )
        ),
        /*(ObtenerTransacciones(datos))*/datos.contracts&&datos.contracts.length&&TotalTransacciones(datos).length?
        $('<div>',{class:'contenedorTablaCaracteristicas'}).append(
          $('<table>',{class:'anchoTotal'}).append(
            $('<tbody>',{class:''}).append(
              $('<tr>',{class:''}).append(
                $('<td>',{class:'textoAlineadoDerecha'}).append(
                  $('<div>',{class:'montoTotalProceso'}).append(
                    $('<div>',{class:'contenedorMonto'}).append(
                      $('<div>',{class:'textoColorGris',text:'Monto Pagado'}),
                      MostrarTotalContratos(TotalTransacciones(datos))
                      /*$('<div>',{class:'valorMonto'}).append(
                        $('<span>').append(
                          ValorMoneda(TotalTransacciones(ObtenerTransacciones(datos)).amount)
                        )
                        ,
                        $('<span>',{class:'textoColorPrimario',text:TotalTransacciones(ObtenerTransacciones(datos)).currency})
                      )*/
                    )
                  )
                )
              )
            )
          )
        )
        :$('<div>',{class:'contenedorTablaCaracteristicas'}).append(
          $('<table>',{class:'anchoTotal'}).append(
            $('<tbody>',{class:''}).append(
              $('<tr>',{class:''}).append(
                $('<td>',{class:'textoAlineadoDerecha'}).append(
                  $('<div>',{class:'montoTotalProceso'}).append(
                    $('<div>',{class:'contenedorMonto'}).append(
                      $('<div>',{class:'textoColorGris',text:'Monto Pagado'}),
                      $('<div>',{class:'valorMonto'}).append(
                        $('<span>',{class:'textoColorGris',text:'No Disponible'}),
                        $('<span>',{class:'textoColorPrimario',text:''})
                      )
                    )
                  )
                )
              )
            )
          )
        )//null
        
      )
    )
  );
}

function ObtenerTransacciones(datos){
  var transacciones=[];
  if(datos.contracts){
  for(var i =0; i<datos.contracts.length;i++){
    if(datos.contracts[i].implementation&&datos.contracts[i].implementation.transactions){
      transacciones=transacciones.concat(datos.contracts[i].implementation.transactions);
    }
  }
  }
  transacciones=transacciones.sort(function(a,b){
    return  new Date(a.date) - new Date(b.date);
  });
  return transacciones;
}

function TotalContratos(datos){
var contratos=[];
var Montos={};
if(datos.contracts){
  for(var i =0; i<datos.contracts.length;i++){
    if(datos.contracts[i].value&&Validar(datos.contracts[i].value.amount)){
      if(!Validar(datos.contracts[i].value.currency)){
        datos.contracts[i].value['currency']=defaultMoneda;
      }
      if(Validar(Montos[datos.contracts[i].value.currency])){
        Montos[datos.contracts[i].value.currency]+=ObtenerNumero(datos.contracts[i].value.amount);
      }else{
        Montos[datos.contracts[i].value.currency]=ObtenerNumero(datos.contracts[i].value.amount);
      }
    }
  }
  $.each(Montos,function(moneda,valor){
    contratos.push(
      {currency:moneda,amount:valor}
    );
  });
  }
  return contratos;
}
function TotalTransacciones(datos){
  var contratos=[];
  var Montos={};
  console.dir('entre a transacciones')
  if(datos.contracts){
    for(var i =0; i<datos.contracts.length;i++){
      if(datos.contracts[i].implementation&&datos.contracts[i].implementation.transactions&&datos.contracts[i].implementation.transactions.length){
        datos.contracts[i].implementation.transactions.forEach(function (transaccion) {
          if(transaccion.value&&Validar(transaccion.value.amount)){
            if(!Validar(datos.contracts[i].value.currency)){
              transaccion.value['currency']=defaultMoneda;
            }
            if(Validar(Montos[transaccion.value.currency])){
              Montos[transaccion.value.currency]+=ObtenerNumero(transaccion.value.amount);
            }else{
              Montos[transaccion.value.currency]=ObtenerNumero(transaccion.value.amount);
            }
          }
          
        });
      }
    }
    $.each(Montos,function(moneda,valor){
      contratos.push(
        {currency:moneda,amount:valor}
      );
    });
    }
    console.dir(contratos)
    return contratos;
  }
function MostrarTotalContratos(datos){
  var elementos=[]
  for(var i=0;i<datos.length;i++){
    elementos.push(
      $('<div>',{class:'valorMonto'}).append(
        ValorMoneda(datos[i].amount),
        $('<span>',{class:'textoColorPrimario',text:' '+datos[i].currency})
      )
    );
  }
  return elementos;
}
function MostrarTotalComprometido(datos){
  var elementos=[]
  for(var i=0;i<datos.length;i++){
    elementos.push(
      $('<div>',{class:''}).append(
        ValorMoneda(datos[i].amount),
        $('<span>',{class:'textoColorPrimario',text:' '+datos[i].currency})
      )
    );
  }
  return elementos;
}
/*
function TotalTransacciones(transacciones){
  var value={amount:0,currency:'HNL'};
  for(var i =0; i < transacciones.length; i++){
    value.amount+=transacciones[i].value&&transacciones[i].value.amount?transacciones[i].value.amount:0;
    value.currency=transacciones[i].value&&transacciones[i].value.currency?transacciones[i].value.currency:'HNL';
  }
  return value;
}*/

function MostrarListaElastica(datos,selector){
  $(selector).html('');
  $.each(datos.filtros,function(llave,valor){
    $(selector).append(
      $('<div class="list-container col-md-12 2">').append(
        $('<div class="panel panel-default ">').append(
          $('<div class="panel-heading">').text(
            filtrosAplicables[llave]?filtrosAplicables[llave].titulo:llave
          ),
          $('<input>',{type:'text', class:'elastic-filter',placeholder:filtrosAplicables[llave]?filtrosAplicables[llave].titulo:llave ,filtro:llave,on:{
            keyup:function(e){
              var texto=$(e.currentTarget).val();
              if (texto.length > 0) {
                texto = texto.toLocaleLowerCase();
                var regla = " ul#" + 'ul'+llave + ' li[formato*="' + texto + '"]{display:block;} ';
                regla += " ul#" + 'ul'+llave + ' li:not([formato*="' + texto + '"]){display:none;}';
                $('#style'+llave).html(regla);
              } else {
                $('#style'+llave).html('');
              }
            }
          }}),
          $('<style>',{id:'style'+llave}),
          $('<ul >',{class:'list-group',id:'ul'+llave}).append(
            AgregarPropiedadesListaElastica(valor,llave)
          )
            
          
        )
      )
    )
    
    
  });
  AgregarToolTips();
  
  
}

function AgregarPropiedadesListaElastica(valor,llave){
  var elementos=[]
  $.each(valor.buckets,function(i,propiedades){
    //resultadosElastic=AsignarValor(resultadosElastic,llave,,propiedades.doc_count);
    elementos.push(
      $('<li >',{
      class:'list-group-item',
      valor:propiedades.key_as_string?propiedades.key_as_string:propiedades.key, 
      formato: (propiedades.key_as_string?propiedades.key_as_string:propiedades.key).toString().toLowerCase(),'llave':llave,
      toolTexto:propiedades.key_as_string?propiedades.key_as_string:(traducciones[propiedades.key]?traducciones[propiedades.key].titulo:propiedades.key),
      on:{
        click:function(e){
          var filtro=$(e.currentTarget);
          if(filtro.hasClass('active')){
            filtro.removeClass('active')
          }else{
            filtro.parent().find('.list-group-item.active').removeClass('active');
            filtro.addClass('active');
          }
          var filtros={
            pagina:1
          };
          $('li.list-group-item.active').each(function(cla,val){
            filtros[filtrosAplicables[$(val).attr('llave')]?filtrosAplicables[$(val).attr('llave')].parametro:'' ]=$(val).attr('valor');
          });
          window.history.pushState({}, document.title,AccederBusqueda(filtros,true) );
          CargarElementosBusqueda(true);
        }
      }}).append(
        $('<div class="badge">').text(propiedades.doc_count),
        $('<div >',{
        class:'elastic-data',
        
        text:propiedades.key_as_string?propiedades.key_as_string:(traducciones[propiedades.key]?traducciones[propiedades.key].titulo:propiedades.key)})
      )
    )
  });
  return elementos;
}

