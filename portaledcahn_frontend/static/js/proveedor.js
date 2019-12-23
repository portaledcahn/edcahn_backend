var proveedorId='';
var datosProveedor={};
var filtrosAPropiedades={
  "proveedorCon" : 'proveedor',
  "tituloCon" :"titulo" ,
  "tituloLicitacionCon" :"tituloLicitacion" ,
  "compradorCon":"compradorCon",
  "tituloLicitacionCon" : "tituloLicitacion",
  "descripcionCon" : "descripcion",
  "categoriaCompraCon" : "categoriaCompra" ,
  "estadoCon" :"estado",
  "fechaFirmaCon" : "fechaFirma" ,
  "fechaInicioCon" :"fechaInicio",
  "montoCon" :"monto" ,
  "dependencias" :"dependencias",
  
  
  "compradorPag" : "comprador" ,
  "proveedorPag" :"proveedor" ,
  "tituloPag" : "titulo",
  "estadoPag" : "estado",
  "fechaPag" : "fecha",
  "montoPag" :  "monto",
  "pagosPag" : "pagos",

  "compradorPro" : "comprador",
  "ocidPro" : "ocid",
  "tituloPro" :"titulo",
  "categoriaCompraPro" : "categoriaCompra",
  "estadoPro" : "estado",
  "clasificacionPro":"clasificacion",
  "cantidadContratosPro":"cantidadContratos",
  "montoPro":"monto",
  "cantidadContratosPro":"cantidadContratos",
  "montoContratadoPro" : "montoContratado",
  "fechaInicioPro" : "fechaInicio",
  "fechaRecepcionPro" : "fechaRecepcion",
  "fechaPublicacionPro" : "fechaPublicacion"
};
$(function(){
    proveedorId= decodeURIComponent($('#proveedorId').val());
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
   // AnadirSubtabla();
    AgregarToolTips();
    ObtenerProveedor();
    
     var elementosNumericos=[];
     for(let i=0;i<$('.elementoNumerico').length;i++){
      var configuracionNumerica={ 
        decimalCharacter:'.',
        decimalPlaces:$($('.elementoNumerico')[i]).attr('decimal')=="true"?2:0,
        digitalGroupSpacing:3,
        digitGroupSeparator:','
        }
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
    $('#cajonPagos input.campoAzulBusqueda').on('change',function(evento){
      var elemento=$('#cajonPagos input.campoAzulBusqueda');
      var filtros={};
      filtros=ObtenerFiltrosPagos();
      filtros[elemento.attr('filtro')]=(elemento.val());
      if(!ValidarCadena(filtros[elemento.attr('filtro')])){
        delete filtros[elemento.attr('filtro')];
      }
      filtros['paginaPag']=1;
      InputFiltroPagos(filtros,true);
    });
    $('#cajonProductos input.campoAzulBusqueda').on('change',function(evento){
      var elemento=$('#cajonProductos input.campoAzulBusqueda');
      var filtros={};
      filtros=ObtenerFiltrosProductos();
      filtros[elemento.attr('filtro')]=(elemento.val());
      if(!ValidarCadena(filtros[elemento.attr('filtro')])){
        delete filtros[elemento.attr('filtro')];
      }
      filtros['paginaPro']=1;
      InputFiltroProductos(filtros,true);
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
    $('#buscarInformacionPagos').on('click',function(evento){
      var elemento=$('#cajonPagos input.campoAzulBusqueda');
      var filtros={};
      filtros=ObtenerFiltrosPagos();
      filtros[elemento.attr('filtro')]=(elemento.val());
      if(!ValidarCadena(filtros[elemento.attr('filtro')])){
        delete filtros[elemento.attr('filtro')];
      }
      filtros['paginaPag']=1;
      InputFiltroPagos(filtros,true);
    });
    $('#buscarInformacionProductos').on('click',function(evento){
      var elemento=$('#cajonProductos input.campoAzulBusqueda');
      var filtros={};
      filtros=ObtenerFiltrosProductos();
      filtros[elemento.attr('filtro')]=(elemento.val());
      if(!ValidarCadena(filtros[elemento.attr('filtro')])){
        delete filtros[elemento.attr('filtro')];
      }
      filtros['paginaPro']=1;
      InputFiltroProductos(filtros,true);
    });
    AsignarEventosFiltro('#cajonContratos','Con',ObtenerFiltrosContratos,InputFiltroContratos);
    AsignarEventosFiltro('#cajonPagos','Pag',ObtenerFiltrosPagos,InputFiltroPagos);
    AsignarEventosFiltro('#cajonProductos','Pro',ObtenerFiltrosProductos,InputFiltroProductos);
    AsignarOrdenTablaFiltros(OrdenFiltroContratos,'#cajonContratos .ordenEncabezado');
    AsignarOrdenTablaFiltros(OrdenFiltroPagos,'#cajonPagos .ordenEncabezado');
    AsignarOrdenTablaFiltros(OrdenFiltroProductos,'#cajonProductos .ordenEncabezado');
    $('#paginacionBusquedaContrato').on('change',function(e){
      CantidadResultadosContrato($('#paginacionBusquedaContrato').val()?$('#paginacionBusquedaContrato').val():5);
    });
    $('#paginacionBusquedaPago').on('change',function(e){
      CantidadResultadosPago($('#paginacionBusquedaPago').val()?$('#paginacionBusquedaPago').val():5);
    });
    $('#paginacionBusquedaProducto').on('change',function(e){
      CantidadResultadosProducto($('#paginacionBusquedaProducto').val()?$('#paginacionBusquedaProducto').val():5);
    });
    //paginacionBusquedaContrato
});

function CantidadResultadosContrato(numero){
  PushDireccionContratos(AccederUrlPagina({paginaCon:1,paginarPorCon:numero}));
}
function CantidadResultadosPago(numero){
  PushDireccionPagos(AccederUrlPagina({paginaPag:1,paginarPorPag:numero}));
}
function CantidadResultadosProducto(numero){
  PushDireccionProductos(AccederUrlPagina({paginaPro:1,paginarPorPro:numero}));
}
function AsignarEventosFiltro(selector,sufijo,funcionFiltros,funcionInput){
  $(selector+' .campoFiltrado input[type="text"]').on(
    {'change': function(e){
      var elemento=$(e.currentTarget);
      var elementoPadre=elemento.closest('.campoFiltrado');
      var filtros={};
      filtros=funcionFiltros();
      switch(elementoPadre.attr('tipo')){
        case 'fecha':
            filtros[elementoPadre.attr('filtro')]=ValidarCadena(elemento.val())?(elemento.attr('opcion')+elemento.val()):'';
            if(!ValidarCadena(filtros[elementoPadre.attr('filtro')])){
              delete filtros[elementoPadre.attr('filtro')];
            }
            filtros['pagina'+sufijo]=1;
            funcionInput(filtros,true);
        break;
        case 'numero':
            filtros[elementoPadre.attr('filtro')]=ValidarCadena(elemento.val())?(elemento.attr('opcion')+elemento.val()):'';
            if(!ValidarCadena(filtros[elementoPadre.attr('filtro')])){
              delete filtros[elementoPadre.attr('filtro')];
            }
            filtros['pagina'+sufijo]=1;
            funcionInput(filtros,true);
        break;
        default:
            filtros[elementoPadre.attr('filtro')]=(elemento.val());
            if(!ValidarCadena(filtros[elementoPadre.attr('filtro')])){
              delete filtros[elementoPadre.attr('filtro')];
            }
            filtros['pagina'+sufijo]=1;
            funcionInput(filtros,true);
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
            CargarPagosProveedor();
            CargarProductosProveedor();
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


            $('<div>',{class:'col-md-6'}).append(
              $('<h4>',{class:'text-primary-edcax titularCajonSombreado '}).text(
                'Información del Proveedor'
            ),
                $('<div>',{class:'cajonSombreadox contenedorDetalleProcesoDatos','data-step':"1",'data-intro':"Puedes visualizar la dirección de un proveedor en esta sección, en caso de que este disponible."}).append(
                    $('<div>',{class:'contenedorProceso informacionProceso'}).append(

                        (datosProveedor.id?
                            $('<div>',{class:'contenedorTablaCaracteristicas',style:'width:100%'}).append(
                                $('<table>').append(
                                  $('<tbody>').append(
                                    $('<tr>').append(
                                        $('<td>',{class:'tituloTablaCaracteristicas',toolTexto:"parties[n].id"}).text('Identificador:'),
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
            ),(datosProveedor.contactPoint&&(datosProveedor.contactPoint.name||datosProveedor.contactPoint.telephone||datosProveedor.contactPoint.faxNumber||datosProveedor.contactPoint.email))?$('<div>',{class:'col-md-6'}).append(
              
              $('<h4>',{class:'text-primary-edcax titularCajonSombreado '}).text(
                'Datos de Contacto'
            )
            ,
                $('<div>',{class:'cajonSombreadox contenedorDetalleProcesoDatos','data-step':"2",'data-intro':"Puedes visualizar los datos de contacto de un proveedor en esta sección, en caso de que este disponible."}).append(
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
            
        ):null
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
    EliminarEventoModalDescarga('descargaJsonProveedorContratos');
    EliminarEventoModalDescarga('descargaCsvProveedorContratos');
    EliminarEventoModalDescarga('descargaXlsxProveedorContratos');
    $.get(api+"/proveedores/"+encodeURIComponent(proveedorId)+'/contratos',parametros).done(function( datos ) {
      console.dir('Contratos')
      console.dir(datos);
    
      AgregarResultadosContratosProveedor(datos,'#resultadosContratosProveedor');
      MostrarPaginacion(datos,'.ContratosProveedor',
        function(e){
          PaginaContratosProveedor($(e.currentTarget).attr('pagina'))
        });
      
      
        AgregarToolTips();

        ObtenerDescargaProveedorContratos(datos);
    
      
    }).fail(function() {
        /*Error de Conexion al servidor */
        console.dir('error de api');
        AgregarResultadosContratosProveedor({resultados:[]},'#resultadosContratosProveedor');
        AgregarToolTips();
        //VerificarIntroduccion('INTROJS_PROVEEDOR',1);
        
      });
    }
    function CargarPagosProveedor(){
      $('#resultadosPagosProveedor').html(
        $('<tr>').append(
          $('<td>',{style:'height:300px;position:relative',colspan:'5',id:'cargandoPagos'})
        ));
      MostrarEspera('#cargandoPagos');
      var parametros=ObtenerFiltrosPagos();
      EliminarEventoModalDescarga('descargaJsonProveedorPagos');
      EliminarEventoModalDescarga('descargaCsvProveedorPagos');
      EliminarEventoModalDescarga('descargaXlsxProveedorPagos');
      $.get(api+"/proveedores/"+encodeURIComponent(proveedorId)+'/pagos',parametros).done(function( datos ) {
        console.dir('Pagos')
        console.dir(datos);
      
       // AgregarResultadosPagosProveedor(datos,'#resultadosPagosProveedor');
       AgregarResultadosPagosProveedor(datos,'#resultadosPagosProveedor')
        MostrarPaginacion(datos,'.PagosProveedor',
        function(e){
          PaginaPagosProveedor($(e.currentTarget).attr('pagina'))
        });
        
        
          AgregarToolTips();
  
          
          ObtenerDescargaProveedorPagos(datos);
        
      }).fail(function() {
          /*Error de Conexion al servidor */
          console.dir('error de api');
          AgregarResultadosPagosProveedor({ resultados: [] },'#resultadosPagosProveedor')
          AgregarToolTips();
          //VerificarIntroduccion('INTROJS_PROVEEDOR',1);
          
        });
      }
      function CargarProductosProveedor(){
        $('#resultadosProductosProveedor').html(
          $('<tr>').append(
            $('<td>',{style:'height:300px;position:relative',colspan:'3',id:'cargandoProductos'})
          ));
        MostrarEspera('#cargandoProductos');
        var parametros=ObtenerFiltrosProductos();
        EliminarEventoModalDescarga('descargaJsonProveedorProductos');
    EliminarEventoModalDescarga('descargaCsvProveedorProductos');
    EliminarEventoModalDescarga('descargaXlsxProveedorProductos');
        $.get(api+"/proveedores/"+encodeURIComponent(proveedorId)+'/productos',parametros).done(function( datos ) {
          console.dir('Productos')
          console.dir(datos);
        
         AgregarResultadosProductosProveedor(datos,'#resultadosProductosProveedor')
          MostrarPaginacion(datos,'.ProductosProveedor',
          function(e){
            PaginaProductosProveedor($(e.currentTarget).attr('pagina'))
          });
          
          
            AgregarToolTips();
            ObtenerDescargaProveedorProductos(datos);
    
            
        
          
        }).fail(function() {
            /*Error de Conexion al servidor */
            console.dir('error de api');
            AgregarResultadosProductosProveedor({ resultados: [] },'#resultadosProductosProveedor')
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
            resultados[i]&&resultados[i]._source&&resultados[i]._source.extra&&resultados[i]._source.extra.buyerFullName?$('<a>',{class:'enlaceTablaGeneral',href:'/comprador/'+encodeURIComponent(resultados[i]._source.extra.buyerFullName)}).text(resultados[i]._source.extra.buyerFullName):''
          ),
          $('<td>',{'data-label':'Título de Contrato',class:'textoAlineadoIzquierda'}).append(
            resultados[i]&&resultados[i]._source&&resultados[i]._source.title?$('<a>',{class:'enlaceTablaGeneral',href:'/proceso/'+encodeURIComponent(resultados[i]._source.extra.ocid)+'/?contrato='+resultados[i]._source.id, toolTexto:resultados[i]._source.title}).text( ReducirTexto(resultados[i]._source.title,80)) :''
          ),
          $('<td>',{'data-label':'Descripción' ,class:'textoAlineadoIzquierda'}).append(
            $('<span>',{text: ReducirTexto(resultados[i]&&resultados[i]._source&&resultados[i]._source.description?resultados[i]._source.description:'',80) , toolTexto:resultados[i]&&resultados[i]._source&&resultados[i]._source.description?resultados[i]._source.description:''})
            
          ),
          $('<td>', { 'data-label': 'Nombre del Proceso', class: 'textoAlineadoCentrado' }).append(
            resultados[i] && resultados[i]._source && resultados[i]._source.extra && resultados[i]._source.extra.tenderTitle ? resultados[i]._source.extra.tenderTitle : $('<span>', { class: 'textoColorGris' }).text('No Disponible')
        ),
        $('<td>', { 'data-label': 'Categoría de Compras', class: 'textoAlineadoCentrado' }).append(
            resultados[i] && resultados[i]._source && resultados[i]._source.extra && resultados[i]._source.extra.tenderMainProcurementCategory ? resultados[i]._source.extra.tenderMainProcurementCategory : $('<span>', { class: 'textoColorGris' }).text('No Disponible')
        ),
                $('<td>',{'data-label':'Monto del Contrato' ,class:'textoAlineadoDerecha'}).append(
                resultados[i]&&resultados[i]._source&&resultados[i]._source.value&&Validar(resultados[i]._source.value.amount)?
                [ValorMoneda(resultados[i]._source.value.amount),$('<span>',{class:'textoColorPrimario',text:' '+resultados[i]._source.value.currency})]:''
                
                
                ),
          
          $('<td>',{'data-label':'Fecha de Firma del Contrato' ,class:'textoAlineadoCentrado'}).append(
            /*
            $('<span>',{class:resultados[i]&&resultados[i]._source&&resultados[i]._source.period&&resultados[i]._source.period.startDate&&resultados[i]._source.period.startDate!='NaT'?'':'textoColorGris' }).text(
                resultados[i]&&resultados[i]._source&&resultados[i]._source.period&&resultados[i]._source.period.startDate&&resultados[i]._source.period.startDate!='NaT'?ObtenerFecha(resultados[i]._source.period.startDate,'fecha'):'No Disponible'
            )*/

            $('<span>',{class:resultados[i]&&resultados[i]._source&&resultados[i]._source.dateSigned&&resultados[i]._source.dateSigned!='NaT'?'':'textoColorGris' }).text(
              resultados[i]&&resultados[i]._source&&resultados[i]._source.dateSigned&&resultados[i]._source.dateSigned!='NaT'?ObtenerFecha(resultados[i]._source.dateSigned,'fecha'):'No Disponible'
          )
            
            ),
          $('<td>',{'data-label':'Fecha de Inicio del Contrato' ,class:'textoAlineadoCentrado'}).append(
           /* $('<span>',{class:resultados[i]&&resultados[i]._source&&resultados[i]._source.dateSigned&&resultados[i]._source.dateSigned!='NaT'?'':'textoColorGris' }).text(
                resultados[i]&&resultados[i]._source&&resultados[i]._source.dateSigned&&resultados[i]._source.dateSigned!='NaT'?ObtenerFecha(resultados[i]._source.dateSigned,'fecha'):'No Disponible'
            )*/
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
  function ObtenerFilasSubTablaPagos(datos){
    var elementos = [];
    if (datos && datos.implementation && datos.implementation.transactions && datos.implementation.transactions.length) {
        for (let i = 0; i < datos.implementation.transactions.length; i++) {
            elementos.push(
                $('<tr>').append(
                    $('<td>', { 'data-label': 'Descripción de la Transacción' }).append(
                        
                        ObtenerObligacionesTransaccion(datos.implementation.transactions[i],datos.implementation.financialObligations) && ObtenerObligacionesTransaccion(datos.implementation.transactions[i],datos.implementation.financialObligations).length && ObtenerObligacionesTransaccion(datos.implementation.transactions[i],datos.implementation.financialObligations)[0].description? $('<span>', { text: ReducirTexto(ObtenerObligacionesTransaccion(datos.implementation.transactions[i],datos.implementation.financialObligations)[0].description, 80), toolTexto: ObtenerObligacionesTransaccion(datos.implementation.transactions[i],datos.implementation.financialObligations)[0].description}) : $('<span>', { class: 'textoColorGris' }).text('No Disponible')
                    ),
                    $('<td>', { 'data-label': 'Objeto de Gasto' }).append(
                        datos && datos.extra && datos.extra.objetosGasto && datos.extra.objetosGasto.length ? $('<span>', { text: ReducirTexto(datos.extra.objetosGasto.join(', '), 80), toolTexto: datos.extra.objetosGasto.join(', ')}) : $('<span>', { class: 'textoColorGris' }).text('No Disponible')
                        
                    ),
                    $('<td>', { 'data-label': 'Monto del Pago' }).append(
                        datos.implementation.transactions[i].value && Validar(datos.implementation.transactions[i].value.amount) ? [ValorMoneda(datos.implementation.transactions[i].value.amount), $('<span>', { class: 'textoColorPrimario', text: ' '+(datos.implementation.transactions[i].date.currency?datos.implementation.transactions[i].date.currency:'HNL') })] : ''
                    ),
                    $('<td>', { 'data-label': 'Fecha del Pago' }).append(
                        $('<span>', { class: datos.implementation.transactions[i].date&&datos.implementation.transactions[i].date != 'NaT' ? '' : 'textoColorGris' }).text(
                            datos.implementation.transactions[i].date && datos.implementation.transactions[i].date != 'NaT' ? ObtenerFecha(datos.implementation.transactions[i].date, 'fecha') : 'No Disponible'
                        )
                    )
                )
            );
            
            
        }
    }
    if(!elementos.length){
        elementos.push(
            $('<tr>', { style: '' }).append(
                $('<td>', { 'data-label': '', 'colspan': 4 }).append(
                    $('<h4>', { class: 'titularColor textoColorPrimario mt-3 mb-3' }).text('No hay pagos disponibles')
                )))
    }
    return elementos;
}
function AgregarFilaPago(resultados,selector,i){
  $(selector).append(
    $('<tr>',{
        class:'filaSubTabla transicion',
        toolPosicon:'right-end',
        toolTexto:'<span class="far fa-eye"><span> <span style="font-family:Roboto">Puedes ver los pagos <br> haciendo CLICK en esta fila.<span>',
        on: {
            click: function(e){
                if(!$(e.currentTarget).hasClass('abierta')){
                    $(e.currentTarget).after($('<tr class="subTabla">').append(
                        $('<td colspan="'+$(e.currentTarget).find('td').length+'">').append(
                            $('<div>',{class:'cajonSombreado'}).append(
                                $('<h6>',{class:'textoColorPrimario textoTitulo'}).text('Pagos'),
                                $('<table>',{class:'tablaGeneral'}).append(
                                    $('<thead>').append(
                                        $('<tr>').append(
                                            $('<th>',{toolTexto:"contracts[n].implementation .financialObligations[n].description",text:'Descripción de la transacción'}),
                                            $('<th>',{toolTexto:"planning.budget.budgetBreakdown[n] .classifications.objeto",text:'Objeto de gasto'}),
                                            $('<th>',{toolTexto:"contracts[n].implementation. transactions[n].value.amount",text:'Monto del pago'}),
                                            $('<th>',{toolTexto:"contracts[n].implementation .transactions[n].date",text:'Fecha del pago'})
                                        )
                                    ),
                                    $('<tbody>').append(
                                        ObtenerFilasSubTablaPagos(resultados[i]._source)
                                    )
                                )

                            )
                        )
                        
                    ));
                    $(e.currentTarget).addClass('abierta');
                }else{
                    if($(e.currentTarget).next('.subTabla').length){
                        $(e.currentTarget).next('.subTabla').remove();
                        $(e.currentTarget).removeClass('abierta');
                    }
                    
                }
                AgregarToolTips();
            }
        }
    }).append(
      $('<td>',{'data-label':'Comprador'}).append(
        resultados[i]&&resultados[i]._source&&resultados[i]._source.extra&&resultados[i]._source.extra.buyerFullName?$('<a>',{class:'enlaceTablaGeneral',href:'/comprador/'+encodeURIComponent(resultados[i]._source.extra.buyerFullName)}).text(resultados[i]._source.extra.buyerFullName):''
      ),
      $('<td>',{'data-label':'Título de Contrato',class:'textoAlineadoIzquierda'}).append(
        resultados[i]&&resultados[i]._source&&resultados[i]._source.title?$('<a>',{class:'enlaceTablaGeneral',href:'/proceso/'+encodeURIComponent(resultados[i]._source.extra.ocid)+'/?contrato='+resultados[i]._source.id, toolTexto:resultados[i]._source.title}).text( ReducirTexto(resultados[i]._source.title,80)) :''
      ),
            $('<td>',{'data-label':'Monto del Contrato' ,class:'textoAlineadoDerecha'}).append(
            resultados[i]&&resultados[i]._source&&resultados[i]._source.value&&Validar(resultados[i]._source.value.amount)?
            [ValorMoneda(resultados[i]._source.value.amount),$('<span>',{class:'textoColorPrimario',text:' '+resultados[i]._source.value.currency})]:''
            
            
            ),
            $('<td>',{'data-label':'Suma de Todos los Pagos' ,class:'textoAlineadoDerecha'}).append(
              resultados[i]&&resultados[i]._source&&resultados[i]._source.extra&&Validar(resultados[i]._source.extra.sumTransactions)?
              [ValorMoneda(resultados[i]._source.extra.sumTransactions),$('<span>',{class:'textoColorPrimario',text:' HNL'})]:''
              
              
              ),
      
      $('<td>',{'data-label':'Fecha de Último Pago' ,class:'textoAlineadoCentrado'}).append(
        $('<span>',{class:resultados[i]&&resultados[i]._source&&resultados[i]._source.extra&&resultados[i]._source.extra.transactionLastDate&&resultados[i]._source.extra.transactionLastDate!='NaT'?'':'textoColorGris' }).text(
            resultados[i]&&resultados[i]._source&&resultados[i]._source.extra&&resultados[i]._source.extra.transactionLastDate&&resultados[i]._source.extra.transactionLastDate!='NaT'?ObtenerFecha(resultados[i]._source.extra.transactionLastDate,'fecha'):'No Disponible'
        )
        
        )
        
    )
  );
}
  function AgregarResultadosPagosProveedor(datos,selector){
    var resultados=datos.resultados;
    $(selector).html('');
    for(var i=0;i<resultados.length;i++){
      AgregarFilaPago(resultados,selector,i);
    }
    if(!resultados.length){
      $(selector).append(
        $('<tr>',{style:''}).append(
          $('<td>',{'data-label':'','colspan':5}).append(
            $('<h4>',{class:'titularColor textoColorPrimario mt-3 mb-3'}).text('No se Encontraron Pagos')
          )))
    }
  }

  function AgregarResultadosProductosProveedor(datos,selector){
    var resultados=datos.resultados;
    $(selector).html('');
    for(var i=0;i<resultados.length;i++){
      $(selector).append(
        $('<tr>').append(
          $('<td>',{'data-label':'Clasificación'}).append(
            resultados[i]&&resultados[i].clasificacion?$('<a>').text(resultados[i].clasificacion):''
          ),
          $('<td>',{'data-label':'Cantidad de Contratos',class:'textoAlineadoCentrado'}).append(
            resultados[i]&&Validar(resultados[i].cantidadContratos)?ValorNumerico(resultados[i].cantidadContratos) :''
          ),
                $('<td>',{'data-label':'Monto de Productos Adjudicados' ,class:'textoAlineadoDerecha'}).append(
                resultados[i]&&Validar(resultados[i].monto)?
                [ValorMoneda(resultados[i].monto),$('<span>',{class:'textoColorPrimario',text:' HNL'})]:''
                
                
                )
            
        )
      )
    }
    if(!resultados.length){
      $(selector).append(
        $('<tr>',{style:''}).append(
          $('<td>',{'data-label':'','colspan':3}).append(
            $('<h4>',{class:'titularColor textoColorPrimario mt-3 mb-3'}).text('No se Encontraron Productos')
          )))
    }
  }


  function MostrarPaginacion(datos,selector,funcion){
    var paginarPor=datos.parametros.paginarPor?datos.parametros.paginarPor:datos.parametros.pagianrPor?datos.parametros.pagianrPor:5;
    var pagina=datos.parametros.pagina?datos.parametros.pagina:1
    var paginacion=ObtenerPaginacion(datos.paginador.page, Math.ceil(ObtenerNumero(datos.paginador['total.items'])/ObtenerNumero(paginarPor))/* datos.paginador.num_pages*/)
    $('.navegacionTablaGeneral'+selector).html('');
    if(datos.paginador.has_previous){
      $('.navegacionTablaGeneral'+selector).append(
        $('<a href="javascript:void(0)"  pagina="'+datos.paginador.previous_page_number+'"  class="numerosNavegacionTablaGeneral"><span><i class="fa fa-angle-left"></i></span></a>').on({
          click:funcion
        })
      );
    }
    
    for(var i=0; i<paginacion.length;i++){
      if(paginacion[i]=='...'){
        $('.navegacionTablaGeneral'+selector).append(
          $('<a href="javascript:void(0)" class="numerosNavegacionTablaGeneral numeroNormalNavegacionTablaGeneral">').append($('<span>').text(paginacion[i]))
        );
      }else{
        $('.navegacionTablaGeneral'+selector).append(
          $('<a href="javascript:void(0)" pagina="'+paginacion[i]+'"  class="numerosNavegacionTablaGeneral '+((paginacion[i]==datos.paginador.page)?'current':'')+'">').on({
            click:funcion
            
          }).append($('<span>').text(paginacion[i]))
        );
      }
    }
    if(datos.paginador.has_next){
      $('.navegacionTablaGeneral'+selector).append(
        $('<a href="javascript:void(0)" pagina="'+datos.paginador.next_page_number+'" class="numerosNavegacionTablaGeneral"><span><i class="fa fa-angle-right"></i></span></a>').on({
          click:funcion
          
        })
      );
    }
  
    $('.totalResultado'+selector).html(datos.paginador['total.items']);
    $('.inicioResultado'+selector).html((ObtenerNumero(paginarPor)*(ObtenerNumero(pagina)))-ObtenerNumero(paginarPor));
    $('.finResultado'+selector).html(((ObtenerNumero(paginarPor)*(ObtenerNumero(pagina))>ObtenerNumero(datos.paginador['total.items'])) ? ObtenerNumero(datos.paginador['total.items']): (ObtenerNumero(paginarPor)*(ObtenerNumero(pagina))) ));
    
    
  }
  function PaginaContratosProveedor(numero){
    PushDireccionContratos(AccederUrlPagina({paginaCon:numero}));
  }
  function PaginaPagosProveedor(numero){
    PushDireccionPagos(AccederUrlPagina({paginaPag:numero}));
  }
  function PaginaProductosProveedor(numero){
    PushDireccionProductos(AccederUrlPagina({paginaPro:numero}));
  }

  function PushDireccionContratos(direccion){
    window.history.pushState({}, document.title,direccion);
    CargarContratosProveedor();
  }
  function PushDireccionPagos(direccion){
    window.history.pushState({}, document.title,direccion);
    CargarPagosProveedor();
  }
  function PushDireccionProductos(direccion){
    window.history.pushState({}, document.title,direccion);
    CargarProductosProveedor();
  }
  function InputFiltroContratos(filtros,desUrl){
    PushDireccionContratos(AccederUrlPagina(filtros,desUrl));
  }
  function InputFiltroPagos(filtros,desUrl){
    PushDireccionPagos(AccederUrlPagina(filtros,desUrl));
  }
  function InputFiltroProductos(filtros,desUrl){
    PushDireccionProductos(AccederUrlPagina(filtros,desUrl));
  }

  function AccederUrlPagina(opciones,desUrl){
    var direccion=('/proveedor/'+encodeURIComponent(proveedorId)+'/?'+
  
    'paginaCon='+(opciones.paginaCon?opciones.paginaCon:(ObtenerNumero(ObtenerValor('paginaCon')) ? ObtenerNumero(ObtenerValor('paginaCon')) : 1))+
    '&paginarPorCon='+(opciones.paginarPorCon?opciones.paginarPorCon:(ObtenerNumero(ObtenerValor('paginarPorCon')) ? ObtenerNumero(ObtenerValor('paginarPorCon')) : 5))+
    (ValidarCadena(opciones.compradorCon)? '&compradorCon='+encodeURIComponent(opciones.compradorCon): (ValidarCadena(ObtenerValor('compradorCon'))&&!desUrl?'&compradorCon='+ObtenerValor('compradorCon'):''))+
    (ValidarCadena(opciones.tituloCon)? '&tituloCon='+encodeURIComponent(opciones.tituloCon): (ValidarCadena(ObtenerValor('tituloCon'))&&!desUrl?'&tituloCon='+ObtenerValor('tituloCon'):''))+
    (ValidarCadena(opciones.descripcionCon)? '&descripcionCon='+encodeURIComponent(opciones.descripcionCon): (ValidarCadena(ObtenerValor('descripcionCon'))&&!desUrl?'&descripcionCon='+ObtenerValor('descripcionCon'):''))+
    (ValidarCadena(opciones.tituloLicitacionCon)? '&tituloLicitacionCon='+encodeURIComponent(opciones.tituloLicitacionCon): (ValidarCadena(ObtenerValor('tituloLicitacionCon'))&&!desUrl?'&tituloLicitacionCon='+ObtenerValor('tituloLicitacionCon'):''))+
    (ValidarCadena(opciones.categoriaCompraCon)? '&categoriaCompraCon='+encodeURIComponent(opciones.categoriaCompraCon): (ValidarCadena(ObtenerValor('categoriaCompraCon'))&&!desUrl?'&categoriaCompraCon='+ObtenerValor('categoriaCompraCon'):''))+
    (ValidarCadena(opciones.fechaFirmaCon)? '&fechaFirmaCon='+encodeURIComponent(opciones.fechaFirmaCon): (ValidarCadena(ObtenerValor('fechaFirmaCon'))&&!desUrl?'&fechaFirmaCon='+ObtenerValor('fechaFirmaCon'):''))+
    (ValidarCadena(opciones.fechaInicioCon) ? '&fechaInicioCon='+encodeURIComponent(opciones.fechaInicioCon):(ValidarCadena(ObtenerValor('fechaInicioCon'))&&!desUrl?'&fechaInicioCon='+ObtenerValor('fechaInicioCon'):''))+
    (ValidarCadena(opciones.montoCon) ? '&montoCon='+encodeURIComponent(reemplazarValor(opciones.montoCon,',','')):(ValidarCadena(ObtenerValor('montoCon'))&&!desUrl?'&montoCon='+ObtenerValor('montoCon'):''))+
    (ValidarCadena(opciones.estadoCon) ? '&estadoCon='+encodeURIComponent(opciones.estadoCon):(ValidarCadena(ObtenerValor('estadoCon'))&&!desUrl?'&estadoCon='+ObtenerValor('estadoCon'):''))+
    (ValidarCadena(opciones.ordenarPorCon) ? '&ordenarPorCon='+encodeURIComponent(opciones.ordenarPorCon):(ValidarCadena(ObtenerValor('ordenarPorCon'))&&!desUrl?'&ordenarPorCon='+ObtenerValor('ordenarPorCon'):''))+
    
    
    '&paginaPag='+(opciones.paginaPag?opciones.paginaPag:(ObtenerNumero(ObtenerValor('paginaPag')) ? ObtenerNumero(ObtenerValor('paginaPag')) : 1))+
    '&paginarPorPag='+(opciones.paginarPorPag?opciones.paginarPorPag:(ObtenerNumero(ObtenerValor('paginarPorPag')) ? ObtenerNumero(ObtenerValor('paginarPorPag')) : 5))+
    (ValidarCadena(opciones.compradorPag)? '&compradorPag='+encodeURIComponent(opciones.compradorPag): (ValidarCadena(ObtenerValor('compradorPag'))&&!desUrl?'&compradorPag='+ObtenerValor('compradorPag'):''))+
    (ValidarCadena(opciones.tituloPag)? '&tituloPag='+encodeURIComponent(opciones.tituloPag): (ValidarCadena(ObtenerValor('tituloPag'))&&!desUrl?'&tituloPag='+ObtenerValor('tituloPag'):''))+
    (ValidarCadena(opciones.montoPag) ? '&montoPag='+encodeURIComponent(reemplazarValor(opciones.montoPag,',','')):(ValidarCadena(ObtenerValor('montoPag'))&&!desUrl?'&montoPag='+ObtenerValor('montoPag'):''))+
    (ValidarCadena(opciones.pagosPag)? '&pagosPag='+encodeURIComponent(reemplazarValor(opciones.pagosPag,',','')): (ValidarCadena(ObtenerValor('tituloPag'))&&!desUrl?'&tituloPag='+ObtenerValor('tituloPag'):''))+
    //(ValidarCadena(opciones.pagosPag)? '&pagosPag='+encodeURIComponent(opciones.pagosPag): (ValidarCadena(ObtenerValor('tituloPag'))&&!desUrl?'&tituloPag='+ObtenerValor('tituloPag'):''))+
    (ValidarCadena(opciones.fechaPag) ? '&fechaPag='+encodeURIComponent(reemplazarValor(opciones.fechaPag,',','')):(ValidarCadena(ObtenerValor('fechaPag'))&&!desUrl?'&fechaPag='+ObtenerValor('fechaPag'):''))+
    (ValidarCadena(opciones.ordenarPorPag) ? '&ordenarPorPag='+encodeURIComponent(opciones.ordenarPorPag):(ValidarCadena(ObtenerValor('ordenarPorPag'))&&!desUrl?'&ordenarPorPag='+ObtenerValor('ordenarPorPag'):''))+

    '&paginaPro='+(opciones.paginaPro?opciones.paginaPro:(ObtenerNumero(ObtenerValor('paginaPro')) ? ObtenerNumero(ObtenerValor('paginaPro')) : 1))+
    '&paginarPorPro='+(opciones.paginarPorPro?opciones.paginarPorPro:(ObtenerNumero(ObtenerValor('paginarPorPro')) ? ObtenerNumero(ObtenerValor('paginarPorPro')) : 5))+
    (ValidarCadena(opciones.clasificacionPro)? '&clasificacionPro='+encodeURIComponent(opciones.clasificacionPro): (ValidarCadena(ObtenerValor('clasificacionPro'))&&!desUrl?'&clasificacionPro='+ObtenerValor('clasificacionPro'):''))+
    (ValidarCadena(opciones.cantidadContratosPro) ? '&cantidadContratosPro='+encodeURIComponent(reemplazarValor(opciones.cantidadContratosPro,',','')):(ValidarCadena(ObtenerValor('cantidadContratosPro'))&&!desUrl?'&cantidadContratosPro='+ObtenerValor('cantidadContratosPro'):''))+
    (ValidarCadena(opciones.montoPro) ? '&montoPro='+encodeURIComponent(reemplazarValor(opciones.montoPro,',','')):(ValidarCadena(ObtenerValor('montoPro'))&&!desUrl?'&montoPro='+ObtenerValor('montoPro'):''))+
    (ValidarCadena(opciones.ordenarPorPro) ? '&ordenarPorPro='+encodeURIComponent(opciones.ordenarPorPro):(ValidarCadena(ObtenerValor('ordenarPorPro'))&&!desUrl?'&ordenarPorPro='+ObtenerValor('ordenarPorPro'):''))

    );
  
  
    
    return direccion;
  }

  function ObtenerOrdenConversion(texto){
    texto=ObtenerTexto(texto);
    if(/desc\(/.test(texto)){
      texto=texto.replace('desc(','').replace(')','')
      return 'desc('+filtrosAPropiedades[texto]+')'
    }else if(/asc\(/.test(texto)){
      texto=texto.replace('asc(','').replace(')','')
      return 'asc('+filtrosAPropiedades[texto]+')'
    }
    return texto
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
    if(Validar(ObtenerValor('tituloLicitacionCon'))){
      parametros[sufijo?'tituloLicitacion'+sufijo:'tituloLicitacion']= decodeURIComponent(ObtenerValor('tituloLicitacionCon'));
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
      parametros[sufijo?'ordenarPor'+sufijo:'ordenarPor']=sufijo?decodeURIComponent(ObtenerValor('ordenarPorCon')):ObtenerOrdenConversion(decodeURIComponent(ObtenerValor('ordenarPorCon')));
    }

    
    return parametros;
  }
  function ObtenerFiltrosPagos(sufijo){
    var parametros={}
    parametros[sufijo?'pagina'+sufijo:'pagina']= ObtenerNumero(ObtenerValor('paginaPag')) ? ObtenerNumero(ObtenerValor('paginaPag')) : 1;
    parametros[sufijo?'paginarPor'+sufijo:'paginarPor']= ObtenerNumero(ObtenerValor('paginarPorPag')) ? ObtenerNumero(ObtenerValor('paginarPorPag')) : 5;
    if(Validar(ObtenerValor('compradorPag'))){
      parametros[sufijo?'comprador'+sufijo:'comprador']=decodeURIComponent(ObtenerValor('compradorPag'));
    }
    if(Validar(ObtenerValor('tituloPag'))){
      parametros[sufijo?'titulo'+sufijo:'titulo']= decodeURIComponent(ObtenerValor('tituloPag'));
    }
    if(Validar(ObtenerValor('montoPag'))){
      parametros[sufijo?'monto'+sufijo:'monto']=decodeURIComponent(ObtenerValor('montoPag'));
    }
    if(Validar(ObtenerValor('pagosPag'))){
      parametros[sufijo?'pagos'+sufijo:'pagos']=decodeURIComponent(ObtenerValor('pagosPag'));
    }
    if(Validar(ObtenerValor('fechaPag'))){
      parametros[sufijo?'fecha'+sufijo:'fecha']=decodeURIComponent(ObtenerValor('fechaPag'));
    }
    if(Validar(ObtenerValor('ordenarPorPag'))){
      parametros[sufijo?'ordenarPor'+sufijo:'ordenarPor']=sufijo?decodeURIComponent(ObtenerValor('ordenarPorPag')):ObtenerOrdenConversion(decodeURIComponent(ObtenerValor('ordenarPorPag')));
    }
    return parametros;
  }

  function ObtenerFiltrosProductos(sufijo){
    var parametros={}
    parametros[sufijo?'pagina'+sufijo:'pagina']= ObtenerNumero(ObtenerValor('paginaPro')) ? ObtenerNumero(ObtenerValor('paginaPro')) : 1;
    parametros[sufijo?'paginarPor'+sufijo:'paginarPor']= ObtenerNumero(ObtenerValor('paginarPorPro')) ? ObtenerNumero(ObtenerValor('paginarPorPro')) : 5;
    if(Validar(ObtenerValor('clasificacionPro'))){
      parametros[sufijo?'clasificacion'+sufijo:'clasificacion']=decodeURIComponent(ObtenerValor('clasificacionPro'));
    }
    if(Validar(ObtenerValor('montoPro'))){
      parametros[sufijo?'monto'+sufijo:'monto']=decodeURIComponent(ObtenerValor('montoPro'));
    }
    if(Validar(ObtenerValor('cantidadContratosPro'))){
      parametros[sufijo?'cantidadContratos'+sufijo:'cantidadContratos']=decodeURIComponent(ObtenerValor('cantidadContratosPro'));
    }
    if(Validar(ObtenerValor('ordenarPorPro'))){
      parametros[sufijo?'ordenarPor'+sufijo:'ordenarPor']=sufijo?decodeURIComponent(ObtenerValor('ordenarPorPro')):ObtenerOrdenConversion(decodeURIComponent(ObtenerValor('ordenarPorPro')));
    }
    return parametros;
  }


  function OrdenFiltroContratos(filtro,orden){
    switch(orden){
      case 'ascendente':
          PushDireccionContratos(AccederUrlPagina({paginaCon:1,ordenarPorCon:'asc('+/*filtrosAPropiedades[*/filtro/*]*/+')'}));
        break;
      case 'descendente':
          PushDireccionContratos(AccederUrlPagina({paginaCon:1,ordenarPorCon:'desc('+/*filtrosAPropiedades[*/filtro/*]*/+')'}));
        break;
      case 'neutro':
          var filtros=ObtenerFiltrosContratos('Con');
          if(filtros['ordenarPorCon']){
            delete filtros['ordenarPorCon'];
          }
          filtros['paginaCon']=1;
          PushDireccionContratos(AccederUrlPagina(filtros,true));
        break;
      default:
          var filtros=ObtenerFiltrosContratos('Con');
          if(filtros['ordenarPorCon']){
            delete filtros['ordenarPorCon'];
          }
          filtros['paginaCon']=1;
          PushDireccionContratos(AccederUrlPagina(filtros,true));
        break;
  
    }
  }
  function OrdenFiltroPagos(filtro,orden){
    switch(orden){
      case 'ascendente':
          PushDireccionPagos(AccederUrlPagina({paginaPag:1,ordenarPorPag:'asc('+/*filtrosAPropiedades[*/filtro/*]*/+')'}));
        break;
      case 'descendente':
          PushDireccionPagos(AccederUrlPagina({paginaPag:1,ordenarPorPag:'desc('+/*filtrosAPropiedades[*/filtro/*]*/+')'}));
        break;
      case 'neutro':
          var filtros=ObtenerFiltrosPagos('Pag');
          if(filtros['ordenarPorPag']){
            delete filtros['ordenarPorPag'];
          }
          filtros['paginaPag']=1;
          PushDireccionPagos(AccederUrlPagina(filtros,true));
        break;
      default:
          var filtros=ObtenerFiltrosPagos('Pag');
          if(filtros['ordenarPorPag']){
            delete filtros['ordenarPorPag'];
          }
          filtros['paginaPag']=1;
          PushDireccionPagos(AccederUrlPagina(filtros,true));
        break;
  
    }
  }

  function OrdenFiltroProductos(filtro,orden){
    switch(orden){
      case 'ascendente':
          PushDireccionProductos(AccederUrlPagina({paginaPro:1,ordenarPorPro:'asc('+/*filtrosAPropiedades[*/filtro/*]*/+')'}));
        break;
      case 'descendente':
          PushDireccionProductos(AccederUrlPagina({paginaPro:1,ordenarPorPro:'desc('+/*filtrosAPropiedades[*/filtro/*]*/+')'}));
        break;
      case 'neutro':
          var filtros=ObtenerFiltrosProductos('Pro');
          if(filtros['ordenarPorPro']){
            delete filtros['ordenarPorPro'];
          }
          filtros['paginaPro']=1;
          PushDireccionProductos(AccederUrlPagina(filtros,true));
        break;
      default:
          var filtros=ObtenerFiltrosProductos('Pro');
          if(filtros['ordenarPorPro']){
            delete filtros['ordenarPorPro'];
          }
          filtros['paginaPro']=1;
          PushDireccionProductos(AccederUrlPagina(filtros,true));
        break;
  
    }
  }

  
function InicializarDescargas(){

  AbrirModalDescarga('descargaJsonProveedorProductos','Descarga JSON',true);/*Crear Modal Descarga */
  AbrirModalDescarga('descargaCsvProveedorProductos','Descarga CSV',true);/*Crear Modal Descarga */
  AbrirModalDescarga('descargaXlsxProveedorProductos','Descarga XLSX',true);/*Crear Modal Descarga */
  $('#descargaJSONProductos').on('click',function(e){
    AbrirModalDescarga('descargaJsonProveedorProductos','Descarga JSON');
  });
  $('#descargaCSVProductos').on('click',function(e){
    AbrirModalDescarga('descargaCsvProveedorProductos','Descarga CSV');
  });
  $('#descargaXLSXProductos').on('click',function(e){
    AbrirModalDescarga('descargaXlsxProveedorProductos','Descarga XLSX');
  });
  AbrirModalDescarga('descargaJsonProveedorContratos','Descarga JSON',true);/*Crear Modal Descarga */
  AbrirModalDescarga('descargaCsvProveedorContratos','Descarga CSV',true);/*Crear Modal Descarga */
  AbrirModalDescarga('descargaXlsxProveedorContratos','Descarga XLSX',true);/*Crear Modal Descarga */
  $('#descargaJSONContratos').on('click',function(e){
    AbrirModalDescarga('descargaJsoProveedorContratos','Descarga JSON');
  });
  $('#descargaCSVContratos').on('click',function(e){
    AbrirModalDescarga('descargaCsvProveedorContratos','Descarga CSV');
  });
  $('#descargaXLSXContratos').on('click',function(e){
    AbrirModalDescarga('descargaXlsxProveedorContratos','Descarga XLSX');
  });
  AbrirModalDescarga('descargaJsonProveedorPagos','Descarga JSON',true);/*Crear Modal Descarga */
  AbrirModalDescarga('descargaCsvProveedorPagos','Descarga CSV',true);/*Crear Modal Descarga */
  AbrirModalDescarga('descargaXlsxProveedorPagos','Descarga XLSX',true);/*Crear Modal Descarga */
  $('#descargaJSONPagos').on('click',function(e){
    AbrirModalDescarga('descargaJsonProveedorPagos','Descarga JSON');
  });
  $('#descargaCSVPagos').on('click',function(e){
    AbrirModalDescarga('descargaCsvProveedorPagos','Descarga CSV');
  });
  $('#descargaXLSXPagos').on('click',function(e){
    AbrirModalDescarga('descargaXlsxProveedorPagos','Descarga XLSX');
  });
}
function ObtenerDescargaProveedorProductos(resultados){
  var parametros = ObtenerFiltrosProductos();
  parametros['pagina']=1;
  parametros['paginarPor']=resultados.paginador['total.items'];
  $.get(api+"/proveedores/"+encodeURIComponent(proveedorId)+'/productos',parametros).done(function( datos ) {
    console.dir('Descargas ProveedorProductos')
    console.dir(datos);
    AgregarEventoModalDescarga('descargaJsonProveedorProductos',function(){
      var descarga=datos.resultados.map(function(e){
        return e/*{
          'Comprador':e.name,
          //'Id':e.id,
          'Procesos':e.procesos,
          'TotalMontoContratado':e.total_monto_contratado,
          'PromedioMontoContratado':e.promedio_monto_contratado,
          'MayorMontoContratado':e.mayor_monto_contratado,
          'MenorMontoContratado':e.menor_monto_contratado,
          'FechaUltimoProceso':e.fecha_ultimo_proceso?((e.fecha_ultimo_proceso=='NaT')?'':e.fecha_ultimo_proceso):'',
          'Enlace':url+'/comprador/'+encodeURIComponent(e.uri)
        }*/;
      });
      DescargarJSON(descarga,'Proveedor Productos');
    });
    AgregarEventoModalDescarga('descargaCsvProveedorProductos',function(){
      var descarga=datos.resultados.map(function(e){
        return e;
      });
      DescargarCSV(ObtenerMatrizObjeto(descarga) ,'Proveedor Productos');
    });
    AgregarEventoModalDescarga('descargaXlsxProveedorProductos',function(){
      var descarga=datos.resultados.map(function(e){
        return e;
      });
      DescargarXLSX(ObtenerMatrizObjeto(descarga) ,'Proveedor Productos');
    });
  
    
  }).fail(function() {
      /*Error de Conexion al servidor */
      console.dir('error de api descargas');
      
    });
  
}

function ObtenerDescargaProveedorContratos(resultados){
  var parametros = ObtenerFiltrosContratos();
  parametros['pagina']=1;
  parametros['paginarPor']=resultados.paginador['total.items'];
  $.get(api+"/proveedores/"+encodeURIComponent(proveedorId)+'/contratos',parametros).done(function( datos ) {
    console.dir('Descargas Proveedor Contratos')
    console.dir(datos);
    AgregarEventoModalDescarga('descargaJsonProveedorContratos',function(){
      var descarga=datos.resultados.map(function(e){
        return e._source;
      });
      DescargarJSON(descarga,'Proveedor Contratos');
    });
    AgregarEventoModalDescarga('descargaCsvProveedorContratos',function(){
      var descarga=datos.resultados.map(function(e){
        return e._source;
      });
      DescargarCSV(ObtenerMatrizObjeto(descarga) ,'Proveedor Contratos');
    });
    AgregarEventoModalDescarga('descargaXlsxProveedorContratos',function(){
      var descarga=datos.resultados.map(function(e){
        return e._source;
      });
      DescargarXLSX(ObtenerMatrizObjeto(descarga) ,'Proveedor Contratos');
    });
  
    
  }).fail(function() {
      /*Error de Conexion al servidor */
      console.dir('error de api descargas');
      
    });
}

function ObtenerDescargaProveedorPagos(resultados){
  var parametros = ObtenerFiltrosPagos();
  parametros['pagina']=1;
  parametros['paginarPor']=resultados.paginador['total.items'];
  $.get(api+"/proveedores/"+encodeURIComponent(proveedorId)+'/pagos',parametros).done(function( datos ) {
    console.dir('Descargas Proveedor Pagos')
    console.dir(datos);
    AgregarEventoModalDescarga('descargaJsonProveedorPagos',function(){
      var descarga=datos.resultados.map(function(e){
        return e._source;
      });
      DescargarJSON(descarga,'Proveedor Pagos');
    });
    AgregarEventoModalDescarga('descargaCsvProveedorPagos',function(){
      var descarga=datos.resultados.map(function(e){
        return e._source;
      });
      DescargarCSV(ObtenerMatrizObjeto(descarga) ,'Proveedor Pagos');
    });
    AgregarEventoModalDescarga('descargaXlsxProveedorPagos',function(){
      var descarga=datos.resultados.map(function(e){
        return e._source;
      });
      DescargarXLSX(ObtenerMatrizObjeto(descarga) ,'Proveedor Pagos');
    });
  
    
  }).fail(function() {
      /*Error de Conexion al servidor */
      console.dir('error de api descargas');
      
    });
}