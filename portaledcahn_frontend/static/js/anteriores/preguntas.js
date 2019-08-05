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
    json={
"ocid": "ocds-213czf-000-00001",
"id": "ocds-213czf-000-00001-05-contract",
"date": "2010-05-10T10:30:00Z",
"language": "en",
"tag": [
 "contract"
],
"initiationType": "tender",
"parties": [
{
     "identifier": {},
     "name": "London Borough of Barnet",
     "address": {},
     "contactPoint": {},
     "roles": [],
     "id": "GB-LAC-E09000003"
 },
{
     "identifier": {},
     "additionalIdentifiers": [],
     "name": "AnyCorp Cycle Provision",
     "address": {},
     "contactPoint": {},
     "roles": [],
     "id": "GB-COH-1234567844"
 }
]};
    $('#jsonEjemplo').jsonview(json);