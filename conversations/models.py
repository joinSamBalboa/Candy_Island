from django.db import models

# Create your models here.
class Conversation(models.Model):
    message = models.TextField(max_length=300)
    sent_at = models.DateTimeField(auto_now_add=True)
    owner = models.ForeignKey(
        'jwt_auth.User',
        related_name = "conversations",
        on_delete = models.CASCADE
    )
    order = models.ForeignKey(
        'orders.Order',
        related_name = "conversations",
        on_delete = models.CASCADE
    )

    def __str__(self):
        return f"Sent by {self.owner} at {self.sent_at}"