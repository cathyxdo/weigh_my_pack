from django.db import models
from django.conf import settings

# Create your models here.
class List(models.Model):
    name = models.CharField(max_length=100)
    notes = models.CharField(max_length=300, null=True, blank=True)
    creator = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='lists')
    def __str__(self):
        return self.name

class Category(models.Model):
    name = models.CharField(max_length=100)
    list = models.ForeignKey(List, related_name='categories', on_delete=models.CASCADE)
    def __str__(self):
        return self.name

class Item(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(null=True, blank=True)
    weight = models.FloatField()
    qty = models.IntegerField(default=1)
    link = models.URLField(null=True, blank=True)
    category = models.ForeignKey(Category, related_name='items', on_delete=models.CASCADE)
    
    def __str__(self):
        return self.name