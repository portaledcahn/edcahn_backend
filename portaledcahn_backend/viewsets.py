from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import detail_route
from rest_framework.views import APIView
from django.db import connections
from django.db.models import Avg, Count, Min, Sum
from decimal import Decimal 
from elasticsearch import Elasticsearch
from elasticsearch_dsl import Search, Q
from .serializers import *
from .functions import *
from django.core.paginator import Paginator, Page, EmptyPage, PageNotAnInteger
import json, copy, urllib.parse, datetime, operator
import pandas as pd 

from django_elasticsearch_dsl_drf.viewsets import DocumentViewSet
from portaledcahn_backend import documents as articles_documents
from portaledcahn_backend import serializers as articles_serializers  

from django.utils.functional import LazyObject
from django.conf import settings
from collections import OrderedDict

tasas_de_cambio = {
	2000: {"HNL": 15.0143, "USD": 1},
	2001: {"HNL": 15.6513, "USD": 1},
	2002: {"HNL": 16.6129, "USD": 1},
	2003: {"HNL": 17.5446, "USD": 1},
	2004: {"HNL": 18.4114, "USD": 1},
	2005: {"HNL": 18.9978, "USD": 1},
	2006: {"HNL": 19.0272, "USD": 1},
	2007: {"HNL": 19.0271, "USD": 1},
	2008: {"HNL": 19.0299, "USD": 1},
	2009: {"HNL": 19.0273, "USD": 1},
	2010: {"HNL": 19.0269, "USD": 1},
	2011: {"HNL": 19.0486, "USD": 1},
	2012: {"HNL": 19.6379, "USD": 1},
	2013: {"HNL": 20.4951, "USD": 1},
	2014: {"HNL": 21.1347, "USD": 1},
	2015: {"HNL": 22.0988, "USD": 1},
	2016: {"HNL": 22.9949, "USD": 1},
	2017: {"HNL": 23.6515, "USD": 1},
	2018: {"HNL": 24.0701, "USD": 1},
	2019: {"HNL": 24.5777, "USD": 1},
}

# class DSEPaginator(Paginator):
#     """
#     Override Django's built-in Paginator class to take in a count/total number of items;
#     Elasticsearch provides the total as a part of the query results, so we can minimize hits.
#     """
#     def __init__(self, *args, **kwargs):
#         super(DSEPaginator, self).__init__(*args, **kwargs)
#         self._count = self.object_list.hits.total

#     def page(self, number):
#         # this is overridden to prevent any slicing of the object_list - Elasticsearch has
#         # returned the sliced data already.
#         number = self.validate_number(number)
#         return Page(self.object_list, number, self)

class SearchResults(LazyObject):
    def __init__(self, search_object):
        self._wrapped = search_object

    def __len__(self):
        return self._wrapped.count()

    def __getitem__(self, index):
        search_results = self._wrapped[index]
        if isinstance(index, slice):
            search_results = list(search_results)
        return search_results

class ReleaseViewSet(viewsets.ModelViewSet):
	queryset = Release.objects.all()
	serializer_class = ReleaseSerializer
	http_method_names = ['get']

	def retrieve(self, request, pk=None):
		queryset = Release.objects.all()
		release = get_object_or_404(queryset, ocid=pk)
		serializer = ReleaseSerializer(release)
		return Response(serializer.data)

class RecordViewSet(viewsets.ModelViewSet):
	queryset = Record.objects.all()
	serializer_class = RecordSerializer
	http_method_names = ['get']

	def retrieve(self, request, pk=None):
		queryset = Record.objects.all()
		record = get_object_or_404(queryset, ocid=pk)
		serializer = RecordSerializer(record)
		return Response(serializer.data)

