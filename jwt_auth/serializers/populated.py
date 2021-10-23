from .common import UserSerializer
from listings.serializers.common import ListingSerializer
from orders.serializers.common import OrderSerializer
from favourites.serializers.populated import PopulatedFavouriteSerializer

class PopulatedUserSerializer(UserSerializer):
    listings = ListingSerializer(many=True)
    orders = OrderSerializer(many=True)
    favourites = PopulatedFavouriteSerializer(many=True)