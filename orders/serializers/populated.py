from .common import OrderSerializer
from conversations.serializers.populated import PopulatedConversationSerializer
from listings.serializers.common import ListingSerializer


class PopulatedOrderSerializer(OrderSerializer):
    conversations = PopulatedConversationSerializer(many=True)
    listing = ListingSerializer()
