/*OCID del proceso de contratacion*/
var procesoOcid='';
var procesoRecord={};


/*Onload de la Página*/
$(function(){
    procesoOcid=$('#procesoOcid').val();
    /*Añadir evento click a los pasos del proceso de contratación para mostrar el div de su contenido*/
    $('.botonPasoProceso').on('click',function(evento){
      if(!$(evento.currentTarget).hasClass('deshabilitado')){
        $('.botonPasoProceso').removeClass('activo');
        $(evento.currentTarget).addClass('activo');

        $('.pasoOcultar').hide();
        $('.tituloOcultar').hide();
        var estado=$(evento.currentTarget).attr('estado');
        $('.'+estado+'.titulo').show();
        var panel=ObtenerPrimeraPropiedad(estado);
        if(panel){
          $('.botonPropiedadProceso').removeClass('activo');
          $('.botonPropiedadProceso[propiedad="'+panel+'"]').addClass('activo');
          $('.'+estado+'.'+panel).show();
        }
        var propiedades=['documentos','historial','invitados','solicitados','informacion'];
        for(var i=0;i<propiedades.length;i++){
          MostrarPropiedadProceso(estado,propiedades[i]);
        }
      }
    });
    /*Añadir evento click a los atributos del proceso de contratación para mostrar el div de su contenido*/
    $('.botonPropiedadProceso').on('click',function(evento){
      $('.botonPropiedadProceso').removeClass('activo');
      if(!$(evento.currentTarget).hasClass('deshabilitado')){
        $('.pasoOcultar').hide();
        $(evento.currentTarget).addClass('activo');
        $('.'+$(evento.currentTarget).attr('propiedad')+'.'+$('.botonPasoProceso.activo').attr('estado')).show();
      }
    });
    ObtenerProceso();
    /*Añadir Titles a las propiedades del proceso de contratacion*/
    tippy('.botonPropiedadProceso[propiedad="informacion"] ', {
    arrow: true,
    arrowType: 'round',
    content:'Información',
    placement:'bottom-end'
    });
  
    tippy('.botonPropiedadProceso[propiedad="documentos"] ', {
    arrow: true,
    arrowType: 'round',
    content:'Documentos',
    placement:'bottom-end'
    });
  
    tippy('.botonPropiedadProceso[propiedad="historial"] ', {
    arrow: true,
    arrowType: 'round',
    content:'Historial',
    placement:'bottom-end'
    });
  
    tippy('.botonPropiedadProceso[propiedad="invitados"] ', {
    arrow: true,
    arrowType: 'round',
    content:'Invitados',
    placement:'bottom-end'
    });
  
    tippy('.botonPropiedadProceso[propiedad="solicitados"] ', {
    arrow: true,
    arrowType: 'round',
    content:'Items Solicitados',
    placement:'bottom-end'
    });
    tippy('#informacionTipoDatos', {
    arrow: true,
    arrowType: 'round',
    content:'¿Que son estos tipos de datos?'
  });
  
    
  });

function MostrarPropiedadProceso(estado,nombre){
    if($('.'+estado+'.'+nombre).html().trim()){
        $('.botonPropiedadProceso[propiedad="'+nombre+'"]').show();
        }else{
        $('.botonPropiedadProceso[propiedad="'+nombre+'"]').hide();
        }
}
function MostrarPrimerProceso(){
  var pasos=$('.botonPasoProceso').not('.deshabilitado');
  if(pasos.length){
    $('.botonPasoProceso').removeClass('activo');
    $(pasos[0]).addClass('activo');

    $('.pasoOcultar').hide();
    $('.tituloOcultar').hide();
    var estado=$(pasos[0]).attr('estado');
    $('.'+estado+'.titulo').show();
    var panel=ObtenerPrimeraPropiedad(estado);
    if(panel){
      $('.botonPropiedadProceso').removeClass('activo');
      $('.botonPropiedadProceso[propiedad="'+panel+'"]').addClass('activo');
      $('.'+estado+'.'+panel).show();
    }
    var propiedades=['informacion','documentos','historial','invitados','solicitados'];
    for(var i=0;i<propiedades.length;i++){
      MostrarPropiedadProceso(estado,propiedades[i]);
    }
  }
  
}

