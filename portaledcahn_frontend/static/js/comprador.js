var compradorId = '';
var datosComprador = {};
var filtrosAPropiedades = {
    "proveedorCon": 'proveedor',
    "tituloCon": "titulo",
    "compradorCon":"compradorCon",
    "tituloLicitacionCon": "tituloLicitacion",
    "descripcionCon": "descripcion",
    "categoriaCompraCon": "categoriaCompra",
    "estadoCon": "estado",
    "fechaFirmaCon": "fechaFirma",
    "fechaInicioCon": "fechaInicio",
    "montoCon": "monto",
    "dependencias": "dependencias",
    "paginarPorCon": "paginarPor",
    "ordenarPorCon": "ordenarPor",
    "compradorPag": "comprador",
    "proveedorPag": "proveedor",
    "tituloPag": "titulo",
    "estadoPag": "estado",
    "fechaPag": "fecha",
    "montoPag": "monto",
    "pagosPag": "pagos",
    "paginarPorPag": "paginarPor",
    "ordenarPorPag": "ordenarPor",

    "compradorPro": "comprador",
    "ocidPro": "ocid",
    "tituloPro": "titulo",
    "categoriaCompraPro": "categoriaCompra",
    "estadoPro": "estado",
    "montoContratadoPro": "montoContratado",
    "fechaInicioPro": "fechaInicio",
    "fechaRecepcionPro": "fechaRecepcion",
    "fechaPublicacionPro": "fechaPublicacion",
    "ordenarPorPro": "ordenarPor"
};
$(function() {
    compradorId = decodeURIComponent($('#compradorId').val());
    $('.opcionFiltroBusquedaPagina').on('click', function(e) {
        $(e.currentTarget).addClass('active')
    });
    tippy('#informacionTipoDatos', {
        arrow: true,
        arrowType: 'round',
        content: '¿Que son estos tipos de datos?'
    });
    tippy('#buscarInformacion', {
        arrow: true,
        arrowType: 'round',
        content: 'Haz click para buscar'
    });
    $.datepicker.regional['es'] = {
        closeText: 'Cerrar',
        prevText: '< Ant',
        nextText: 'Sig >',
        currentText: 'Hoy',
        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
        dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Juv', 'Vie', 'Sáb'],
        dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'],
        weekHeader: 'Sm',
        dateFormat: 'dd/mm/yy',
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ''
    };
    $.datepicker.setDefaults($.datepicker.regional["es"]);
    $('.fecha').datepicker({
        "dateFormat": 'yy-mm-dd'
    });
    $('.fecha').mask('0000-00-00');
    $('.OpcionFiltroBusquedaNumerico input').on('change', function(evento) {
        cambiarFiltroNumerico(evento.currentTarget);
    });



    ObtenerComprador();
    var elementosNumericos = [];
    for (let i = 0; i < $('.elementoNumerico').length; i++) {
        var configuracionNumerica = {
            decimalCharacter: '.',
            decimalPlaces: $($('.elementoNumerico')[i]).attr('decimal') == "true" ? 2 : 0,
            digitalGroupSpacing: 3,
            digitGroupSeparator: ','
        }
        elementosNumericos[i] = new AutoNumeric($('.elementoNumerico')[i], configuracionNumerica);
    }
    /*
        $('#cajonContratos .OpcionFiltroBusquedaNumerico input').on('change',function(evento){
          cambiarFiltroNumerico(evento.currentTarget);
        });*/

    $('#cajonContratos input.campoAzulBusqueda').on('change', function(evento) {
        var elemento = $('#cajonContratos input.campoAzulBusqueda');
        var filtros = {};
        filtros = ObtenerFiltrosContratos();
        filtros[elemento.attr('filtro')] = (elemento.val());
        if (!ValidarCadena(filtros[elemento.attr('filtro')])) {
            delete filtros[elemento.attr('filtro')];
        }
        filtros['paginaCon'] = 1;
        InputFiltroContratos(filtros, true);
    });
    $('#cajonPagos input.campoAzulBusqueda').on('change', function(evento) {
        var elemento = $('#cajonPagos input.campoAzulBusqueda');
        var filtros = {};
        filtros = ObtenerFiltrosPagos();
        filtros[elemento.attr('filtro')] = (elemento.val());
        if (!ValidarCadena(filtros[elemento.attr('filtro')])) {
            delete filtros[elemento.attr('filtro')];
        }
        filtros['paginaPag'] = 1;
        InputFiltroPagos(filtros, true);
    });
    $('#cajonProcesos input.campoAzulBusqueda').on('change', function(evento) {
        var elemento = $('#cajonProcesos input.campoAzulBusqueda');
        var filtros = {};
        filtros = ObtenerFiltrosProcesos();
        filtros[elemento.attr('filtro')] = (elemento.val());
        if (!ValidarCadena(filtros[elemento.attr('filtro')])) {
            delete filtros[elemento.attr('filtro')];
        }
        filtros['paginaPro'] = 1;
        InputFiltroProcesos(filtros, true);
    });
    $('#buscarInformacionContratos').on('click', function(evento) {
        var elemento = $('#cajonContratos input.campoAzulBusqueda');
        var filtros = {};
        filtros = ObtenerFiltrosContratos();
        filtros[elemento.attr('filtro')] = (elemento.val());
        if (!ValidarCadena(filtros[elemento.attr('filtro')])) {
            delete filtros[elemento.attr('filtro')];
        }
        filtros['paginaCon'] = 1;
        InputFiltroContratos(filtros, true);
    });
    $('#buscarInformacionPagos').on('click', function(evento) {
        var elemento = $('#cajonPagos input.campoAzulBusqueda');
        var filtros = {};
        filtros = ObtenerFiltrosPagos();
        filtros[elemento.attr('filtro')] = (elemento.val());
        if (!ValidarCadena(filtros[elemento.attr('filtro')])) {
            delete filtros[elemento.attr('filtro')];
        }
        filtros['paginaPag'] = 1;
        InputFiltroPagos(filtros, true);
    });
    $('#buscarInformacionProcesos').on('click', function(evento) {
        var elemento = $('#cajonProcesos input.campoAzulBusqueda');
        var filtros = {};
        filtros = ObtenerFiltrosProcesos();
        filtros[elemento.attr('filtro')] = (elemento.val());
        if (!ValidarCadena(filtros[elemento.attr('filtro')])) {
            delete filtros[elemento.attr('filtro')];
        }
        filtros['paginaPro'] = 1;
        InputFiltroProcesos(filtros, true);
    });
    AsignarEventosFiltro('#cajonContratos', 'Con', ObtenerFiltrosContratos, InputFiltroContratos);
    AsignarEventosFiltro('#cajonPagos', 'Pag', ObtenerFiltrosPagos, InputFiltroPagos);
    AsignarEventosFiltro('#cajonProcesos', 'Pro', ObtenerFiltrosProcesos, InputFiltroProcesos);
    AsignarOrdenTablaFiltros(OrdenFiltroContratos, '#cajonContratos .ordenEncabezado');
    AsignarOrdenTablaFiltros(OrdenFiltroPagos, '#cajonPagos .ordenEncabezado');
    AsignarOrdenTablaFiltros(OrdenFiltroProcesos, '#cajonProcesos .ordenEncabezado');
    $('#paginacionBusquedaContrato').on('change', function(e) {
        CantidadResultadosContrato($('#paginacionBusquedaContrato').val() ? $('#paginacionBusquedaContrato').val() : 5);
    });
    $('#paginacionBusquedaPago').on('change', function(e) {
        CantidadResultadosPago($('#paginacionBusquedaPago').val() ? $('#paginacionBusquedaPago').val() : 5);
    });
    $('#paginacionBusquedaProceso').on('change', function(e) {
        CantidadResultadosProceso($('#paginacionBusquedaProceso').val() ? $('#paginacionBusquedaProceso').val() : 5);
    });
});

