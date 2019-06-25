/*OCID del proceso de contratacion*/
var procesoOcid='';
procesoOcid=$('#procesoOcid').val()
var procesoRecord={};

/*Onload de la Página*/
$(function(){
    /*Añadir evento click a los pasos del proceso de contratación para mostrar el div de su contenido*/
    $('.botonPasoProceso').on('click',function(evento){
      if(!$(evento.currentTarget).hasClass('deshabilitado')){
        $('.botonPasoProceso').removeClass('activo');
        $(evento.currentTarget).addClass('activo');

        $('.pasoOcultar').hide();
        var estado=$(evento.currentTarget).attr('estado');
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
    var estado=$(pasos[0]).attr('estado');
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
function DefinirElementosConvocatoria(){
  if(procesoRecord.compiledRelease){
    if(procesoRecord.compiledRelease.tender){
      if(procesoRecord.compiledRelease.tender.title){
        $('#tituloProceso').text(procesoRecord.compiledRelease.tender.title);
      }
      $('.convocatoria.informacion').append(
        $('<div>',{class:'row'}).append(
          $('<h4>',{class:'col-6 col-sm-6 col-md-6 titularCajonSombreado',text:'Datos de la Convocatoria'}),
          $('<div>',{class:'col-6 col-sm-6 col-md-6 textoAlineadoDerecha'}).append(
            $('<h4>',{class:'descargaIconos enLinea'}).append(
              $('<span>',{class:'textoColorGris textoAlineadoDerecha p-1 cursorMano transicion'}).append(
                $('<i>',{class:'fas fa-file-download'}),
                '&nbsp;.JSON'
              ),
              $('<span>',{class:'textoColorGris textoAlineadoDerecha p-1 cursorMano transicion'}).append(
                $('<i>',{class:'fas fa-file-download'}),
                '&nbsp;.CSV'
              )
            ),
            $('<h4>',{class:'enLinea mb-0 enLinea alineadoArriba'}).append(
              $('<a>',{href:'/preguntas'}).append(
                $('<div>',{class:'textoAlineadoCentrado cursorMano botonAyuda transicion', id:'informacionTipoDatos'}).append(
                
                  $('<i>',{class:'fas fa-question'})
                
              )
              )
              
            )
          )
        ),
        
        $('<div>',{class:'cajonSombreado contenedorDetalleProcesoDatos'}).append(
          $('<div>',{class:'contenedorProceso informacionProceso'}).append(
            $('<div>',{class:'contenedorTablaCaracteristicas'}).append(
              $('<table>').append(
                $('<tbody>').append(
                  procesoRecord.compiledRelease.buyer&&procesoRecord.compiledRelease.buyer.name ? 
                  ObtenerCompradores(procesoRecord.compiledRelease.parties,procesoRecord.compiledRelease.buyer) : null
                  ,
                  procesoRecord.compiledRelease.tender.status ? $('<tr>').append(
                    $('<td>',{class:'tituloTablaCaracteristicas',text:'Estado'}),
                    $('<td>',{class:'contenidoTablaCaracteristicas',text:TraduceTexto(procesoRecord.compiledRelease.tender.status)})
                  ) : null
                  ,
                  /*Consultas*/
                  procesoRecord.compiledRelease.tender.enquiryPeriod ? ([
                    procesoRecord.compiledRelease.tender.enquiryPeriod.startDate ? 
                    $('<tr>').append(
                      $('<td>',{class:'tituloTablaCaracteristicas',text:'Fecha de Inicio de Consultas'}),
                      $('<td>',{class:'contenidoTablaCaracteristicas',text:ObtenerFecha(procesoRecord.compiledRelease.tender.enquiryPeriod.startDate)})
                    ) : null,
                    procesoRecord.compiledRelease.tender.enquiryPeriod.endDate ?
                    $('<tr>').append(
                      $('<td>',{class:'tituloTablaCaracteristicas',text:'Fecha de Finalización de Consultas'}),
                      $('<td>',{class:'contenidoTablaCaracteristicas',text:ObtenerFecha(procesoRecord.compiledRelease.tender.enquiryPeriod.endDate)})
                    ) : null
                  ]
                  ) : null
                  ,/*Licitación*/
                  procesoRecord.compiledRelease.tender.tenderPeriod ? ([
                    procesoRecord.compiledRelease.tender.tenderPeriod.startDate ? 
                    $('<tr>').append(
                      $('<td>',{class:'tituloTablaCaracteristicas',text:'Fecha de Inicio de Recepción de Ofertas'}),
                      $('<td>',{class:'contenidoTablaCaracteristicas',text:ObtenerFecha(procesoRecord.compiledRelease.tender.tenderPeriod.startDate)})
                    ) : null,
                    procesoRecord.compiledRelease.tender.tenderPeriod.endDate ?
                    $('<tr>').append(
                      $('<td>',{class:'tituloTablaCaracteristicas',text:'Fecha de Finalización de Recepción de Ofertas'}),
                      $('<td>',{class:'contenidoTablaCaracteristicas',text:ObtenerFecha(procesoRecord.compiledRelease.tender.tenderPeriod.endDate)})
                    ) : null
                  ]
                  ) : null
                  ,
                  procesoRecord.compiledRelease.tender.procurementMethodDetails ?
                  $('<tr>').append(
                    $('<td>',{class:'tituloTablaCaracteristicas',text:'Método de Contratación'}),
                    $('<td>',{class:'contenidoTablaCaracteristicas',text:procesoRecord.compiledRelease.tender.procurementMethodDetails})
                  ) : null,
                  $('<tr>').append(
                    $('<td>',{class:'tituloTablaCaracteristicas',text:'ID Proceso (OCID):'}),
                    $('<td>',{class:'contenidoTablaCaracteristicas',text:procesoRecord.ocid})
                  )
                  )
                  )
            ),
            (procesoRecord.compiledRelease.tender.value&&procesoRecord.compiledRelease.tender.value.amount?
              $('<div>',{class:'contenedorTablaCaracteristicas'}).append(
                $('<table>',{class:'tablaAncho'}).append(
                  $('<tbody>').append(
                    $('<tr>').append(
                      $('<td>',{class:'textoAlineadoDerecha'}).append(
                        $('<div>',{
                          class:'montoTotalProceso pr-3'
                        }).append(
                          $('<img>',{class:'imagenMonto mr-1',src:'/static/img/otros/monedasHonduras.png'}),
                          $('<div>',{class:'contenedorMonto procesoMonto'}).append(
                            $('<div>',{class:'textoColorGris',text:'Monto'}),
                            $('<div>',{class:'valorMonto'}).append(
                              ValorMoneda(procesoRecord.compiledRelease.tender.value.amount),
                              $('<span>',{class:'textoColorPrimario',text:procesoRecord.compiledRelease.tender.value.currency})
                            )
  
                            
                          )
                        )
                      )
                    )
                    )
                    )
              ):null)
          )
        ),
        procesoRecord.compiledRelease.parties ? 
        $('<div>',{class:'row mb-5 mt-5'}).append(
          ObtenerDatosContacto(procesoRecord.compiledRelease.parties,'buyer',['Unidad Ejecutora:','Comprador'])
        ) : null
      );
      if(procesoRecord.compiledRelease.tender.items&&procesoRecord.compiledRelease.tender.items.length){
        $('.convocatoria.solicitados').append(
          $('<div>', {class:' cajonSombreado '}).append(
            $('<table>',{class:'tablaGeneral'}).append(
              $('<thead>').append(
                $('<tr>').append(
                  $('<th>',{text:'Id'}),
                  $('<th>',{text:'Clasificación'}),
                  $('<th>',{text:'Descripción'}),
                  /*$('<th>',{text:'Especificaciones'}),*/
                  $('<th>',{text:'Cantidad'}),
                  $('<th>',{text:'Precio'}),
                  $('<th>',{text:'Unidad'})
                )
              ),
              $('<tbody>').append(
                ObtenerItems(procesoRecord.compiledRelease.tender.items)
              )
            )
          )
        )
      }
      if(procesoRecord.compiledRelease.tender.documents&&procesoRecord.compiledRelease.tender.documents.length){
        $('.convocatoria.documentos').append(
          $('<div>', {class:' cajonSombreado '}).append(
            $('<table>',{class:'tablaGeneral'}).append(
              $('<thead>').append(
                $('<tr>').append(
                  $('<th>',{text:'Nombre'}),
                  $('<th>',{text:'Descripción'}),
                  $('<th>',{text:'Tipo'}),
                  $('<th>',{text:'Fecha'}),
                  $('<th>',{text:''})
                )
              ),
              $('<tbody>').append(
                ObtenerDocumentos(procesoRecord.compiledRelease.tender.documents)
              )
            )
          )
        )
      }
    }
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

function DefinirElementosPlaneacion(){
  if(procesoRecord.compiledRelease){
    if(procesoRecord.compiledRelease.planning){
      $('.planificacion.informacion').append(
        $('<div>',{class:'row'}).append(
          $('<h4>',{class:'col-6 col-sm-6 col-md-6 titularCajonSombreado',text:'Datos de la Planificación'}),
          $('<div>',{class:'col-6 col-sm-6 col-md-6 textoAlineadoDerecha'}).append(
            $('<h4>',{class:'descargaIconos enLinea'}).append(
              $('<span>',{class:'textoColorGris textoAlineadoDerecha p-1 cursorMano transicion'}).append(
                $('<i>',{class:'fas fa-file-download'}),
                '&nbsp;.JSON'
              ),
              $('<span>',{class:'textoColorGris textoAlineadoDerecha p-1 cursorMano transicion'}).append(
                $('<i>',{class:'fas fa-file-download'}),
                '&nbsp;.CSV'
              )
            ),
            $('<h4>',{class:'enLinea mb-0 enLinea alineadoArriba'}).append(
              $('<a>',{href:'/preguntas'}).append(
                $('<div>',{class:'textoAlineadoCentrado cursorMano botonAyuda transicion', id:'informacionTipoDatos'}).append(
                
                  $('<i>',{class:'fas fa-question'})
                
              )
              )
              
            )
          )
        ),
        
        $('<div>',{class:'cajonSombreado contenedorDetalleProcesoDatos'}).append(
          $('<div>',{class:'contenedorProceso informacionProceso'}).append(
            $('<div>',{class:'contenedorTablaCaracteristicas'}).append(
              $('<table>').append(
                $('<tbody>').append(
                  (procesoRecord.compiledRelease.planning&&procesoRecord.compiledRelease.planning.budget&&procesoRecord.compiledRelease.planning.budget.budgetBreakdown ? 
                  ObtenerProporcionadoresFondos(procesoRecord.compiledRelease.planning.budget.budgetBreakdown) : null)
                  ,
                  /*Consultas*/
                  procesoRecord.compiledRelease.tender.enquiryPeriod ? ([
                    procesoRecord.compiledRelease.tender.enquiryPeriod.startDate ? 
                    $('<tr>').append(
                      $('<td>',{class:'tituloTablaCaracteristicas',text:'Fecha de Inicio de Consultas'}),
                      $('<td>',{class:'contenidoTablaCaracteristicas',text:ObtenerFecha(procesoRecord.compiledRelease.tender.enquiryPeriod.startDate)})
                    ) : null,
                    procesoRecord.compiledRelease.tender.enquiryPeriod.endDate ?
                    $('<tr>').append(
                      $('<td>',{class:'tituloTablaCaracteristicas',text:'Fecha de Finalización de Consultas'}),
                      $('<td>',{class:'contenidoTablaCaracteristicas',text:ObtenerFecha(procesoRecord.compiledRelease.tender.enquiryPeriod.endDate)})
                    ) : null
                  ]
                  ) : null
                  ,
                  $('<tr>').append(
                    $('<td>',{class:'tituloTablaCaracteristicas',text:'ID Proceso (OCID):'}),
                    $('<td>',{class:'contenidoTablaCaracteristicas',text:procesoRecord.ocid})
                  )
                  )
                  )
            ),
            (procesoRecord.compiledRelease.planning.value&&procesoRecord.compiledRelease.planning.value.amount?
              $('<div>',{class:'contenedorTablaCaracteristicas'}).append(
                $('<table>',{class:'tablaAncho'}).append(
                  $('<tbody>').append(
                    $('<tr>').append(
                      $('<td>',{class:'textoAlineadoDerecha'}).append(
                        $('<div>',{
                          class:'montoTotalProceso pr-3'
                        }).append(
                          $('<img>',{class:'imagenMonto mr-1',src:'/static/img/otros/monedasHonduras.png'}),
                          $('<div>',{class:'contenedorMonto procesoMonto'}).append(
                            $('<div>',{class:'textoColorGris',text:'Monto'}),
                            $('<div>',{class:'valorMonto'}).append(
                              ValorMoneda(procesoRecord.compiledRelease.planning.value.amount),
                              $('<span>',{class:'textoColorPrimario',text:procesoRecord.compiledRelease.planning.value.currency})
                            )
  
                            
                          )
                        )
                      )
                    )
                    )
                    )
              ):null)
          )
        )
      );
      if(procesoRecord.compiledRelease.tender.items&&procesoRecord.compiledRelease.tender.items.length){
        $('.planificacion.solicitados').append(
          $('<div>', {class:' cajonSombreado '}).append(
            $('<table>',{class:'tablaGeneral'}).append(
              $('<thead>').append(
                $('<tr>').append(
                  $('<th>',{text:'Id'}),
                  $('<th>',{text:'Clasificación'}),
                  $('<th>',{text:'Descripción'}),
                  $('<th>',{text:'Cantidad'}),
                  $('<th>',{text:'Precio'}),
                  $('<th>',{text:'Unidad'})
                )
              ),
              $('<tbody>').append(
                ObtenerItems(procesoRecord.compiledRelease.tender.items)
              )
            )
          )
        )
      }

      if(procesoRecord.compiledRelease.planning.documents&&procesoRecord.compiledRelease.planning.documents.length){
        $('.planificacion.documentos').append(
          $('<div>', {class:' cajonSombreado '}).append(
            $('<table>',{class:'tablaGeneral'}).append(
              $('<thead>').append(
                $('<tr>').append(
                  $('<th>',{text:'Nombre'}),
                  $('<th>',{text:'Descripción'}),
                  $('<th>',{text:'Tipo'}),
                  $('<th>',{text:'Fecha'}),
                  $('<th>',{text:''})
                )
              ),
              $('<tbody>').append(
                ObtenerDocumentos(procesoRecord.compiledRelease.planning.documents)
              )
            )
          )
        )
      }
    }
  }
}

/*Planning*/
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
      if(fondos[i].sourceParty&&fondos[i].sourceParty.name){
        elementos.push(
          $('<tr>').append(
          $('<td>',{class:'tituloTablaCaracteristicas',text:'Fuente del Presupuesto'}),
          $('<td>',{class:'contenidoTablaCaracteristicas',text:fondos[i].sourceParty.name})
        )
        )
      }
      
    }
  }
  return elementos;
}

function DefinirElementosAdjudicacion(){
  if(procesoRecord.compiledRelease){
    if(procesoRecord.compiledRelease.awards&&procesoRecord.compiledRelease.awards.length){
      $('.adjudicacion.informacion').append(
        $('<div>',{class:'row'}).append(
          $('<h4>',{class:'col-6 col-sm-6 col-md-6 titularCajonSombreado',text:'Datos de la Adjudicación'}),
          $('<div>',{class:'col-6 col-sm-6 col-md-6 textoAlineadoDerecha'}).append(
            $('<h4>',{class:'descargaIconos enLinea'}).append(
              $('<span>',{class:'textoColorGris textoAlineadoDerecha p-1 cursorMano transicion'}).append(
                $('<i>',{class:'fas fa-file-download'}),
                '&nbsp;.JSON'
              ),
              $('<span>',{class:'textoColorGris textoAlineadoDerecha p-1 cursorMano transicion'}).append(
                $('<i>',{class:'fas fa-file-download'}),
                '&nbsp;.CSV'
              )
            ),
            $('<h4>',{class:'enLinea mb-0 enLinea alineadoArriba'}).append(
              $('<a>',{href:'/preguntas'}).append(
                $('<div>',{class:'textoAlineadoCentrado cursorMano botonAyuda transicion', id:'informacionTipoDatos'}).append(
                
                  $('<i>',{class:'fas fa-question'})
                
                )
              )
              
            )
          )
        ),
        AdjuntarInformacionAdjudicacion(procesoRecord.compiledRelease.awards),
        
      );
      
    }
  }
}
function AdjuntarInformacionAdjudicacion(adjudicaciones){
  var elementos=[];
  for(var i=0;i<adjudicaciones.length;i++){
    elementos.push(
      $('<div>',{class:'cajonSombreado contenedorDetalleProcesoDatos'}).append(
        $('<div>',{class:'contenedorProceso informacionProceso'}).append(
          $('<div>',{class:'contenedorTablaCaracteristicas'}).append(
            $('<table>').append(
              $('<tbody>').append(
                (adjudicaciones[i].suppliers&&adjudicaciones[i].suppliers.length ? 
                  ObtenerProveedoresAdjudicados(adjudicaciones[i].suppliers) : null)
                ,
                $('<tr>').append(
                  $('<td>',{class:'tituloTablaCaracteristicas',text:'ID Proceso (OCID):'}),
                  $('<td>',{class:'contenidoTablaCaracteristicas',text:procesoRecord.ocid})
                )
                )
                )
          )
        )
      ),
      (adjudicaciones[i].value&&adjudicaciones[i].value.amount?
        $('<div>',{class:'contenedorTablaCaracteristicas'}).append(
          $('<table>',{class:'tablaAncho'}).append(
            $('<tbody>').append(
              $('<tr>').append(
                $('<td>',{class:'textoAlineadoDerecha'}).append(
                  $('<div>',{
                    class:'montoTotalProceso pr-3'
                  }).append(
                    $('<img>',{class:'imagenMonto mr-1',src:'/static/img/otros/monedasHonduras.png'}),
                    $('<div>',{class:'contenedorMonto procesoMonto'}).append(
                      $('<div>',{class:'textoColorGris',text:'Monto'}),
                      $('<div>',{class:'valorMonto'}).append(
                        ValorMoneda(adjudicaciones[i].value.amount),
                        $('<span>',{class:'textoColorPrimario',text:adjudicaciones[i].value.currency})
                      )

                      
                    )
                  )
                )
              )
              )
              )
        ):null)
    );
    if(adjudicaciones[i].items&&adjudicaciones[i].items.length){
      $('.adjudicacion.solicitados').append(
        $('<div>', {class:' cajonSombreado '}).append(
          $('<table>',{class:'tablaGeneral'}).append(
            $('<thead>').append(
              $('<tr>').append(
                $('<th>',{text:'Id'}),
                $('<th>',{text:'Clasificación'}),
                $('<th>',{text:'Descripción'}),
                /*$('<th>',{text:'Especificaciones'}),*/
                $('<th>',{text:'Cantidad'}),
                $('<th>',{text:'Precio'}),
                $('<th>',{text:'Unidad'})
              )
            ),
            $('<tbody>').append(
              ObtenerItems(adjudicaciones[i].items)
            )
          )
        )
      )
    }
    if(adjudicaciones[i].documents&&adjudicaciones[i].documents.length){
      $('.adjudicacion.documentos').append(
        $('<div>', {class:' cajonSombreado '}).append(
          $('<table>',{class:'tablaGeneral'}).append(
            $('<thead>').append(
              $('<tr>').append(
                $('<th>',{text:'Nombre'}),
                $('<th>',{text:'Descripción'}),
                $('<th>',{text:'Tipo'}),
                $('<th>',{text:'Fecha'}),
                $('<th>',{text:''})
              )
            ),
            $('<tbody>').append(
              ObtenerDocumentos(adjudicaciones[i].documents)
            )
          )
        )
      )
    }
  }
  return elementos;
}

function ObtenerProveedoresAdjudicados(proveedores){
  var elementos=[]
  for(i=0;i<proveedores.length;i++){
    if(proveedores[i].name){
      elementos.push(
        $('<tr>').append(
        $('<td>',{class:'tituloTablaCaracteristicas',text:'Proveedor Adjudicado'}),
        $('<td>',{class:'contenidoTablaCaracteristicas'}).append(
          $('<a>',{text:proveedores[i].name,class:'enlaceTablaGeneral',href:'/proveedor/'+proveedores[i].id})
        )
      )
      )
      
    }
  }
  return elementos;
}

function DefinirElementosContrato(){
  if(procesoRecord.compiledRelease){
    if(procesoRecord.compiledRelease.contracts&&procesoRecord.compiledRelease.contracts.length){
      $('.contrato.informacion').append(
        $('<div>',{class:'row'}).append(
          $('<h4>',{class:'col-6 col-sm-6 col-md-6 titularCajonSombreado',text:'Datos del Contrato'}),
          $('<div>',{class:'col-6 col-sm-6 col-md-6 textoAlineadoDerecha'}).append(
            $('<h4>',{class:'descargaIconos enLinea'}).append(
              $('<span>',{class:'textoColorGris textoAlineadoDerecha p-1 cursorMano transicion'}).append(
                $('<i>',{class:'fas fa-file-download'}),
                '&nbsp;.JSON'
              ),
              $('<span>',{class:'textoColorGris textoAlineadoDerecha p-1 cursorMano transicion'}).append(
                $('<i>',{class:'fas fa-file-download'}),
                '&nbsp;.CSV'
              )
            ),
            $('<h4>',{class:'enLinea mb-0 enLinea alineadoArriba'}).append(
              $('<a>',{href:'/preguntas'}).append(
                $('<div>',{class:'textoAlineadoCentrado cursorMano botonAyuda transicion', id:'informacionTipoDatos'}).append(
                
                  $('<i>',{class:'fas fa-question'})
                
                )
              )
              
            )
          )
        ),
        AdjuntarInformacionContrato(procesoRecord.compiledRelease.contracts),
        
      );
      
    }
  }
}

function AdjuntarInformacionContrato(contratos){
  var elementos=[];
  for(var i=0;i<contratos.length;i++){
    elementos.push(
      $('<div>',{class:'cajonSombreado contenedorDetalleProcesoDatos'}).append(
        $('<div>',{class:'contenedorProceso informacionProceso'}).append(
          $('<div>',{class:'contenedorTablaCaracteristicas'}).append(
            $('<table>').append(
              $('<tbody>').append(
                (contratos[i].buyer&&contratos[i].buyer.name ? 
                  $('<tr>').append(
                    $('<td>',{class:'tituloTablaCaracteristicas',text:'Comprador'}),
                    $('<td>',{class:'contenidoTablaCaracteristicas'}).append(
                      $('<a>',{text:contratos[i].buyer.name,class:'enlaceTablaGeneral',href:'/comprador/'+contratos[i].buyer.id})
                    )
                  ) : null),
                (contratos[i].suppliers&&contratos[i].suppliers.length ? 
                  ObtenerProveedoresContratos(contratos[i].suppliers) : null)
                ,
                (contratos[i].dateSigned ? 
                    $('<tr>').append(
                      $('<td>',{class:'tituloTablaCaracteristicas',text:'Fecha de Firma'}),
                      $('<td>',{class:'contenidoTablaCaracteristicas',text:ObtenerFecha(contratos[i].dateSigned)})
                    ) : null),
                $('<tr>').append(
                  $('<td>',{class:'tituloTablaCaracteristicas',text:'ID Proceso (OCID):'}),
                  $('<td>',{class:'contenidoTablaCaracteristicas',text:procesoRecord.ocid})
                )
                )
                )
          ),
          (contratos[i].value&&contratos[i].value.amount?
            $('<div>',{class:'contenedorTablaCaracteristicas'}).append(
              $('<table>',{class:'tablaAncho'}).append(
                $('<tbody>').append(
                  $('<tr>').append(
                    $('<td>',{class:'textoAlineadoDerecha'}).append(
                      $('<div>',{
                        class:'montoTotalProceso pr-3'
                      }).append(
                        $('<img>',{class:'imagenMonto mr-1',src:'/static/img/otros/monedasHonduras.png'}),
                        $('<div>',{class:'contenedorMonto procesoMonto'}).append(
                          $('<div>',{class:'textoColorGris',text:'Monto'}),
                          $('<div>',{class:'valorMonto'}).append(
                            ValorMoneda(contratos[i].value.amount),
                            $('<span>',{class:'textoColorPrimario',text:contratos[i].value.currency})
                          )

                          
                        )
                      )
                    )
                  )
                  )
                  )
            ):null)
        )
      ),
        (procesoRecord.compiledRelease.parties&&procesoRecord.compiledRelease.contracts[i]&&procesoRecord.compiledRelease.contracts[i].suppliers ? 
        $('<div>',{class:'row mb-5 mt-5'}).append(
          ObtenerDatosContacto(procesoRecord.compiledRelease.parties,'supplier',['Unidad de Proveedor:','Proveedor:'])
        ) : null)
    );
    if(contratos[i].items&&contratos[i].items.length){
      $('.contrato.solicitados').append(
        $('<div>', {class:' cajonSombreado '}).append(
          $('<table>',{class:'tablaGeneral'}).append(
            $('<thead>').append(
              $('<tr>').append(
                $('<th>',{text:'Id'}),
                $('<th>',{text:'Clasificación'}),
                $('<th>',{text:'Descripción'}),
                /*$('<th>',{text:'Especificaciones'}),*/
                $('<th>',{text:'Cantidad'}),
                $('<th>',{text:'Precio'}),
                $('<th>',{text:'Unidad'})
              )
            ),
            $('<tbody>').append(
              ObtenerItems(contratos[i].items)
            )
          )
        )
      )
    }
    if(contratos[i].documents&&contratos[i].documents.length){
      $('.contrato.documentos').append(
        $('<div>', {class:' cajonSombreado '}).append(
          $('<table>',{class:'tablaGeneral'}).append(
            $('<thead>').append(
              $('<tr>').append(
                $('<th>',{text:'Nombre'}),
                $('<th>',{text:'Descripción'}),
                $('<th>',{text:'Tipo'}),
                $('<th>',{text:'Fecha'}),
                $('<th>',{text:''})
              )
            ),
            $('<tbody>').append(
              ObtenerDocumentos(contratos[i].documents)
            )
          )
        )
      )
    }
  }
  return elementos;
}

function ObtenerProveedoresContratos(proveedores){
  var elementos=[]
  for(i=0;i<proveedores.length;i++){
    if(proveedores[i].name){
      elementos.push(
        $('<tr>').append(
        $('<td>',{class:'tituloTablaCaracteristicas',text:'Contrato de Proveedor'}),
        $('<td>',{class:'contenidoTablaCaracteristicas'}).append(
          $('<a>',{text:proveedores[i].name,class:'enlaceTablaGeneral',href:'/proveedor/'+proveedores[i].id})
        )
      )
      );
      
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
