from drf_yasg.utils import swagger_auto_schema
from rest_framework.decorators import action
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework import status
from django_filters.rest_framework import DjangoFilterBackend


from api import serializers, models, filters
from ml.script import GenerateScript


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
        ids_filter = request.query_params.get('id')
        if ids_filter:
            queryset = queryset.filter(client__id__contains=ids_filter)
        serializer = serializers.FavoriteSerializer(queryset, many=True)
        return Response(serializer.data)

    @action(methods=['get'], detail=True)
    def history(self, request, pk):
        client = self.get_object()
        queryset = models.HistoryBuy.objects.filter(client=client)
        things = queryset.values_list('thing', flat=True)
        queryset = models.Thing.objects.filter(id__in=things)
        serializer = serializers.ThingSerializer(queryset, many=True)
        return Response(serializer.data)

    @action(methods=['get'], detail=True)
    def recommendations(self, request, pk):
        client = self.get_object()
        recommendations = client.client_recommendation.all()
        things = recommendations.values_list('thing', flat=True)
        queryset = models.Thing.objects.filter(id__in=things)
        serializer = serializers.ThingSerializer(queryset, many=True)
        return Response(serializer.data)


class ThingViewSet(ModelViewSet):
    serializer_class = serializers.ThingSerializer
    queryset = models.Thing.objects.all()
    script_reducer = GenerateScript()
    filter_backends = (DjangoFilterBackend,)
    filterset_class = filters.ThingFilter

    @swagger_auto_schema(responses={status.HTTP_200_OK: serializers.ScriptSerializer()})
    @action(methods=['get'], detail=True)
    def script(self, request, pk):
        this_thing: models.Thing = self.get_object()
        main_product = {this_thing.name: this_thing.description}
        additional_products = {thing.name: thing.description for thing in models.Thing.objects.all()}
        additional_products.pop(this_thing.name, None)
        text = self.script_reducer.get_script(main_product, additional_products)
        serializer = serializers.ScriptSerializer(data={'text': text})
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(methods=['get'], detail=True)
    def recommend(self, request, pk):
        this_thing: models.Thing = self.get_object()
        recommendations = this_thing.thing_recommendation.all()
        things = recommendations.values_list('thing_recommendation', flat=True)
        queryset = models.Thing.objects.filter(id__in=things)
        serializer = serializers.ThingSerializer(queryset, many=True)
        return Response(serializer.data)


class HistoryBuyViewSet(ModelViewSet):
    serializer_class = serializers.HistoryBuySerializer
    queryset = models.HistoryBuy.objects.all()
