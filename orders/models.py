from django.db import models

from conversations.models import Conversation

# Create your models here.
class Order(models.Model):
    address = models.TextField(max_length=300)
    created_at = models.DateTimeField(auto_now_add=True)
    quantity = models.PositiveIntegerField(default=None)
    status = models.CharField(max_length=50, default=None)
    owner = models.ForeignKey(
        'jwt_auth.User',
        related_name = 'orders',
        on_delete = models.CASCADE
    )
    listing = models.ForeignKey(
        'listings.Listing',
        related_name = 'orders',
        on_delete = models.CASCADE
    )


    def __str__(self):
        return f"{self.quantity}x {self.listing.name}  - {self.status}"