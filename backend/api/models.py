from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    ...


class Client(models.Model):
    id = models.CharField(max_length=100, primary_key=True)


class Favorite(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=True)
    client = models.ForeignKey(Client, on_delete=models.CASCADE)


class Thing(models.Model):
    id = models.CharField(max_length=256, primary_key=True)
    company = models.CharField(max_length=256)
    name = models.CharField(max_length=1024)


class HistoryBuy(models.Model):
    thing = models.ForeignKey(Thing, on_delete=models.CASCADE)
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-date"]
