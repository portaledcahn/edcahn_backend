/**
 * @file procesoContrato.js Este archivo se incluye en la sección de Visualización de un Proceso de Contratación del Portal de Contrataciones Abiertas de Honduras
 * @author Bryant Marcelo Pérez
 * @see <a href="https://github.com/portaledcahn/edcahn_backend/tree/frontend">GitHub</a>
 */
function DefinirElementosContrato(){
    if(procesoRecord.compiledRelease){
      if(procesoRecord.compiledRelease.contracts&&procesoRecord.compiledRelease.contracts.length){
        $('.contrato.informacion').append(
          $('<div>',{class:'row'}).append(
            $('<h4>',{class:'col-6 col-sm-6 col-md-6 titularCajonSombreado',text:'Datos del Contrato'}),
            $('<div>',{class:'col-6 col-sm-6 col-md-6 textoAlineadoDerecha'}).append(
              $('<h4>',{class:'descargaIconos enLinea'}).append(
                $('<span>',{class:'textoColorGris textoAlineadoDerecha p-1 cursorMano transicion',id:'descargaJSONContrato'}).append(
                  $('<i>',{class:'fas fa-file-download'}),
                  '&nbsp;.JSON'
                ),
                $('<span>',{class:'textoColorGris textoAlineadoDerecha p-1 cursorMano transicion',id:'descargaCSVContrato'}).append(
                  $('<i>',{class:'fas fa-file-download'}),
                  '&nbsp;.CSV'
                ),
                $('<span>',{class:'textoColorGris textoAlineadoDerecha p-1 cursorMano transicion',id:'descargaXLSXContrato'}).append(
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
          AdjuntarInformacionContrato(procesoRecord.compiledRelease.contracts),
          
        );
        
      }
    }
  }
  function AdjuntarInformacionContrato(contratos){
    var elementos=[];
    elementos.push(
      $('<div>',{class:'cajonSombreado ', 'data-step':2, 'data-intro':'En esta sección puedes visualizar la información de los contratos del proceso de contratación.'}).append(
        $('<div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical" style="width: 200px;display:inline-block;vertical-align: top">').append(
          ObtenerEnlacesContratos(contratos)
          ),
        $('<div class="tab-content" id="v-pills-tabContent" style="width: calc( 100% - 210px);display:inline-block;vertical-align: top">').append(
          ObtenerContenidosContratos(contratos)
        )
      )
      

    )
    return elementos;
  }

  function ObtenerEnlacesContratos(contratos){
    var elementos=[];
    for(var i = 0; i< contratos.length;i++){
      elementos.push(
        $("<a>",{
          class:"nav-link enlaceContrato transicion "+(i===0?"active":""),
          id:"'X"+SanitizarId(contratos[parseInt(i)].id)+"ContratoTab",
          "data-toggle":"pill",
          href:"X"+SanitizarId(contratos[parseInt(i)].id)+"ContratoContenido",
          role:"tab",
          "aria-controls":"X"+SanitizarId(contratos[parseInt(i)].id)+"ContratoContenido",
          "aria-selected":"true",
          text:contratos[parseInt(i)].id
        })
        /*$('<a class="nav-link enlaceContrato transicion '+(i===0?'active':'')+'" id="'+'X'+SanitizarId(contratos[parseInt(i)].id)+'ContratoTab" data-toggle="pill" href="#'+'X'+SanitizarId(contratos[parseInt(i)].id)+'ContratoContenido" role="tab" aria-controls="'+'X'+SanitizarId(contratos[parseInt(i)].id)+'ContratoContenido" aria-selected="true"></a>').text(contratos[parseInt(i)].id
        )*/
      )
    }
    return elementos;
  }
  function ObtenerContenidosContratos(contratos){
    var elementos=[];
    for(var i = 0; i< contratos.length;i++){
      elementos.push(
        $('<div class="tab-pane fade '+(i===0?'active show':'')+'" id="'+'X'+SanitizarId(contratos[parseInt(i)].id)+'ContratoContenido" role="tabpanel" aria-labelledby="'+'X'+SanitizarId(contratos[parseInt(i)].id)+'ContratoTab">').append(
          $('<nav>').append(
            $('<div>',{class:'nav nav-tabs',role:'tablist'}).append(
            $('<a>',{class:'nav-item nav-link active','data-toggle':'tab',role:'tab','aria-controls':'informacionTabContrato'+'X'+SanitizarId(contratos[parseInt(i)].id),href:'#informacionTabContrato'+'X'+SanitizarId(contratos[parseInt(i)].id),'aria-selected':'true'}).append(
              $('<h4>',{class:'titularColor', style:'font-size: 15px',text:'Información'})
            ),
            $('<a>',{class:'nav-item nav-link ','data-toggle':'tab',role:'tab','aria-controls':'itemsTabContrato'+'X'+SanitizarId(contratos[parseInt(i)].id),href:'#itemsTabContrato'+'X'+SanitizarId(contratos[parseInt(i)].id),'aria-selected':'true'}).append(
              $('<h4>',{class:'titularColor', style:'font-size: 15px',text:'Artículos Solicitados'})
            )
            ,
            $('<a>',{class:'nav-item nav-link ','data-toggle':'tab',role:'tab','aria-controls':'documentosTabContrato'+'X'+SanitizarId(contratos[parseInt(i)].id),href:'#documentosTabContrato'+'X'+SanitizarId(contratos[parseInt(i)].id),'aria-selected':'true'}).append(
              $('<h4>',{class:'titularColor', style:'font-size: 15px',text:'Documentos'})
            )
            ,
            $('<a>',{class:'nav-item nav-link ','data-toggle':'tab',role:'tab','aria-controls':'implementacionTabContrato'+'X'+SanitizarId(contratos[parseInt(i)].id),href:'#implementacionTabContrato'+'X'+SanitizarId(contratos[parseInt(i)].id),'aria-selected':'true'}).append(
              $('<h4>',{class:'titularColor', style:'font-size: 15px',text:'Implementación'})
            )
              )
          ),
          $('<div>',{class:'tab-content cajonSombreado',id:'contenedorTabContrato'+'X'+SanitizarId(contratos[parseInt(i)].id)}).append(
            $('<div>',{class:'tab-pane fade show active',role:'tabpanel','aria-labelledby':'informacionTabContrato'+'X'+SanitizarId(contratos[parseInt(i)].id),id:'informacionTabContrato'+'X'+SanitizarId(contratos[parseInt(i)].id)}).append(
              (contratos[parseInt(i)].title||contratos[parseInt(i)].description?
                $('<div>',{class:'contenedorTablaCaracteristicas'}).append(
                    $('<table>').append(
                      $('<tbody>').append(
                            contratos[parseInt(i)].title?$('<tr>').append(
                            $('<td>',{class:'tituloTablaCaracteristicas',style:'color:#333',toolTexto:"contracts["+i+"].title"}).append(
                              $('<b>',{text:'Título '}),
                              contratos[parseInt(i)].title
                            )):null,
                            contratos[parseInt(i)].description?$('<tr>').append(
                                $('<td>',{class:'tituloTablaCaracteristicas',style:'color:#333',toolTexto:"contracts["+i+"].description"}).append(
                                  $('<b>',{text:'Descripción '}),
                                  contratos[parseInt(i)].description
                                )
                                ):null
                      ))):null),
            $('<div>',{class:'contenedorTablaCaracteristicas'}).append(
              $('<table>').append(
                $('<tbody>').append(
                    contratos[parseInt(i)].buyer&&contratos[parseInt(i)].buyer.name ? 
                      $('<tr>').append(
                        $('<td>',{class:'tituloTablaCaracteristicas',text:'Comprador:',toolTexto:"contracts["+i+"].buyer"}),
                        $('<td>',{class:'contenidoTablaCaracteristicas'}).append(ObtenerElementosParte(contratos[parseInt(i)].buyer.id))
                      ) : null,
                      contratos[parseInt(i)].suppliers ? 
                      $('<tr>').append(
                        $('<td>',{class:'tituloTablaCaracteristicas',text:'Proveedores:',toolTexto:"contracts["+i+"].suppliers"}),
                        $('<td>',{class:'contenidoTablaCaracteristicas'}).append(ObtenerProveedores(contratos[parseInt(i)].suppliers))
                      ) : null,
                  (contratos[parseInt(i)].dateSigned ? 
                      $('<tr>').append(
                        $('<td>',{class:'tituloTablaCaracteristicas',text:'Fecha de Firma'}),
                        $('<td>',{class:'contenidoTablaCaracteristicas',text:ObtenerFecha(contratos[parseInt(i)].dateSigned)})
                      ) : null)
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
                          $('<div>',{class:'contenedorMonto procesoMonto'}).append(
                            $('<div>',{class:'textoColorGris',text:'Monto'}),
                            $('<div>',{class:'valorMonto'}).append(
                              $('<span>',{toolTexto:"contracts["+i+"].value.amount"}).append(ValorMoneda(contratos[parseInt(i)].value.amount)),
                              $('<span>',{class:'textoColorPrimario',text:contratos[parseInt(i)].value.currency,toolTexto:"contracts["+i+"].value.currency"})
                            )
  
                            
                          )
                        )
                      )
                    )
                    )
                    )
              ):null)
            ),
            $('<div>',{class:'tab-pane fade',role:'tabpanel','aria-labelledby':'itemsTabContrato'+'X'+SanitizarId(contratos[parseInt(i)].id),id:'itemsTabContrato'+'X'+SanitizarId(contratos[parseInt(i)].id)}).append(
              (contratos[parseInt(i)].items)?
              
                $('<div>', {class:' cajonSombreadox '}).append(
                  $('<table>',{class:'tablaGeneral'}).append(
                    $('<thead>').append(
                      $('<tr>').append(
                        $('<th>',{text:'Id', toolTexto:'contracts['+i+'].items[n].classification.id'}),
                        $('<th>',{text:'Clasificación', toolTexto:'contracts['+i+'].items[n].classification.scheme'}),
                        $('<th>',{text:'Descripción', toolTexto:'contracts['+i+'].items[n].classification.description'}),
                        /*$('<th>',{text:'Especificaciones'}),*/
                        $('<th>',{text:'Cantidad', toolTexto:'contracts['+i+'].items[n].quantity'}),
                        $('<th>',{text:'Precio', toolTexto:'contracts['+i+'].items[n].unit.value.amount'}),
                        $('<th>',{text:'Unidad', toolTexto:'contracts['+i+'].items[n].unit.name'})
                      )
                    ),
                    $('<tbody>').append(
                      ObtenerItems(contratos[parseInt(i)].items)
                    )
                  )
                )
              
              : $('<h4 class="titularColor textoColorPrimario mt-3">Esta contrato no posee artículos</h4>')
            ),
            $('<div>',{class:'tab-pane fade',role:'tabpanel','aria-labelledby':'documentosTabContrato'+'X'+SanitizarId(contratos[parseInt(i)].id),id:'documentosTabContrato'+'X'+SanitizarId(contratos[parseInt(i)].id)}).append(
              (contratos[parseInt(i)].documents)?$('<div>', {class:' cajonSombreadox '}).append(
                $('<table>',{class:'tablaGeneral'}).append(
                  $('<thead>').append(
                    $('<tr>').append(
                      $('<th>',{text:'Nombre', toolTexto:'contracts['+i+'].documents[n].title'}),
                      $('<th>',{text:'Descripción',toolTexto:'contracts['+i+'].documents[n].description'}),
                      //$('<th>',{text:'Tipo',toolTexto:'contracts['+i+'].documents[n].documentType'}),
                      $('<th>',{text:'Fecha',toolTexto:'contracts['+i+'].documents[n].datePublished'}),
                      $('<th>',{text:''})
                    )
                  ),
                  $('<tbody>').append(
                    ObtenerDocumentos(contratos[parseInt(i)].documents)
                  )
                )
              ):$('<h4 class="titularColor textoColorPrimario mt-3">Esta etapa no posee documentos</h4>')
            ),
            $('<div>',{class:'tab-pane fade',role:'tabpanel','aria-labelledby':'implementacionTabContrato'+'X'+SanitizarId(contratos[parseInt(i)].id),id:'implementacionTabContrato'+'X'+SanitizarId(contratos[parseInt(i)].id)}).append(
              $('<h4 class="titularCajonSombreado" style="color:black">Transacciones</h4>'),
              (contratos[parseInt(i)].implementation&&contratos[parseInt(i)].implementation.transactions)?ObtenerTransacciones(contratos[parseInt(i)].implementation.transactions,contratos[parseInt(i)].implementation):$('<h4 class="titularColor textoColorPrimario mt-3">No hay transacciones disponibles.</h4>'),
              
              $('<h4 class="titularCajonSombreado">Obligaciones Financieras</h4>'),
              (contratos[parseInt(i)].implementation&&contratos[parseInt(i)].implementation.financialObligations)?ObtenerObligacionesFinancieras(contratos[parseInt(i)].implementation.financialObligations):$('<h4 class="titularColor textoColorPrimario mt-3">No hay obligaciones financieras disponibles.</h4>'),
            )
          )
          )
        
      );
    }
    return elementos;
  }