class BuyerList(APIView):

	def get(self, request, format=None):

		contador = 0

		data = articles_documents.DataDocument.search()

		results = data.aggs\
					.metric('distinct_suppliers', 'cardinality', field='data.compiledRelease.contracts.suppliers.id.keyword')\
					.aggs\
					.metric('distinct_buyers', 'cardinality', field='data.compiledRelease.contracts.buyer.id.keyword')\
					.aggs\
					.metric('distinct_contracts', 'cardinality', field='data.compiledRelease.contracts.id.keyword')\
					.execute()

		# for r in results.aggregations:
		# 	print(r)

		context = {
			"distinct_contracts": results.aggregations.distinct_contracts.value,
			"distinct_buyers": results.aggregations.distinct_buyers.value,
			"distinct_suppliers": results.aggregations.distinct_suppliers.value
		}

		# contador = data.count()

		# for r in results:
			# contador += 1

		# for d in data: 
			# contador += 1

		# serializer = articles_serializers.DataDocumentSerializer(data, many=True)		

		# contratos = Contrato.objects.all()
		# data = Data.objects.all()

		# serializer = DataSerializer(data, many=True)
		# for d in data.iterator(chunk_size=10):

		# for d in data:
		# 	if contador%10 == 0:
		# 		print("ok", contador)

		# 	contador += 1 

		# return Response(contador)
		return Response(context)

class ContractsViewSet(viewsets.ModelViewSet):
	sql = '''
		SELECT
			concat(d.data->'compiledRelease'->>'ocid', '-', contract->>'id') as "id"
			,contract->'value'->>'amount' as "amount"
			,contract->'value'->>'currency' as "currency"
			,case
				when 
					contract->>'dateSigned' is not null 
					and contract->'period'->>'startDate' is not null 
					then contract->>'dateSigned'
				when 
					contract->>'dateSigned' is not null 
					then contract->>'dateSigned'
				when 
					contract->'period'->>'startDate' is not null 
					then contract->'period'->>'startDate'
				else
					d.data->'compiledRelease'->>'date' 		
			end as "date"
			,contract->'buyer'->>'id' as "buyerId"
			,contract->'buyer'->>'name' as "buyerName"
			,partie->'memberOf' as "buyerMemberOf"
		FROM 
			"data" d 
			,jsonb_array_elements(d.data->'compiledRelease'->'contracts') as contract
			,jsonb_array_elements(d.data->'compiledRelease'->'parties') as partie
		WHERE 
			exists (select * from record where data_id= d.id)
			and partie->'id' = contract->'buyer'->'id'
			and contract->'value'->'amount' is not null
	'''

	queryset = Contract.objects.raw(sql)
	serializer_class = ContractSerializer
	http_method_names = ['get']

	def list(self, request):

		localCurrency = "HNL" #Definir en config

		queryset = Contract.objects.filter(currency="USD")

		tasasDeCambio = TasasDeCambio.objects.all()

		serializer = ContractSerializer(queryset, many=True)

		return Response(serializer.data)

class BuyerViewSet(viewsets.ModelViewSet):
	queryset = Buyer.objects.all()
	serializer_class = BuyerSerializer
	http_method_names = ['get']

class ContratoViewSet(viewsets.ModelViewSet):
	queryset = Contrato.objects.all()
	serializer_class = ContratoSerializer
	http_method_names = ['get']

class DataViewSet(DocumentViewSet):
	document = articles_documents.DataDocument
	serializer_class = articles_serializers.DataDocumentSerializer

class DataRecordViewSet(DocumentViewSet):
    document = articles_documents.RecordDocument
    serializer_class = articles_serializers.RecordDocumentSerializer

class Index(APIView):

	def get(self, request, format=None):

		cliente = Elasticsearch(settings.ELASTICSEARCH_DSL_HOST)

		s = Search(using=cliente, index='edca')

		s.aggs.metric(
			'contratos', 
			'nested', 
			path='doc.compiledRelease.contracts'
		)

		s.aggs["contratos"].metric(
			'distinct_suppliers', 
			'cardinality', 
			field='doc.compiledRelease.contracts.suppliers.id.keyword'
		)
		
		s.aggs["contratos"].metric(
			'distinct_buyers', 
			'cardinality', 
			field='doc.compiledRelease.contracts.buyer.id.keyword'
		)
		
		s.aggs["contratos"].metric(
			'distinct_contracts', 
			'cardinality', 
			field='doc.compiledRelease.contracts.id.keyword'
		)
		
		s.aggs["contratos"].metric(
			'distinct_transactions', 
			'cardinality', 
			field='doc.compiledRelease.contracts.implementation.transactions.id.keyword'
		)

		s.aggs.metric(
			'distinct_tenders', 
			'cardinality', 
			field='doc.compiledRelease.tender.id.keyword'
		)
		
		results = s.execute()

		context = {
			"contratos": results.aggregations.contratos.distinct_contracts.value,
			"procesos": results.aggregations.distinct_tenders.value,
			"pagos": results.aggregations.contratos.distinct_transactions.value,			
			"compradores": results.aggregations.contratos.distinct_buyers.value,
			"proveedores": results.aggregations.contratos.distinct_suppliers.value
		}

		return Response(context)

