from django.shortcuts import render
from portaledcahn_backend import documents

# Create your views here.
def Inicio(request):
    data = documents.DataDocument.search()

    results = data.aggs\
                .metric('distinct_suppliers', 'cardinality', field='data.compiledRelease.contracts.suppliers.id.keyword')\
                .aggs\
                .metric('distinct_buyers', 'cardinality', field='data.compiledRelease.contracts.buyer.id.keyword')\
                .aggs\
                .metric('distinct_contracts', 'cardinality', field='data.compiledRelease.contracts.id.keyword')\
                .execute()

    context = {
        "distinct_contracts": results.aggregations.distinct_contracts.value,
        "distinct_buyers": results.aggregations.distinct_buyers.value,
        "distinct_suppliers": results.aggregations.distinct_suppliers.value
    }

    return render(request,'inicio/inicio.html', context)

def Proceso(request,ocid=''):
    return render(request,'proceso/proceso.html',{'ocid':ocid.replace('"','')})

def Api(request):
    return render(request,'api/api.html')

def Acerca(request):
    return render(request,'acerca/acerca.html')

def Busqueda(request):

    q = my_param = request.GET.get('q', '')

    query = {
      "query": {
        "bool": {
          "must": [
            {
              "query_string": {
                "query": q
              }
            },
            {
              "match": {
                "data.releases.tag": "contract"
              }
            }
          ]
        }        
        },
          "aggs" : {
            "distinct_suppliers" : {
                "cardinality" : {
                  "field" : "data.compiledRelease.contracts.suppliers.id.keyword"
                }
            },
            "distinct_buyers" : {
                "cardinality" : {
                  "field" : "data.compiledRelease.contracts.buyer.id.keyword"
                }
            },
            "distinct_contracts" : {
                "cardinality" : {
                  "field" : "data.compiledRelease.contracts.id.keyword"
                }
            },
            "avg_amount": {
                "avg": {
                    "field": "data.compiledRelease.contracts.value.amount"
                }
            }
        }  
    } 

    response = documents.DataDocument.search().from_dict(query).execute()

    # print("##############################3")
    # print(response.hits)

    for h in response.hits:
        print (h.data.ocid)

    context = {
        "resultados": response.hits,
        "resumen": response.aggregations,
        "q": q
    }

    return render(request,'busqueda/busqueda.html', context)

def Comprador(request):
    return render(request,'comprador/comprador.html')

def Compradores(request):
    return render(request,'compradores/compradores.html')

def Descargas(request):
    return render(request,'descargas/descargas.html')

def Preguntas(request):
    return render(request,'preguntas/preguntas.html')

def Procesos_Comprador(request):
    return render(request,'procesos_comprador/procesos_comprador.html')

def Procesos_Proveedor(request):
    return render(request,'procesos_proveedor/procesos_proveedor.html')

def Proveedor(request):
    return render(request,'proveedor/proveedor.html')

def Proveedores(request):
    return render(request,'proveedores/proveedores.html')
    
def Visualizaciones(request):
    return render(request,'visualizaciones/visualizaciones.html')
