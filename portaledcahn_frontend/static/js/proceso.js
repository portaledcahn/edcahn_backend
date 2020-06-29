/**
 * @file proceso.js Este archivo se incluye en la sección de Visualización de un Proceso de Contratación del Portal de Contrataciones Abiertas de Honduras
 * @author Bryant Marcelo Pérez
 * @see <a href="https://github.com/portaledcahn/edcahn_backend/tree/frontend">GitHub</a>
 */
/*OCID del proceso de contratacion*/
var procesoOcid="";
var procesoRecord={};


/*Onload de la Página*/
$(function(){
    procesoOcid=$("#procesoOcid").val();
    /*Añadir evento click a los pasos del proceso de contratación para mostrar el div de su contenido*/
    $(".botonPasoProceso").on("click",function(evento){
      if(!$(evento.currentTarget).hasClass("deshabilitado")){
        $(".botonPasoProceso").removeClass("activo");
        $(evento.currentTarget).addClass("activo");

        $(".pasoOcultar").hide();
        $(".tituloOcultar").hide();
        var estado=$(evento.currentTarget).attr("estado");
        $("."+estado+".titulo").show();
        var panel=ObtenerPrimeraPropiedad(estado);
        if(panel){
          $(".botonPropiedadProceso").removeClass("activo");
          $(".botonPropiedadProceso[propiedad='"+panel+"']").addClass("activo");
          $("."+estado+"."+panel).show();
        }
        var propiedades=["documentos","historial","invitados","solicitados","informacion"];
        for(var i=0;i<propiedades.length;i++){
          MostrarPropiedadProceso(estado,propiedades[parseInt(i)]);
        }
      }
    });
    /*Añadir evento click a los atributos del proceso de contratación para mostrar el div de su contenido*/
    $(".botonPropiedadProceso").on("click",function(evento){
      $(".botonPropiedadProceso").removeClass("activo");
      if(!$(evento.currentTarget).hasClass("deshabilitado")){
        $(".pasoOcultar").hide();
        $(evento.currentTarget).addClass("activo");
        $("."+$(evento.currentTarget).attr("propiedad")+"."+$(".botonPasoProceso.activo").attr("estado")).show();
      }
    });
    ObtenerProceso();
    
   
  
    
  });

function MostrarPropiedadProceso(estado,nombre){
    if($("."+estado+"."+nombre).html().trim()){
        $(".botonPropiedadProceso[propiedad='"+nombre+"']").show();
        }else{
        $(".botonPropiedadProceso[propiedad='"+nombre+"']").hide();
        }
}
function MostrarPrimerProceso(){
  var pasos=$(".botonPasoProceso").not(".deshabilitado");
  if(pasos.length){
    $(".botonPasoProceso").removeClass("activo");
    if(ObtenerValor( "contrato")){
      pasos=$(".botonPasoProceso[estado='contrato']").not(".deshabilitado");
      $("#X"+SanitizarId(decodeURIComponent(ObtenerValor( "contrato")))+"ContratoTab").tab("show");
    }
    $(pasos[0]).addClass("activo");

    $(".pasoOcultar").hide();
    $(".tituloOcultar").hide();
    var estado=$(pasos[0]).attr("estado");
    $("."+estado+".titulo").show();
    var panel=ObtenerPrimeraPropiedad(estado);
    if(panel){
      $(".botonPropiedadProceso").removeClass("activo");
      $(".botonPropiedadProceso[propiedad='"+panel+"']").addClass("activo");
      $("."+estado+"."+panel).show();
    }
    var propiedades=["informacion","documentos","historial","invitados","solicitados"];
    for(var i=0;i<propiedades.length;i++){
      MostrarPropiedadProceso(estado,propiedades[parseInt(i)]);
    }
  }
  
}