function ObtenerProceso(){
  MostrarEspera('body .tamanoMinimo');
  $.get(api+"/record/"+procesoOcid,function(datos){
    if(datos&&!datos.detail){
      $('#procesoCargaContedor').show();
      procesoRecord=datos;
      DefinirElementosPlaneacion();
      DefinirElementosConvocatoria();
      DefinirElementosAdjudicacion();
      DefinirElementosContrato();
      //DefinirElementosImplementacion();
      DeshabilitarItems();
      MostrarPrimerProceso();
      OcultarEspera('body .tamanoMinimo');
    }else{
      /*No se encontro el proceso de contratacion */
    }
    
    console.dir(datos)
}).fail(function() {
  /*Error de Conexion al servidor */
  console.dir('error get')
  
});
}



function DeshabilitarItems(){
  var pasos=['planificacion','convocatoria','adjudicacion','contrato','implementacion'];
  for(var i=0;i<pasos.length;i++){
    DeshabilitarPaso(pasos[i]);
  }
}
function DeshabilitarPaso(paso){
  if(ContarPropiedades(paso)==0){
    $('.botonPasoProceso[estado="'+paso+'"]').addClass('deshabilitado');
  }
}
function ContarPropiedades(paso){
  var numeroPropiedades=0;
  var propiedades=['informacion','documentos','historial','invitados','solicitados'];
  for(var i=0;i<propiedades.length;i++){
    if($('.'+paso+'.'+propiedades[i]).html().trim()!=''){
      numeroPropiedades++;
    }
  }
  return numeroPropiedades;
}
function ObtenerPropiedades(paso){
  var procesoPropiedades=[];
  var propiedades=['informacion','documentos','historial','invitados','solicitados'];
  for(var i=0;i<propiedades.length;i++){
    if($('.'+paso+'.'+propiedades[i]).html().trim()!=''){
      procesoPropiedades.push(propiedades[i])
    }
  }
  return procesoPropiedades;
}
function ObtenerPrimeraPropiedad(paso){
      var propiedades=ObtenerPropiedades(paso);
      if(propiedades.length){
        return propiedades[0];
      }else{
        return '';
      }
}

function ObtenerItems(items){
  var elementos=[];
  for(var i=0;i<items.length;i++){
    elementos.push(
      $('<tr>').append(
        $('<td>',{'data-label':'id',text:((items[i].classification&&items[i].classification.id)?items[i].classification.id:null)}),
        $('<td>',{'data-label':'Clasificación',text:((items[i].classification&&items[i].classification.scheme)?items[i].classification.scheme:null)}),
        $('<td>',{'data-label':'Descripción',text:((items[i].classification&&items[i].classification.description)?items[i].classification.description:null)}),
        /*$('<td>',{text:items[i].description}),*/
        $('<td>',{'data-label':'Cantidad',text:items[i].quantity}),
        $('<td>',{'data-label':'Precio',text:((items[i].unit&&items[i].unit.value&&items[i].unit.value.amount)?items[i].unit.value.amount:null)}),
        $('<td>',{'data-label':'Unidad',text:((items[i].unit&&items[i].unit.name)?items[i].unit.name:null)})
        
      ),
      $('<tr>').append(
        $('<th>',{text:'Especificaciones',style:'vertical-align:top'}),
        $('<td>',{'colspan':4,text:items[i].description,class:'textoAlineadoJustificado'})
      )
    )
  }
  return elementos;
}
function ObtenerCompradores(partes,comprador){
  var elementos=[]
  for(i=0;i<partes.length;i++){
    if(partes[i].roles&&partes[i].roles.includes('buyer')){
      elementos.push(
        $('<tr>').append(
        $('<td>',{class:'tituloTablaCaracteristicas',text:partes[i].memberOf&&partes[i].memberOf.length ? 'Unidad Ejecutora:': 'Comprador'}),
        $('<td>',{class:'contenidoTablaCaracteristicas'}).append(
          $('<a>',{text:partes[i].name,class:'enlaceTablaGeneral',href:'/comprador/'+partes[i].id})
        )
      )
      )
    }
  }
  return elementos;
}

