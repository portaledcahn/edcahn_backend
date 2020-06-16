/**
 * @file procesoAdjudicacion.js Este archivo se incluye en la sección de Visualización de un Proceso de Contratación del Portal de Contrataciones Abiertas de Honduras
 * @author Bryant Marcelo Pérez
 * @see <a href="https://github.com/portaledcahn/edcahn_backend/tree/frontend">GitHub</a>
 */
var estadosAdjudicacion={
  'pending':{titulo:'Pendiente',descripcion:'Esta adjudicación se ha propuesto pero no ha entrado en vigor. Esto puede ser por un período de reflexión o algún otro proceso.'},
  'active':{titulo:'Activo',descripcion:'Se ha adjudicado y está en proceso.'},
  'cancelled':{titulo:'Cancelado',descripcion:'Esta adjudicación se ha cancelado.'},
  'unsuccessful':{titulo:'Sin Éxito',descripcion:'Esta adjudicación no pudo realizarse exitosamente. Si los artículos o detalles del proveedor se incluyen en la sección de adjudicación, estos limitan el alcance de la licitación fallida (e.j. si la adjudicación de artículos notados o una adjudicación al proveedor notado no fue exitosa, pero puede haber otras adjudicaciones exitosas para diferentes artículos en la oferta, o para distintos proveedores).'}
 }
