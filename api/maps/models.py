from django.db import models
 

class Map(models.Model):
    address = models.TextField()
    date_created = models.DateTimeField(auto_now_add=True)
    latlng = models.CharField(max_length=128)