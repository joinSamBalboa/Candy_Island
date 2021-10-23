from .common import OrderSerializer
from conversations.serializers.populated import PopulatedConversationSerializer

class PopulatedOrderSerializer(OrderSerializer):
    conversations = PopulatedConversationSerializer(many=True)