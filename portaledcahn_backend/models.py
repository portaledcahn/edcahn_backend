from django.db import models
from django.contrib.postgres.fields import JSONField


class AlembicVersion(models.Model):
    version_num = models.CharField(primary_key=True, max_length=32)

    class Meta:
        managed = False
        db_table = 'alembic_version'


class Collection(models.Model):
    source_id = models.TextField()
    data_version = models.DateTimeField()
    store_start_at = models.DateTimeField()
    store_end_at = models.DateTimeField(blank=True, null=True)
    sample = models.BooleanField()
    check_data = models.BooleanField()
    check_older_data_with_schema_version_1_1 = models.BooleanField()
    transform_type = models.TextField(blank=True, null=True)
    transform_from_collection = models.ForeignKey('self', models.DO_NOTHING, blank=True, null=True)
    deleted_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'collection'
        unique_together = (('source_id', 'data_version', 'sample', 'transform_from_collection', 'transform_type'),)


class CollectionFile(models.Model):
    collection = models.ForeignKey(Collection, models.DO_NOTHING)
    filename = models.TextField(blank=True, null=True)
    store_start_at = models.DateTimeField(blank=True, null=True)
    store_end_at = models.DateTimeField(blank=True, null=True)
    warnings = models.TextField(blank=True, null=True)  # This field type is a guess.
    url = models.TextField(blank=True, null=True)
    errors = models.TextField(blank=True, null=True)  # This field type is a guess.

    class Meta:
        managed = False
        db_table = 'collection_file'
        unique_together = (('collection', 'filename'),)


class CollectionFileItem(models.Model):
    collection_file = models.ForeignKey(CollectionFile, models.DO_NOTHING)
    store_start_at = models.DateTimeField(blank=True, null=True)
    store_end_at = models.DateTimeField(blank=True, null=True)
    number = models.IntegerField(blank=True, null=True)
    warnings = models.TextField(blank=True, null=True)  # This field type is a guess.
    errors = models.TextField(blank=True, null=True)  # This field type is a guess.

    class Meta:
        managed = False
        db_table = 'collection_file_item'
        unique_together = (('collection_file', 'number'),)


class CollectionNote(models.Model):
    collection = models.ForeignKey(Collection, models.DO_NOTHING)
    note = models.TextField()
    stored_at = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'collection_note'


class CompiledRelease(models.Model):
    collection_file_item = models.ForeignKey(CollectionFileItem, models.DO_NOTHING)
    ocid = models.TextField(blank=True, null=True)
    data = models.ForeignKey('Data', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'compiled_release'


class Data(models.Model):
    hash_md5 = models.TextField(unique=True)
    data = JSONField()  # This field type is a guess.

    class Meta:
        managed = False
        db_table = 'data'


class PackageData(models.Model):
    hash_md5 = models.TextField(unique=True)
    data = models.TextField()  # This field type is a guess.

    class Meta:
        managed = False
        db_table = 'package_data'


class Record(models.Model):
    collection_file_item = models.ForeignKey(CollectionFileItem, models.DO_NOTHING)
    ocid = models.TextField(blank=True, null=True)
    data = models.ForeignKey(Data, models.DO_NOTHING)
    package_data = models.ForeignKey(PackageData, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'record'


class RecordCheck(models.Model):
    record = models.ForeignKey(Record, models.DO_NOTHING)
    override_schema_version = models.TextField(blank=True, null=True)
    cove_output = models.TextField()  # This field type is a guess.

    class Meta:
        managed = False
        db_table = 'record_check'
        unique_together = (('record', 'override_schema_version'),)


class RecordCheckError(models.Model):
    record = models.ForeignKey(Record, models.DO_NOTHING)
    override_schema_version = models.TextField(blank=True, null=True)
    error = models.TextField()

    class Meta:
        managed = False
        db_table = 'record_check_error'
        unique_together = (('record', 'override_schema_version'),)


class Release(models.Model):
    collection_file_item = models.ForeignKey(CollectionFileItem, models.DO_NOTHING)
    release_id = models.TextField(blank=True, null=True)
    ocid = models.TextField(blank=True, null=True)
    data = models.ForeignKey(Data, models.DO_NOTHING)
    package_data = models.ForeignKey(PackageData, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'release'


class ReleaseCheck(models.Model):
    release = models.ForeignKey(Release, models.DO_NOTHING)
    override_schema_version = models.TextField(blank=True, null=True)
    cove_output = models.TextField()  # This field type is a guess.

    class Meta:
        managed = False
        db_table = 'release_check'
        unique_together = (('release', 'override_schema_version'),)


class ReleaseCheckError(models.Model):
    release = models.ForeignKey(Release, models.DO_NOTHING)
    override_schema_version = models.TextField(blank=True, null=True)
    error = models.TextField()

    class Meta:
        managed = False
        db_table = 'release_check_error'
        unique_together = (('release', 'override_schema_version'),)


class TransformUpgrade10To11StatusRecord(models.Model):
    source_record = models.ForeignKey(Record, models.DO_NOTHING, primary_key=True)

    class Meta:
        managed = False
        db_table = 'transform_upgrade_1_0_to_1_1_status_record'


class TransformUpgrade10To11StatusRelease(models.Model):
    source_release = models.ForeignKey(Release, models.DO_NOTHING, primary_key=True)

    class Meta:
        managed = False
        db_table = 'transform_upgrade_1_0_to_1_1_status_release'
