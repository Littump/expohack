from api import models
from djoser.serializers import UserCreateSerializer, UserSerializer
from rest_framework import serializers


class UserCustomSerializer(UserSerializer):
    class Meta:
        model = models.User
        exclude = ["password"]


class UserСreateCustomSerializer(UserCreateSerializer):
    class Meta:
        model = models.User
        exclude = ["password"]


class ClientSerializer(serializers.ModelSerializer):
    is_favorite = serializers.SerializerMethodField()

    class Meta:
        model = models.Client
        fields = "__all__"

    def get_is_favorite(self, obj):
        user = self.context['request'].user
        return models.Favorite.objects.filter(user=user, client=obj).exists()


class FavoriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Favorite
        exclude = ['user']

    def create(self, validated_data):
        user = self.context['request'].user
        validated_data['user'] = user
        return models.Favorite.objects.create(**validated_data)


class ThingSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Thing
        fields = "__all__"


class ScriptSerializer(serializers.Serializer):
    text = serializers.CharField()


class HistoryBuySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.HistoryBuy
        fields = "__all__"