function CantidadResultadosContrato(numero) {
    PushDireccionContratos(AccederUrlPagina({ paginaCon: 1, paginarPorCon: numero }));
}

function CantidadResultadosPago(numero) {
    PushDireccionPagos(AccederUrlPagina({ paginaPag: 1, paginarPorPag: numero }));
}

function CantidadResultadosProceso(numero) {
    PushDireccionProcesos(AccederUrlPagina({ paginaPro: 1, paginarPorPro: numero }));
}

function AsignarEventosFiltro(selector, sufijo, funcionFiltros, funcionInput) {
    $(selector + ' .campoFiltrado input[type="text"]').on({
        'change': function(e) {
            var elemento = $(e.currentTarget);
            var elementoPadre = elemento.closest('.campoFiltrado');
            var filtros = {};
            filtros = funcionFiltros();
            switch (elementoPadre.attr('tipo')) {
                case 'fecha':
                    filtros[elementoPadre.attr('filtro')] = ValidarCadena(elemento.val()) ? (elemento.attr('opcion') + elemento.val()) : '';
                    if (!ValidarCadena(filtros[elementoPadre.attr('filtro')])) {
                        delete filtros[elementoPadre.attr('filtro')];
                    }
                    filtros['pagina' + sufijo] = 1;
                    funcionInput(filtros, true);
                    break;
                case 'numero':
                    filtros[elementoPadre.attr('filtro')] = ValidarCadena(elemento.val()) ? (elemento.attr('opcion') + elemento.val()) : '';
                    if (!ValidarCadena(filtros[elementoPadre.attr('filtro')])) {
                        delete filtros[elementoPadre.attr('filtro')];
                    }
                    filtros['pagina' + sufijo] = 1;
                    funcionInput(filtros, true);
                    break;
                default:
                    filtros[elementoPadre.attr('filtro')] = (elemento.val());
                    if (!ValidarCadena(filtros[elementoPadre.attr('filtro')])) {
                        delete filtros[elementoPadre.attr('filtro')];
                    }
                    filtros['pagina' + sufijo] = 1;
                    funcionInput(filtros, true);
                    break;
            }

        }
    })
}

function ObtenerComprador() {
    DebugFecha();
    MostrarEspera('body .tamanoMinimo');
    $.get(api + "/compradores/" + encodeURIComponent(compradorId) /*url+"/static/"+procesoOcid+".json"*/ , function(datos) {
        DebugFecha();
        datosComprador = datos;
        console.dir(datos)
        OcultarEspera('body .tamanoMinimo');
        if (datos.id) {

            AnadirDatosComprador();
            $('.contenedorTablas').show()

            CargarContratosComprador();
            CargarPagosComprador();
            CargarProcesosComprador();
            VerificarIntroduccion('INTROJS_COMPRADOR', 1);
        } else {
            $('#noEncontrado').show();
        }

    }).fail(function() {
        /*Error de Conexion al servidor */
        console.dir('error get');

        OcultarEspera('body .tamanoMinimo');
        $('#noEncontrado').show();

    });
}


function AnadirDatosComprador() {
    $('.contenedorInformacion').append(
        $('<div>', { class: 'row mt-5' }).append(
            $('<div>', { class: 'col-md-12' }).append(
                $('<h1>', { class: 'textoColorPrimario mt-3 tituloDetalleProceso', toolTexto: 'buyer.name' }).text(
                    datosComprador.name
                )
            )
        ),
        $('<div>', { class: 'row' }).append(
            $('<h4>', { class: 'text-primary-edcax titularCajonSombreado  col-md-12' }).text(
                'Información del Comprador'
            )
        ),
        $('<div>', { class: 'row' }).append(
            $('<div>', { class: 'col-md-12' }).append(
                $('<div>', { class: 'cajonSombreado contenedorDetalleProcesoDatos', 'data-step': "1", 'data-intro': "Puedes visualizar la dirección de un comprador en esta sección, en caso de que este disponible." }).append(
                    $('<div>', { class: 'contenedorProceso informacionProceso' }).append(

                        (datosComprador.id ?
                            $('<div>', { class: 'contenedorTablaCaracteristicas', style: 'width:100%' }).append(
                                $('<table>').append(
                                    $('<tbody>').append(
                                        $('<tr>').append(
                                            $('<td>', { class: 'tituloTablaCaracteristicas', toolTexto: "parties[n].id" }).text('Identificador:'),
                                            $('<td>', { class: 'contenidoTablaCaracteristicas' })).append(
                                            VerificarCadenaRTN(datosComprador.id) ?
                                            $('<span>', { class: 'botonGeneral fondoColorPrimario' }).text('RTN') : $('<span>').text(datosComprador.id),
                                            VerificarCadenaRTN(datosComprador.id) ?
                                            $('<span>').text(datosComprador.id.replace('HN-RTN-', ' ')) : null

                                        )
                                    ))) : null),
                        (datosComprador.address && datosComprador.address.streetAddress ?
                            $('<div>', { class: 'contenedorTablaCaracteristicas', style: 'width:100%' }).append(
                                $('<table>').append(
                                    $('<tbody>').append(
                                        $('<tr>').append(
                                            $('<td>', { class: 'tituloTablaCaracteristicas', toolTexto: "parties[n].address.streetAddress" }).text('Dirección:'),
                                            $('<td>', { class: 'contenidoTablaCaracteristicas' })).append(
                                            datosComprador.address.streetAddress
                                        )
                                    ))) : null)
                    )
                )
            )
        ),
        (datosComprador.contactPoint && (datosComprador.contactPoint.name || datosComprador.contactPoint.telephone || datosComprador.contactPoint.faxNumber || datosComprador.contactPoint.email)) ? $('<div>', { class: 'row' }).append(
            $('<h4>', { class: 'text-primary-edcax titularCajonSombreado  col-md-12 mt-1' }).text(
                'Datos de Contacto'
            )
        ) : null,
        (datosComprador.contactPoint && (datosComprador.contactPoint.name || datosComprador.contactPoint.telephone || datosComprador.contactPoint.faxNumber || datosComprador.contactPoint.email)) ? $('<div>', { class: 'row' }).append(
            $('<div>', { class: 'col-md-12 mt-2' }).append(
                $('<div>', { class: 'cajonSombreado contenedorDetalleProcesoDatos', 'data-step': "2", 'data-intro': "Puedes visualizar los datos de contacto de un comprador en esta sección, en caso de que este disponible." }).append(
                    $('<div>', { class: 'contenedorProceso informacionProceso' }).append(

                        (datosComprador.contactPoint && datosComprador.contactPoint.name ?
                            $('<div>', { class: 'contenedorTablaCaracteristicas', style: 'width:100%' }).append(
                                $('<table>').append(
                                    $('<tbody>').append(
                                        $('<tr>').append(
                                            $('<td>', { class: 'tituloTablaCaracteristicas', toolTexto: "parties[n].contactPoint.name" }).text('Nombre:'),
                                            $('<td>', { class: 'contenidoTablaCaracteristicas' })).append(
                                            datosComprador.contactPoint.name
                                        )
                                    ))) : null),
                        (datosComprador.contactPoint && datosComprador.contactPoint.telephone ?
                            $('<div>', { class: 'contenedorTablaCaracteristicas', style: 'width:100%' }).append(
                                $('<table>').append(
                                    $('<tbody>').append(
                                        $('<tr>').append(
                                            $('<td>', { class: 'tituloTablaCaracteristicas', toolTexto: "parties[n].contactPoint.telephone" }).text('Telefono:'),
                                            $('<td>', { class: 'contenidoTablaCaracteristicas' })).append(
                                            datosComprador.contactPoint.telephone
                                        )
                                    ))) : null),
                        (datosComprador.contactPoint && datosComprador.contactPoint.faxNumber ?
                            $('<div>', { class: 'contenedorTablaCaracteristicas', style: 'width:100%' }).append(
                                $('<table>').append(
                                    $('<tbody>').append(
                                        $('<tr>').append(
                                            $('<td>', { class: 'tituloTablaCaracteristicas', toolTexto: "parties[n].contactPoint.faxNumber" }).text('FAX:'),
                                            $('<td>', { class: 'contenidoTablaCaracteristicas' })).append(
                                            datosComprador.contactPoint.faxNumber
                                        )
                                    ))) : null),
                        (datosComprador.contactPoint && datosComprador.contactPoint.email ?
                            $('<div>', { class: 'contenedorTablaCaracteristicas', style: 'width:100%' }).append(
                                $('<table>').append(
                                    $('<tbody>').append(
                                        $('<tr>').append(
                                            $('<td>', { class: 'tituloTablaCaracteristicas', toolTexto: "parties[n].contactPoint.email" }).text('Correo Electrónico:'),
                                            $('<td>', { class: 'contenidoTablaCaracteristicas' })).append(
                                            datosComprador.contactPoint.email
                                        )
                                    ))) : null)
                    )
                )
            )
        ) : null




    )
}

