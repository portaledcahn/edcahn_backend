var filtrosAplicables={
  category:{titulo:'Categoría'},
  coin: {titulo:'Moneda'},
  name: {titulo:'Institución'},
  selection: {titulo:'Método de Selección'},
  year: {titulo:'Año'},
  proveedor: {titulo:'Proveedor'}
};
var listaElastica={};

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

  $('.metodoBusquedaContenedor input[type="radio"]').on('change',function(e){
    if($(e.currentTarget).is(':checked')){
      location.href='/busqueda?q='+$('#campoBusquedaProceso').val()+'&metodo='+$(e.currentTarget).attr('metodo')
    }
  });

$('#botonBusquedaProceso').on('click',function(e){
    window.location.href="/busqueda?q="+$('#botonBusquedaProceso').val()+'&metodo=proceso';
});
$('#campoBusquedaProceso').on('keydown',function(e){
    teclaCodigo=e.keyCode ? e.keyCode : e.which;
    if(teclaCodigo=='13'){
        window.location.href="/busqueda?q="+$('#campoBusquedaProceso').val()+'&metodo=proceso';
    }
});  
  
  
  
  $(function () {
    switch(  ObtenerValor( 'metodo')){
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
    }
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
            },{
              title: "Proveedor",
                attr: "proveedor"
            } ];
      break;
      case 'pago':
          columnas=[
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
            }
            ,{
              title: "Proveedor",
                attr: "proveedor"
            } ];
      break;
      case 'proceso':
          columnas=[
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
      break;
      default:
          columnas=[
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
      break;
    }
    
    listaElastica = new ElasticList({
        el: $("#elastic-list"),
        data: dataElastic,
        hasFilter: true,
        onchange: MostrarFiltros,
        columns: columnas
    });
    AgregarToolTips();
    $('#quitarFiltros').on('click',function(e){
      listaElastica.clean();
    });
  });


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
}



$('<div>',{class:''}).append()
function MostrarResultados(datos){
  $('#listaResultadosBusqueda').html('')
  for(var i=0;i<datos.length;i++){
    AgregarResultado(datos[i]);
  }
}
function AgregarResultado(datos){
  console.dir(datos)
  $('#listaResultadosBusqueda').append(
    $('<div>',{class:'resultadoBusquedaProceso  transicion cajonSombreado'}).append(
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
                $('<td>',{class:'tituloTablaCaracteristicas',text:'ID Proceso (OCID):'}).append(),
                $('<td>',{class:'contenidoTablaCaracteristicas'}).append(
                  $('<a>',{class:'enlaceTablaGeneral',text:datos.ocid,href:'/proceso/'+datos.ocid})
                )
              ):null,
              datos.buyerId?$('<tr>',{class:''}).append(
                $('<td>',{class:'tituloTablaCaracteristicas',text:'Comprador:'}).append(),
                $('<td>',{class:'contenidoTablaCaracteristicas'}).append(
                  $('<a>',{class:'enlaceTablaGeneral',text:datos.buyerName,href:'/comprador/'+datos.buyerId})
                )
              ):null,
              datos.status?$('<tr>',{class:''}).append(
                $('<td>',{class:'tituloTablaCaracteristicas',text:'Estado:'}),
                $('<td>',{class:'contenidoTablaCaracteristicas',text:datos.status})
              ):null,
              datos.supplierId?$('<tr>',{class:''}).append(
                $('<td>',{class:'tituloTablaCaracteristicas',text:'Proveedor:'}).append(),
                $('<td>',{class:'contenidoTablaCaracteristicas'}).append(
                  $('<a>',{class:'enlaceTablaGeneral',text:datos.supplierName,href:'/proveedor/'+datos.supplierId})
                )
              ):null,
              datos.dateSigned?$('<tr>',{class:''}).append(
                $('<td>',{class:'tituloTablaCaracteristicas',text:'Fecha de Firma:'}),
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