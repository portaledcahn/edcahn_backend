from rest_framework import serializers
from .models import *

class ReleaseSerializer(serializers.BaseSerializer):
    def to_representation(self, obj):
        return obj.data.data

class RecordSerializer(serializers.BaseSerializer):
    def to_representation(self, obj):
        return obj.data.data

class SupplierSerializer(serializers.BaseSerializer):
	def to_representation(self, obj):
		data = obj.data.data["compiledRelease"]["parties"]
		return data

class PartieSerializer(serializers.BaseSerializer):
	def to_representation(self, obj):
		partie = obj.partie
		return partie

class ContractSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contract
        fields = ['id', 'date', 'amount', 'currency', 'buyerName', 'buyerId', 'buyerMemberOf']

class BuyerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Buyer
        fields = [
        	'id', 'buyerName', 'buyerId', 'buyerMemberOf', 
        	'sum_amount_hnl', 'sum_amount_usd', 'avg_amount_hnl',
			'avg_amount_usd', 'max_amount_hnl', 'max_amount_usd',
			'min_amount_hnl', 'min_amount_usd', 'last_date_contract' ]
