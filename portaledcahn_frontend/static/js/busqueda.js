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
  tippy('#campoBusquedaProceso', {
      arrow: true,
      arrowType: 'round',
      content:'Ingresa un texto a buscar',
      placement: 'bottom'
    });
    tippy('#botonBusquedaProceso', {
      arrow: true,
      arrowType: 'round',
      content:'Haz click para buscar'
    });
  $('.etiquetaFiltro i').on('click',function(e){
    $(e.currentTarget).parent().remove();
  });
  
  
  // $('.resultadoBusquedaProcesoASD').on('click',function(e){
  //   window.location.href="proceso.html";
  // });
  // tippy('#informacionTipoDatos', {
  //   arrow: true,
  //   arrowType: 'round',
  //   content:'¿Que son estos tipos de datos?'
  // });
  
  $(function () {
    view = new ElasticList({
        el: $("#elastic-list"),
        data: dataElastic,
        hasFilter: true,
        onchange: function (filters) {
            console.info(filters);
        },
        columns: [
            {
              title: "Selección",
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
            } ]
    });
  });