function ObtenerTransacciones(transacciones,implementacion){
  var elementos=[];

  for(var i =0; i < transacciones.length ; i++){
    elementos.push(
      $('<div class="mb-3" style="border-bottom: 3px solid #dee2e6;">').append(
        $('<div>',{class:'contenedorTablaCaracteristicas'}).append(
          $('<table>').append(
            $('<tbody>').append(
              transacciones[parseInt(i)].date ?
              $('<tr>').append(
                $('<td>',{class:'tituloTablaCaracteristicas',text:'Fecha',toolTexto:"contracts[n].transactions["+i+"].date"}),
                $('<td>',{class:'contenidoTablaCaracteristicas',text:ObtenerFecha(transacciones[parseInt(i)].date)})
              ) : null,
              (transacciones[parseInt(i)].payer&&transacciones[parseInt(i)].payer.name) ?
              $('<tr>').append(
                $('<td>',{class:'tituloTablaCaracteristicas',text:'Proveedor de Fondos',toolTexto:"contracts[n].transactions["+i+"].payer.name"}),
                $('<td>',{class:'contenidoTablaCaracteristicas'}).append(
                  transacciones[parseInt(i)].payer.name
                  /*'/comprador/'+encodeURIComponent(resultados[parseInt(i)].id)}).text(resultados[parseInt(i)].name)$('<a>',{class:'enlaceTablaGeneral',href:'/comprador/'+encodeURIComponent(transacciones[parseInt(i)].payer.id)}).text(transacciones[parseInt(i)].payer.name)*/
                  
                  /*ObtenerElementosParte(transacciones[parseInt(i)].payer.id)*/


                  
                )
              ) : null,
              (transacciones[parseInt(i)].payee&&transacciones[parseInt(i)].payee.name) ?
              $('<tr>').append(
                $('<td>',{class:'tituloTablaCaracteristicas',text:'Receptor de Fondos',toolTexto:"contracts[n].transactions["+i+"].payee.name"}),
                $('<td>',{class:'contenidoTablaCaracteristicas'}).append(
                  /*$('<a>',{class:'enlaceTablaGeneral',href:'/proveedor/'+encodeURIComponent(transacciones[parseInt(i)].payee.id)}).text(transacciones[parseInt(i)].payee.name)*/
                  ObtenerElementosParte(transacciones[parseInt(i)].payee.id)
                )
              ) : null,
              (ObtenerObligacionesTransaccion(transacciones[parseInt(i)],implementacion.financialObligations).length) ?
              $('<tr>').append(
                $('<td>',{class:'tituloTablaCaracteristicas',text:'Obligaciones Financieras',toolTexto:"contracts[n].financialObligations[n]"}),
                $('<td>',{class:'contenidoTablaCaracteristicas'}).append(
                  ObtenerObligacionesFinancieras(ObtenerObligacionesTransaccion(transacciones[parseInt(i)],implementacion.financialObligations))
                )
              ) : null
            )
          )
        ),
        transacciones[parseInt(i)].value?$('<div>',{
          class:'montoTotalProceso pb-3',style:'width:100%;display:block;text-align:right'
        }).append(
          /*$('<img>',{class:'imagenMonto mr-1',src:'/static/img/otros/monedasHonduras.png'}),*/
          $('<div>',{class:'contenedorMonto procesoMonto'}).append(
            $('<div>',{class:'textoColorGris',text:'Monto'}),
            $('<div>',{class:'valorMonto'}).append(
              $('<span>',{toolTexto:"contracts[n].transactions["+i+"].amount.amount"}).append(
                ValorMoneda(transacciones[parseInt(i)].value.amount)
              )
              ,
              $('<span>',{class:'textoColorPrimario',text:transacciones[parseInt(i)].value.currency,toolTexto:"contracts[n].transactions["+i+"].amount.currency"})
            )

            
          )
        ):null
      )
    );
  }

  return elementos;

}

