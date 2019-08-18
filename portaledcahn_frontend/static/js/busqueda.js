var filtrosAplicables={
  categorias:{titulo:'Categoría'},
  monedas: {titulo:'Moneda'},
  instituciones: {titulo:'Institución'},
  metodos_de_seleccion: {titulo:'Método de Selección'},
  años: {titulo:'Año'},
  proveedor: {titulo:'Proveedor'}
};
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
      location.href=AccederBusqueda({metodo:$(e.currentTarget).attr('metodo')});
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

    
    MostrarResumen(datos)
    MostrarResultados(datos)
    MostrarPaginacion(datos);
    AgregarToolTips();
    if(!cargaFiltro){
      InicializarElastic(datos);
    }
    
    VerificarIntroduccion('INTROJS_BUSQUEDA',1);
  }).fail(function() {
      /*Error de Conexion al servidor */
      console.dir('error conexion')
      
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
function InicializarElastic(datos){
  DebugFecha()
  for(var i=0;i<ObtenerNumero(datos.paginador['total.items']);i++){
    resultadosElastic.push({});
  }
  $.each(datos.filtros,function(llave,valor){
    
    $.each(valor.buckets,function(i,propiedades){
      resultadosElastic=AsignarValor(resultadosElastic,llave,propiedades.key_as_string?propiedades.key_as_string:propiedades.key,propiedades.doc_count);
    });
    
  });
  var columnas=[
    {
      title: "Método de Selección",
        attr: "selection"
    },{
        title: "Categoría",
        attr: "category"
    },
    {
        title: "Institución",
        attr: "name"
    }, {
        title: "Año",
        attr: "year"
    },{
      title: "Moneda",
        attr: "coin"
    } ];
  switch(  ObtenerValor( 'metodo')){
    case 'contrato':
        columnas=[
          {
            title: "Método de Selección",
              attr: "metodos_de_seleccion"
          },{
              title: "Categoría",
              attr: "categorias"
          },
          {
              title: "Institución",
              attr: "instituciones"
          }, {
              title: "Año",
              attr: "años"
          },{
            title: "Moneda",
              attr: "monedas"
          }/* ,{
            title: "Proveedor",
              attr: "proveedor"
          } */];
    break;
    case 'pago':
        columnas=[
          {
            title: "Método de Selección",
              attr: "metodos_de_seleccion"
          },{
              title: "Categoría",
              attr: "categorias"
          },
          {
              title: "Institución",
              attr: "instituciones"
          }, {
              title: "Año",
              attr: "años"
          },{
            title: "Moneda",
              attr: "monedas"
          }/* ,{
            title: "Proveedor",
              attr: "proveedor"
          } */];
    break;
    case 'proceso':
        columnas=[
          {
            title: "Método de Selección",
              attr: "metodos_de_seleccion"
          },{
              title: "Categoría",
              attr: "categorias"
          },
          {
              title: "Institución",
              attr: "instituciones"
          }, {
              title: "Año",
              attr: "años"
          },{
            title: "Moneda",
              attr: "monedas"
          } ];
    break;
    default:
      columnas=[
        {
          title: "Método de Selección",
            attr: "metodos_de_seleccion"
        },{
            title: "Categoría",
            attr: "categorias"
        },
        {
            title: "Institución",
            attr: "instituciones"
        }, {
            title: "Año",
            attr: "años"
        },{
          title: "Moneda",
            attr: "monedas"
        } ];
    break;
  }
  
  listaElastica = new ElasticList({
      el: $("#elastic-list"),
      data: resultadosElastic,
      hasFilter: true,
      onchange: MostrarFiltros,
      columns: columnas
  });
  InicializarElasticFiltros();
  AgregarToolTips();
  $('#quitarFiltros').on('click',function(e){
    listaElastica.clean();
  });
  DebugFecha()
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

    
  });

var quitarFiltro=false;
function MostrarFiltros(filtros){
  $('#listaFiltrosAplicados').html('')
  if(!$.isEmptyObject(filtros)){
    $('#contenedorSinFiltros').hide();
    $('#contenedorFiltros').show();
  }else{
    $('#contenedorFiltros').hide();
    $('#contenedorSinFiltros').show();
    

  }
  $.each(filtros,function(llave,filtro){
    $('#listaFiltrosAplicados').append(
      $('<div>',{class:'grupoEtiquetaFiltro col-md-12 mb-1'}).append(
        $('<div>',{class:'grupoEtiquetaTitulo mr-1',text:filtrosAplicables[llave].titulo +':'}),
        $('<div>',{class:'filtrosAplicados'}).append(
          $('<div>',{class:'etiquetaFiltro','llave':llave,'valor':filtro}).append(
            filtro,
            '&nbsp;',
            $('<i>',{class:'fas fa-times'}).on('click',function(e){
              quitarFiltro=true;
              var filtrosActuales=listaElastica.getFilters();
              delete filtrosActuales[$(e.currentTarget).parent().attr('llave')];
              listaElastica.clean();
              listaElastica.setSelected(filtrosActuales);
              MostrarFiltros(filtrosActuales);
            
              $(e.currentTarget).parent().remove();
            })
          )
        )
      )
    )
  });

/*
  años: "desconocido"
categorias: "desconocido"
instituciones: "centro de la cultura garinagu de honduras"
metodos_de_seleccion: "desconocido"
monedas: "hnl"
*/
var parametros={
  pagina:1
};
if(Validar(filtros['años'])){
  parametros['year']=filtros['años'];
}
if(Validar(filtros['categorias'])){
  parametros['categoria']=encodeURIComponent(filtros['categorias']);
}
if(Validar(filtros['instituciones'])){
  parametros['institucion']=encodeURIComponent(filtros['instituciones']);
}
if(Validar(filtros['metodos_de_seleccion'])){
  parametros['metodo_seleccion']=encodeURIComponent(filtros['metodos_de_seleccion']);
}
if(Validar(filtros['monedas'])){
  parametros['moneda']=filtros['monedas'];
}
if($.isEmptyObject(filtros)&&quitarFiltro){
  quitarFiltro=false;
}else{
  window.history.pushState({}, document.title,AccederBusqueda(parametros,true) );
  CargarElementosBusqueda(true);
}
 console.dir(AccederBusqueda(parametros,true))
 //location.href=AccederBusqueda(parametros,true);
/*
categoria: null
institucion: null
metodo: "pago"
metodo_seleccion: null
moneda: null
pagina: 367
term: ""
year: null*/
  console.dir(filtros)
}

function InicializarElasticFiltros(){
  
  var parametros={
  };
  
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
  listaElastica.setSelected(parametros);

  if(!$.isEmptyObject(parametros)){
    $('#contenedorSinFiltros').hide();
    $('#contenedorFiltros').show();
  }else{
    $('#contenedorFiltros').hide();
    $('#contenedorSinFiltros').show();
  }
  $.each(parametros,function(llave,filtro){
    $('#listaFiltrosAplicados').append(
      $('<div>',{class:'grupoEtiquetaFiltro col-md-12 mb-1'}).append(
        $('<div>',{class:'grupoEtiquetaTitulo mr-1',text:filtrosAplicables[llave].titulo +':'}),
        $('<div>',{class:'filtrosAplicados'}).append(
          $('<div>',{class:'etiquetaFiltro','llave':llave,'valor':filtro}).append(
            filtro,
            '&nbsp;',
            $('<i>',{class:'fas fa-times'}).on('click',function(e){
              
              var filtros=listaElastica.getFilters();
              delete filtros[$(e.currentTarget).parent().attr('llave')];
              //listaElastica.clean();
              //listaElastica.setSelected(filtrosActuales);
              //MostrarFiltros(filtrosActuales);
              var parametros={
                pagina:1
              };
              if(Validar(filtros['años'])){
                parametros['year']=filtros['años'];
              }
              if(Validar(filtros['categorias'])){
                parametros['categoria']=encodeURIComponent(filtros['categorias']);
              }
              if(Validar(filtros['instituciones'])){
                parametros['institucion']=encodeURIComponent(filtros['instituciones']);
              }
              if(Validar(filtros['metodos_de_seleccion'])){
                parametros['metodo_seleccion']=encodeURIComponent(filtros['metodos_de_seleccion']);
              }
              if(Validar(filtros['monedas'])){
                parametros['moneda']=filtros['monedas'];
              }
              
          
              $(e.currentTarget).parent().remove();
              location.href=AccederBusqueda(parametros,true);
            })
          )
        )
      )
    )
  });
}



/*
function MostrarResultados(datos){
  console.dir('mostrar resultados')
  $('#listaResultadosBusqueda').html('')
  for(var i=0;i<datos.length;i++){
    AgregarResultado(datos[i]);
  }
}*/
function AgregarResultado(datos){
  $('#listaResultadosBusqueda').append(
    $('<div>',{class:'resultadoBusquedaProceso  transicion cajonSombreado anchoTotal'}).append(
      $('<div>',{class:'p-1'}).append(
        $('<div>',{class:'textoTituloResultadoBusqueda'}).append(
          $('<div>',{class:'row'}).append(
            $('<div>',{class:'col-12 col-sm-8 col-md-8 col-lg-9'}).append(
              $('<a>',{class:'enlaceTablaGeneral',text:ReducirTexto(datos.title,140),href:
              datos.type=='contrato'?('/proceso/'+datos.ocid+'?contrato='+datos.contractId):datos.type=='proceso'?('/proceso/'+datos.ocid):datos.type=='pago'?('/proceso/'+datos.ocid+'?contrato='+datos.contractId):''
              }).append()
            ),
            $('<div>',{class:'col-12 col-sm-4 col-md-4 col-lg-3'}).append(
              $('<div>',{class:'textoAlineadoDerecha'}).append(
                $('<span>',{class:'textoColorGris textoAlineadoDerecha toolTip enLinea',toolTexto:
                datos.type=='contrato'?('Fecha de Inicio del Contrato'):datos.type=='proceso'?('Fecha de Recepción de Ofertas'):datos.type=='pago'?('Última Fecha de Pago'):''
                ,text:datos.date}).append(
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
              datos.buyerId?$('<tr>',{class:''}).append(
                $('<td>',{class:'tituloTablaCaracteristicas',text:'Comprador:',toolTexto:'buyer.name'}).append(),
                $('<td>',{class:'contenidoTablaCaracteristicas'}).append(
                  $('<a>',{class:'enlaceTablaGeneral',text:datos.buyerName,href:'/comprador/'+datos.buyerId})
                )
              ):null,
              datos.status?$('<tr>',{class:''}).append(
                $('<td>',{class:'tituloTablaCaracteristicas',text:'Estado:'}),
                $('<td>',{class:'contenidoTablaCaracteristicas',text:datos.status})
              ):null,
              datos.supplierId?$('<tr>',{class:''}).append(
                $('<td>',{class:'tituloTablaCaracteristicas',text:'Proveedor:',toolTexto:'contracts[n].suppliers[n].name'}).append(),
                $('<td>',{class:'contenidoTablaCaracteristicas'}).append(
                  $('<a>',{class:'enlaceTablaGeneral',text:datos.supplierName,href:'/proveedor/'+datos.supplierId})
                )
              ):null,
              datos.dateSigned?$('<tr>',{class:''}).append(
                $('<td>',{class:'tituloTablaCaracteristicas',text:'Fecha de Firma:',toolTexto:'contracts[n].dateSigned'}),
                $('<td>',{class:'contenidoTablaCaracteristicas'}).append(
                  $('<span>',{toolTexto:'Fecha en que fue firmado el contrato por todas las partes',text:ObtenerFecha(datos.dateSigned)})
                )
              ):null
              ,
              datos.compromiseAmount?$('<tr>',{class:''}).append(
                $('<td>',{class:'tituloTablaCaracteristicas',text:'Comprometido:'}),
                $('<td>',{class:'contenidoTablaCaracteristicas'}).append(
                  ValorMoneda(datos.compromiseAmount),
                  '&nbsp;',
                  $('<span>',{class:'textoColorPrimario',text:datos.compromiseCurrency})
                )
              ):null
              
            )
          )
        ),
        datos.valueAmount!=undefined&&datos.valueAmount!=null?
        $('<div>',{class:'contenedorTablaCaracteristicas'}).append(
          $('<table>',{class:'anchoTotal'}).append(
            $('<tbody>',{class:''}).append(
              $('<tr>',{class:''}).append(
                $('<td>',{class:'textoAlineadoDerecha'}).append(
                  $('<div>',{class:'montoTotalProceso'}).append(
                    $('<div>',{class:'contenedorMonto'}).append(
                      $('<div>',{class:'textoColorGris',text:datos.type=='contrato'?'Monto del Contrato':datos.type=='proceso'?'Monto Estimado':datos.type=='pago'?'Monto Pagado':''}),
                      $('<div>',{class:'valorMonto'}).append(
                        ValorMoneda(datos.valueAmount),
                        $('<span>',{class:'textoColorPrimario',text:datos.valueCurrency})
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

var arregloProcesos=[
  {
    title:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    type:'proceso',
    ocid:'ocdi-1949-466226-1212',
    date:'2018-08-08',
    status:'Adjudicado',
    buyerId:'m3l2n43lb',
    buyerName:'Secretaria de XYZ',
    valueAmount:'541541',
    valueCurrency:'HNL'
  },
  {
    title:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    type:'proceso',
    ocid:'ocdi-1949-466226-1212',
    date:'2018-08-08',
    status:'Adjudicado',
    buyerId:'m3l2n43lb',
    buyerName:'Secretaria de XYZ',
    valueAmount:'541541',
    valueCurrency:'HNL'
  },
  {
    title:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    type:'proceso',
    ocid:'ocdi-1949-466226-1212',
    date:'2018-08-08',
    status:'Adjudicado',
    buyerId:'m3l2n43lb',
    buyerName:'Secretaria de XYZ',
    valueAmount:'541541',
    valueCurrency:'HNL'
  }
]
var arregloPagos=[
  {
    title:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    type:'pago',
    ocid:'ocdi-1949-466226-1212',
    date:'2018-08-08',
    dateSigned:'2019-08-08',
    contractId:'C-2018-963-6',
    status:'XYZ',
    buyerId:'m3l2n43lb',
    buyerName:'Secretaria de XYZ',
    supplierId:'F323jd',
    supplierName:'Sistemas SA',
    valueAmount:'541541',
    valueCurrency:'HNL',
    compromiseAmount:'61671',
    compromiseCurrency:'HNL'
  },
  {
    title:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    type:'pago',
    ocid:'ocdi-1949-466226-1212',
    date:'2018-08-08',
    dateSigned:'2019-08-08',
    contractId:'C-2018-963-6',
    status:'XYZ',
    buyerId:'m3l2n43lb',
    buyerName:'Secretaria de XYZ',
    supplierId:'F323jd',
    supplierName:'Sistemas SA',
    valueAmount:'541541',
    valueCurrency:'HNL',
    compromiseAmount:'61671',
    compromiseCurrency:'HNL'
  },
  {
    title:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    type:'pago',
    ocid:'ocdi-1949-466226-1212',
    date:'2018-08-08',
    dateSigned:'2019-08-08',
    contractId:'C-2018-963-6',
    status:'XYZ',
    buyerId:'m3l2n43lb',
    buyerName:'Secretaria de XYZ',
    supplierId:'F323jd',
    supplierName:'Sistemas SA',
    valueAmount:'541541',
    valueCurrency:'HNL',
    compromiseAmount:'61671',
    compromiseCurrency:'HNL'
  }
]

var arregloContratos=[
  {
    title:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    type:'contrato',
    ocid:'ocdi-1949-466226-1212',
    date:'2018-08-08',
    dateSigned:'2019-08-08',
    contractId:'C-2018-963-6',
    status:'Firmado',
    buyerId:'m3l2n43lb',
    buyerName:'Secretaria de XYZ',
    supplierId:'F323jd',
    supplierName:'Sistemas SA',
    valueAmount:'541541',
    valueCurrency:'HNL',
    compromiseAmount:'61671',
    compromiseCurrency:'HNL'
  },
  {
    title:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    type:'contrato',
    ocid:'ocdi-1949-466226-1212',
    date:'2018-08-08',
    dateSigned:'2019-08-08',
    contractId:'C-2018-963-6',
    status:'Firmado',
    buyerId:'m3l2n43lb',
    buyerName:'Secretaria de XYZ',
    supplierId:'F323jd',
    supplierName:'Sistemas SA',
    valueAmount:'541541',
    valueCurrency:'HNL',
    compromiseAmount:'61671',
    compromiseCurrency:'HNL'
  },
  {
    title:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    type:'contrato',
    ocid:'ocdi-1949-466226-1212',
    date:'2018-08-08',
    dateSigned:'2019-08-08',
    contractId:'C-2018-963-6',
    status:'Firmado',
    buyerId:'m3l2n43lb',
    buyerName:'Secretaria de XYZ',
    supplierId:'F323jd',
    supplierName:'Sistemas SA',
    valueAmount:'541541',
    valueCurrency:'HNL',
    compromiseAmount:'61671',
    compromiseCurrency:'HNL'
  }
]

function AgregarResultadoProceso(datos){
  $('#listaResultadosBusqueda').append(
    $('<div>',{class:'resultadoBusquedaProceso  transicion cajonSombreado anchoTotal'}).append(
      $('<div>',{class:'p-1'}).append(
        $('<div>',{class:'textoTituloResultadoBusqueda'}).append(
          $('<div>',{class:'row'}).append(
            $('<div>',{class:'col-12 col-sm-8 col-md-8 col-lg-9'}).append(
              $('<a>',{class:'enlaceTablaGeneral',text:ReducirTexto(datos.tender&&datos.tender.description?datos.tender.description:datos.tender&&datos.tender.title?datos.tender.title:'',140),href:
              ('/proceso/'+datos.ocid)
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
        datos.planning&&datos.planning.budget&&datos.planning.budget.amount?
        $('<div>',{class:'contenedorTablaCaracteristicas'}).append(
          $('<table>',{class:'anchoTotal'}).append(
            $('<tbody>',{class:''}).append(
              $('<tr>',{class:''}).append(
                $('<td>',{class:'textoAlineadoDerecha'}).append(
                  $('<div>',{class:'montoTotalProceso'}).append(
                    $('<div>',{class:'contenedorMonto'}).append(
                      $('<div>',{class:'textoColorGris',text:'Monto Estimado'}),
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
        :datos.tender&&datos.tender.value&&datos.tender.value.amount?
        $('<div>',{class:'contenedorTablaCaracteristicas'}).append(
          $('<table>',{class:'anchoTotal'}).append(
            $('<tbody>',{class:''}).append(
              $('<tr>',{class:''}).append(
                $('<td>',{class:'textoAlineadoDerecha'}).append(
                  $('<div>',{class:'montoTotalProceso'}).append(
                    $('<div>',{class:'contenedorMonto'}).append(
                      $('<div>',{class:'textoColorGris',text:'Monto Estimado'}),
                      $('<div>',{class:'valorMonto'}).append(
                        ValorMoneda(datos.tender.value.amount),
                        $('<span>',{class:'textoColorPrimario',text:datos.tender.value.currency})
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
  $('#listaResultadosBusqueda').append(
    $('<div>',{class:'resultadoBusquedaProceso  transicion cajonSombreado anchoTotal'}).append(
      $('<div>',{class:'p-1'}).append(
        $('<div>',{class:'textoTituloResultadoBusqueda'}).append(
          $('<div>',{class:'row'}).append(
            $('<div>',{class:'col-12 col-sm-8 col-md-8 col-lg-9'}).append(
              $('<a>',{class:'enlaceTablaGeneral',text: contrato.description?ReducirTexto(contrato.description,140):ReducirTexto(contrato.title,140),href:
                '/proceso/'+datos.ocid+'?contrato='+contrato.id
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
                $('<td>',{class:'contenidoTablaCaracteristicas'}).append($('<span>',{text: estadosContrato[contrato.status].titulo,toolTexto:estadosContrato[contrato.status].descripcion}))
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
                        $('<span>',{class:'textoColorPrimario',text:contrato.value.currency})
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
  $('#listaResultadosBusqueda').append(
    $('<div>',{class:'resultadoBusquedaProceso  transicion cajonSombreado anchoTotal'}).append(
      $('<div>',{class:'p-1'}).append(
        $('<div>',{class:'textoTituloResultadoBusqueda'}).append(
          $('<div>',{class:'row'}).append(
            $('<div>',{class:'col-12 col-sm-8 col-md-8 col-lg-9'}).append(
              $('<a>',{class:'enlaceTablaGeneral',text:datos.planning&&datos.planning.rationale? ReducirTexto(datos.planning.rationale,140):'',href:
              '/proceso/'+datos.ocid
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
        (ObtenerTransacciones(datos))?
        $('<div>',{class:'contenedorTablaCaracteristicas'}).append(
          $('<table>',{class:'anchoTotal'}).append(
            $('<tbody>',{class:''}).append(
              $('<tr>',{class:''}).append(
                $('<td>',{class:'textoAlineadoDerecha'}).append(
                  $('<div>',{class:'montoTotalProceso'}).append(
                    $('<div>',{class:'contenedorMonto'}).append(
                      $('<div>',{class:'textoColorGris',text:'Monto Pagado'}),
                      $('<div>',{class:'valorMonto'}).append(
                        $('<span>').append(
                          ValorMoneda(TotalTransacciones(ObtenerTransacciones(datos)).amount)
                        )
                        ,
                        $('<span>',{class:'textoColorPrimario',text:TotalTransacciones(ObtenerTransacciones(datos)).currency})
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
function TotalTransacciones(transacciones){
  var value={amount:0,currency:'HNL'};
  for(var i =0; i < transacciones.length; i++){
    value.amount+=transacciones[i].value&&transacciones[i].value.amount?transacciones[i].value.amount:0;
    value.currency=transacciones[i].value&&transacciones[i].value.currency?transacciones[i].value.currency:'HNL';
  }
  return value;
}