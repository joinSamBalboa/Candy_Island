from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    username = models.CharField(max_length=50, unique=True)
    btc_address = models.CharField(max_length=35, default='invalid_btc_address')
    is_vendor = models.BooleanField(default=False)
    vendor_image = models.CharField(max_length=300, default='https://www.zuckermanlaw.com/wp-content/uploads/whistleblowing/anonymous-sec-whistleblower.jpg')
    