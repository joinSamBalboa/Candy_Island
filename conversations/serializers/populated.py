from .common import ConversationSerializer
from jwt_auth.serializers.common import UserSerializer

class PopulatedConversationSerializer(ConversationSerializer):
    owner = UserSerializer()