function CargarContratosComprador() {
    $('#resultadosContratosComprador').html(
        $('<tr>').append(
            $('<td>', { style: 'height:300px;position:relative', colspan: '8', id: 'cargando' })
        ));
    MostrarEspera('#cargando');
    var parametros = ObtenerFiltrosContratos();
    $.get(api + "/compradores/" + encodeURIComponent(compradorId) + '/contratos', parametros).done(function(datos) {
        console.dir('Contratos')
        console.dir(datos);

        AgregarResultadosContratosComprador(datos, '#resultadosContratosComprador');
        MostrarPaginacion(datos, '.ContratosComprador',
            function(e) {
                PaginaContratosComprador($(e.currentTarget).attr('pagina'))
            });


        AgregarToolTips();




    }).fail(function() {
        /*Error de Conexion al servidor */
        console.dir('error de api');
        AgregarResultadosContratosComprador({ resultados: [] }, '#resultadosContratosComprador');
        AgregarToolTips();

    });
}

function CargarPagosComprador() {
    $('#resultadosPagosComprador').html(
        $('<tr>').append(
            $('<td>', { style: 'height:300px;position:relative', colspan: '5', id: 'cargandoPagos' })
        ));
    MostrarEspera('#cargandoPagos');
    var parametros = ObtenerFiltrosPagos();
    $.get(api + "/compradores/" + encodeURIComponent(compradorId) + '/pagos', parametros).done(function(datos) {
        console.dir('Pagos')
        console.dir(datos);

        AgregarResultadosPagosComprador(datos, '#resultadosPagosComprador')
        MostrarPaginacion(datos, '.PagosComprador',
            function(e) {
                PaginaPagosComprador($(e.currentTarget).attr('pagina'))
            });


        AgregarToolTips();




    }).fail(function() {
        /*Error de Conexion al servidor */
        console.dir('error de api');
        AgregarResultadosPagosComprador(datos, '#resultadosPagosComprador')
        AgregarToolTips();

    });
}

function CargarProcesosComprador() {
    $('#resultadosProcesosComprador').html(
        $('<tr>').append(
            $('<td>', { style: 'height:300px;position:relative', colspan: '8', id: 'cargandoProcesos' })
        ));
    MostrarEspera('#cargandoProcesos');
    var parametros = ObtenerFiltrosProcesos();
    console.dir('consultado procesos')
    console.dir(encodeURIComponent(compradorId))
    $.get(api + "/compradores/" + encodeURIComponent(compradorId) + '/procesos', parametros).done(function(datos) {
        console.dir('Procesos')
        console.dir(datos);

        AgregarResultadosProcesosComprador(datos, '#resultadosProcesosComprador')
        MostrarPaginacion(datos, '.ProcesosComprador',
            function(e) {
                PaginaProcesosComprador($(e.currentTarget).attr('pagina'))
            });


        AgregarToolTips();




    }).fail(function() {
        /*Error de Conexion al servidor */
        console.dir('error de api');
        AgregarResultadosProcesosComprador(datos, '#resultadosProcesosComprador')
        AgregarToolTips();

    });
}
/*

$('<div>',{class:''})

*/

