from django.shortcuts import render
from portaledcahn_backend import documents
from django.core.paginator import Paginator, Page, EmptyPage, PageNotAnInteger

class DSEPaginator(Paginator):
    """
    Override Django's built-in Paginator class to take in a count/total number of items;
    Elasticsearch provides the total as a part of the query results, so we can minimize hits.
    """
    def __init__(self, *args, **kwargs):
        super(DSEPaginator, self).__init__(*args, **kwargs)
        self._count = self.object_list.hits.total

    def page(self, number):
        # this is overridden to prevent any slicing of the object_list - Elasticsearch has
        # returned the sliced data already.
        number = self.validate_number(number)
        return Page(self.object_list, number, self)

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
    page = int(request.GET.get('page', '1'))
    start = (page-1) * 10
    end = start + 10

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

    response = documents.DataDocument.search().from_dict(query)[start:end].execute()

    # for h in response.hits:
    #     print (h.data.ocid)

    paginator = DSEPaginator(response, 1)
    
    try:
        posts = paginator.page(page)
    except PageNotAnInteger:
        posts = paginator.page(0)
    except EmptyPage:
        posts = paginator.page(paginator.num_pages)

    context = {
        "resultados": response.hits,
        "resumen": response.aggregations,
        "q": q,
        "posts": posts
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
