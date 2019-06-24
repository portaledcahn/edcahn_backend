from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import detail_route
from rest_framework.views import APIView
from django.db import connections
from django.db.models import Avg, Count, Min, Sum
from decimal import Decimal 
from .serializers import *

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

		sql = '''
			select 
				 contract->'buyer'->>'id' as "id"
				,partie->'identifier'->>'scheme' as "scheme"
				,contract->'buyer'->>'name' as "name"
				,partie->'memberOf' as "memberOf"
				,SUM((contract->'value'->>'amount')::numeric) as "sum amount"
				,contract->'value'->>'currency' as "currency"
			from 
				"data" d, 
				jsonb_array_elements(d.data->'compiledRelease'->'contracts') as contract
				,jsonb_array_elements(d.data->'compiledRelease'->'parties') as partie
			where 
				exists (select * from record where data_id= d.id)
				and partie->'id' = contract->'buyer'->'id'
				and contract->'value'->>'amount' is not null
			group by
				 contract->'buyer'->>'id'
				,partie->'identifier'->>'scheme'
				,contract->'buyer'->>'name'
				,partie->'memberOf'
				,contract->'value'->>'currency'
		'''

		cursor = connections['bdkingfisher'].cursor()
		cursor.execute(sql)
		datos = cursor.fetchall()

		# serializer = BuyerSerializer(parties, many=True)
		
		return Response(datos)

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

