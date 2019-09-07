

  $(function(){
  
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
    
    $('input.campoAzulBusqueda').on('change',function(evento){
      var elemento=$('input.campoAzulBusqueda');
      var filtros={};
      filtros=ObtenerFiltros();
      filtros[elemento.attr('filtro')]=(elemento.val());
      if(!ValidarCadena(filtros[elemento.attr('filtro')])){
        delete filtros[elemento.attr('filtro')];
      }
      filtros['pagina']=1;
      InputFiltro(filtros,true);
    });
    $('#buscarInformacion').on('click',function(evento){
      var elemento=$('input.campoAzulBusqueda');
      var filtros={};
      filtros=ObtenerFiltros();
      filtros[elemento.attr('filtro')]=(elemento.val());
      if(!ValidarCadena(filtros[elemento.attr('filtro')])){
        delete filtros[elemento.attr('filtro')];
      }
      filtros['pagina']=1;
      InputFiltro(filtros,true);
    });
    AsignarEventosFiltro();
    AsignarOrdenTablaFiltros(OrdenFiltro);
    NumeroResultados();
  });
  function NumeroResultados(){
    $('#paginacionBusqueda').on('change',function(e){
      CantidadResultados($('#paginacionBusqueda').val()?$('#paginacionBusqueda').val():5);
    });
  }

  var filtrosAPropiedades={
    fua: 'fecha_ultimo_proceso',
    identificacion:'id',
    mamc:'mayor_monto_contratado',
    memc:'menor_monto_contratado',
    nombre:'name',
    procesos:'procesos',
    pmc:'promedio_monto_contratado',
    tmc:'total_monto_contratado'
  };


  CargarProveedores();
  window.onpopstate = function(e){
    location.reload();
  }

  function AgregarResultados(datos,selector){
    var resultados=datos.resultados;
    $(selector).html('');
    for(var i=0;i<resultados.length;i++){
      $(selector).append(
        $('<tr>').append(
          $('<td>',{'data-label':'Proveedor'}).append(
            $('<a>',{class:'enlaceTablaGeneral',href:'/proveedor/'+encodeURIComponent(resultados[i].id)}).text(resultados[i].name)
          ),
          $('<td>',{'data-label':'RTN' ,class:'textoAlineadoDerecha'}).text(resultados[i].id),
          $('<td>',{'data-label':'Procesos' ,class:'textoAlineadoCentrado'}).text(ValorNumerico(resultados[i].procesos)),
          $('<td>',{'data-label':'Total de Monto Contratado' ,class:'textoAlineadoDerecha'}).append(ValorMoneda(resultados[i].total_monto_contratado),$('<span>',{class:'textoColorPrimario',text:' HNL'})),
          $('<td>',{'data-label':'Promedio de Monto Contratado' ,class:'textoAlineadoDerecha'}).append(ValorMoneda(resultados[i].promedio_monto_contratado),$('<span>',{class:'textoColorPrimario',text:' HNL'})),
          $('<td>',{'data-label':'Mayor Monto Contratado' ,class:'textoAlineadoDerecha'}).append(ValorMoneda(resultados[i].mayor_monto_contratado),$('<span>',{class:'textoColorPrimario',text:' HNL'})),
          $('<td>',{'data-label':'Menor Monto Contratado' ,class:'textoAlineadoDerecha'}).append(ValorMoneda(resultados[i].menor_monto_contratado),$('<span>',{class:'textoColorPrimario',text:' HNL'})),
          $('<td>',{'data-label':'Fecha de Última Adjudicación' ,class:'textoAlineadoCentrado'}).append(
            $('<span>',{class:resultados[i].fecha_ultimo_proceso?'':'textoColorGris' }).text(
              resultados[i].fecha_ultimo_proceso?ObtenerFecha(resultados[i].fecha_ultimo_proceso,'fecha'):'No Disponible'
            )
            
            )
        )
      )
    }
    if(!resultados.length){
      $(selector).append(
        $('<tr>',{style:''}).append(
          $('<td>',{'data-label':'','colspan':8}).append(
            $('<h4>',{class:'titularColor textoColorPrimario mt-3 mb-3'}).text('No se Encontraron Proveedores')
          )))
    }
  }

function ObtenerFiltros(){
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
  if(Validar(ObtenerValor('orderBy'))){
    parametros['orderBy']=decodeURIComponent(ObtenerValor('orderBy'));
  }
  return parametros;
}

