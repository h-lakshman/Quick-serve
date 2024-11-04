from .models import User
from rest_framework_simplejwt.tokens import RefreshToken


def generate_token_for_user(user: User) -> RefreshToken:
    refresh_token = RefreshToken.for_user()
    refresh_token.payload['is_admin'] = user.is_admin
    return refresh_token
