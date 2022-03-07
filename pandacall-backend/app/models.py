from operator import mod
from django.db import models


class PandaCallUser(models.Model):
    first_name = models.CharField(max_length=10)
    last_name = models.CharField(max_length=10)
    username = models.CharField(max_length=20)
    password = models.CharField(max_length=20)
    account_id = models.IntegerField()
    notificationToken = models.TextField()

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
