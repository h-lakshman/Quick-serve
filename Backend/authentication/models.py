from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    username = models.EmailField(unique=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=12)
    password = models.CharField(max_length=72)
    is_admin = models.BooleanField(default=False)

    REQUIRED_FIELDS = ['email', 'first_name', 'last_name', 'password']
    is_anonymous = False

    def __str__(self) -> str:
        return self.first_name + self.last_name