function ObtenerObligacionesFinancieras(obligaciones){
  var elementos=[];
  for(var i =0; i < obligaciones.length ; i++){
    elementos.push(
      $('<div class="mb-3" style="border-bottom: 3px solid #dee2e6;">').append(
        $('<div>',{class:'contenedorTablaCaracteristicas'}).append(
          $('<table>').append(
            $('<tbody>').append(
              obligaciones[parseInt(i)].approvalDate ?
              $('<tr>').append(
                $('<td>',{class:'tituloTablaCaracteristicas', style:'color:black',text:'Fecha de Aprobacion',toolTexto:"contracts[n].implementation. financialObligations["+i+"].approvalDate"}),
                $('<td>',{class:'contenidoTablaCaracteristicas',text:ObtenerFecha(obligaciones[parseInt(i)].approvalDate)})
              ) : null,
              (obligaciones[parseInt(i)].id) ?
              $('<tr>').append(
                $('<td>',{class:'tituloTablaCaracteristicas', style:'color:black',text:'Identificador',toolTexto:"contracts[n].implementation. financialObligations["+i+"].id"}),
                $('<td>',{class:'contenidoTablaCaracteristicas'}).append(obligaciones[parseInt(i)].id)
              ) : null,
              (obligaciones[parseInt(i)].description) ?
              $('<tr>').append(
                $('<td>',{class:'tituloTablaCaracteristicas', style:'color:black',text:'Descripción',toolTexto:"contracts[n].implementation. financialObligations["+i+"].description"}),
                $('<td>',{class:'contenidoTablaCaracteristicas'}).append(obligaciones[parseInt(i)].description)
              ) : null,
              (obligaciones[parseInt(i)].retentions&&obligaciones[parseInt(i)].retentions.length) ?
              $('<tr>').append(
                $('<td>',{class:'tituloTablaCaracteristicas', style:'color:black',text:'Retenciones',toolTexto:"contracts[n].implementation. financialObligations["+i+"].retentions"}),
                $('<td>',{class:'contenidoTablaCaracteristicas'}).append(ObtenerRetenciones(obligaciones[parseInt(i)].retentions))
              ) : null
              
              
            )
          )
        ),
        obligaciones[parseInt(i)].bill&&obligaciones[parseInt(i)].bill.amount?$('<div>',{
          class:'montoTotalProceso pb-3'
        }).append(
          /*$('<img>',{class:'imagenMonto mr-1',src:'/static/img/otros/monedasHonduras.png'}),*/
          $('<div>',{class:'contenedorMonto procesoMonto'}).append(
            $('<div>',{class:'textoColorGris',style:'font-size:20px',text:'Factura #'+obligaciones[parseInt(i)].bill.id+', '+ObtenerFecha(obligaciones[parseInt(i)].bill.date,'fecha')}),
            $('<div>',{class:'valorMonto',style:'font-size:20px'}).append(
              $('<span>',{toolTexto:"contracts[n].implementation.financialObligations["+i+"].bill.amount.amount"}).append(
                ValorMoneda(obligaciones[parseInt(i)].bill.amount.amount)
              )
              ,
              $('<span>',{class:'textoColorPrimario',text:obligaciones[parseInt(i)].bill.amount.currency,toolTexto:"contracts[n].transactions["+i+"].amount.currency"})
            )

            
          )
        ):null
      )
    );
  }
  return elementos;
}

function ObtenerRetenciones(retenciones){
  var elementos=[];
  for(var i =0; i < retenciones.length ; i++){
    if(retenciones[parseInt(i)].amount&&Validar(retenciones[parseInt(i)].amount.amount)){
      elementos.push(
        $('<div>',{class:'textoColorNegro',text:retenciones[parseInt(i)].name}),
        $('<div>',{class:'valorMonto',style:'font-weight:700;font-size:20px;font-family:poppins'}).append(
          $('<span>',{toolTexto:"contracts[n].implementation. financialObligations[n].retentions["+i+"].amount.amount"}).append(
            ValorMoneda(retenciones[parseInt(i)].amount.amount)
          )
          ,
          $('<span>',{class:'textoColorAdvertencia',text:retenciones[parseInt(i)].amount.currency,toolTexto:"contracts[n].implementation. financialObligations[n].retentions["+i+"].amount.currency"})
        )
        );
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