class Buscador(APIView):

	def get(self, request, format=None):
		page = int(request.GET.get('pagina', '1'))
		metodo = request.GET.get('metodo', 'proceso')
		moneda = request.GET.get('moneda', None)
		metodo_seleccion = request.GET.get('metodo_seleccion', None)
		institucion = request.GET.get('institucion', None)
		categoria = request.GET.get('categoria', None)
		year = request.GET.get('year', None)

		term = request.GET.get('term', '')
		start = (page-1) * settings.PAGINATE_BY
		end = start + settings.PAGINATE_BY

		if metodo not in ['proceso', 'contrato', 'pago']:
			metodo = 'proceso'

		cliente = Elasticsearch(settings.ELASTICSEARCH_DSL_HOST)

		s = Search(using=cliente, index='edca')

		s.aggs.metric('contratos', 'nested', path='doc.compiledRelease.contracts')

		#Filtros
		s.aggs["contratos"].metric('monedas', 'terms', field='doc.compiledRelease.contracts.value.currency.keyword')

		s.aggs.metric('metodos_de_seleccion', 'terms', field='doc.compiledRelease.tender.procurementMethodDetails.keyword')

		s.aggs.metric('instituciones', 'terms', field='doc.compiledRelease.buyer.name.keyword', size=100)		

		s.aggs.metric('categorias', 'terms', field='doc.compiledRelease.tender.mainProcurementCategory.keyword')		

		s.aggs.metric('años', 'date_histogram', field='doc.compiledRelease.tender.tenderPeriod.startDate', interval='year', format='yyyy')		

		#Resumen

		s.aggs["contratos"].metric('proveedores_total', 'cardinality', field='doc.compiledRelease.contracts.suppliers.id.keyword')

		s.aggs["contratos"].metric('compradores_total', 'cardinality', field='doc.compiledRelease.contracts.buyer.id.keyword')

		if metodo == 'proceso':
			s.aggs.metric('procesos_total', 'cardinality', field='doc.compiledRelease.tender.id.keyword')

		if metodo == 'contrato':
			s.aggs.metric('procesos_total', 'cardinality', field='doc.compiledRelease.contracts.id.keyword')

		if metodo == 'pago':
			s.aggs.metric('procesos_total', 'cardinality', field='doc.compiledRelease.contracts.implementation.transactions.id.keyword')

		if metodo in ['contrato', 'pago']:
			s.aggs.metric('monto_promedio', 'avg', field='doc.compiledRelease.contracts.value.amount')

		#Aplicando filtros

		#filtro por sistema de donde provienen los datos 
		# s = s.filter('match_phrase', doc__compiledRelease__sources__id='honducompras-1')

		if metodo == 'proceso':
			s = s.filter('exists', field='doc.compiledRelease.tender.id')

		if metodo == 'contrato':
			filtro_contrato = Q('exists', field='doc.compiledRelease.contracts.id') 
			s = s.query('nested', path='doc.compiledRelease.contracts', query=filtro_contrato)
			
		if metodo == 'pago':
			qContrato = Q('exists', field='doc.compiledRelease.contracts.implementation.transactions.id') 
			s = s.query('nested', path='doc.compiledRelease.contracts', query=qContrato)

		if moneda is not None: 
			qMoneda = Q('match', doc__compiledRelease__contracts__value__currency=moneda) 
			s = s.query('nested', path='doc.compiledRelease.contracts', query=qMoneda)

		if metodo_seleccion is not None:
			s = s.filter('match_phrase', doc__compiledRelease__tender__procurementMethodDetails=metodo_seleccion)

		if institucion is not None:
			s = s.filter('match_phrase', doc__compiledRelease__buyer__name=institucion)

		if categoria is not None:
			s = s.filter('match_phrase', doc__compiledRelease__tender__mainProcurementCategory=categoria)

		# Este filtro aun falta
		if year is not None:
			# s = s.filter('match_phrase', doc__compiledRelease__tender__mainProcurementCategory=categoria)
			s = s.filter('range', doc__compiledRelease__tender__tenderPeriod__startDate={'gte': datetime.date(int(year), 1, 1), 'lt': datetime.date(int(year)+1, 1, 1)})

		if term: 
			if metodo == 'proceso':
				s = s.filter('match', doc__compiledRelease__tender__description=term)

			if metodo in  ['contrato', 'pago']:
				# qDescripcion = Q('match', doc__compiledRelease__contracts__description=term)
				qDescripcion = Q("wildcard", doc__compiledRelease__contracts__description='*'+term+'*')
				s = s.query('nested', path='doc.compiledRelease.contracts', query=qDescripcion)

		search_results = SearchResults(s)

		results = s[start:end].execute()

		paginator = Paginator(search_results, settings.PAGINATE_BY)

		try:
			posts = paginator.page(page)
		except PageNotAnInteger:
			posts = paginator.page(1)
		except EmptyPage:
			posts = paginator.page(paginator.num_pages)

		pagination = {
			"has_previous": posts.has_previous(),
			"has_next": posts.has_next(),
			"previous_page_number": posts.previous_page_number() if posts.has_previous() else None,
			"page": posts.number,
			"next_page_number": posts.next_page_number() if posts.has_next() else None,
			"num_pages": paginator.num_pages,
			"total.items": results.hits.total
		}

		filtros = {}
		filtros["monedas"] = results.aggregations.contratos.monedas.to_dict()
		filtros["años"] = results.aggregations.años.to_dict()
		filtros["categorias"] = results.aggregations.categorias.to_dict()
		filtros["instituciones"] = results.aggregations.instituciones.to_dict()
		filtros["metodos_de_seleccion"] = results.aggregations.metodos_de_seleccion.to_dict()

		resumen = {}
		resumen["proveedores_total"] = results.aggregations.contratos.proveedores_total.value
		resumen["compradores_total"] = results.aggregations.contratos.compradores_total.value
		resumen["procesos_total"] = results.aggregations.procesos_total.value

		if metodo in ['contrato', 'pago']:
			resumen["monto_promedio"] = results.aggregations.monto_promedio.value
		else:
			resumen["monto_promedio"] = None

		parametros = {}
		parametros["term"] = term
		parametros["metodo"] = metodo
		parametros["pagina"] = page
		parametros["moneda"] = moneda
		parametros["metodo_seleccion"] = metodo_seleccion
		parametros["institucion"] = institucion
		parametros["categoria"] = categoria
		parametros["year"] = year

		context = {
			"paginador": pagination,
			"parametros": parametros,
			"resumen": resumen,
			"filtros": filtros,
			"resultados": results.hits.hits
			# "agregados": results.aggregations.to_dict(),
		}

		return Response(context)

