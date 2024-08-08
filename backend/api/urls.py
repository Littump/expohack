from api.views import ClientViewSet, HistoryBuyViewSet, ThingViewSet
from django.urls import include, path
from rest_framework.routers import DefaultRouter


app_name = 'api'

v1_router = DefaultRouter()
v1_router.register('clients', ClientViewSet, basename='clients')
v1_router.register('things', ThingViewSet, basename='things')
v1_router.register('history', HistoryBuyViewSet, basename='history')


urlpatterns = [
    path('', include('djoser.urls')),
    path("auth/", include("djoser.urls.authtoken")),
    path('', include(v1_router.urls)),
]
