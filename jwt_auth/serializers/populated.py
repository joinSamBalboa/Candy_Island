from .common import UserSerializer
from listings.serializers.populated import PopulatedListingSerializer
from orders.serializers.populated import PopulatedOrderSerializer
from favourites.serializers.populated import PopulatedFavouriteSerializer

class PopulatedUserSerializer(UserSerializer):
    listings = PopulatedListingSerializer(many=True)
    orders = PopulatedOrderSerializer(many=True)
    favourites = PopulatedFavouriteSerializer(many=True)