function ObtenerProceso(){
 

  
  if(procesoOcid){
    MostrarEspera("body .tamanoMinimo");
    EliminarEventoModalDescarga("descargaJsonProceso");
    EliminarEventoModalDescarga("descargaCsvProceso");
    EliminarEventoModalDescarga("descargaXlsxProceso");
    $.get(api+'/record/'+procesoOcid/*url+'/static/'+procesoOcid+'.json'*/,function(datos){
    
      if(datos&&!datos.detail){
       // download(JSON.stringify(datos), "json.txt", "text/plain");
        $("#procesoCargaContedor").show();
        procesoRecord=datos;
        
        DefinirElementosPlaneacion();
        DefinirElementosConvocatoria();
        DefinirElementosAdjudicacion();
        DefinirElementosContrato();
        AnadirPartes();
        DeshabilitarItems();
        
        MostrarPrimerProceso();
        AgregarToolTips();
        AsignarOrdenTabla();
        VerificarIntroduccion("INTROJS_PROCESO",1);
        
        OcultarEspera("body .tamanoMinimo");
        
        InicializarDescargas();
        

        


      }else{
        OcultarEspera("body .tamanoMinimo");
        $("#noEncontrado").show();
        /*No se encontro el proceso de contratacion */
      }
      
      
  }).fail(function() {
    /*Error de Conexion al servidor */
    console.dir("error get")
    
    OcultarEspera("body .tamanoMinimo");
    $("#noEncontrado").show();
    
  });
  }else{
    $("#noEncontrado").show();
  }
  
}





function DeshabilitarItems(){
  var pasos=["planificacion","convocatoria","adjudicacion","contrato","implementacion"];
  for(var i=0;i<pasos.length;i++){
    DeshabilitarPaso(pasos[parseInt(i)]);
  }
  $("#etapasProceso").show();
}
function DeshabilitarPaso(paso){
  if(ContarPropiedades(paso)==0){
    $(".botonPasoProceso[estado='"+paso+"']").addClass("deshabilitado");
  }
}
function ContarPropiedades(paso){
  var numeroPropiedades=0;
  var propiedades=["informacion","documentos","historial","invitados","solicitados"];
  for(var i=0;i<propiedades.length;i++){
    if($("."+paso+"."+propiedades[parseInt(i)]).html().trim()!=""){
      numeroPropiedades++;
    }
  }
  return numeroPropiedades;
}
function ObtenerPropiedades(paso){
  var procesoPropiedades=[];
  var propiedades=["informacion","documentos","historial","invitados","solicitados"];
  for(var i=0;i<propiedades.length;i++){
    if($("."+paso+"."+propiedades[parseInt(i)]).html().trim()!=""){
      procesoPropiedades.push(propiedades[parseInt(i)])
    }
  }
  return procesoPropiedades;
}
function ObtenerPrimeraPropiedad(paso){
      var propiedades=ObtenerPropiedades(paso);
      if(propiedades.length){
        return propiedades[0];
      }else{
        return "";
      }
}