function AgregarResultadosContratosComprador(datos, selector) {
    var resultados = datos.resultados;
    $(selector).html('');
    for (var i = 0; i < resultados.length; i++) {
        $(selector).append(
            $('<tr>').append(
                $('<td>', { 'data-label': 'Comprador' }).append(
                    resultados[i] && resultados[i]._source && resultados[i]._source.extra && resultados[i]._source.extra.buyerFullName ? $('<a>', { class: 'enlaceTablaGeneral', href: '/comprador/' + encodeURIComponent(resultados[i]._source.extra.buyerFullName) }).text(resultados[i]._source.extra.buyerFullName) : ''
                ),
                $('<td>', { 'data-label': 'Título de Contrato', class: 'textoAlineadoIzquierda' }).append(
                    resultados[i] && resultados[i]._source && resultados[i]._source.title ? $('<a>', { class: 'enlaceTablaGeneral', href: '/proceso/' + encodeURIComponent(resultados[i]._source.extra.ocid) + '/?contrato=' + resultados[i]._source.id, toolTexto: resultados[i]._source.title }).text(ReducirTexto(resultados[i]._source.title, 80)) : $('<span>', { class: 'textoColorGris' }).text('No Disponible')
                ),
                $('<td>', { 'data-label': 'Descripción', class: 'textoAlineadoIzquierda' }).append(
                    $('<span>', { text: ReducirTexto(resultados[i] && resultados[i]._source && resultados[i]._source.description ? resultados[i]._source.description : '', 80), toolTexto: resultados[i] && resultados[i]._source && resultados[i]._source.description ? resultados[i]._source.description : '' })

                ),
                $('<td>', { 'data-label': 'Nombre del Proceso', class: 'textoAlineadoCentrado' }).append(
                    resultados[i] && resultados[i]._source && resultados[i]._source.extra && resultados[i]._source.extra.tenderTitle ? resultados[i]._source.extra.tenderTitle : $('<span>', { class: 'textoColorGris' }).text('No Disponible')
                ),
                $('<td>', { 'data-label': 'Categoría de Compras', class: 'textoAlineadoCentrado' }).append(
                    resultados[i] && resultados[i]._source && resultados[i]._source.extra && resultados[i]._source.extra.tenderMainProcurementCategory ? resultados[i]._source.extra.tenderMainProcurementCategory : $('<span>', { class: 'textoColorGris' }).text('No Disponible')
                ),
                $('<td>', { 'data-label': 'Monto del Contrato', class: 'textoAlineadoDerecha' }).append(
                    resultados[i] && resultados[i]._source && resultados[i]._source.value && Validar(resultados[i]._source.value.amount) ? [ValorMoneda(resultados[i]._source.value.amount), $('<span>', { class: 'textoColorPrimario', text: ' ' + resultados[i]._source.value.currency })] : ''


                ),

                $('<td>', { 'data-label': 'Fecha de Firma del Contrato', class: 'textoAlineadoCentrado' }).append(
                    $('<span>', { class: resultados[i] && resultados[i]._source && resultados[i]._source.period && resultados[i]._source.period.startDate && resultados[i]._source.period.startDate != 'NaT' ? '' : 'textoColorGris' }).text(
                        resultados[i] && resultados[i]._source && resultados[i]._source.period && resultados[i]._source.period.startDate && resultados[i]._source.period.startDate != 'NaT' ? ObtenerFecha(resultados[i]._source.period.startDate, 'fecha') : 'No Disponible'
                    )

                ),
                /*$('<td>',{'data-label':'Fecha de Inicio del Contrato' ,class:'textoAlineadoCentrado'}).append(
                  $('<span>',{class:resultados[i]&&resultados[i]._source&&resultados[i]._source.period&&resultados[i]._source.period.startDate&&resultados[i]._source.period.startDate!='NaT'?'':'textoColorGris' }).text(
                      resultados[i]&&resultados[i]._source&&resultados[i]._source.period&&resultados[i]._source.period.startDate&&resultados[i]._source.period.startDate!='NaT'?ObtenerFecha(resultados[i]._source.period.startDate,'fecha'):'No Disponible'
                  )
                  
                  ),*/
                $('<td>', { 'data-label': 'Estado', class: 'textoAlineadoCentrado' }).append(
                    resultados[i] && resultados[i]._source && resultados[i]._source.status ? resultados[i]._source.status : $('<span>', { class: 'textoColorGris' }).text('No Disponible')
                ),
            )
        )
    }
    if (!resultados.length) {
        $(selector).append(
            $('<tr>', { style: '' }).append(
                $('<td>', { 'data-label': '', 'colspan': 8 }).append(
                    $('<h4>', { class: 'titularColor textoColorPrimario mt-3 mb-3' }).text('No se Encontraron Contratos')
                )))
    }
}

function AgregarResultadosPagosComprador(datos, selector) {
    var resultados = datos.resultados;
    $(selector).html('');
    for (var i = 0; i < resultados.length; i++) {
        $(selector).append(
            $('<tr>').append(
                $('<td>', { 'data-label': 'Comprador' }).append(
                    resultados[i] && resultados[i]._source && resultados[i]._source.extra && resultados[i]._source.extra.buyerFullName ? $('<a>', { class: 'enlaceTablaGeneral', href: '/comprador/' + encodeURIComponent(resultados[i]._source.extra.buyerFullName) }).text(resultados[i]._source.extra.buyerFullName) : ''
                ),
                $('<td>', { 'data-label': 'Proveedor' }).append(
                    ObtenerProveedoresContrato(resultados[i]._source)
                ),
                $('<td>', { 'data-label': 'Título de Contrato', class: 'textoAlineadoIzquierda' }).append(
                    resultados[i] && resultados[i]._source && resultados[i]._source.title ? $('<a>', { class: 'enlaceTablaGeneral', href: '/proceso/' + encodeURIComponent(resultados[i]._source.extra.ocid) + '/?contrato=' + resultados[i]._source.id, toolTexto: resultados[i]._source.title }).text(ReducirTexto(resultados[i]._source.title, 80)) : $('<span>', { class: 'textoColorGris' }).text('No Disponible')
                ),
                $('<td>', { 'data-label': 'Monto del Contrato', class: 'textoAlineadoDerecha' }).append(
                    resultados[i] && resultados[i]._source && resultados[i]._source.value && Validar(resultados[i]._source.value.amount) ? [ValorMoneda(resultados[i]._source.value.amount), $('<span>', { class: 'textoColorPrimario', text: ' ' + resultados[i]._source.value.currency })] : ''


                ),
                $('<td>', { 'data-label': 'Suma de Todos los Pagos', class: 'textoAlineadoDerecha' }).append(
                    resultados[i] && resultados[i]._source && resultados[i]._source.extra && Validar(resultados[i]._source.extra.sumTransactions) ? [ValorMoneda(resultados[i]._source.extra.sumTransactions), $('<span>', { class: 'textoColorPrimario', text: ' HNL' })] : ''


                ),

                $('<td>', { 'data-label': 'Fecha de Último Pago', class: 'textoAlineadoCentrado' }).append(
                    $('<span>', { class: resultados[i] && resultados[i]._source && resultados[i]._source.extra && resultados[i]._source.extra.transactionLastDate && resultados[i]._source.extra.transactionLastDate != 'NaT' ? '' : 'textoColorGris' }).text(
                        resultados[i] && resultados[i]._source && resultados[i]._source.extra && resultados[i]._source.extra.transactionLastDate && resultados[i]._source.extra.transactionLastDate != 'NaT' ? ObtenerFecha(resultados[i]._source.extra.transactionLastDate, 'fecha') : 'No Disponible'
                    )

                )

            )
        )
    }
    if (!resultados.length) {
        $(selector).append(
            $('<tr>', { style: '' }).append(
                $('<td>', { 'data-label': '', 'colspan': 5 }).append(
                    $('<h4>', { class: 'titularColor textoColorPrimario mt-3 mb-3' }).text('No se Encontraron Pagos')
                )))
    }
}

function ObtenerProveedoresContrato(datos) {
    console.dir(datos)
    var elementos = [];
    if (datos && datos.implementation && datos.implementation.transactions && datos.implementation.transactions.length) {
        for (let i = 0; i < datos.implementation.transactions.length; i++) {
            if (datos.implementation.transactions[i].payee && datos.implementation.transactions[i].payee.id) {
                elementos.push(
                    $('<a>', { class: 'enlaceTablaGeneral', href: '/proveedor/' + encodeURIComponent(datos.implementation.transactions[i].payee.id) }).text(datos.implementation.transactions[i].payee.name)
                )
                elementos.push(' ');
            }


            return elementos;
        }
    }
}

