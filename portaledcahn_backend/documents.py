from elasticsearch_dsl import analyzer
from elasticsearch_dsl.connections import connections
from django_elasticsearch_dsl import Document, Index, fields 
from django_elasticsearch_dsl.registries import registry
from portaledcahn_backend import models as articles_models

data_index = Index('edca')
data_index.settings(
	number_of_shards=1,
	number_of_replicas=0
)

html_strip = analyzer(
	'html_strip',
	tokenizer="standard",
	filter=["standard", "lowercase", "stop", "snowball"],
	char_filter=["html_strip"]
)

@registry.register_document
@data_index.document
class DataDocument(Document):
	class Django:
		data = fields.ObjectField()

		model = articles_models.Data
		
		fields = [
			# 'data', 
			# 'hash_md5', 
		]

	def prepare_data(self, instance):
		return instance.data

record_index = Index('record')
record_index.settings(
	number_of_shards=1,
	number_of_replicas=0
)

@registry.register_document
@record_index.document
class RecordDocument(Document):

	class Django:
		model = articles_models.Record

		fields = [ 
			# 'ocid', 
		]