function obtenerEstadoAdjudicacion(estado){
  if(estadosAdjudicacion[estado]){
    return estadosAdjudicacion[estado];
  }else{
    return {titulo:estado,descripcion:''};
  }
}
function DefinirElementosAdjudicacion(){
    if(procesoRecord.compiledRelease){
      if(procesoRecord.compiledRelease.awards&&procesoRecord.compiledRelease.awards.length){

      
        $('.adjudicacion.informacion').append(
          $('<div>',{class:'row'}).append(
            $('<h4>',{class:'col-6 col-sm-6 col-md-6 titularCajonSombreado',text:'Datos de la Adjudicación'}),
            $('<div>',{class:'col-6 col-sm-6 col-md-6 textoAlineadoDerecha'}).append(
              $('<h4>',{class:'descargaIconos enLinea'}).append(
                $('<span>',{class:'textoColorGris textoAlineadoDerecha p-1 cursorMano transicion',id:'descargaJSONAdjudicacion'}).append(
                  $('<i>',{class:'fas fa-file-download'}),
                  '&nbsp;.JSON'
                ),
                $('<span>',{class:'textoColorGris textoAlineadoDerecha p-1 cursorMano transicion',id:'descargaCSVAdjudicacion'}).append(
                  $('<i>',{class:'fas fa-file-download'}),
                  '&nbsp;.CSV'
                ),
                $('<span>',{class:'textoColorGris textoAlineadoDerecha p-1 cursorMano transicion',id:'descargaXLSXAdjudicacion'}).append(
                  $('<i>',{class:'fas fa-file-download'}),
                  '&nbsp;.XLSX'
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

          $('<nav>').append(
            $('<div>',{class:'nav nav-tabs',role:'tablist'}).append(


            $('<a>',{class:'nav-item nav-link active','data-toggle':'tab',role:'tab','aria-controls':'informacionTabAdjudicacion',href:'#informacionTabAdjudicacion','aria-selected':'true'}).append($('<h4>',{class:'titularColor', style:'font-size: 15px',text:'Información'})),

            $('<a>',{class:'nav-item nav-link ','data-toggle':'tab',role:'tab','aria-controls':'itemsTabAdjudicacion',href:'#itemsTabAdjudicacion','aria-selected':'true'}).append($('<h4>',{class:'titularColor', style:'font-size: 15px',text:'Artículos Solicitados'}))
            ,
            $('<a>',{class:'nav-item nav-link ','data-toggle':'tab',role:'tab','aria-controls':'documentosTabAdjudicacion',href:'#documentosTabAdjudicacion','aria-selected':'true'}).append($('<h4>',{class:'titularColor', style:'font-size: 15px',text:'Documentos'}))
            )
          //AdjuntarInformacionAdjudicacion(procesoRecord.compiledRelease.awards),
          
        ),
              
      $('<div>',{class:'tab-content cajonSombreado',id:'contenedorTabAdjudicacion'}).append(
        $('<div>',{class:'tab-pane fade show active',role:'tabpanel','aria-labelledby':'informacionTabAdjudicacion',id:'informacionTabAdjudicacion'}).append(
          $('<div>',{class:'contenedorProceso informacionProceso'}).append(
          $('<div>',{class:'contenedorTablaCaracteristicas'}).append(
            $('<table>').append(
              $('<tbody>').append(
                procesoRecord.compiledRelease.buyer&&procesoRecord.compiledRelease.buyer.name ? 
                $('<tr>').append(
                  $('<td>',{class:'tituloTablaCaracteristicas',text:'Comprador:',toolTexto:"buyer"}),
                  $('<td>',{class:'contenidoTablaCaracteristicas'}).append(ObtenerElementosParte(procesoRecord.compiledRelease.buyer.id))
                ) : null
                )
              )
            )
          ),
          procesoRecord.compiledRelease.awards?AnadirTablaAdjudicacion(procesoRecord.compiledRelease.awards):null
          ),
          $('<div>',{class:'tab-pane fade',role:'tabpanel','aria-labelledby':'itemsTabAdjudicacion',id:'itemsTabAdjudicacion'}).append(

            ),
          $('<div>',{class:'tab-pane fade',role:'tabpanel','aria-labelledby':'documentosTabAdjudicacion',id:'documentosTabAdjudicacion'}).append(

            )
        )
        
        )

        var items = ObtenerTodoslosItemsAdjudicacion();
    if( items.length){
      $('#itemsTabAdjudicacion').append(
        $('<div>', {class:''}).append(
          $('<table>',{class:'tablaGeneral'}).append(
            $('<thead>').append(
              $('<tr>').append(
                $('<th>',{text:'Id', toolTexto:'awards[n].items[n].classification.id'}),
                $('<th>',{text:'Id Adjudicación', toolTexto:'awards[n].id'}),
                $('<th>',{text:'Clasificación', toolTexto:'awards[n].items[n].classification.scheme'}),
                $('<th>',{text:'Descripción', toolTexto:'awards[n].items[n].classification.description'}),
                /*$('<th>',{text:'Especificaciones'}),*/
                $('<th>',{text:'Cantidad', toolTexto:'awards[n].items[n].quantity'}),
                $('<th>',{text:'Precio', toolTexto:'awards[n].items[n].unit.value.amount'}),
                $('<th>',{text:'Unidad', toolTexto:'awards[n].items[n].unit.name'})
              )
            ),
            $('<tbody>').append(
              items
            )
          )
        )
      )
    }else{
      $('#itemsTabAdjudicacion').html('<h4 class="titularColor textoColorPrimario mt-3">Esta etapa no posee items</h4>')
    }

    var documentos=ObtenerTodoslosDocumentosAdjudicacion();
    if(documentos.length){
      $('#documentosTabAdjudicacion').append(
        $('<div>', {class:''}).append(
          $('<table>',{class:'tablaGeneral'}).append(
            $('<thead>').append(
              $('<tr>').append(
                $('<th>',{text:'Id Adjudicación'}),
                $('<th>',{text:'Nombre', toolTexto:'awards[n].documents[n].title'}),
                $('<th>',{text:'Descripción', toolTexto:'awards[n].documents[n].description'}),
                //$('<th>',{text:'Tipo', toolTexto:'awards[n].documents[n].documentType'}),
                $('<th>',{text:'Fecha', toolTexto:'awards[n].documents[n].datePublished'}),
                $('<th>',{text:''})
              )
            ),
            $('<tbody>').append(
              documentos
            )
          )
        )
      )
    }else{
      $('#documentosTabAdjudicacion').html('<h4 class="titularColor textoColorPrimario mt-3">Esta etapa no posee documentos</h4>')
    
    }
        
      }
    }
  }

/*Mostrar el Contenedor Inicial de la Informacion de Adjudicacion del Proceso de Contratacion */
function AdjuntarInformacionAdjudicacion(adjudicaciones){
  var elementos=[];
  for(var i=0;i<adjudicaciones.length;i++){
    elementos.push(
      $('<div>',{class:'cajonSombreado contenedorDetalleProcesoDatos'}).append(
        $('<div>',{class:'contenedorProceso informacionProceso'}).append(
          (adjudicaciones[parseInt(i)].title||adjudicaciones[parseInt(i)].description?
              $('<div>',{class:'contenedorTablaCaracteristicas'}).append(
                  $('<table>').append(
                    $('<tbody>').append(
                          adjudicaciones[parseInt(i)].title?$('<tr>').append(
                          $('<td>',{class:'tituloTablaCaracteristicas',text:adjudicaciones[parseInt(i)].title,style:'color:#333'})):null,
                          adjudicaciones[parseInt(i)].description?$('<tr>').append(
                              $('<td>',{class:'',text:adjudicaciones[parseInt(i)].description,style:'color:#333'})):null
                    ))):null),
          $('<div>',{class:'contenedorTablaCaracteristicas'}).append(
            $('<table>').append(
              $('<tbody>').append(
                (procesoRecord.compiledRelease.buyer&&procesoRecord.compiledRelease.buyer.name&&procesoRecord.compiledRelease.parties ? 
                  ObtenerCompradores(procesoRecord.compiledRelease.parties,procesoRecord.compiledRelease.buyer) : null),
                (adjudicaciones[parseInt(i)].suppliers&&adjudicaciones[parseInt(i)].suppliers.length ? 
                  ObtenerProveedoresAdjudicados(adjudicaciones[parseInt(i)].suppliers) : null),
                (adjudicaciones[parseInt(i)].status ? 
                  $('<tr>').append(
                    $('<td>',{class:'tituloTablaCaracteristicas',text:'Estado'}),
                    $('<td>',{class:'contenidoTablaCaracteristicas',text:obtenerEstadoAdjudicacion(adjudicaciones[parseInt(i)].status).titulo})
                  ) : null),
                (adjudicaciones[parseInt(i)].date ? 
                  $('<tr>').append(
                    $('<td>',{class:'tituloTablaCaracteristicas',text:'Fecha de Adjudicación'}),
                    $('<td>',{class:'contenidoTablaCaracteristicas',text:ObtenerFecha(adjudicaciones[parseInt(i)].date)})
                  ) : null),
                adjudicaciones[parseInt(i)].contractPeriod ? ([
                  adjudicaciones[parseInt(i)].contractPeriod.startDate ? 
                  $('<tr>').append(
                    $('<td>',{class:'tituloTablaCaracteristicas',text:'Fecha de Inicio de Adjudicación del Contrato'}),
                    $('<td>',{class:'contenidoTablaCaracteristicas',text:ObtenerFecha(adjudicaciones[parseInt(i)].contractPeriod.startDate)})
                  ) : null,
                  adjudicaciones[parseInt(i)].contractPeriod.endDate ?
                  $('<tr>').append(
                    $('<td>',{class:'tituloTablaCaracteristicas',text:'Fecha de Finalización de Adjudicación del Contrato'}),
                    $('<td>',{class:'contenidoTablaCaracteristicas',text:ObtenerFecha(adjudicaciones[parseInt(i)].contractPeriod.endDate)})
                  ) : null,
                  adjudicaciones[parseInt(i)].contractPeriod.maxExtentDate ?
                  $('<tr>').append(
                    $('<td>',{class:'tituloTablaCaracteristicas',text:'Fecha de Máxima para la Renovación o Extensión de Este Período'}),
                    $('<td>',{class:'contenidoTablaCaracteristicas',text:ObtenerFecha(adjudicaciones[parseInt(i)].contractPeriod.maxExtentDate)})
                  ) : null,
                  adjudicaciones[parseInt(i)].contractPeriod.durationInDays ?
                  $('<tr>').append(
                    $('<td>',{class:'tituloTablaCaracteristicas',text:'Duración en Días'}),
                    $('<td>',{class:'contenidoTablaCaracteristicas',text:adjudicaciones[parseInt(i)].contractPeriod.durationInDays})
                  ) : null             
                ]
                ) : null,
                (adjudicaciones[parseInt(i)].id ? 
                  $('<tr>').append(
                    $('<td>',{class:'tituloTablaCaracteristicas',text:'ID Adjudicación'}),
                    $('<td>',{class:'contenidoTablaCaracteristicas',text:adjudicaciones[parseInt(i)].id})
                  ) : null)
              )
            )
          ),
          (adjudicaciones[parseInt(i)].value&&!$.isEmptyObject(adjudicaciones[parseInt(i)].value)?
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
                            ValorMoneda(adjudicaciones[parseInt(i)].value.amount),
                            $('<span>',{class:'textoColorPrimario',text:adjudicaciones[parseInt(i)].value.currency})
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
    
    );/*
    if(adjudicaciones[parseInt(i)].amendments){
      elementos=elementos.concat(ObtenerEnmiendasAdjudicacion(adjudicaciones[parseInt(i)].amendments,adjudicaciones[parseInt(i)]));
    }
    */
    /*if(adjudicaciones[parseInt(i)].documents&&adjudicaciones[parseInt(i)].documents.length){
      $('#documentosTabAdjudicacion').append(
        $('<div>', {class:' cajonSombreadox '}).append(
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
              ObtenerDocumentos(adjudicaciones[parseInt(i)].documents)
            )
          )
        )
      )
    }else{
      $('#documentosTabAdjudicacion').html('<h4 class="titularColor textoColorPrimario mt-3">Esta etapa no posee documentos</h4>')
    
    }*/
  }
  
  return elementos;
}

function ObtenerProveedoresAdjudicados(proveedores){
  var elementos=[]
  for(i=0;i<proveedores.length;i++){
    if(proveedores[parseInt(i)].name){
      elementos.push(
        $('<tr>').append(
        $('<td>',{class:'tituloTablaCaracteristicas',text:'Proveedor Adjudicado'}),
        $('<td>',{class:'contenidoTablaCaracteristicas'}).append(
          $('<a>',{text:proveedores[parseInt(i)].name,class:'enlaceTablaGeneral',href:'/proveedor/'+proveedores[parseInt(i)].id})
        )
      )
      )
      
    }
  }
  return elementos;
}

function ObtenerEnmiendasAdjudicacion(enmiendas,adjudicacion){
  var elementos=[];
  for(var i=0;i<enmiendas.length;i++){
    if(enmiendas[parseInt(i)].id){
      elementos.push(
        $('<div>',{class:'row mt-3'}).append(
          $('<h4>',{class:'col-12 col-sm-12 col-md-12 titularCajonSombreado',text:'Enmienda Adjudicación '+adjudicacion.id})
          ),
        $('<div>', {class:'cajonSombreado contenedorDetalleProcesoDatos mt-1'}).append(
          $('<div>',{class:'contenedorProceso informacionProceso'}).append(
            $('<div>',{class:'contenedorTablaCaracteristicas'}).append(
              $('<table>').append(
                $('<tbody>').append(
                  (enmiendas[parseInt(i)].date?
                    $('<tr>').append(
                      $('<td>',{class:'tituloTablaCaracteristicas',text:'Fecha:'}),
                      $('<td>',{class:'contenidoTablaCaracteristicas textoAlineadoJustificado',text:ObtenerFecha(enmiendas[parseInt(i)].date)})
                    )
                    :null),
                  (enmiendas[parseInt(i)].rationale?
                    $('<tr>').append(
                      $('<td>',{class:'tituloTablaCaracteristicas',text:'Razón:'}),
                      $('<td>',{class:'contenidoTablaCaracteristicas textoAlineadoJustificado',text:enmiendas[parseInt(i)].rationale})
                    )
                    :null),
                  (enmiendas[parseInt(i)].description?
                    $('<tr>').append(
                      $('<td>',{class:'tituloTablaCaracteristicas',text:'Descripción:'}),
                      $('<td>',{class:'contenidoTablaCaracteristicas textoAlineadoJustificado',text:enmiendas[parseInt(i)].description})
                    )
                    :null),
                  (enmiendas[parseInt(i)].id?
                    $('<tr>').append(
                      $('<td>',{class:'tituloTablaCaracteristicas',text:'ID'}),
                      $('<td>',{class:'contenidoTablaCaracteristicas textoAlineadoJustificado',text:enmiendas[parseInt(i)].id})
                    )
                    :null)
                )
              )
            )
          )
        )
      );
    }
  }
  return elementos;
}

function ObtenerContratos(id){
  var arreglo=[];
  if(procesoRecord&&procesoRecord.compiledRelease&&procesoRecord.compiledRelease.contracts){
    var contratos=procesoRecord.compiledRelease.contracts;
   
  for(var i = 0; i < contratos.length;i++){
    if(contratos[parseInt(i)].awardID==id){
      arreglo.push(contratos[parseInt(i)]);
    }else{
    }
  }
  }
  return arreglo;
}
function BotonesContratosAdjudicacion(id){
  var contratos=ObtenerContratos(id);
  var elementos=[];
  for( var i = 0; i < contratos.length ; i++){
    elementos.push($('<button>',{style:'border:none;outline:0;margin-bottom:5px;',class:'botonGeneral fondoColorSecundario',onclick:'location.href="/proceso/'+encodeURIComponent( procesoRecord.ocid)+'/?contrato='+encodeURIComponent(contratos[parseInt(i)].id)+'"' }).text('Ver Contrato'))
  }
  return elementos;
}

function AnadirTablaAdjudicacion(adjudicaciones){
  return $('<div>', {class:'contenedorTablaCaracteristicas'}).append(
    $('<div>', {class:'contenedorProceso informacionProceso'}).append(
      $('<table>',{class:'tablaGeneral'}).append(
        $('<thead>').append(
          $('<tr>').append(
            $('<th>',{text:'Id Adjudicación', toolTexto : "awards[n].id"}),
            $('<th>',{text:'Proveedores', toolTexto : "awards[n].suppliers"}),
            $('<th>',{text:'Descripción', toolTexto : ""}),
            /*$('<th>',{text:'Especificaciones'}),*/
            $('<th>',{text:'Fecha de adjudicación', toolTexto : "awards[n].date"}),
            $('<th>',{text:'Monto', toolTexto : "awards[n].value.amount"}),
            $('<th>',{text:'Contratos', toolTexto : "contracts[n].awardID igual a awards[n].id "})
          )
        ),
        $('<tbody>').append(
          ObtenerAdjudicaciones(adjudicaciones)
        )
      )
    )
    
  )
}


function ObtenerAdjudicaciones(adjudicaciones){
  var elementos=[];
  for(var i=0;i<adjudicaciones.length;i++){
    elementos.push(
      $('<tr>').append(
        $('<td>',{'data-label':'Id Adjudicación',text:adjudicaciones[parseInt(i)].id}),
        $('<td>',{'data-label':'Proveedores'}).append(ObtenerProveedores(adjudicaciones[parseInt(i)].suppliers)),
        $('<td>',{'data-label':'Descripción',text:'No Disponible'}),
        /*$('<td>',{text:items[parseInt(i)].description}),*/
        $('<td>',{'data-label':'Fecha de adjudicación'}).append(
          adjudicaciones[parseInt(i)].date?ObtenerFecha(adjudicaciones[parseInt(i)].date):'No Disponible'
        ),
        $('<td>',{'data-label':'Monto'}).append(
          (adjudicaciones[parseInt(i)].value&&Validar(adjudicaciones[parseInt(i)].value.amount))?(
          $('<span>',{class: 'textoColorPrimario'}).text(ValorMoneda(adjudicaciones[parseInt(i)].value.amount) ),
          $('<span>',{class: 'textoColorPrimario'}).text(adjudicaciones[parseInt(i)].value.currency)):$('<span>',{class:'textoColorGris',text:'No Disponible'})
        ),
        $('<td>',{'data-label':'Contratos'}).append(
          BotonesContratosAdjudicacion(adjudicaciones[parseInt(i)].id)
        )
        
      )
    )
  }
  return elementos;
}



function ObtenerItemsAdjudicaciones(items,id){
  var elementos=[];
  if(items){
    for(var i=0;i<items.length;i++){
      elementos.push(
        $('<tr>').append(
          $('<td>',{'data-label':'id',text:((items[parseInt(i)].classification&&items[parseInt(i)].classification.id)?items[parseInt(i)].classification.id:null)}),
          $('<td>',{'data-label':'Id Adjudicación',text:id}),
          $('<td>',{'data-label':'Clasificación',text:((items[parseInt(i)].classification&&items[parseInt(i)].classification.scheme)?items[parseInt(i)].classification.scheme:null)}),
          $('<td>',{'data-label':'Descripción',text:((items[parseInt(i)].classification&&items[parseInt(i)].classification.description)?items[parseInt(i)].classification.description:null)}),
          /*$('<td>',{text:items[parseInt(i)].description}),*/
          $('<td>',{'data-label':'Cantidad',text:items[parseInt(i)].quantity}),
          $('<td>',{'data-label':'Precio',text:((items[parseInt(i)].unit&&items[parseInt(i)].unit.value&&items[parseInt(i)].unit.value.amount)?items[parseInt(i)].unit.value.amount:null)}),
          $('<td>',{'data-label':'Unidad',text:((items[parseInt(i)].unit&&items[parseInt(i)].unit.name)?items[parseInt(i)].unit.name:null)})
          
        ),
        $('<tr>').append(
          $('<th>',{text:'Especificaciones',style:'vertical-align:top'}),
          $('<td>',{'colspan':4,text:items[parseInt(i)].description,class:'textoAlineadoJustificado'})
        )
      )
    }
  }
  
  return elementos;
}

function ObtenerTodoslosItemsAdjudicacion(){
  var elementos=[];
  if(procesoRecord&&procesoRecord.compiledRelease&&procesoRecord.compiledRelease.awards){
    for(var i=0;i<procesoRecord.compiledRelease.awards.length;i++){
      elementos=elementos.concat(ObtenerItemsAdjudicaciones(procesoRecord.compiledRelease.awards[parseInt(i)].items,procesoRecord.compiledRelease.awards[parseInt(i)].id));
    }
  }
  console.dir('items')
  console.dir(elementos)
  return elementos;
}

function ObtenerTodoslosDocumentosAdjudicacion(){
  var elementos=[];
  if(procesoRecord&&procesoRecord.compiledRelease&&procesoRecord.compiledRelease.awards){
    for(var i=0;i<procesoRecord.compiledRelease.awards.length;i++){
      elementos=elementos.concat(ObtenerDocumentosAdjudicaciones(procesoRecord.compiledRelease.awards[parseInt(i)].documents,procesoRecord.compiledRelease.awards[parseInt(i)].id));
    }
  }
  return elementos;
}

function ObtenerDocumentosAdjudicaciones(documentos,id){
  var elementos=[];
  if(documentos){
    for(var i=0;i<documentos.length;i++){
      elementos.push(
        $('<tr>').append(
          $('<td>',{'data-label':'Id Adjudicación',text:id}),
          $('<td>',{'data-label':'Nombre',text:documentos[parseInt(i)].title}),
          $('<td>',{'data-label':'Descripción',text:documentos[parseInt(i)].description}),
          //$('<td>',{'data-label':'Tipo',text:TraduceTexto(documentos[parseInt(i)].documentType)}),
          $('<td>',{'data-label':'Fecha',text:((documentos[parseInt(i)].datePublished)?ObtenerFecha(documentos[parseInt(i)].datePublished):null)}),
          $('<td>',{class:'textoAlineadoDerecha','data-label':''}).append(
            $('<h4>',{class:'descargaIconos'}).append(
              $('<span>',{class:'textoColorGris textoAlineadoDerecha p-1 cursorMano transicion'}).append(
                $('<a>',{href:documentos[parseInt(i)].url,download:'a',class:'textoColorGris textoAlineadoDerecha p-1 cursorMano transicion',target:'_blank'}).append(
                  $('<i>',{class:'fas fa-file-download'}),
                '&nbsp;'+ObtenerExtension(documentos[parseInt(i)].url)
                )
                
              )
            )
          )
          
        )
      );
    }
  }
  
  return elementos;
}