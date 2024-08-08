from django.contrib import admin
from api.models import (
    Client,
    Thing,
    HistoryBuy,
    ClientRecommendation,
    Favorite,
    Recommendation
)


@admin.register(Client)
class ClientAdmin(admin.ModelAdmin):
    ...


@admin.register(Thing)
class ThingAdmin(admin.ModelAdmin):
    ...


@admin.register(HistoryBuy)
class HistoryBuyAdmin(admin.ModelAdmin):
    ...


@admin.register(ClientRecommendation)
class ClientRecommendationAdmin(admin.ModelAdmin):
    ...


@admin.register(Favorite)
class FavoriteAdmin(admin.ModelAdmin):
    ...


@admin.register(Recommendation)
class RecommendationAdmin(admin.ModelAdmin):
    ...