function AccederProveedores(opciones,desUrl){
  var direccion=('/proveedores/?'+

  'pagina='+(opciones.pagina?opciones.pagina:(ObtenerNumero(ObtenerValor('pagina')) ? ObtenerNumero(ObtenerValor('pagina')) : 1))+
  '&paginarPor='+(opciones.paginarPor?opciones.paginarPor:(ObtenerNumero(ObtenerValor('paginarPor')) ? ObtenerNumero(ObtenerValor('paginarPor')) : 5))+

  (ValidarCadena(opciones.nombre)? '&nombre='+encodeURIComponent(opciones.nombre): (ValidarCadena(ObtenerValor('nombre'))&&!desUrl?'&nombre='+ObtenerValor('nombre'):''))+
  (ValidarCadena(opciones.identificacion)? '&identificacion='+encodeURIComponent(opciones.identificacion): (ValidarCadena(ObtenerValor('identificacion'))&&!desUrl?'&identificacion='+ObtenerValor('identificacion'):''))+
  (ValidarCadena(opciones.tmc)? '&tmc='+encodeURIComponent(opciones.tmc): (ValidarCadena(ObtenerValor('tmc'))&&!desUrl?'&tmc='+ObtenerValor('tmc'):''))+
  (ValidarCadena(opciones.pmc)? '&pmc='+encodeURIComponent(opciones.pmc): (ValidarCadena(ObtenerValor('pmc'))&&!desUrl?'&pmc='+ObtenerValor('pmc'):''))+
  (ValidarCadena(opciones.mamc)? '&mamc='+encodeURIComponent(opciones.mamc): (ValidarCadena(ObtenerValor('mamc'))&&!desUrl?'&mamc='+ObtenerValor('mamc'):''))+
  (ValidarCadena(opciones.fua) ? '&fua='+encodeURIComponent(opciones.fua):(ValidarCadena(ObtenerValor('fua'))&&!desUrl?'&fua='+ObtenerValor('fua'):''))+
  (ValidarCadena(opciones.memc) ? '&memc='+encodeURIComponent(opciones.memc):(ValidarCadena(ObtenerValor('memc'))&&!desUrl?'&memc='+ObtenerValor('memc'):''))+
  (ValidarCadena(opciones.orderBy) ? '&orderBy='+encodeURIComponent(opciones.orderBy):(ValidarCadena(ObtenerValor('orderBy'))&&!desUrl?'&orderBy='+ObtenerValor('orderBy'):''))

  );


  
  return direccion;
}
function MostrarPaginacion(datos){
  
  var paginacion=ObtenerPaginacion(datos.paginador.page, datos.paginador.num_pages)
  $('.navegacionTablaGeneral').html('');
  if(datos.paginador.has_previous){
    $('.navegacionTablaGeneral').append(
      $('<a href="javascript:void(0)"  pagina="'+datos.paginador.previous_page_number+'"  class="numerosNavegacionTablaGeneral"><span><i class="fa fa-angle-left"></i></span></a>').on({
        click:function(e){
          Pagina($(e.currentTarget).attr('pagina'))
        }
        
      })
    );
  }
  
  for(var i=0; i<paginacion.length;i++){
    if(paginacion[i]=='...'){
      $('.navegacionTablaGeneral').append(
        $('<a href="javascript:void(0)" class="numerosNavegacionTablaGeneral numeroNormalNavegacionTablaGeneral">').append($('<span>').text(paginacion[i]))
      );
    }else{
      $('.navegacionTablaGeneral').append(
        $('<a href="javascript:void(0)" pagina="'+paginacion[i]+'"  class="numerosNavegacionTablaGeneral '+((paginacion[i]==datos.paginador.page)?'current':'')+'">').on({
          click:function(e){
            Pagina($(e.currentTarget).attr('pagina'))
          }
          
        }).append($('<span>').text(paginacion[i]))
      );
    }
  }
  if(datos.paginador.has_next){
    $('.navegacionTablaGeneral').append(
      $('<a href="javascript:void(0)" pagina="'+datos.paginador.next_page_number+'" class="numerosNavegacionTablaGeneral"><span><i class="fa fa-angle-right"></i></span></a>').on({
        click:function(e){
          Pagina($(e.currentTarget).attr('pagina'))
        }
        
      })
    );
  }

  $('#totalResultado').html(datos.paginador['total.items']);
  $('#inicioResultado').html((ObtenerNumero(datos.parametros.paginarPor)*(ObtenerNumero(datos.parametros.pagina)))-ObtenerNumero(datos.parametros.paginarPor));
  $('#finResultado').html(((ObtenerNumero(datos.parametros.paginarPor)*(ObtenerNumero(datos.parametros.pagina))>ObtenerNumero(datos.paginador['total.items'])) ? ObtenerNumero(datos.paginador['total.items']): (ObtenerNumero(datos.parametros.paginarPor)*(ObtenerNumero(datos.parametros.pagina))) ));
  
  
}

