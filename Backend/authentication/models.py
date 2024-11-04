from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    email = models.EmailField(unique=True)
    full_name = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=12)
    password = models.CharField(max_length=72)
    is_admin = models.BooleanField()

    REQUIRED_FIELDS = ['email', 'full_name',
                       'phone_number', 'password', 'is_admin']
    is_anonymous = False
