from .common import ListingSerializer
from categories.serializers.common import CategorySerializer
from jwt_auth.serializers.common import UserSerializer
from feedbacks.serializers.populated import PopulatedFeedbackSerializer
from orders.serializers.common import OrderSerializer

class PopulatedListingSerializer(ListingSerializer):
    categories = CategorySerializer(many=True)
    owner = UserSerializer()
    feedbacks = PopulatedFeedbackSerializer(many=True)
    orders = OrderSerializer(many=True)