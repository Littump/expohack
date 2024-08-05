from drf_yasg.utils import swagger_auto_schema
from rest_framework.decorators import action
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework import status
from django_filters.rest_framework import DjangoFilterBackend


from api import serializers, models, filters
from utils.logger import get_logger


class ClientViewSet(ModelViewSet):
    serializer_class = serializers.ClientSerializer
    queryset = models.Client.objects.all()
    filter_backends = (DjangoFilterBackend,)
    filterset_class = filters.ClientFilter

    @action(methods=['post'], detail=True)
    def change_favorite(self, request, pk):
        client = self.get_object()
        user = self.request.user
        if models.Favorite.objects.filter(user=user, client=client).exists():
            models.Favorite.objects.filter(user=user, client=client).delete()
        else:
            models.Favorite.objects.create(user=user, client=client)
        return Response(status=status.HTTP_200_OK)

    @action(methods=['get'], detail=False)
    def favorites(self, request):
        user = self.request.user
        queryset = models.Favorite.objects.filter(user=user)
        serializer = serializers.FavoriteSerializer(queryset, many=True)
        return Response(serializer.data)


class ThingViewSet(ModelViewSet):
    serializer_class = serializers.ThingSerializer
    queryset = models.Thing.objects.all()
    filter_backends = (DjangoFilterBackend,)
    filterset_class = filters.ThingFilter

    @swagger_auto_schema(responses={status.HTTP_200_OK: serializers.ScriptSerializer()})
    @action(methods=['get'], detail=True)
    def script(self, request, pk):
        # thing = self.get_object()
        text = 'test'
        serializer = serializers.ScriptSerializer(data={'text': text})
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(methods=['get'], detail=True)
    def recommend(self, request):
        queryset = models.Thing.objects.all()
        ...
        serializer = serializers.ThingSerializer(queryset, many=True)
        return Response(serializer.data)
