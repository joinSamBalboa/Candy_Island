from .common import CategorySerializer
from listings.serializers.common import ListingSerializer

class PopulatedCategorySerializer(CategorySerializer):
    listings = ListingSerializer(many=True)