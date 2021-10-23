from jwt_auth.serializers.common import UserSerializer
from .common import FeedbackSerializer

class PopulatedFeedbackSerializer(FeedbackSerializer):
    owner = UserSerializer()