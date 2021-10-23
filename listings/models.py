from django.db import models

# Create your models here.
class Listing(models.Model):
    name = models.CharField(max_length=50, default=None)
    image = models.CharField(max_length=300, default=None)
    ships_to = models.CharField(max_length=50, default=None)
    quantity = models.PositiveIntegerField(default=None)
    description = models.TextField(max_length=500, default=None)
    price = models.DecimalField(decimal_places=2, max_digits=7, default=0.00)
    weight = models.PositiveIntegerField(default=None)
    owner = models.ForeignKey(
        'jwt_auth.User',
        related_name = 'listings',
        on_delete = models.CASCADE
    )
    categories = models.ManyToManyField(
        'categories.Category',
        related_name = 'listings',
    )

    def __str__(self):
        return f"{self.name} - {self.price}"