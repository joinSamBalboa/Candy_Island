from django.urls import path
from .views import LoginView, RegisterView, UserView, UserListView, ProfileView

urlpatterns = [
    path('register/', RegisterView.as_view()),
    path('login/', LoginView.as_view()),
    path('profile/', UserView.as_view()),
    path('profile/<username>', ProfileView.as_view()),
    path('', UserListView.as_view())
]