function AgregarResultadosProcesosComprador(datos, selector) {
    var resultados = datos.resultados;
    $(selector).html('');
    for (var i = 0; i < resultados.length; i++) {
        $(selector).append(
            $('<tr>').append(
                $('<td>', { 'data-label': 'Comprador' }).append(
                    resultados[i] && resultados[i]._source && resultados[i]._source.extra && resultados[i]._source.extra.buyerFullName ? $('<a>', { class: 'enlaceTablaGeneral', href: '/comprador/' + encodeURIComponent(resultados[i]._source.extra.buyerFullName) }).text(resultados[i]._source.extra.buyerFullName) : ''
                ),
                $('<td>', { 'data-label': 'Id del Proceso' }).append(
                    resultados[i] && resultados[i]._source && resultados[i]._source.doc && resultados[i]._source.doc.ocid ? $('<a>', { class: 'enlaceTablaGeneral', href: '/proceso/' + encodeURIComponent(resultados[i]._source.doc.ocid) }).text(resultados[i]._source.doc.ocid) : ''
                ),
                $('<td>', { 'data-label': 'Título del Proceso' }).append(
                    resultados[i] && resultados[i]._source && resultados[i]._source.doc && resultados[i]._source.doc.compiledRelease && resultados[i]._source.doc.compiledRelease.tender && resultados[i]._source.doc.compiledRelease.tender.title ? $('<a>', { class: 'enlaceTablaGeneral', href: '/proceso/' + encodeURIComponent(resultados[i]._source.doc.ocid) }).text(resultados[i]._source.doc.tender.title) : $('<span>', { class: 'textoColorGris' }).text('No Disponible')
                ),
                $('<td>', { 'data-label': 'Modalidad de Compra' }).append(
                    resultados[i] && resultados[i]._source && resultados[i]._source.doc && resultados[i]._source.doc.compiledRelease && resultados[i]._source.doc.compiledRelease.tender && resultados[i]._source.doc.compiledRelease.tender.procurementMethodDetails ? resultados[i]._source.doc.tender.procurementMethodDetails : $('<span>', { class: 'textoColorGris' }).text('No Disponible')
                ),

                $('<td>', { 'data-label': 'Fecha de Publicación de la Licitación', class: 'textoAlineadoCentrado' }).append(
                    $('<span>', { class: resultados[i] && resultados[i]._source && resultados[i]._source.doc && resultados[i]._source.doc.compiledRelease && resultados[i]._source.doc.compiledRelease.date && resultados[i]._source.doc.compiledRelease.date != 'NaT' ? '' : 'textoColorGris' }).text(
                        resultados[i] && resultados[i]._source && resultados[i]._source.doc && resultados[i]._source.doc.compiledRelease && resultados[i]._source.doc.compiledRelease.date && resultados[i]._source.doc.compiledRelease.date != 'NaT' ? ObtenerFecha(resultados[i]._source.doc.compiledRelease.date, 'fecha') : 'No Disponible'
                    )

                ),
                $('<td>', { 'data-label': 'Fecha de Recepción de Ofertas', class: 'textoAlineadoCentrado' }).append(
                    $('<span>', { class: resultados[i] && resultados[i]._source && resultados[i]._source.doc && resultados[i]._source.doc.compiledRelease && resultados[i]._source.doc.compiledRelease.tender && resultados[i]._source.doc.compiledRelease.tender.tenderPeriod && resultados[i]._source.doc.compiledRelease.tender.tenderPeriod.startDate && resultados[i]._source.doc.compiledRelease.tender.tenderPeriod.startDate != 'NaT' ? '' : 'textoColorGris' }).text(
                        resultados[i] && resultados[i]._source && resultados[i]._source.doc && resultados[i]._source.doc.compiledRelease && resultados[i]._source.doc.compiledRelease.tender && resultados[i]._source.doc.compiledRelease.tender.tenderPeriod && resultados[i]._source.doc.compiledRelease.tender.tenderPeriod.startDate && resultados[i]._source.doc.compiledRelease.tender.tenderPeriod.startDate != 'NaT' ? ObtenerFecha(resultados[i]._source.doc.compiledRelease.tender.tenderPeriod.startDate, 'fecha') : 'No Disponible'
                    )

                ),
                $('<td>', { 'data-label': 'Estado' }).append(
                    resultados[i] && resultados[i]._source && resultados[i]._source.extra && resultados[i]._source.extra.lastSection ? resultados[i]._source.extra.lastSection : $('<span>', { class: 'textoColorGris' }).text('No Disponible')
                ),
                $('<td>', { 'data-label': 'Monto Contratado', class: 'textoAlineadoDerecha' }).append(
                    resultados[i]._source.doc.compiledRelease && resultados[i]._source.doc.compiledRelease.tender && resultados[i]._source.doc.compiledRelease.tender.extra && resultados[i]._source.doc.compiledRelease.tender.extra && Validar(resultados[i]._source.doc.compiledRelease.tender.extra.sumContracts) ? [ValorMoneda(resultados[i]._source.doc.compiledRelease.tender.extra.sumContracts), $('<span>', { class: 'textoColorPrimario', text: ' HNL' })] : ''


                )



            )
        )
    }
    if (!resultados.length) {
        $(selector).append(
            $('<tr>', { style: '' }).append(
                $('<td>', { 'data-label': '', 'colspan': 8 }).append(
                    $('<h4>', { class: 'titularColor textoColorPrimario mt-3 mb-3' }).text('No se Encontraron Procesos')
                )))
    }
}


function MostrarPaginacion(datos, selector, funcion) {
    var paginarPor = datos.parametros.paginarPor ? datos.parametros.paginarPor : datos.parametros.pagianrPor ? datos.parametros.pagianrPor : 5;
    var pagina = datos.parametros.pagina ? datos.parametros.pagina : 1
    var paginacion = ObtenerPaginacion(datos.paginador.page, Math.ceil(ObtenerNumero(datos.paginador['total.items']) / ObtenerNumero(paginarPor)) /* datos.paginador.num_pages*/ )
    $('.navegacionTablaGeneral' + selector).html('');
    if (datos.paginador.has_previous) {
        $('.navegacionTablaGeneral' + selector).append(
            $('<a href="javascript:void(0)"  pagina="' + datos.paginador.previous_page_number + '"  class="numerosNavegacionTablaGeneral"><span><i class="fa fa-angle-left"></i></span></a>').on({
                click: funcion
            })
        );
    }

    for (var i = 0; i < paginacion.length; i++) {
        if (paginacion[i] == '...') {
            $('.navegacionTablaGeneral' + selector).append(
                $('<a href="javascript:void(0)" class="numerosNavegacionTablaGeneral numeroNormalNavegacionTablaGeneral">').append($('<span>').text(paginacion[i]))
            );
        } else {
            $('.navegacionTablaGeneral' + selector).append(
                $('<a href="javascript:void(0)" pagina="' + paginacion[i] + '"  class="numerosNavegacionTablaGeneral ' + ((paginacion[i] == datos.paginador.page) ? 'current' : '') + '">').on({
                    click: funcion

                }).append($('<span>').text(paginacion[i]))
            );
        }
    }
    if (datos.paginador.has_next) {
        $('.navegacionTablaGeneral' + selector).append(
            $('<a href="javascript:void(0)" pagina="' + datos.paginador.next_page_number + '" class="numerosNavegacionTablaGeneral"><span><i class="fa fa-angle-right"></i></span></a>').on({
                click: funcion

            })
        );
    }

    $('.totalResultado' + selector).html(datos.paginador['total.items']);
    $('.inicioResultado' + selector).html((ObtenerNumero(paginarPor) * (ObtenerNumero(pagina))) - ObtenerNumero(paginarPor));
    $('.finResultado' + selector).html(((ObtenerNumero(paginarPor) * (ObtenerNumero(pagina)) > ObtenerNumero(datos.paginador['total.items'])) ? ObtenerNumero(datos.paginador['total.items']) : (ObtenerNumero(paginarPor) * (ObtenerNumero(pagina)))));


}

