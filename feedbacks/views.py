from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework.permissions import IsAuthenticated

# import models
from .models import Feedback

# import serializers
from .serializers.common import FeedbackSerializer

class FeedbackListView(APIView):
    permission_classes = (IsAuthenticated, )

    def post(self, request):
        request.data['owner'] = request.user.id
        feedback_to_add = FeedbackSerializer(data=request.data)
        if feedback_to_add.is_valid():
            feedback_to_add.save()
            return Response(feedback_to_add.data, status=status.HTTP_201_CREATED)
        return Response(feedback_to_add.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

class FeedbackDetailView(APIView):
    permission_classes = (IsAuthenticated, )

    def get_feedback(self, pk):
        try:
            feedback = Feedback.objects.get(pk=pk)
            return feedback
        except Feedback.DoesNotExist:
            raise NotFound(detail="Feedback not found")
    
    def delete(self, request, pk):
        feedback_to_delete = self.get_feedback(pk=pk)
        if feedback_to_delete.owner != request.user:
            raise PermissionDenied(detail="Unauthorised")
        feedback_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
