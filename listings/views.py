from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound
from rest_framework.permissions import IsAuthenticated

from .models import Listing
from .serializers.common import ListingSerializer
from .serializers.populated import PopulatedListingSerializer

# Create your views here.
class ListingListView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, _request):
        listings = Listing.objects.all() 
        serialized_listings = PopulatedListingSerializer(listings, many=True)
        return Response(serialized_listings.data, status=status.HTTP_200_OK)
    
    def post(self, request):
        request.data['owner'] = request.user.id
        listing_to_add = ListingSerializer(data=request.data)
        if listing_to_add.is_valid():
            listing_to_add.save()
            return Response(listing_to_add.data, status=status.HTTP_201_CREATED)
        return Response(listing_to_add.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


class ListingDetailView(APIView):

    def get_listing(self, pk):
        try:
            return Listing.objects.get(pk=pk)
        except Listing.DoesNotExist:
            raise NotFound(detail="Can't find that listing!")


    def get(self, _request, pk):
        listing = self.get_listing(pk=pk)
        serialized_listing = PopulatedListingSerializer(listing)
        return Response(serialized_listing.data, status=status.HTTP_200_OK)

    
    def delete(self, _request, pk):
        listing_to_delete = self.get_listing(pk=pk)
        listing_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


    def put(self, request, pk):
        listing_to_update = self.get_listing(pk=pk) # get our product
        updated_listing = ListingSerializer(listing_to_update, data=request.data)
        if updated_listing.is_valid(): # is_valid checks the validity of the newly created object
            updated_listing.save() # saves it if it's valid
            print('Updated data', updated_listing.data)
            return Response(updated_listing.data, status=status.HTTP_202_ACCEPTED)
        return Response(updated_listing.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
