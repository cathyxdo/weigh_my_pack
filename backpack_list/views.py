from django.shortcuts import render
from .models import Item, List, Category

# Create your views here.
def backpack_list(request):
    lists = List.objects.all()
    return render(request, 'backpack_list/index.html', {'lists': lists})
