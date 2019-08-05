function DefinirElementosConvocatoria(){
    if(procesoRecord.compiledRelease){
      if(procesoRecord.compiledRelease.tender){
        
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
                (procesoRecord.compiledRelease.tender.title||procesoRecord.compiledRelease.tender.description?
                    $('<div>',{class:'contenedorTablaCaracteristicas'}).append(
                        $('<table>').append(
                          $('<tbody>').append(
                                procesoRecord.compiledRelease.tender.title?$('<tr>').append(
                                $('<td>',{class:'tituloTablaCaracteristicas',text:procesoRecord.compiledRelease.tender.title,style:'color:#333'})):null,
                                procesoRecord.compiledRelease.tender.description?$('<tr>').append(
                                    $('<td>',{class:'',text:procesoRecord.compiledRelease.tender.description,style:'color:#333'})):null
                          ))):null),
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