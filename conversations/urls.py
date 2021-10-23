from django.urls import path
from .views import ConversationListView, ConversationDetailView

urlpatterns = [
    path('', ConversationListView.as_view()), # /Conversations/
    path('<int:pk>/', ConversationDetailView.as_view()) # /Conversations/:pk/
]