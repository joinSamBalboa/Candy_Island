from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework.permissions import IsAuthenticated

from .models import Favourite

from .serializers.common import FavouriteSerializer

# Create your views here.
class FavouriteListView(APIView):

    def post(self, request):
        request.data['owner'] = request.user.id
        favourite_to_add = FavouriteSerializer(data=request.data)
        if favourite_to_add.is_valid():
            favourite_to_add.save()
            return Response(favourite_to_add.data, status=status.HTTP_201_CREATED)
        return Response(favourite_to_add.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

class FavouriteDetailView(APIView):

    def get_favourite(self, pk):
        try:
            favourite = Favourite.objects.get(pk=pk)
            return favourite
        except Favourite.DoesNotExist:
            raise NotFound(detail="Favourite not found")

    def delete(self, request, pk):
        favourite_to_delete = self.get_favourite(pk=pk)
        if favourite_to_delete.owner != request.user:
            raise PermissionDenied(detail="Unauthorised")
        favourite_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)