class Proveedores(APIView):

	def get(self, request, format=None):
		page = int(request.GET.get('pagina', '1'))
		metodo = request.GET.get('metodo', None)
		nombre = request.GET.get('nombre', '')
		identificacion = request.GET.get('identificacion', '')
		procesos = request.GET.get('procesos', None)
		total = request.GET.get('total', None)
		promedio = request.GET.get('promedio', None)
		maximo = request.GET.get('maximo', None)
		minino = request.GET.get('minimo', None)
		term = request.GET.get('term', '')
		tmc = request.GET.get('tmc', '')
		pmc = request.GET.get('pmc', '')
		mamc = request.GET.get('mamc', '')
		memc = request.GET.get('memc', '')
		fua = request.GET.get('fua', '')
		cp = request.GET.get('cp', '')

		ordenarPor = request.GET.get('ordenarPor', '')
		paginarPor = request.GET.get('paginarPor', settings.PAGINATE_BY)

		start = (page-1) * settings.PAGINATE_BY
		end = start + settings.PAGINATE_BY

		cliente = Elasticsearch(settings.ELASTICSEARCH_DSL_HOST)

		s = Search(using=cliente, index='edca')

		if metodo == 'proceso':
			s = s.filter('exists', field='doc.compiledRelease.tender.id')

		if metodo == 'contrato':
			s = s.filter('exists', field='doc.compiledRelease.contracts.id')

		if metodo == 'pago':
			s = s.filter('exists', field='doc.compiledRelease.contracts.implementation.transactions.id')

		filtro = Q()
		filtros = []

		if nombre.replace(' ',''):
			q_nombre = '*' + nombre + '*'
			filtro = Q("wildcard", doc__compiledRelease__contracts__suppliers__name=q_nombre)
			filtros.append(filtro)

		if identificacion.replace(' ',''):
			q_id = '*' + identificacion + '*'
			filtro = Q("wildcard", doc__compiledRelease__contracts__suppliers__id=q_id)
			filtros.append(filtro)

		filtro = Q('bool', must=filtros)

		s.aggs.metric('proveedores', 'nested', path='doc.compiledRelease.contracts.suppliers')

		s.aggs['proveedores'].metric('filtros', 'filter', filter=filtro)

		s.aggs['proveedores']['filtros'].metric('id', 'terms', field='doc.compiledRelease.contracts.suppliers.id.keyword', size=2000, order={"totales>total_monto_contratado": "desc"})
		
		s.aggs['proveedores']['filtros']['id'].metric('totales','reverse_nested', path='doc.compiledRelease.contracts')
		s.aggs['proveedores']['filtros']['id']['totales'].metric('total_monto_contratado', 'sum', field='doc.compiledRelease.contracts.value.amount')
		s.aggs['proveedores']['filtros']['id'].metric('name', 'terms', field='doc.compiledRelease.contracts.suppliers.name.keyword', size=2000)

		s.aggs['proveedores']['filtros']['id']['name'].metric('totales','reverse_nested', path='doc.compiledRelease.contracts')
		s.aggs['proveedores']['filtros']['id']['name']['totales'].metric('total_monto_contratado', 'sum', field='doc.compiledRelease.contracts.value.amount')
		s.aggs['proveedores']['filtros']['id']['name']['totales'].metric('promedio_monto_contratado', 'avg', field='doc.compiledRelease.contracts.value.amount')
		s.aggs['proveedores']['filtros']['id']['name']['totales'].metric('mayor_monto_contratado', 'max', field='doc.compiledRelease.contracts.value.amount')
		s.aggs['proveedores']['filtros']['id']['name']['totales'].metric('menor_monto_contratado', 'min', field='doc.compiledRelease.contracts.value.amount')
		s.aggs['proveedores']['filtros']['id']['name']['totales'].metric('fecha_ultima_adjudicacion', 'max', field='doc.compiledRelease.tender.tenderPeriod.startDate')

		s.aggs['proveedores']['filtros']['id']['name'].metric('tender','reverse_nested')
		s.aggs['proveedores']['filtros']['id']['name']['tender'].metric('fecha_ultimo_proceso', 'sum', field='doc.compiledRelease.tender.tenderPeriod.startDate')

		if tmc.replace(' ', ''):
			q_tmc = 'params.tmc' + tmc
			s.aggs['proveedores']['filtros']['id']['name']\
			.metric('filtro_totales', 'bucket_selector', buckets_path={"tmc": "totales.total_monto_contratado"}, script=q_tmc)

		if pmc.replace(' ', ''):
			q_pmc = 'params.pmc' + pmc
			s.aggs['proveedores']['filtros']['id']['name']\
			.metric('filtro_totales', 'bucket_selector', buckets_path={"pmc": "totales.promedio_monto_contratado"}, script=q_pmc)

		if mamc.replace(' ', ''):
			q_mamc = 'params.mamc' + mamc
			s.aggs['proveedores']['filtros']['id']['name']\
			.metric('filtro_totales', 'bucket_selector', buckets_path={"mamc": "totales.mayor_monto_contratado"}, script=q_mamc)

		if memc.replace(' ', ''):
			q_memc = 'params.memc' + memc
			s.aggs['proveedores']['filtros']['id']['name']\
			.metric('filtro_totales', 'bucket_selector', buckets_path={"memc": "totales.menor_monto_contratado"}, script=q_memc)

		# Falta el filtro cantidad de procesos
		# if cp.replace(' ', ''):
		# 	q_cp = 'params.memc' + cp
		# 	s.aggs['proveedores']['filtros']['id']['name']\
		# 	.metric('filtro_totales', 'bucket_selector', buckets_path={"cp": "doc_count"}, script=q_cp)

		search_results = SearchResults(s)

		results = s[start:end].execute()

		proveedores = []

		proveedoresES = results.aggregations.proveedores.to_dict()

		for p in proveedoresES["filtros"]["id"]["buckets"]:
			for n in p["name"]["buckets"]:
				proveedor = {}
				proveedor["id"] = p["key"]
				proveedor["name"] = n["key"]
				proveedor["procesos"] = n["doc_count"]
				proveedor["total_monto_contratado"] = n["totales"]["total_monto_contratado"]["value"]
				proveedor["promedio_monto_contratado"] = n["totales"]["promedio_monto_contratado"]["value"]
				proveedor["mayor_monto_contratado"] = n["totales"]["mayor_monto_contratado"]["value"]
				proveedor["menor_monto_contratado"] = n["totales"]["menor_monto_contratado"]["value"]

				if n["tender"]["fecha_ultimo_proceso"]["value"] == 0:
					proveedor["fecha_ultimo_proceso"] = None
				else:
					proveedor["fecha_ultimo_proceso"] = n["tender"]["fecha_ultimo_proceso"]["value_as_string"]			

				proveedor["uri"] = urllib.parse.quote_plus(proveedor["id"] + '->' + proveedor["name"])
				proveedores.append(copy.deepcopy(proveedor))

		parametros = {}
		parametros["pagina"] = page
		parametros["nombre"] = nombre
		parametros["identificacion"] = identificacion
		parametros["tmc"] = tmc 
		parametros["pmc"] = pmc 
		parametros["mamc"] = mamc 
		parametros["memc"] = memc 
		parametros["fua"] = fua 
		parametros["cp"] = cp
		parametros["orderBy"] = ordenarPor
		parametros["paginarPor"] = paginarPor

		#Ordenamiento
		#Ejemplo: /proveedores?ordenarPor=asc(total_monto_contratado),desc(promedio_monto_contratado),asc(name)
		dfProveedores = pd.DataFrame(proveedores)
		ordenar = getSortBy(ordenarPor)

		dfProveedores['fecha_ultimo_proceso'] = pd.to_datetime(dfProveedores['fecha_ultimo_proceso'], errors='coerce')

		for indice, columna in enumerate(ordenar["columnas"]):
			if not columna in dfProveedores:
				ordenar["columnas"].pop(indice)
				ordenar["ascendentes"].pop(indice)

		if ordenar["columnas"]:
			dfProveedores = dfProveedores.sort_values(by=ordenar["columnas"], ascending=ordenar["ascendentes"])

		# Ejemplo: fua==2018-03-02
		if fua.replace(' ', ''):
			if len(fua)>1:
				if fua[0:2] in ['!=', '>=', '<=', '==']:
					operador = fua[0:2]
					fecha = fua[2:len(fua)]
				elif fua[0:1] in ['>', '<']:
					operador = fua[0:1]
					fecha = fua[1:len(fua)]
				else:
					operador = ''
					fecha = ''	
			else:
				operador = ''
				fecha = ''

			if operador == "==":
				mask = (dfProveedores['fecha_ultimo_proceso'].dt.date.astype(str) == fecha) 
			elif operador == "!=":
				mask = (dfProveedores['fecha_ultimo_proceso'] != fecha)
			elif operador == "<":
				mask = (dfProveedores['fecha_ultimo_proceso'] < fecha)
			elif operador == "<=":
				mask = (dfProveedores['fecha_ultimo_proceso'] <= fecha)
			elif operador == ">":
				mask = (dfProveedores['fecha_ultimo_proceso'] > fecha)
			elif operador == ">=":
				mask = (dfProveedores['fecha_ultimo_proceso'] >= fecha)
			else:
				mask = None

			if mask is not None:
				dfProveedores = dfProveedores.loc[mask]

		# Ejemplo: cp===2
		if cp.replace(' ', ''):
			q_cp = 'procesos' + cp
			dfProveedores = dfProveedores.query(q_cp)

		proveedores = dfProveedores.to_dict('records')

		paginator = Paginator(proveedores, paginarPor)

		try:
			posts = paginator.page(page)
		except PageNotAnInteger:
			posts = paginator.page(1)
		except EmptyPage:
			posts = paginator.page(paginator.num_pages)

		pagination = {
			"has_previous": posts.has_previous(),
			"has_next": posts.has_next(),
			"previous_page_number": posts.previous_page_number() if posts.has_previous() else None,
			"page": posts.number,
			"next_page_number": posts.next_page_number() if posts.has_next() else None,
			"num_pages": paginator.num_pages,
			"total.items": len(proveedores)
		}

		context = {
			"paginador": pagination,
			"parametros": parametros,
			"resultados": posts.object_list,
			# "elastic": results.aggregations.proveedores.to_dict(),
		}

		return Response(context)

