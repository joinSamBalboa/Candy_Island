from .common import ListingSerializer
from categories.serializers.common import CategorySerializer
from jwt_auth.serializers.common import UserSerializer
from feedbacks.serializers.populated import PopulatedFeedbackSerializer

class PopulatedListingSerializer(ListingSerializer):
    categories = CategorySerializer(many=True)
    owner = UserSerializer()
    feedbacks = PopulatedFeedbackSerializer(many=True)