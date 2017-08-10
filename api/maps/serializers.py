from rest_framework import serializers

from maps.models import Map


class MapSerializer(serializers.ModelSerializer):
    address = serializers.CharField()
    date_created = serializers.DateTimeField()
    latlng = serializers.CharField(max_length=128)

    class Meta:
        model = Map
        fields = ('address', 'date_created', 'latlng')