function PaginaContratosComprador(numero) {
    PushDireccionContratos(AccederUrlPagina({ paginaCon: numero }));
}

function PaginaPagosComprador(numero) {
    PushDireccionPagos(AccederUrlPagina({ paginaPag: numero }));
}

function PaginaProcesosComprador(numero) {
    PushDireccionProcesos(AccederUrlPagina({ paginaPro: numero }));
}

function PushDireccionContratos(direccion) {
    window.history.pushState({}, document.title, direccion);
    CargarContratosComprador();
}

function PushDireccionPagos(direccion) {
    window.history.pushState({}, document.title, direccion);
    CargarPagosComprador();
}

function PushDireccionProcesos(direccion) {
    window.history.pushState({}, document.title, direccion);
    CargarProcesosComprador();
}

function InputFiltroContratos(filtros, desUrl) {
    PushDireccionContratos(AccederUrlPagina(filtros, desUrl));
}

function InputFiltroPagos(filtros, desUrl) {
    PushDireccionPagos(AccederUrlPagina(filtros, desUrl));
}

function InputFiltroProcesos(filtros, desUrl) {
    PushDireccionProcesos(AccederUrlPagina(filtros, desUrl));
}

function AccederUrlPagina(opciones, desUrl) {
    var direccion = ('/comprador/' + encodeURIComponent(compradorId) + '/?' +

        'paginaCon=' + (opciones.paginaCon ? opciones.paginaCon : (ObtenerNumero(ObtenerValor('paginaCon')) ? ObtenerNumero(ObtenerValor('paginaCon')) : 1)) +
        '&paginarPorCon=' + (opciones.paginarPorCon ? opciones.paginarPorCon : (ObtenerNumero(ObtenerValor('paginarPorCon')) ? ObtenerNumero(ObtenerValor('paginarPorCon')) : 5)) +
        (ValidarCadena(opciones.compradorCon) ? '&compradorCon=' + encodeURIComponent(opciones.compradorCon) : (ValidarCadena(ObtenerValor('compradorCon')) && !desUrl ? '&compradorCon=' + ObtenerValor('compradorCon') : '')) +
        (ValidarCadena(opciones.tituloCon) ? '&tituloCon=' + encodeURIComponent(opciones.tituloCon) : (ValidarCadena(ObtenerValor('tituloCon')) && !desUrl ? '&tituloCon=' + ObtenerValor('tituloCon') : '')) +
        (ValidarCadena(opciones.descripcionCon) ? '&descripcionCon=' + encodeURIComponent(opciones.descripcionCon) : (ValidarCadena(ObtenerValor('descripcionCon')) && !desUrl ? '&descripcionCon=' + ObtenerValor('descripcionCon') : '')) +
        (ValidarCadena(opciones.categoriaCompraCon) ? '&categoriaCompraCon=' + encodeURIComponent(opciones.categoriaCompraCon) : (ValidarCadena(ObtenerValor('categoriaCompraCon')) && !desUrl ? '&categoriaCompraCon=' + ObtenerValor('categoriaCompraCon') : '')) +
        (ValidarCadena(opciones.fechaFirmaCon) ? '&fechaFirmaCon=' + encodeURIComponent(opciones.fechaFirmaCon) : (ValidarCadena(ObtenerValor('fechaFirmaCon')) && !desUrl ? '&fechaFirmaCon=' + ObtenerValor('fechaFirmaCon') : '')) +
        (ValidarCadena(opciones.fechaInicioCon) ? '&fechaInicioCon=' + encodeURIComponent(opciones.fechaInicioCon) : (ValidarCadena(ObtenerValor('fechaInicioCon')) && !desUrl ? '&fechaInicioCon=' + ObtenerValor('fechaInicioCon') : '')) +
        (ValidarCadena(opciones.montoCon) ? '&montoCon=' + encodeURIComponent(reemplazarValor(opciones.montoCon, ',', '')) : (ValidarCadena(ObtenerValor('montoCon')) && !desUrl ? '&montoCon=' + ObtenerValor('montoCon') : '')) +
        (ValidarCadena(opciones.estadoCon) ? '&estadoCon=' + encodeURIComponent(opciones.estadoCon) : (ValidarCadena(ObtenerValor('estadoCon')) && !desUrl ? '&estadoCon=' + ObtenerValor('estadoCon') : '')) +
        (ValidarCadena(opciones.ordenarPorCon) ? '&ordenarPorCon=' + encodeURIComponent(opciones.ordenarPorCon) : (ValidarCadena(ObtenerValor('ordenarPorCon')) && !desUrl ? '&ordenarPorCon=' + ObtenerValor('ordenarPorCon') : '')) +


        '&paginaPag=' + (opciones.paginaPag ? opciones.paginaPag : (ObtenerNumero(ObtenerValor('paginaPag')) ? ObtenerNumero(ObtenerValor('paginaPag')) : 1)) +
        '&paginarPorPag=' + (opciones.paginarPorPag ? opciones.paginarPorPag : (ObtenerNumero(ObtenerValor('paginarPorPag')) ? ObtenerNumero(ObtenerValor('paginarPorPag')) : 5)) +
        (ValidarCadena(opciones.ordenarPorPag) ? '&ordenarPorPag=' + encodeURIComponent(opciones.ordenarPorPag) : (ValidarCadena(ObtenerValor('ordenarPorPag')) && !desUrl ? '&ordenarPorPag=' + ObtenerValor('ordenarPorPag') : '')) +
        (ValidarCadena(opciones.compradorPag) ? '&compradorPag=' + encodeURIComponent(opciones.compradorPag) : (ValidarCadena(ObtenerValor('compradorPag')) && !desUrl ? '&compradorPag=' + ObtenerValor('compradorPag') : '')) +
        (ValidarCadena(opciones.tituloPag) ? '&tituloPag=' + encodeURIComponent(opciones.tituloPag) : (ValidarCadena(ObtenerValor('tituloPag')) && !desUrl ? '&tituloPag=' + ObtenerValor('tituloPag') : '')) +
        (ValidarCadena(opciones.montoPag) ? '&montoPag=' + encodeURIComponent(reemplazarValor(opciones.montoPag, ',', '')) : (ValidarCadena(ObtenerValor('montoPag')) && !desUrl ? '&montoPag=' + ObtenerValor('montoPag') : '')) +
        (ValidarCadena(opciones.pagosPag) ? '&pagosPag=' + encodeURIComponent(opciones.pagosPag) : (ValidarCadena(ObtenerValor('tituloPag')) && !desUrl ? '&tituloPag=' + ObtenerValor('tituloPag') : '')) +
        (ValidarCadena(opciones.fechaPag) ? '&fechaPag=' + encodeURIComponent(reemplazarValor(opciones.fechaPag, ',', '')) : (ValidarCadena(ObtenerValor('fechaPag')) && !desUrl ? '&fechaPag=' + ObtenerValor('fechaPag') : '')) +

        '&paginaPro=' + (opciones.paginaPro ? opciones.paginaPro : (ObtenerNumero(ObtenerValor('paginaPro')) ? ObtenerNumero(ObtenerValor('paginaPro')) : 1)) +
        '&paginarPorPro=' + (opciones.paginarPorPro ? opciones.paginarPorPro : (ObtenerNumero(ObtenerValor('paginarPorPro')) ? ObtenerNumero(ObtenerValor('paginarPorPro')) : 5)) +
        (ValidarCadena(opciones.clasificacionPro) ? '&clasificacionPro=' + encodeURIComponent(opciones.clasificacionPro) : (ValidarCadena(ObtenerValor('clasificacionPro')) && !desUrl ? '&clasificacionPro=' + ObtenerValor('clasificacionPro') : '')) +
        (ValidarCadena(opciones.cantidadContratosPro) ? '&cantidadContratosPro=' + encodeURIComponent(reemplazarValor(opciones.cantidadContratosPro, ',', '')) : (ValidarCadena(ObtenerValor('cantidadContratosPro')) && !desUrl ? '&cantidadContratosPro=' + ObtenerValor('cantidadContratosPro') : '')) +
        (ValidarCadena(opciones.montoPro) ? '&montoPro=' + encodeURIComponent(reemplazarValor(opciones.montoPro, ',', '')) : (ValidarCadena(ObtenerValor('montoPro')) && !desUrl ? '&montoPro=' + ObtenerValor('montoPro') : ''))

    );



    return direccion;
}

