from django.urls import path
from .views import FeedbackListView, FeedbackDetailView

urlpatterns = [
    path('', FeedbackListView.as_view()),
    path('<int:pk>/', FeedbackDetailView.as_view())
]