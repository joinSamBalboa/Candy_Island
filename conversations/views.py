from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework.permissions import IsAuthenticated


from .models import Conversation

from .serializers.common import ConversationSerializer
from .serializers.populated import PopulatedConversationSerializer

class ConversationListView(APIView):
    permission_classes = (IsAuthenticated, )

    def get(self, _request):
        conversation = Conversation.objects.all() 
        serialized_conversation = PopulatedConversationSerializer(conversation, many=True)
        return Response(serialized_conversation.data, status=status.HTTP_200_OK)

    def post(self, request):
        request.data['owner'] = request.user.id
        conversation_to_add = ConversationSerializer(data=request.data)
        if conversation_to_add.is_valid():
            conversation_to_add.save()
            return Response(conversation_to_add.data, status=status.HTTP_201_CREATED)
        return Response(conversation_to_add.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

class ConversationDetailView(APIView):
    permission_classes = (IsAuthenticated, )

    def get_conversation(self, pk):
        try:
            conversation = Conversation.objects.get(pk=pk)
            return conversation
        except Conversation.DoesNotExist:
            raise NotFound(detail="Conversation not found")
    
    def delete(self, request, pk):
        conversation_to_delete = self.get_conversation(pk=pk)
        if conversation_to_delete.owner != request.user:
            raise PermissionDenied(detail="Unauthorised")
        conversation_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
