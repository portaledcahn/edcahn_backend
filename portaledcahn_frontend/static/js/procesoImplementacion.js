
function DefinirElementosImplementacion(){
    if(procesoRecord.compiledRelease){
      if(procesoRecord.compiledRelease.contracts&&procesoRecord.compiledRelease.contracts.length){
        $('.implementacion.informacion').append(
          $('<div>',{class:'row'}).append(
            $('<h4>',{class:'col-6 col-sm-6 col-md-6 titularCajonSombreado',text:'Datos de Implementación'}),
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
          AdjuntarInformacionImplementacion(procesoRecord.compiledRelease.contracts),
          
        );
        
      }
    }
  }
  
  function AdjuntarInformacionImplementacion(contratos){
    var elementos=[];
    for(var i=0;i<contratos.length;i++){
      elementos.push(
        $('<div>',{class:'cajonSombreado contenedorDetalleProcesoDatos'}).append(
          $('<div>',{class:'contenedorProceso informacionProceso'}).append(
            (contratos[parseInt(i)].title||contratos[parseInt(i)].description?
                $('<div>',{class:'contenedorTablaCaracteristicas'}).append(
                    $('<table>').append(
                      $('<tbody>').append(
                            contratos[parseInt(i)].title?$('<tr>').append(
                            $('<td>',{class:'tituloTablaCaracteristicas',text:contratos[parseInt(i)].title,style:'color:#333'})):null,
                            contratos[parseInt(i)].description?$('<tr>').append(
                                $('<td>',{class:'',text:contratos[parseInt(i)].description,style:'color:#333'})):null
                      ))):null),
            $('<div>',{class:'contenedorTablaCaracteristicas'}).append(
              $('<table>').append(
                $('<tbody>').append(
                  (contratos[parseInt(i)].buyer&&contratos[parseInt(i)].buyer.name ? 
                    $('<tr>').append(
                      $('<td>',{class:'tituloTablaCaracteristicas',text:'Comprador'}),
                      $('<td>',{class:'contenidoTablaCaracteristicas'}).append(
                        $('<a>',{text:contratos[parseInt(i)].buyer.name,class:'enlaceTablaGeneral',href:'/comprador/'+contratos[parseInt(i)].buyer.id})
                      )
                    ) : null),
                  (contratos[parseInt(i)].suppliers&&contratos[parseInt(i)].suppliers.length ? 
                    ObtenerProveedoresContratos(contratos[parseInt(i)].suppliers) : null)
                  ,
                  (contratos[parseInt(i)].dateSigned ? 
                      $('<tr>').append(
                        $('<td>',{class:'tituloTablaCaracteristicas',text:'Fecha de Firma'}),
                        $('<td>',{class:'contenidoTablaCaracteristicas',text:ObtenerFecha(contratos[parseInt(i)].dateSigned)})
                      ) : null),
                  $('<tr>').append(
                    $('<td>',{class:'tituloTablaCaracteristicas',text:'ID Proceso (OCID):'}),
                    $('<td>',{class:'contenidoTablaCaracteristicas',text:procesoRecord.ocid})
                  )
                  )
                  )
            ),
            (contratos[parseInt(i)].value&&contratos[parseInt(i)].value.amount?
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
                              ValorMoneda(contratos[parseInt(i)].value.amount),
                              $('<span>',{class:'textoColorPrimario',text:contratos[parseInt(i)].value.currency})
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
          (procesoRecord.compiledRelease.parties&&procesoRecord.compiledRelease.contracts[parseInt(i)]&&procesoRecord.compiledRelease.contracts[parseInt(i)].suppliers ? 
          $('<div>',{class:'row mb-5 mt-5'}).append(
            ObtenerDatosContacto(procesoRecord.compiledRelease.parties,'supplier',['Unidad de Proveedor:','Proveedor:'])
          ) : null)
      );
      if(contratos[parseInt(i)].items&&contratos[parseInt(i)].items.length){
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
                ObtenerItems(contratos[parseInt(i)].items)
              )
            )
          )
        )
      }
      if(contratos[parseInt(i)].documents&&contratos[parseInt(i)].documents.length){
        $('.contrato.documentos').append(
          $('<div>', {class:' cajonSombreado '}).append(
            $('<table>',{class:'tablaGeneral'}).append(
              $('<thead>').append(
                $('<tr>').append(
                  $('<th>',{text:'Nombre'}),
                  $('<th>',{text:'Descripción'}),
                  //$('<th>',{text:'Tipo'}),
                  $('<th>',{text:'Fecha'}),
                  $('<th>',{text:''})
                )
              ),
              $('<tbody>').append(
                ObtenerDocumentos(contratos[parseInt(i)].documents)
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
      if(proveedores[parseInt(i)].name){
        elementos.push(
          $('<tr>').append(
          $('<td>',{class:'tituloTablaCaracteristicas',text:'Contrato de Proveedor'}),
          $('<td>',{class:'contenidoTablaCaracteristicas'}).append(
            $('<a>',{text:proveedores[parseInt(i)].name,class:'enlaceTablaGeneral',href:'/proveedor/'+proveedores[parseInt(i)].id})
          )
        )
        );
        
      }
    }
    return elementos;
  }

  function VerificarImplementacion(){}