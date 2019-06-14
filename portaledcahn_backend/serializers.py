from rest_framework import serializers
from .models import *

class ReleaseSerializer(serializers.BaseSerializer):
    def to_representation(self, obj):
        return obj.data.data

class RecordSerializer(serializers.BaseSerializer):
    def to_representation(self, obj):
        return obj.data.data