function ObtenerDatosContacto(partes,tipo,nombres){
  var elementos=[]
  for(i=0;i<partes.length;i++){
    if(partes[i].roles&&partes[i].roles.includes(tipo)){
      elementos.push(
        $('<div>',{class:'col-md-6'}).append(
          $('<h4>',{class:'titularCajonSombreado',text:'Datos de Contacto de '+((partes[i].memberOf&&partes[i].memberOf.length) ? nombres[0]: nombres[1])}),
          $('<div>',{class:'cajonSombreado'}).append(
            $('<div>',{class:'contenedorProceso informacionProceso'}).append(
              $('<div>',{class:'contenedorTablaCaracteristicas'}).append(
                $('<table>').append(
                  $('<tbody>').append(
                    
                    partes[i].address&&partes[i].address.region ? 
                    $('<tr>').append(
                      $('<td>',{class:'tituloTablaCaracteristicas',text:'Departamento:'}),
                      $('<td>',{class:'contenidoTablaCaracteristicas',text:partes[i].address.region})
                    )
                    : null,
                    partes[i].address&&partes[i].address.locality ? 
                    $('<tr>').append(
                      $('<td>',{class:'tituloTablaCaracteristicas',text:'Municipio:'}),
                      $('<td>',{class:'contenidoTablaCaracteristicas',text:partes[i].address.locality})
                    )
                    : null,
                    partes[i].address&&partes[i].address.streetAddress ? 
                    $('<tr>').append(
                      $('<td>',{class:'tituloTablaCaracteristicas',text:'Direccción:'}),
                      $('<td>',{class:'contenidoTablaCaracteristicas',text:partes[i].address.streetAddress})
                    )
                    : null,
                    partes[i].contactPoint&&partes[i].contactPoint.name ? 
                    $('<tr>').append(
                      $('<td>',{class:'tituloTablaCaracteristicas',text:'Encargado:'}),
                      $('<td>',{class:'contenidoTablaCaracteristicas',text:partes[i].contactPoint.name})
                    )
                    : null,
                    partes[i].contactPoint&&partes[i].contactPoint.email ? 
                    $('<tr>').append(
                      $('<td>',{class:'tituloTablaCaracteristicas',text:'Correo Electronico:'}),
                      $('<td>',{class:'contenidoTablaCaracteristicas',text:partes[i].contactPoint.email})
                    )
                    : null,
                    partes[i].contactPoint&&partes[i].contactPoint.telephone ? 
                    $('<tr>').append(
                      $('<td>',{class:'tituloTablaCaracteristicas',text:'Telefono:'}),
                      $('<td>',{class:'contenidoTablaCaracteristicas',text:partes[i].contactPoint.telephone})
                    )
                    : null,
                    partes[i].contactPoint&&partes[i].contactPoint.faxNumber ? 
                    $('<tr>').append(
                      $('<td>',{class:'tituloTablaCaracteristicas',text:'Fax:'}),
                      $('<td>',{class:'contenidoTablaCaracteristicas',text:partes[i].contactPoint.faxNumber})
                    )
                    : null,
                    partes[i].contactPoint&&partes[i].contactPoint.url ? 
                    $('<tr>').append(
                      $('<td>',{class:'tituloTablaCaracteristicas',text:'Sitio:'}),
                      $('<td>',{class:'contenidoTablaCaracteristicas'}).append(
                        $('<a>',{text:partes[i].contactPoint.url,class:'enlaceTablaGeneral',href:partes[i].contactPoint.url})
                      )
                    )
                    : null
                  )
                )
              )
            )
          )
          
        )


        
      )
    }
  }
  return elementos;
}


