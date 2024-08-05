from api import models
from django_filters.rest_framework import CharFilter, FilterSet


class ClientFilter(FilterSet):
    id = CharFilter(lookup_expr='icontains')

    class Meta:
        model = models.Client
        fields = ['id']


class ThingFilter(FilterSet):
    id = CharFilter(lookup_expr='icontains')
    name = CharFilter(lookup_expr='icontains')

    class Meta:
        model = models.Thing
        fields = ['id', 'name']
