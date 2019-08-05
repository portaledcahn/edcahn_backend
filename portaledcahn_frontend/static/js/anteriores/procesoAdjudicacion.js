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
            (adjudicaciones[i].title||adjudicaciones[i].description?
                $('<div>',{class:'contenedorTablaCaracteristicas'}).append(
                    $('<table>').append(
                      $('<tbody>').append(
                            adjudicaciones[i].title?$('<tr>').append(
                            $('<td>',{class:'tituloTablaCaracteristicas',text:adjudicaciones[i].title,style:'color:#333'})):null,
                            adjudicaciones[i].description?$('<tr>').append(
                                $('<td>',{class:'',text:adjudicaciones[i].description,style:'color:#333'})):null
                      ))):null),
            $('<div>',{class:'contenedorTablaCaracteristicas'}).append(
              $('<table>').append(
                $('<tbody>').append(
                  (procesoRecord.compiledRelease.buyer&&procesoRecord.compiledRelease.buyer.name&&procesoRecord.compiledRelease.parties ? 
                    ObtenerCompradores(procesoRecord.compiledRelease.parties,procesoRecord.compiledRelease.buyer) : null),
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
  