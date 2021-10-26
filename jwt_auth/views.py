from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import PermissionDenied, NotFound
from rest_framework.permissions import IsAuthenticated
from datetime import datetime, timedelta
from django.contrib.auth import get_user_model
from django.conf import settings
import jwt

from .serializers.common import UserSerializer
from .serializers.populated import PopulatedUserSerializer
User = get_user_model()

# Create your views here.
class RegisterView(APIView):

    def post(self, request):
        user_to_create = UserSerializer(data=request.data)
        if user_to_create.is_valid():
            user_to_create.save()
            return Response({'message:' : 'Registration Successful'}, status=status.HTTP_202_ACCEPTED)
        return Response(user_to_create.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

class LoginView(APIView):

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        login_time = request.data.get('login_time')
    
        try:
            user_to_login = User.objects.get(username=username)
        except User.DoesNotExist:
            raise PermissionDenied(detail="Invalid User Credentials")
    
        if not user_to_login.check_password(password):
            raise PermissionDenied(detail="Invalid Credentials")
        
        dt = datetime.now() + timedelta(hours=login_time)
        token = jwt.encode(
            {'sub' : user_to_login.id, 'exp' : int(dt.strftime('%s'))},
            settings.SECRET_KEY,
            algorithm='HS256'
        )

        return Response({'token': token, 'message': f"Welcome back, {user_to_login.username}"})


class UserView(APIView):
    permission_classes = (IsAuthenticated,)
    
    def get_profile(self, pk):
        try:
            return User.objects.get(pk=pk)
        except User.DoesNotExist:
            raise NotFound(detail="Profile not found")
    
    def get(self, request):
        # profile = self.get_profile(pk=pk)
        serialized_profile = PopulatedUserSerializer(request.user)
        print(serialized_profile.data)
        # populated_serialized_profile = PopulatedUserSerializer(profile)
        # if profile.id != request.user.id:
        #     return Response(serialized_profile.data, status=status.HTTP_200_OK)
        return Response(serialized_profile.data, status=status.HTTP_200_OK)


    # def delete(self, request, pk):
    #     profile_to_delete = self.get_profile(pk=pk)
    #     if profile_to_delete.id != request.user.id:
    #         raise PermissionDenied(detail="Unauthorised")
    #     profile_to_delete.delete()
    #     return Response(status=status.HTTP_204_NO_CONTENT)

    
class UserListView(APIView):

    def get(self, _request):
        users = User.objects.all()
        serialized_users = UserSerializer(users, many=True)
        return Response(serialized_users.data, status=status.HTTP_200_OK)

class ProfileView(APIView):
    permission_classes = (IsAuthenticated,)

    def get_profile(self, username):
        try:
            return User.objects.get(username=username)
        except User.DoesNotExist:
            raise NotFound(detail="Profile not found")

    def get(self, _request, username):
        profile = self.get_profile(username=username)
        serialized_profile = UserSerializer(profile)
        # populated_serialized_profile = PopulatedUserSerializer(profile)
        # if profile.id != request.user.id:
        #     return Response(serialized_profile.data, status=status.HTTP_200_OK)
        return Response(serialized_profile.data, status=status.HTTP_200_OK)


