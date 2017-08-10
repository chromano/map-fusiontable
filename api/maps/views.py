from rest_framework import mixins, viewsets

from maps.models import Map
from maps.serializers import MapSerializer


class MapViewSet(mixins.CreateModelMixin, mixins.ListModelMixin,
                 viewsets.GenericViewSet):
    queryset = Map.objects.all()
    serializer_class = MapSerializer