function Pagina(numero){
  PushDireccion(AccederProveedores({pagina:numero}));
}
function CantidadResultados(numero){
  PushDireccion(AccederProveedores({pagina:1,paginarPor:numero}));
}
function PushDireccion(direccion){
  window.history.pushState({}, document.title,direccion);
  CargarProveedores();
}
function InputFiltro(filtros,desUrl){
  PushDireccion(AccederProveedores(filtros,desUrl));
}
function OrdenFiltro(filtro,orden){
  switch(orden){
    case 'ascendente':
        PushDireccion(AccederProveedores({pagina:1,orderBy:'asc('+filtrosAPropiedades[filtro]+')'}));
      break;
    case 'descendente':
        PushDireccion(AccederProveedores({pagina:1,orderBy:'desc('+filtrosAPropiedades[filtro]+')'}));
      break;
    case 'neutro':
        var filtros=ObtenerFiltros();
        if(filtros['orderBy']){
          delete filtros['orderBy'];
        }
        filtros['pagina']=1;
        PushDireccion(AccederProveedores(filtros,true));
      break;
    default:
        var filtros=ObtenerFiltros();
        if(filtros['orderBy']){
          delete filtros['orderBy'];
        }
        filtros['pagina']=1;
        PushDireccion(AccederProveedores(filtros,true));
      break;

  }
}
function CargarProveedores(){
$('#resultadosProveedores').html(
  $('<tr>').append(
    $('<td>',{style:'height:300px;position:relative',colspan:'8',id:'cargando'})
  ));
MostrarEspera('#cargando');
$.get(api+"/proveedores",ObtenerFiltros()).done(function( datos ) {
  console.dir(datos);

  AgregarResultados(datos,'#resultadosProveedores');
  MostrarPaginacion(datos);
  
  
    AgregarToolTips();
    VerificarIntroduccion('INTROJS_PROVEEDORES',1);

  
}).fail(function() {
    /*Error de Conexion al servidor */
    console.dir('error de api');
    AgregarResultados({resultados:[]},'#resultadosProveedores');
    AgregarToolTips();
    VerificarIntroduccion('INTROJS_PROVEEDORES',1);
    
  });
}

function AsignarEventosFiltro(){
  $('.campoFiltrado input[type="text"]').on(
    {'change': function(e){
      var elemento=$(e.currentTarget);
      var elementoPadre=elemento.closest('.campoFiltrado');
      var filtros={};
      filtros=ObtenerFiltros();
      switch(elementoPadre.attr('tipo')){
        case 'fecha':
            filtros[elementoPadre.attr('filtro')]=ValidarCadena(elemento.val())?(elemento.attr('opcion')+elemento.val()):'';
            if(!ValidarCadena(filtros[elementoPadre.attr('filtro')])){
              delete filtros[elementoPadre.attr('filtro')];
            }
            filtros['pagina']=1;
            InputFiltro(filtros,true);
        break;
        case 'numero':
            filtros[elementoPadre.attr('filtro')]=ValidarCadena(elemento.val())?(elemento.attr('opcion')+elemento.val()):'';
            if(!ValidarCadena(filtros[elementoPadre.attr('filtro')])){
              delete filtros[elementoPadre.attr('filtro')];
            }
            filtros['pagina']=1;
            InputFiltro(filtros,true);
        break;
        default:
            filtros[elementoPadre.attr('filtro')]=(elemento.val());
            if(!ValidarCadena(filtros[elementoPadre.attr('filtro')])){
              delete filtros[elementoPadre.attr('filtro')];
            }
            filtros['pagina']=1;
            InputFiltro(filtros,true);
        break;
      }

    }}
  )
}