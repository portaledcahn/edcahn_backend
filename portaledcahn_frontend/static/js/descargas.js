$('.opcionFiltroBusquedaPagina').on('click',function(e){
    $(e.currentTarget).addClass('active')
  })
  tippy('#buscarInformacion', {
    arrow: true,
    arrowType: 'round',
    content:'Haz click para buscar'
  });