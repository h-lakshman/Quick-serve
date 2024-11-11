from django.http import HttpRequest
from django.core.exceptions import ObjectDoesNotExist

from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework_simplejwt.tokens import AccessToken, RefreshToken
import bcrypt
import datetime

from .models import User
from .utils import generate_token_for_user


@api_view(['POST'])
def register(request: HttpRequest):
    if User.objects.filter(username=request.data['username']).exists():
        return Response({'error': 'user exists', 'ok': False}, status=409)

    try:
        User(
            username=request.data['username'],
            first_name=request.data['first_name'],
            last_name=request.data['last_name'],
            phone_number=request.data['phone_number'],
            password=bcrypt.hashpw(
                request.data['password'].encode('utf-8'), bcrypt.gensalt()).decode('utf-8'),
            is_admin=False).save()

    except Exception as e:
        return Response({'error': str(e), 'ok': False})
    return Response({"ok": True})


@api_view(['POST'])
def login(request: HttpRequest):
    try:
        user = User.objects.get(username=request.data['username'])
        print(user.password, request.data['password'], 'hi')
        if not user:
            return Response({'error': 'Invalid Credentials', 'ok': False})
        if not bcrypt.checkpw(request.data['password'].encode('utf-8'), user.password.encode('utf-8')):
            return Response({'error': 'Invalid credentials', 'ok': False})

    except ObjectDoesNotExist:
        return Response({"error": "Invalid Credentials", "ok": False})

    access_token = RefreshToken.for_user(user).access_token
    access_token.payload['user_id'] = str(user.id)

    response = Response({
        'ok': True,
        'token': str(access_token),
    })
    # response.set_cookie(
    #     'refresh_token',
    #     str(refresh_token),
    #     httponly=True,
    #     path='auth/refresh',
    #     expires=datetime.timedelta(days=15),
    #     max_age=3000
    # )
    return response


def refresh(request: HttpRequest):
    try:
        acess_token = AccessToken(request.headers['token'], verify=False)
    except Exception as e:
        return Response({'error': str(e)}, status=403)

    try:
        acess_token.verify()
        return Response({'error': str(e)}, status=403)
    except Exception as e:
        try:
            acess_token.verify_token_type()
            refresh_token = RefreshToken(request.COOKIES('refresh_token'))
            refresh_token.verify()
            refresh_token.verify_token_type()
            userid = refresh_token.payload["user_id"]
            user: User = User.objects.filter(userid=userid).first()
            refresh_token = generate_token_for_user(user)

            response = Response({
                'ok': True,
                'access_token': str(refresh_token.access_token)
            })
            response.set_cookie('refresh_token', refresh_token, httponly=True, path='auth/refresh',
                                expires=datetime.timedelta(days=15),
                                max_age=3000)
            return response
        except Exception as e:
            return Response({"ok": False, "error": "Token Invalidated!!"}, status=403)


@api_view(['GET'])
def signout(request: HttpRequest):
    request.session.clear()
    return Response({"ok": True})
