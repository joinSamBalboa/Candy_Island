from .common import OrderSerializer
from conversations.serializers.populated import PopulatedConversationSerializer
from listings.serializers.populated import PopulatedListingSerializer


class PopulatedOrderSerializer(OrderSerializer):
    conversations = PopulatedConversationSerializer(many=True)
    listing = PopulatedListingSerializer()
