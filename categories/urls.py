from django.urls import path

# import views
from .views import CategoryListView, CategoryDetailView

urlpatterns = [
    path('', CategoryListView.as_view()),
    path('<name>/', CategoryDetailView.as_view())
]