function ObtenerEstructuraPresupuestaria(desglosePresupuesto){
  var elementos=[]
  for(var i=0;i<desglosePresupuesto.length;i++){
    if(desglosePresupuesto[i].classifications){
      elementos.push(
        $('<div>', {class:' cajonSombreado contenedorDetalleProcesoDatos mt-1'}).append(
          $('<div>',{class:'contenedorProceso informacionProceso'}).append(
            $('<div>',{class:'contenedorTablaCaracteristicas'}).append(
              $('<table>').append(
                $('<tbody>').append(
                  (desglosePresupuesto[i].classifications.actividadObra?
                    $('<tr>').append(
                      $('<td>',{class:'tituloTablaCaracteristicas',text:'Actividad Obra:'}),
                      $('<td>',{class:'contenidoTablaCaracteristicas textoAlineadoJustificado',text:desglosePresupuesto[i].classifications.actividadObra})
                    )
                    :null),
                  (desglosePresupuesto[i].classifications.fuente?
                    $('<tr>').append(
                      $('<td>',{class:'tituloTablaCaracteristicas',text:'Fuente:'}),
                      $('<td>',{class:'contenidoTablaCaracteristicas textoAlineadoJustificado',text:desglosePresupuesto[i].classifications.fuente})
                    )
                    :null),
                  (desglosePresupuesto[i].classifications.ga?
                    $('<tr>').append(
                      $('<td>',{class:'tituloTablaCaracteristicas',text:'Gerencia Administrativa:'}),
                      $('<td>',{class:'contenidoTablaCaracteristicas textoAlineadoJustificado',text:desglosePresupuesto[i].classifications.ga})
                    )
                    :null),
                  (desglosePresupuesto[i].classifications.gestion?
                    $('<tr>').append(
                      $('<td>',{class:'tituloTablaCaracteristicas',text:'Periodo de Gestión:'}),
                      $('<td>',{class:'contenidoTablaCaracteristicas textoAlineadoJustificado',text:desglosePresupuesto[i].classifications.gestion})
                    )
                    :null),
                  (desglosePresupuesto[i].classifications.institucion?
                    $('<tr>').append(
                      $('<td>',{class:'tituloTablaCaracteristicas',text:'Institución:'}),
                      $('<td>',{class:'contenidoTablaCaracteristicas textoAlineadoJustificado',text:desglosePresupuesto[i].classifications.institucion})
                    )
                    :null),
                  (desglosePresupuesto[i].classifications.objeto?
                    $('<tr>').append(
                      $('<td>',{class:'tituloTablaCaracteristicas',text:'Objeto:'}),
                      $('<td>',{class:'contenidoTablaCaracteristicas textoAlineadoJustificado',text:desglosePresupuesto[i].classifications.objeto})
                    )
                    :null),
                  (desglosePresupuesto[i].classifications.organismo?
                    $('<tr>').append(
                      $('<td>',{class:'tituloTablaCaracteristicas',text:'Organismo:'}),
                      $('<td>',{class:'contenidoTablaCaracteristicas textoAlineadoJustificado',text:desglosePresupuesto[i].classifications.organismo})
                    )
                    :null),
                  (desglosePresupuesto[i].classifications.programa?
                    $('<tr>').append(
                      $('<td>',{class:'tituloTablaCaracteristicas',text:'Programa:'}),
                      $('<td>',{class:'contenidoTablaCaracteristicas textoAlineadoJustificado',text:desglosePresupuesto[i].classifications.programa})
                    )
                    :null),
                  (desglosePresupuesto[i].classifications.proyecto?
                    $('<tr>').append(
                      $('<td>',{class:'tituloTablaCaracteristicas',text:'Proyecto:'}),
                      $('<td>',{class:'contenidoTablaCaracteristicas textoAlineadoJustificado',text:desglosePresupuesto[i].classifications.proyecto})
                    )
                    :null),
                  (desglosePresupuesto[i].classifications.subPrograma?
                    $('<tr>').append(
                      $('<td>',{class:'tituloTablaCaracteristicas',text:'Sub Programa:'}),
                      $('<td>',{class:'contenidoTablaCaracteristicas textoAlineadoJustificado',text:desglosePresupuesto[i].classifications.subPrograma})
                    )
                    :null),
                  (desglosePresupuesto[i].classifications.trfBeneficiario?
                    $('<tr>').append(
                      $('<td>',{class:'tituloTablaCaracteristicas',text:'Transferencia al Beneficiario:'}),
                      $('<td>',{class:'contenidoTablaCaracteristicas textoAlineadoJustificado',text:desglosePresupuesto[i].classifications.trfBeneficiario})
                    )
                    :null),
                  (desglosePresupuesto[i].classifications.ue?
                    $('<tr>').append(
                      $('<td>',{class:'tituloTablaCaracteristicas',text:'Unidad Ejecutora:'}),
                      $('<td>',{class:'contenidoTablaCaracteristicas textoAlineadoJustificado',text:desglosePresupuesto[i].classifications.ue})
                    )
                    :null)
                )
              )
            )
          )
        )
      )
    }else{
      elementos.push(
        $('<div>', {class:' cajonSombreado contenedorDetalleProcesoDatos mt-2'}).append(
          $('<div>',{class:'contenedorProceso informacionProceso'}).append(
            $('<div>',{class:'contenedorTablaCaracteristicas'}).append(
              $('<table>').append(
                $('<tbody>').append(
                  ObtenerProporcionadoresFondos(desglosePresupuesto)
                )
              )
            )
          )
        )
      )
      
    }
  }
  return elementos;
}

