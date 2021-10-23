from django.db import models
from django.core.validators import MaxValueValidator
from django.db.models.deletion import CASCADE

# Create your models here.
class Feedback(models.Model):
    text = models.TextField(max_length=100, default=None)
    rating = models.PositiveIntegerField(validators=[MaxValueValidator(5)], default=None)
    created_at = models.DateTimeField(auto_now_add=True)
    listings = models.ForeignKey(
        'listings.Listing',
        related_name = 'feedbacks',
        on_delete = models.CASCADE
    )
    owner = models.ForeignKey(
        "jwt_auth.User",
        related_name = "feedbacks",
        on_delete = models.CASCADE
    )

    def __str__(self):
        return f"{self.rating} - {self.created_at}"