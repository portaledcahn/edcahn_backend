from django.db import models
from django.contrib.postgres.fields import JSONField

class Descarga(models.Model):
    id = models.TextField(primary_key=True, unique=True)
    data = JSONField() 
    date = models.DateTimeField()

    class Meta:
        managed = False