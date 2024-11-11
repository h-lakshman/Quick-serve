from django.contrib.auth.backends import BaseBackend
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework_simplejwt.authentication import JWTAuthentication
from authentication.models import User
import bcrypt


class QuickServeAuthBackend(BaseBackend):
    def authenticate(self, request, username, password):
        try:
            user: User = User.objects.get(username=username)
            if bcrypt.checkpw(password.encode("utf-8"), user.password.encode('utf-8')):
                return user
        except ObjectDoesNotExist:
            return None


class QuickServeAuthentication(JWTAuthentication):
    def get_header(self, request: Request) -> bytes:
        return request.META.get("HTTP_TOKEN")

    def get_raw_token(self, header):
        return header