function ObtenerOrdenConversion(texto) {
    texto = ObtenerTexto(texto);
    if (/desc\(/.test(texto)) {
        texto = texto.replace('desc(', '').replace(')', '')
        return 'desc(' + filtrosAPropiedades[texto] + ')'
    } else if (/asc\(/.test(texto)) {
        texto = texto.replace('asc(', '').replace(')', '')
        return 'asc(' + filtrosAPropiedades[texto] + ')'
    }
    return texto
}

function ObtenerFiltrosContratos(sufijo) {
    var parametros = {}
    parametros[sufijo ? 'pagina' + sufijo : 'pagina'] = ObtenerNumero(ObtenerValor('paginaCon')) ? ObtenerNumero(ObtenerValor('paginaCon')) : 1;
    parametros[sufijo ? 'paginarPor' + sufijo : 'paginarPor'] = ObtenerNumero(ObtenerValor('paginarPorCon')) ? ObtenerNumero(ObtenerValor('paginarPorCon')) : 5;
    if (Validar(ObtenerValor('proveedorCon'))) {
        parametros[sufijo ? 'proveedor' + sufijo : 'proveedor'] = decodeURIComponent(ObtenerValor('proveedorCon'));
    }
    if (Validar(ObtenerValor('tituloCon'))) {
        parametros[sufijo ? 'titulo' + sufijo : 'titulo'] = decodeURIComponent(ObtenerValor('tituloCon'));
    }
    if (Validar(ObtenerValor('descripcionCon'))) {
        parametros[sufijo ? 'descripcion' + sufijo : 'descripcion'] = decodeURIComponent(ObtenerValor('descripcionCon'));
    }
    if (Validar(ObtenerValor('categoriaCompraCon'))) {
        parametros[sufijo ? 'categoriaCompra' + sufijo : 'categoriaCompra'] = decodeURIComponent(ObtenerValor('categoriaCompraCon'));
    }
    if (Validar(ObtenerValor('fechaFirmaCon'))) {
        parametros[sufijo ? 'fechaFirma' + sufijo : 'fechaFirma'] = decodeURIComponent(ObtenerValor('fechaFirmaCon'));
    }
    if (Validar(ObtenerValor('fechaInicioCon'))) {
        parametros[sufijo ? 'fechaInicio' + sufijo : 'fechaInicio'] = decodeURIComponent(ObtenerValor('fechaInicioCon'));
    }
    if (Validar(ObtenerValor('montoCon'))) {
        parametros[sufijo ? 'monto' + sufijo : 'monto'] = decodeURIComponent(ObtenerValor('montoCon'));
    }
    if (Validar(ObtenerValor('estadoCon'))) {
        parametros[sufijo ? 'estado' + sufijo : 'estado'] = decodeURIComponent(ObtenerValor('estadoCon'));
    }
    if (Validar(ObtenerValor('tituloLicitacionCon'))) {
        parametros[sufijo ? 'tituloLicitacion' + sufijo : 'tituloLicitacion'] = decodeURIComponent(ObtenerValor('tituloLicitacionCon'));
    }
    if (Validar(ObtenerValor('dependencias'))) {
        parametros['dependencias'] = decodeURIComponent(ObtenerValor('dependencias'));
    }
    if (Validar(ObtenerValor('ordenarPorCon'))) {
        parametros[sufijo ? 'ordenarPor' + sufijo : 'ordenarPor'] = sufijo ? decodeURIComponent(ObtenerValor('ordenarPorCon')) : ObtenerOrdenConversion(decodeURIComponent(ObtenerValor('ordenarPorCon')));
    }




    return parametros;
}

function ObtenerFiltrosPagos(sufijo) {
    var parametros = {}
    parametros[sufijo ? 'pagina' + sufijo : 'pagina'] = ObtenerNumero(ObtenerValor('paginaPag')) ? ObtenerNumero(ObtenerValor('paginaPag')) : 1;
    parametros[sufijo ? 'paginarPor' + sufijo : 'paginarPor'] = ObtenerNumero(ObtenerValor('paginarPorPag')) ? ObtenerNumero(ObtenerValor('paginarPorPag')) : 5;
    if (Validar(ObtenerValor('compradorPag'))) {
        parametros[sufijo ? 'comprador' + sufijo : 'comprador'] = decodeURIComponent(ObtenerValor('compradorPag'));
    }
    if (Validar(ObtenerValor('proveedorPag'))) {
        parametros[sufijo ? 'proveedor' + sufijo : 'proveedor'] = decodeURIComponent(ObtenerValor('proveedorPag'));
    }
    if (Validar(ObtenerValor('tituloPag'))) {
        parametros[sufijo ? 'titulo' + sufijo : 'titulo'] = decodeURIComponent(ObtenerValor('tituloPag'));
    }
    if (Validar(ObtenerValor('montoPag'))) {
        parametros[sufijo ? 'monto' + sufijo : 'monto'] = decodeURIComponent(ObtenerValor('montoPag'));
    }
    if (Validar(ObtenerValor('pagosPag'))) {
        parametros[sufijo ? 'pagos' + sufijo : 'pagos'] = decodeURIComponent(ObtenerValor('pagosPag'));
    }
    if (Validar(ObtenerValor('fechaPag'))) {
        parametros[sufijo ? 'fecha' + sufijo : 'fecha'] = decodeURIComponent(ObtenerValor('fechaPag'));
    }
    if (Validar(ObtenerValor('dependencias'))) {
        parametros['dependencias'] = decodeURIComponent(ObtenerValor('dependencias'));
    }
    if (Validar(ObtenerValor('ordenarPorPag'))) {
        parametros[sufijo ? 'ordenarPor' + sufijo : 'ordenarPor'] = sufijo ? decodeURIComponent(ObtenerValor('ordenarPorPag')) : ObtenerOrdenConversion(decodeURIComponent(ObtenerValor('ordenarPorPag')));
    }
    return parametros;
}

function ObtenerFiltrosProcesos(sufijo) {
    var parametros = {}
    parametros[sufijo ? 'pagina' + sufijo : 'pagina'] = ObtenerNumero(ObtenerValor('paginaPro')) ? ObtenerNumero(ObtenerValor('paginaPro')) : 1;
    parametros[sufijo ? 'paginarPor' + sufijo : 'paginarPor'] = ObtenerNumero(ObtenerValor('paginarPorPro')) ? ObtenerNumero(ObtenerValor('paginarPorPro')) : 5;
    if (Validar(ObtenerValor('compradorPro'))) {
        parametros[sufijo ? 'comprador' + sufijo : 'comprador'] = decodeURIComponent(ObtenerValor('compradorPro'));
    }
    if (Validar(ObtenerValor('ocidPro'))) {
        parametros[sufijo ? 'ocid' + sufijo : 'ocid'] = decodeURIComponent(ObtenerValor('ocidPro'));
    }
    if (Validar(ObtenerValor('tituloPro'))) {
        parametros[sufijo ? 'titulo' + sufijo : 'titulo'] = decodeURIComponent(ObtenerValor('tituloPro'));
    }
    if (Validar(ObtenerValor('categoriaCompraPro'))) {
        parametros[sufijo ? 'categoriaCompra' + sufijo : 'categoriaCompra'] = decodeURIComponent(ObtenerValor('categoriaCompraPro'));
    }
    if (Validar(ObtenerValor('estadoPro'))) {
        parametros[sufijo ? 'estado' + sufijo : 'estado'] = decodeURIComponent(ObtenerValor('estadoPro'));
    }
    if (Validar(ObtenerValor('montoContratadoPro'))) {
        parametros[sufijo ? 'montoContratado' + sufijo : 'montoContratado'] = decodeURIComponent(ObtenerValor('montoContratadoPro'));
    }
    if (Validar(ObtenerValor('fechaInicioPro'))) {
        parametros[sufijo ? 'fechaInicio' + sufijo : 'fechaInicio'] = decodeURIComponent(ObtenerValor('fechaInicioPro'));
    }
    if (Validar(ObtenerValor('fechaRecepcionPro'))) {
        parametros[sufijo ? 'fechaRecepcion' + sufijo : 'fechaRecepcion'] = decodeURIComponent(ObtenerValor('fechaRecepcionPro'));
    }
    if (Validar(ObtenerValor('fechaPublicacionPro'))) {
        parametros[sufijo ? 'fechaPublicacion' + sufijo : 'fechaPublicacion'] = decodeURIComponent(ObtenerValor('fechaPublicacionPro'));
    }
    if (Validar(ObtenerValor('dependencias'))) {
        parametros['dependencias'] = decodeURIComponent(ObtenerValor('dependencias'));
    }
    if (Validar(ObtenerValor('ordenarPorPro'))) {
        parametros[sufijo ? 'ordenarPor' + sufijo : 'ordenarPor'] = sufijo ? decodeURIComponent(ObtenerValor('ordenarPorPro')) : ObtenerOrdenConversion(decodeURIComponent(ObtenerValor('ordenarPorPro')));
    }
    return parametros;
}


function OrdenFiltroContratos(filtro, orden) {
    console.dir('filtro contratos')
    console.dir(filtro)
    switch (orden) {
        case 'ascendente':
            PushDireccionContratos(AccederUrlPagina({ paginaCon: 1, ordenarPorCon: 'asc(' + /*filtrosAPropiedades[*/ filtro /*]*/ + ')' }));
            break;
        case 'descendente':
            PushDireccionContratos(AccederUrlPagina({ paginaCon: 1, ordenarPorCon: 'desc(' + /*filtrosAPropiedades[*/ filtro /*]*/ + ')' }));
            break;
        case 'neutro':
            var filtros = ObtenerFiltrosContratos('Con');
            if (filtros['ordenarPorCon']) {
                delete filtros['ordenarPorCon'];
            }
            filtros['paginaCon'] = 1;
            PushDireccionContratos(AccederUrlPagina(filtros, true));
            break;
        default:
            var filtros = ObtenerFiltrosContratos('Con');
            if (filtros['ordenarPorCon']) {
                delete filtros['ordenarPorCon'];
            }
            filtros['paginaCon'] = 1;
            PushDireccionContratos(AccederUrlPagina(filtros, true));
            break;

    }
}

function OrdenFiltroPagos(filtro, orden) {
    switch (orden) {
        case 'ascendente':
            PushDireccionPagos(AccederUrlPagina({ paginaPag: 1, ordenarPorPag: 'asc(' + /*filtrosAPropiedades[*/ filtro /*]*/ + ')' }));
            break;
        case 'descendente':
            PushDireccionPagos(AccederUrlPagina({ paginaPag: 1, ordenarPorPag: 'desc(' + /*filtrosAPropiedades[*/ filtro /*]*/ + ')' }));
            break;
        case 'neutro':
            var filtros = ObtenerFiltrosPagos('Pag');
            if (filtros['ordenarPorPag']) {
                delete filtros['ordenarPorPag'];
            }
            filtros['paginaPag'] = 1;
            PushDireccionPagos(AccederUrlPagina(filtros, true));
            break;
        default:
            var filtros = ObtenerFiltrosPagos('Pag');
            if (filtros['ordenarPorPag']) {
                delete filtros['ordenarPorPag'];
            }
            filtros['paginaPag'] = 1;
            PushDireccionPagos(AccederUrlPagina(filtros, true));
            break;

    }
}

function OrdenFiltroProcesos(filtro, orden) {
    switch (orden) {
        case 'ascendente':
            PushDireccionProcesos(AccederUrlPagina({ paginaPro: 1, ordenarPorPro: 'asc(' + /*filtrosAPropiedades[*/ filtro /*]*/ + ')' }));
            break;
        case 'descendente':
            PushDireccionProcesos(AccederUrlPagina({ paginaPro: 1, ordenarPorPro: 'desc(' + /*filtrosAPropiedades[*/ filtro /*]*/ + ')' }));
            break;
        case 'neutro':
            var filtros = ObtenerFiltrosProcesos('Pro');
            if (filtros['ordenarPorPro']) {
                delete filtros['ordenarPorPro'];
            }
            filtros['paginaPro'] = 1;
            PushDireccionProcesos(AccederUrlPagina(filtros, true));
            break;
        default:
            var filtros = ObtenerFiltrosProcesos('Pro');
            if (filtros['ordenarPorPro']) {
                delete filtros['ordenarPorPro'];
            }
            filtros['paginaPro'] = 1;
            PushDireccionProcesos(AccederUrlPagina(filtros, true));
            break;

    }
}