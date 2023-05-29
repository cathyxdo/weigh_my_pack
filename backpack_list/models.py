from django.db import models

# Create your models here.
class List(models.Model):
    name = models.CharField(max_length=100)
    notes = models.CharField(max_length=300, null=True, blank=True)
    def __str__(self):
        return self.name

class Category(models.Model):
    name = models.CharField(max_length=100)
    list = models.ForeignKey(List, on_delete=models.CASCADE)
    def __str__(self):
        return self.name

class Item(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(null=True, blank=True)
    weight = models.FloatField()
    qty = models.IntegerField()
    link = models.URLField(null=True, blank=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.name