from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework.permissions import IsAuthenticated

from .models import Order

from .serializers.common import OrderSerializer
from .serializers.populated import PopulatedOrderSerializer

# Create your views here.

class OrderListView(APIView):
    permission_classes = (IsAuthenticated, )

    def post(self, request):
        request.data['owner'] = request.user.id
        order_to_create = OrderSerializer(data=request.data)
        if order_to_create.is_valid():
            order_to_create.save()
            return Response(order_to_create.data, status=status.HTTP_201_CREATED)
        return Response(order_to_create.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

class OrderDetailView(APIView):
    permission_classes = (IsAuthenticated, )

    def get_order(self, pk):
        try:
            order = Order.objects.get(pk=pk)
            return order
        except Order.DoesNotExist:
            raise NotFound(detail="Order not found")
        

    def get(self, _request, pk):
        product = self.get_order(pk=pk)
        serialized_order = PopulatedOrderSerializer(product)
        print(serialized_order.data)
        return Response(serialized_order.data, status=status.HTTP_200_OK)
    
    def delete(self, request, pk):
        order_to_cancel = self.get_order(pk=pk)
        if order_to_cancel.owner != request.user:
            raise PermissionDenied(detail="Unauthorised")
        elif order_to_cancel.status != "pending":
            raise PermissionDenied(detail="Order cannot be cancelled")
        order_to_cancel.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)