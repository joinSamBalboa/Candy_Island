from .common import FavouriteSerializer
from listings.serializers.populated import PopulatedListingSerializer

class PopulatedFavouriteSerializer(FavouriteSerializer):
    listings = PopulatedListingSerializer()