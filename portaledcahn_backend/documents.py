from elasticsearch_dsl import analyzer
from elasticsearch_dsl.connections import connections
from django_elasticsearch_dsl import DocType, Index, fields 
from portaledcahn_backend import models as articles_models

data_index = Index('data')
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

@data_index.doc_type
class DataDocument(DocType):
	"""Data elasticsearch document"""

	# id = fields.IntegerField(attr='id')
	# data = fields.StringField(
	# 	analyzer=html_strip,
	# 	fields={
	# 		'raw': fields.StringField(analyzer='keyword'),
	# 	}
	# )

	class Meta:
		model = articles_models.Data
		managed = False
		db_table = 'data'
		app_label = 'kingfisher'

		# fields = ['id', 'data']