from django.db import models

# Create your models here.
class Favourite(models.Model):
    owner = models.ForeignKey(
        "jwt_auth.User",
        related_name = "favourites",
        on_delete = models.CASCADE
    )
    listings = models.ForeignKey(
        "listings.Listing", 
        related_name = "favourites", 
        on_delete = models.CASCADE
    )

    def __str__(self):
        return f"{self.owner} {self.listings}"