function ObtenerItems(items){
  var elementos=[];
  for(var i=0;i<items.length;i++){
    elementos.push(
      $("<tr>").append(
        $("<td>",{"data-label":"id",text:((items[parseInt(i)].classification&&items[parseInt(i)].classification.id)?items[parseInt(i)].classification.id:null)}),
        $("<td>",{"data-label":"Clasificación",text:((items[parseInt(i)].classification&&items[parseInt(i)].classification.scheme)?items[parseInt(i)].classification.scheme:null)}),
        $("<td>",{"data-label":"Descripción",text:((items[parseInt(i)].classification&&items[parseInt(i)].classification.description)?items[parseInt(i)].classification.description:null)}),
        /*$("<td>",{text:items[parseInt(i)].description}),*/
        $("<td>",{"data-label":"Cantidad",text:items[parseInt(i)].quantity}),
        $("<td>",{"data-label":"Precio",text:((items[parseInt(i)].unit&&items[parseInt(i)].unit.value&&items[parseInt(i)].unit.value.amount)?items[parseInt(i)].unit.value.amount:null)}),
        $("<td>",{"data-label":"Unidad",text:((items[parseInt(i)].unit&&items[parseInt(i)].unit.name)?items[parseInt(i)].unit.name:null)})
        
      ),
      $("<tr>").append(
        $("<th>",{text:"Especificaciones",style:"vertical-align:top"}),
        $("<td>",{"colspan":4,text:items[parseInt(i)].description,class:"textoAlineadoJustificado"})
      )
    )
  }
  return elementos;
}
function ObtenerCompradores(partes,comprador){
  var elementos=[]
  for(i=0;i<partes.length;i++){
    if(partes[parseInt(i)].roles&&partes[parseInt(i)].roles.includes("buyer")){
      elementos.push(
        $("<tr>").append(
        $("<td>",{class:"tituloTablaCaracteristicas",text:partes[parseInt(i)].memberOf&&partes[parseInt(i)].memberOf.length ? "Unidad Ejecutora:": "Comprador"}),
        $("<td>",{class:"contenidoTablaCaracteristicas"}).append(
          $("<a>",{text:partes[parseInt(i)].name,class:"enlaceTablaGeneral",href:"/comprador/"+partes[parseInt(i)].id})
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
    if(partes[parseInt(i)].roles&&partes[parseInt(i)].roles.includes(tipo)){
      elementos.push(
        $("<div>",{class:"col-md-6"}).append(
          $("<h4>",{class:"titularCajonSombreado",text:"Datos de Contacto de "+((partes[parseInt(i)].memberOf&&partes[parseInt(i)].memberOf.length) ? nombres[0]: nombres[1])}),
          $("<div>",{class:"cajonSombreado"}).append(
            $("<div>",{class:"contenedorProceso informacionProceso"}).append(
              $("<div>",{class:"contenedorTablaCaracteristicas"}).append(
                $("<table>").append(
                  $("<tbody>").append(
                    
                    partes[parseInt(i)].address&&partes[parseInt(i)].address.region ? 
                    $("<tr>").append(
                      $("<td>",{class:"tituloTablaCaracteristicas",text:"Departamento:"}),
                      $("<td>",{class:"contenidoTablaCaracteristicas",text:partes[parseInt(i)].address.region})
                    )
                    : null,
                    partes[parseInt(i)].address&&partes[parseInt(i)].address.locality ? 
                    $("<tr>").append(
                      $("<td>",{class:"tituloTablaCaracteristicas",text:"Municipio:"}),
                      $("<td>",{class:"contenidoTablaCaracteristicas",text:partes[parseInt(i)].address.locality})
                    )
                    : null,
                    partes[parseInt(i)].address&&partes[parseInt(i)].address.streetAddress ? 
                    $("<tr>").append(
                      $("<td>",{class:"tituloTablaCaracteristicas",text:"Dirección:"}),
                      $("<td>",{class:"contenidoTablaCaracteristicas",text:partes[parseInt(i)].address.streetAddress})
                    )
                    : null,
                    partes[parseInt(i)].contactPoint&&partes[parseInt(i)].contactPoint.name ? 
                    $("<tr>").append(
                      $("<td>",{class:"tituloTablaCaracteristicas",text:"Encargado:"}),
                      $("<td>",{class:"contenidoTablaCaracteristicas",text:partes[parseInt(i)].contactPoint.name})
                    )
                    : null,
                    partes[parseInt(i)].contactPoint&&partes[parseInt(i)].contactPoint.email ? 
                    $("<tr>").append(
                      $("<td>",{class:"tituloTablaCaracteristicas",text:"Correo Electrónico:"}),
                      $("<td>",{class:"contenidoTablaCaracteristicas",text:partes[parseInt(i)].contactPoint.email})
                    )
                    : null,
                    partes[parseInt(i)].contactPoint&&partes[parseInt(i)].contactPoint.telephone ? 
                    $("<tr>").append(
                      $("<td>",{class:"tituloTablaCaracteristicas",text:"Teléfono:"}),
                      $("<td>",{class:"contenidoTablaCaracteristicas",text:partes[parseInt(i)].contactPoint.telephone})
                    )
                    : null,
                    partes[parseInt(i)].contactPoint&&partes[parseInt(i)].contactPoint.faxNumber ? 
                    $("<tr>").append(
                      $("<td>",{class:"tituloTablaCaracteristicas",text:"Fax:"}),
                      $("<td>",{class:"contenidoTablaCaracteristicas",text:partes[parseInt(i)].contactPoint.faxNumber})
                    )
                    : null,
                    partes[parseInt(i)].contactPoint&&partes[parseInt(i)].contactPoint.url ? 
                    $("<tr>").append(
                      $("<td>",{class:"tituloTablaCaracteristicas",text:"Sitio:"}),
                      $("<td>",{class:"contenidoTablaCaracteristicas"}).append(
                        $("<a>",{text:partes[parseInt(i)].contactPoint.url,class:"enlaceTablaGeneral",href:partes[parseInt(i)].contactPoint.url})
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
    if(desglosePresupuesto[parseInt(i)].classifications){
      elementos.push(
        /*$("<div>", {class:" cajonSombreado contenedorDetalleProcesoDatos mt-1"}).append(*/
          $("<div>",{class:"contenedorProceso informacionProceso"}).append(
            $("<div>",{class:"contenedorTablaCaracteristicas"}).append(
              $("<table>").append(
                $("<tbody>").append(
                  (desglosePresupuesto[parseInt(i)].classifications.gestion?
                    $("<tr>").append(
                      $("<td>",{class:"tituloTablaCaracteristicas",text:"Periodo de Gestión:"}),
                      $("<td>",{class:"contenidoTablaCaracteristicas textoAlineadoJustificado",text:desglosePresupuesto[parseInt(i)].classifications.gestion})
                    )
                    :null),
                  (desglosePresupuesto[parseInt(i)].classifications.institucion?
                    $("<tr>").append(
                      $("<td>",{class:"tituloTablaCaracteristicas",text:"Institución:"}),
                      $("<td>",{class:"contenidoTablaCaracteristicas textoAlineadoJustificado",text:desglosePresupuesto[parseInt(i)].classifications.institucion})
                    )
                    :null),
                  (desglosePresupuesto[parseInt(i)].classifications.programa?
                    $("<tr>").append(
                      $("<td>",{class:"tituloTablaCaracteristicas",text:"Programa:"}),
                      $("<td>",{class:"contenidoTablaCaracteristicas textoAlineadoJustificado",text:desglosePresupuesto[parseInt(i)].classifications.programa})
                    )
                    :null),
                  (desglosePresupuesto[parseInt(i)].classifications.subPrograma?
                    $("<tr>").append(
                      $("<td>",{class:"tituloTablaCaracteristicas",text:"Sub Programa:"}),
                      $("<td>",{class:"contenidoTablaCaracteristicas textoAlineadoJustificado",text:desglosePresupuesto[parseInt(i)].classifications.subPrograma})
                    )
                    :null),
                  (desglosePresupuesto[parseInt(i)].classifications.proyecto?
                    $("<tr>").append(
                      $("<td>",{class:"tituloTablaCaracteristicas",text:"Proyecto:"}),
                      $("<td>",{class:"contenidoTablaCaracteristicas textoAlineadoJustificado",text:desglosePresupuesto[parseInt(i)].classifications.proyecto})
                    )
                    :null),
                        
                  (desglosePresupuesto[parseInt(i)].classifications.actividadObra?
                    $("<tr>").append(
                      $("<td>",{class:"tituloTablaCaracteristicas",text:"Actividad Obra:"}),
                      $("<td>",{class:"contenidoTablaCaracteristicas textoAlineadoJustificado",text:desglosePresupuesto[parseInt(i)].classifications.actividadObra})
                    )
                    :null),
                  (desglosePresupuesto[parseInt(i)].classifications.ga?
                    $("<tr>").append(
                      $("<td>",{class:"tituloTablaCaracteristicas",text:"Gerencia Administrativa:"}),
                      $("<td>",{class:"contenidoTablaCaracteristicas textoAlineadoJustificado",text:desglosePresupuesto[parseInt(i)].classifications.ga})
                    )
                    :null),
                  (desglosePresupuesto[parseInt(i)].classifications.ue?
                    $("<tr>").append(
                      $("<td>",{class:"tituloTablaCaracteristicas",text:"Unidad Ejecutora:"}),
                      $("<td>",{class:"contenidoTablaCaracteristicas textoAlineadoJustificado",text:desglosePresupuesto[parseInt(i)].classifications.ue})
                    )
                    :null),
                  (desglosePresupuesto[parseInt(i)].classifications.fuente?
                    $("<tr>").append(
                      $("<td>",{class:"tituloTablaCaracteristicas",text:"Fuente de Financiamiento:"}),
                      $("<td>",{class:"contenidoTablaCaracteristicas textoAlineadoJustificado",text:desglosePresupuesto[parseInt(i)].classifications.fuente})
                    )
                    :null),
                  (desglosePresupuesto[parseInt(i)].classifications.organismo?
                    $("<tr>").append(
                      $("<td>",{class:"tituloTablaCaracteristicas",text:"Organismo Financiador:"}),
                      $("<td>",{class:"contenidoTablaCaracteristicas textoAlineadoJustificado",text:desglosePresupuesto[parseInt(i)].classifications.organismo})
                    )
                    :null),
                  (desglosePresupuesto[parseInt(i)].classifications.objeto?
                    $("<tr>").append(
                      $("<td>",{class:"tituloTablaCaracteristicas",text:"Objeto del Gasto:"}),
                      $("<td>",{class:"contenidoTablaCaracteristicas textoAlineadoJustificado",text:desglosePresupuesto[parseInt(i)].classifications.objeto})
                    )
                    :null),
                  (desglosePresupuesto[parseInt(i)].classifications.trfBeneficiario?
                    $("<tr>").append(
                      $("<td>",{class:"tituloTablaCaracteristicas",text:"Beneficiario de Transferencia:"}),
                      $("<td>",{class:"contenidoTablaCaracteristicas textoAlineadoJustificado",text:desglosePresupuesto[parseInt(i)].classifications.trfBeneficiario})
                    )
                    :null)
                )
              )
            )
          )
        /*)*/
      )
    }else{
      elementos.push(
        /*$("<div>", {class:" cajonSombreado contenedorDetalleProcesoDatos mt-2"}).append(*/
          $("<div>",{class:"contenedorProceso informacionProceso"}).append(
            $("<div>",{class:"contenedorTablaCaracteristicas"}).append(
              $("<table>").append(
                $("<tbody>").append(
                  ObtenerProporcionadoresFondos(desglosePresupuesto)
                )
              )
            )
          )
        /*)*/
      )
      
    }
  }
  return elementos;
}

function ObtenerProporcionadoresFondos(fondos){
  var elementos=[]
  for(i=0;i<fondos.length;i++){
    if(fondos[parseInt(i)].description){
      elementos.push(
        $("<tr>").append(
        $("<td>",{class:"tituloTablaCaracteristicas",text:"Origen de Fondos"}),
        $("<td>",{class:"contenidoTablaCaracteristicas",text:fondos[parseInt(i)].description})
      )
      )
    }
    if(fondos[parseInt(i)].sourceParty&&fondos[parseInt(i)].sourceParty.name){
      elementos.push(
        $("<tr>").append(
        $("<td>",{class:"tituloTablaCaracteristicas",text:"Fuente del Presupuesto"}),
        $("<td>",{class:"contenidoTablaCaracteristicas",text:fondos[parseInt(i)].sourceParty.name})
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
      $("<tr>").append(
        $("<td>",{"data-label":"Nombre",text:documentos[parseInt(i)].title}),
        $("<td>",{"data-label":"Descripción",text:documentos[parseInt(i)].description}),
        //$("<td>",{"data-label":"Tipo",text:TraduceTexto(documentos[parseInt(i)].documentType)}),
        $("<td>",{"data-label":"Fecha",text:((documentos[parseInt(i)].datePublished)?ObtenerFecha(documentos[parseInt(i)].datePublished):null)}),
        $("<td>",{class:"textoAlineadoDerecha","data-label":""}).append(
          $("<h4>",{class:"descargaIconos"}).append(
            $("<span>",{class:"textoColorGris textoAlineadoDerecha p-1 cursorMano transicion"}).append(
              $("<a>",{href:documentos[parseInt(i)].url,download:"a",class:"textoColorGris textoAlineadoDerecha p-1 cursorMano transicion",target:"_blank"}).append(
                $("<i>",{class:"fas fa-file-download"}),
              "&nbsp;"+ObtenerExtension(documentos[parseInt(i)].url)
              )
              
            )
          )
        )
        
      )
    );
  }
  return elementos;
}

//$("<a>",{text:contratos[parseInt(i)].buyer.name,class:"enlaceTablaGeneral",href:"/comprador/"+contratos[parseInt(i)].buyer.id})
function download(content, fileName, contentType) {
  var a = document.createElement('a');
  var file = new Blob([content], {type: contentType});
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
}

function AnadirPartes(){
  if(procesoRecord.compiledRelease.buyer){
    var partes=ObtenerEnlaceParte(procesoRecord.compiledRelease.buyer.id);
    if(VerificarAgregarPartes(partes).length){
      $(".contenedorElementosProceso").append(
        $("<div class='col-12 col-sm-12 col-md-12 col-lg-12 mt-3' >").append(
          $("<div class='cajonSombreado' data-step='3' data-intro='En esta sección puedes visualizar los datos de contacto del comprador.'>").append(
            $("<div class='row mb-1 mt-1'>").append(
              AnadirElementosPartes(partes)
            )
          )
        )
      );
    }
    
    
    
  }
}
function AnadirElementosPartes(partes){
  var elementos=[];

  
    elementos.push(
      $("<div>",{class:"col-md-12"}).append(
        $("<h4>",{class:"titularCajonSombreado",style:"color:black"}).append(
          "Comprador"
          )
      )
    )
    for(var i=0;i<partes.length;i++){
     
      elementos.push(
        $("<div>",{class:"col-md-12"}).append(
          $("<h4>",{class:"titularCajonSombreado"}).append(
            ObtenerElementosParte( partes[parseInt(i)].id,procesoRecord.compiledRelease,"comprador")
            ),
          $("<div class='contenedorProceso informacionProceso'>").append(
            $("<div class='contenedorTablaCaracteristicas'>").append(
              $("<table>").append(
                $("<tbody>").append(
                      
                  partes[parseInt(i)].address&&partes[parseInt(i)].address.region ? 
                  $("<tr>").append(
                    $("<td>",{class:"tituloTablaCaracteristicas",text:"Departamento:",toolTexto:"parties["+i+"].address.region"}),
                    $("<td>",{class:"contenidoTablaCaracteristicas",text:partes[parseInt(i)].address.region})
                  )
                  : null,
                  partes[parseInt(i)].address&&partes[parseInt(i)].address.locality ? 
                  $("<tr>").append(
                    $("<td>",{class:"tituloTablaCaracteristicas",text:"Municipio:",toolTexto:"parties["+i+"].address.locality"}),
                    $("<td>",{class:"contenidoTablaCaracteristicas",text:partes[parseInt(i)].address.locality})
                  )
                  : null,
                  partes[parseInt(i)].address&&partes[parseInt(i)].address.streetAddress ? 
                  $("<tr>").append(
                    $("<td>",{class:"tituloTablaCaracteristicas",text:"Dirección:",toolTexto:"parties["+i+"].address.streetAddress"}),
                    $("<td>",{class:"contenidoTablaCaracteristicas",text:partes[parseInt(i)].address.streetAddress})
                  )
                  : null,
                  partes[parseInt(i)].contactPoint&&partes[parseInt(i)].contactPoint.name ? 
                  $("<tr>").append(
                    $("<td>",{class:"tituloTablaCaracteristicas",text:"Encargado:",toolTexto:"parties["+i+"].contactPoint.name"}),
                    $("<td>",{class:"contenidoTablaCaracteristicas",text:partes[parseInt(i)].contactPoint.name})
                  )
                  : null,
                  partes[parseInt(i)].contactPoint&&partes[parseInt(i)].contactPoint.email ? 
                  $("<tr>").append(
                    $("<td>",{class:"tituloTablaCaracteristicas",text:"Correo Electrónico:",toolTexto:"parties["+i+"].contactPoint.email"}),
                    $("<td>",{class:"contenidoTablaCaracteristicas",text:partes[parseInt(i)].contactPoint.email})
                  )
                  : null,
                  partes[parseInt(i)].contactPoint&&partes[parseInt(i)].contactPoint.telephone ? 
                  $("<tr>").append(
                    $("<td>",{class:"tituloTablaCaracteristicas",text:"Teléfono:",toolTexto:"parties["+i+"].contactPoint.telephone"}),
                    $("<td>",{class:"contenidoTablaCaracteristicas",text:partes[parseInt(i)].contactPoint.telephone})
                  )
                  : null,
                  partes[parseInt(i)].contactPoint&&partes[parseInt(i)].contactPoint.faxNumber ? 
                  $("<tr>").append(
                    $("<td>",{class:"tituloTablaCaracteristicas",text:"Fax:",toolTexto:"parties["+i+"].contactPoint.faxNumber"}),
                    $("<td>",{class:"contenidoTablaCaracteristicas",text:partes[parseInt(i)].contactPoint.faxNumber})
                  )
                  : null,
                  partes[parseInt(i)].contactPoint&&partes[parseInt(i)].contactPoint.url ? 
                  $("<tr>").append(
                    $("<td>",{class:"tituloTablaCaracteristicas",text:"Sitio:",toolTexto:"parties["+i+"].contactPoint.url"}),
                    $("<td>",{class:"contenidoTablaCaracteristicas"}).append(
                      $("<a>",{text:partes[parseInt(i)].contactPoint.url,class:"enlaceTablaGeneral",href:partes[parseInt(i)].contactPoint.url})
                    )
                  )
                  : null
                )
              )
            )
          )
  
        )
      )
    }
  
  
  return elementos;

}

function VerificarAgregarPartes(partes){
  var partesDatos=[];
  for(var i=0;i<partes.length;i++){
    if((partes[parseInt(i)].contactPoint&&!$.isEmptyObject(partes[parseInt(i)].contactPoint))||(partes[parseInt(i)].address&&!$.isEmptyObject(partes[parseInt(i)].address))){
      partesDatos.push(partes[parseInt(i)]);
    }
  }
  return partesDatos; 
}

function InicializarDescargas(){
   AbrirModalDescarga("descargaJsonProceso","Descarga JSON",true);/*Crear Modal Descarga */
   AbrirModalDescarga("descargaCsvProceso","Descarga CSV",true);/*Crear Modal Descarga */
   AbrirModalDescarga("descargaXlsxProceso","Descarga XLSX",true);/*Crear Modal Descarga */
   $("#descargaJSONContrato,#descargaJSONPlaneacion,#descargaJSONAdjudicacion,#descargaJSONConvocatoria").on("click",function(e){
    location.href=api+"/descargar/?formato=json&ocids="+encodeURIComponent(procesoOcid);
     //AbrirModalDescarga("descargaJsonProceso","Descarga JSON");
   });
   $("#descargaCSVContrato,#descargaCSVPlaneacion,#descargaCSVAdjudicacion,#descargaCSVConvocatoria").on("click",function(e){
    location.href=api+"/descargar/?formato=csv&ocids="+encodeURIComponent(procesoOcid);
     //AbrirModalDescarga("descargaCsvProceso","Descarga CSV");
   });
   $("#descargaXLSXContrato,#descargaXLSXPlaneacion,#descargaXLSXAdjudicacion,#descargaXLSXConvocatoria").on("click",function(e){
    location.href=api+"/descargar/?formato=xlsx&ocids="+encodeURIComponent(procesoOcid);
     //AbrirModalDescarga("descargaXlsxProceso","Descarga XLSX");
   });

   AgregarEventoModalDescarga("descargaJsonProceso",function(){
    var descarga=procesoRecord.compiledRelease;
    DescargarJSON(descarga,"Proceso");
  });
  AgregarEventoModalDescarga("descargaCsvProceso",function(){
    var descarga=procesoRecord.compiledRelease;
    DescargarCSV(ObtenerMatrizObjeto([descarga]) ,"Proceso");
  });
  AgregarEventoModalDescarga("descargaXlsxProceso",function(){
    var descarga=procesoRecord.compiledRelease;
    DescargarXLSX(ObtenerMatrizObjeto([descarga]) ,"Proceso");
  });
 }