class ContratosDelProveedor(APIView):

	def get(self, request, partieId=None, format=None):
		page = int(request.GET.get('pagina', '1'))
		paginarPor = int(request.GET.get('paginarPor', settings.PAGINATE_BY))
		comprador = request.GET.get('comprador', '')
		titulo = request.GET.get('titulo', '')
		descripcion = request.GET.get('descripcion', '')
		tituloLicitacion = request.GET.get('tituloLicitacion', '')
		categoriaCompra = request.GET.get('categoriaCompra', '')
		estado = request.GET.get('estado', '')
		monto = request.GET.get('monto', '')
		fechaFirma = request.GET.get('fechaFirma', '')
		fechaInicio = request.GET.get('fechaInicio', '')
		ordenarPor = request.GET.get('ordenarPor', '')

		start = (page-1) * paginarPor
		end = start + paginarPor

		cliente = Elasticsearch(settings.ELASTICSEARCH_DSL_HOST)
		s = Search(using=cliente, index='contract')

		qPartieId = Q('match_phrase', suppliers__id=partieId) 
		s = s.query('nested', path='suppliers', query=qPartieId)

		# Sección de filtros
		filtros = []

		if comprador.replace(' ',''):
			filtro = Q("match", buyer__name=comprador)
			filtros.append(filtro)

		if titulo.replace(' ',''):
			filtro = Q("match", title=titulo)
			filtros.append(filtro)

		if descripcion.replace(' ',''):
			filtro = Q("match", description=descripcion)
			filtros.append(filtro)

		if tituloLicitacion.replace(' ',''):
			filtro = Q("match", extra__tenderTitle=tituloLicitacion)
			filtros.append(filtro)

		if categoriaCompra.replace(' ',''):
			filtro = Q("match_phrase", extra__tenderMainProcurementCategory=categoriaCompra)
			filtros.append(filtro)

		if estado.replace(' ',''):
			filtro = Q("match", status=estado)
			filtros.append(filtro)

		if fechaInicio.replace(' ',''):
			validarFecha = getDateParam(fechaInicio)
			
			if validarFecha is not None:
				operador = validarFecha["operador"]
				valor = validarFecha["valor"]

				if operador == "==":
					filtro = Q('match', period__startDate=valor)
				elif operador == "<":
					filtro = Q('range', period__startDate={'lt': valor, "format": "yyyy-MM-dd"})
				elif operador == "<=":
					filtro = Q('range', period__startDate={'lte': valor, "format": "yyyy-MM-dd"})
				elif operador == ">":
					filtro = Q('range', period__startDate={'gt': valor, "format": "yyyy-MM-dd"})
				elif operador == ">=":
					filtro = Q('range', period__startDate={'gte': valor, "format": "yyyy-MM-dd"})
				else:
					filtro = None

				if filtro is not None:
					filtros.append(filtro)

		if fechaFirma.replace(' ',''):
			validarFecha = getDateParam(fechaFirma)
			
			if validarFecha is not None:
				operador = validarFecha["operador"]
				valor = validarFecha["valor"]

				if operador == "==":
					filtro = Q('match', dateSigned=valor)
				elif operador == "<":
					filtro = Q('range', dateSigned={'lt': valor, "format": "yyyy-MM-dd"})
				elif operador == "<=":
					filtro = Q('range', dateSigned={'lte': valor, "format": "yyyy-MM-dd"})
				elif operador == ">":
					filtro = Q('range', dateSigned={'gt': valor, "format": "yyyy-MM-dd"})
				elif operador == ">=":
					filtro = Q('range', dateSigned={'gte': valor, "format": "yyyy-MM-dd"})
				else:
					filtro = None

				if filtro is not None:
					filtros.append(filtro)

		if monto.replace(' ',''):
			validarMonto = getOperator(monto)
			if validarMonto is not None:
				operador = validarMonto["operador"]
				valor = validarMonto["valor"]

				print("validarMonto")
				print(validarMonto)

				if operador == "==":
					filtro = Q('match', value__amount=valor)
				elif operador == "<":
					filtro = Q('range', value__amount={'lt': valor})
				elif operador == "<=":
					filtro = Q('range', value__amount={'lte': valor})
				elif operador == ">":
					filtro = Q('range', value__amount={'gt': valor})
				elif operador == ">=":
					filtro = Q('range', value__amount={'gte': valor})
				else:
					filtro = None

			if filtro is not None:
				filtros.append(filtro)

		s = s.query('bool', filter=filtros)

		# Ordenar resultados.
		mappingSort = {
			"comprador": "buyer.name.keyword",
			"titulo": "title.keyword",
			"tituloLicitacion": "extra.tenderTitle.keyword",
			"categoriaCompra": "extra.tenderMainProcurementCategory.keyword",
			"estado": "status.keyword",
			"monto": "value.amount",
			"fechaFirma": "period.startDate",
			"fechaInicio": "dateSigned",
		}

		#ordenarPor = 'asc(comprador),desc(monto)
		ordenarES = {}
		if ordenarPor.replace(' ',''):
			ordenar = getSortES(ordenarPor)

			for parametro in ordenar:
				columna = parametro["valor"]
				orden = parametro["orden"]

				if columna in mappingSort:
					ordenarES[mappingSort[columna]] = {"order": orden}

		s = s.sort(ordenarES)

		search_results = SearchResults(s)
		results = s[start:end].execute()
		paginator = Paginator(search_results, settings.PAGINATE_BY)

		try:
			posts = paginator.page(page)
		except PageNotAnInteger:
			posts = paginator.page(1)
		except EmptyPage:
			posts = paginator.page(paginator.num_pages)

		pagination = {
			"has_previous": posts.has_previous(),
			"has_next": posts.has_next(),
			"previous_page_number": posts.previous_page_number() if posts.has_previous() else None,
			"page": posts.number,
			"next_page_number": posts.next_page_number() if posts.has_next() else None,
			"num_pages": paginator.num_pages,
			"total.items": results.hits.total
		}

		parametros = {}
		parametros["comprador"] = comprador
		parametros["titulo"] = titulo
		parametros["descripcion"] = descripcion
		parametros["tituloLicitacion"] = tituloLicitacion
		parametros["categoriaCompra"] = categoriaCompra
		parametros["estado"] = estado
		parametros["monto"] = monto
		parametros["fechaInicio"] = fechaInicio
		parametros["fechaFirma"] = fechaInicio
		parametros["ordenarPor"] = ordenarPor
		parametros["pagianrPor"] = paginarPor

		context = {
			"paginador": pagination,
			"parametros": parametros,
			# "resumen": resumen,
			# "filtros": filtros,
			"resultados": results.hits.hits
			# "agregados": results.aggregations.to_dict(),
		}

		return Response(context)