function ObtenerProporcionadoresFondos(fondos){
  var elementos=[]
  for(i=0;i<fondos.length;i++){
    if(fondos[i].description){
      elementos.push(
        $('<tr>').append(
        $('<td>',{class:'tituloTablaCaracteristicas',text:'Origen de Fondos'}),
        $('<td>',{class:'contenidoTablaCaracteristicas',text:fondos[i].description})
      )
      )
    }
    if(fondos[i].sourceParty&&fondos[i].sourceParty.name){
      elementos.push(
        $('<tr>').append(
        $('<td>',{class:'tituloTablaCaracteristicas',text:'Fuente del Presupuesto'}),
        $('<td>',{class:'contenidoTablaCaracteristicas',text:fondos[i].sourceParty.name})
      )
      )
    }
  }
  return elementos;
}


function ObtenerDocumentos(documentos){
  var elementos=[];
  for(var i=0;i<documentos.length;i++){
    elementos.push(
      $('<tr>').append(
        $('<td>',{'data-label':'Nombre',text:documentos[i].title}),
        $('<td>',{'data-label':'Descripción',text:documentos[i].description}),
        $('<td>',{'data-label':'Tipo',text:TraduceTexto(documentos[i].documentType)}),
        $('<td>',{'data-label':'Fecha',text:((documentos[i].datePublished)?ObtenerFecha(documentos[i].datePublished):null)}),
        $('<td>',{class:'textoAlineadoDerecha','data-label':''}).append(
          $('<h4>',{class:'descargaIconos'}).append(
            $('<span>',{class:'textoColorGris textoAlineadoDerecha p-1 cursorMano transicion'}).append(
              $('<a>',{href:documentos[i].url,download:'a',class:'textoColorGris textoAlineadoDerecha p-1 cursorMano transicion'}).append(
                $('<i>',{class:'fas fa-file-download'}),
              '&nbsp;'+ObtenerExtension(documentos[i].url)
              )
              
            )
          )
        )
        
      )
    );
  }
  return elementos;
}
