from django.contrib import admin

# Register your models here.
from backpack_list.models import List, Category, Item

admin.site.register(List)
admin.site.register(Category)
admin.site.register(Item)