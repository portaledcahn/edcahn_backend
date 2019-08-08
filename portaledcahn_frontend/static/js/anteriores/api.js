$('.botonAbrirElementoApi').on('click',function(e){
    if($(e.currentTarget).parent().parent().hasClass('abierto')){
      $(e.currentTarget).parent().parent().removeClass('abierto');
    }else{
      $(e.currentTarget).parent().parent().addClass('abierto');
    }
   $(e.currentTarget).parent().parent().find('.elementoApiInformacion').slideToggle( "slow", function() {
  });
  });
  
  $('.metodo').on('click',function(e){
    if($(e.currentTarget).parent().hasClass('abierto')){
      $(e.currentTarget).parent().removeClass('abierto');
    }else{
      $(e.currentTarget).parent().addClass('abierto');
    }
   $(e.currentTarget).parent().find('.metoApiInformacion').slideToggle( "slow", function() {
  });
  });
  
  
  tippy('.botonAbrirElementoApi', {
      arrow: true,
      arrowType: 'round',
      content:'Expandir Métodos'
    });
    tippy('.metodo', {
      arrow: true,
      arrowType: 'round',
      content:'Expandir',
      placement:'top-end'
    });