from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import NotFound

from .models import Category

from .serializers.populated import PopulatedCategorySerializer
# Create your views here.
class CategoryListView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, _request):
        categories = Category.objects.all()
        serialized_categories = PopulatedCategorySerializer(categories, many=True)
        return Response(serialized_categories.data, status=status.HTTP_200_OK)

class CategoryDetailView(APIView):
    permission_classes = (IsAuthenticated,)

    def get_category(self, name):
        try:
            return Category.objects.get(name=name)
        except Category.DoesNotExist:
            raise NotFound(detail="Can't find that category!")
    
    def get(self, _request, name):
        category = self.get_category(name=name)
        serialized_category = PopulatedCategorySerializer(category)
        return Response(serialized_category.data, status=status.HTTP_200_OK)