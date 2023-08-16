# todo_list/todo_app/views.py
from django.views.generic import ListView, CreateView
from .models import Item, List, Category
from .forms import ItemForm, CategoryForm, ListForm
from django.shortcuts import render, redirect
from django.views.decorators.http import require_POST
from users.models import NewUser

#NEW STUFF ADDED FOR API 
from .serializers import ListSerializer, CategorySerializer, ItemSerializer, UserSerializer
from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from django.http import Http404
from rest_framework.permissions import IsAuthenticated

class UserListView(generics.ListCreateAPIView):

    queryset = NewUser.objects.all()
    serializer_class = UserSerializer

class ListList(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = List.objects.all()
    serializer_class = ListSerializer
    def get_queryset(self):
        user = self.request.user
        return List.objects.filter(creator=user)
    def perform_create(self, serializer):
        serializer.save(creator=self.request.user)
class SingleList(generics.RetrieveUpdateDestroyAPIView):
    queryset = List.objects.all()
    serializer_class = ListSerializer
class ModifyCategory(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
class ModifyItem(generics.RetrieveUpdateDestroyAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
class CreateCategory(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
class CreateItem(generics.ListCreateAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer

@api_view(['POST'])
def add_new_category(request, pk):
    list = List.objects.get(id=pk)
    
    serializer_list = ListSerializer(list, many=False)
    print(serializer_list['categories'])
    serializer_list['categories'].append(CategorySerializer(data=request.data))

    if serializer_list.is_valid():
        serializer_list.save()
    
    return Response(serializer_list.data)

#END

from json import dumps

class ListListView(ListView):
    model = List
    context_object_name = 'backpack_list'
    template_name = "backpack_list/index.html"

class CategoryListView(ListView):
    model = Category
    template_name = "backpack_list/list_page.html"

    def get_queryset(self):
        return Category.objects.filter(list_id=self.kwargs["list_id"])
    
    def get_context_data(self):
        context = super().get_context_data()
        context["list"] = List.objects.get(id=self.kwargs["list_id"])
        return context

def list_detail(request, id):

    categories = Category.objects.filter(list_id=id)
    list_name = List.objects.filter(id=id)[0].name
    list_notes = List.objects.filter(id=id)[0].notes
    category_list = []
    total_weight = 0
    total_qty = 0

    chart_labels = []
    chart_data = []


    for category in categories:
        items = Item.objects.filter(category_id=category.id)
        item_list = []
        subtotal_weight = 0
        subtotal_qty = 0

        for item in items:
            item_detail = {
                'name' : item.name,
                'description' : item.description,
                'weight' : item.weight,
                'qty': item.qty,
                'item_id': item.id 
            }
            item_weight = item.weight*item.qty
            item_list.append(item_detail)
            subtotal_weight += item_weight
            subtotal_qty += item.qty

        category_list.append({'name': category.name, 'category_id' : category.id, 'subtotal_weight': subtotal_weight, 'subtotal_qty': subtotal_qty, 'items' : item_list})

        total_weight += subtotal_weight
        total_qty += subtotal_qty

        chart_labels.append(category.name)
        chart_data.append(subtotal_weight)

    json_string = dumps(chart_labels)
    return_dict = {
        'list_id': id,
        'name': list_name,
        'notes': list_notes,
        'total_weight': total_weight,
        'total_qty': total_qty,
        'categories': category_list,
        'chart_labels': chart_labels,
        'chart_data': chart_data,
        'json_string': json_string
    }
    return render(request, 'backpack_list/list_page.html', {'full_details': return_dict})



def item_form(request, id):
    form = ItemForm()
    return render(request, 'backpack_list/item_form.html',{'form': form, 'list_id' : id})

def category_form(request, id):
    form = CategoryForm()
    return render(request, 'backpack_list/category_form.html',{'form': form, 'list_id' : id})

def list_form(request):
    form = ListForm()
    return render(request, 'backpack_list/list_form.html',{'form': form})

def update_category_form(request, id, category_id):
    category = Category.objects.get(id=category_id)
    form = CategoryForm(instance = category)

    return render(request, 'backpack_list/category_form_update.html',{'form': form, 'list_id': id, 'category_id': category_id})

def update_item_form(request, id, item_id):
    item = Item.objects.get(id=item_id)
    form = ItemForm(instance=item)

    return render(request, 'backpack_list/item_form_update.html',{'form': form, 'list_id': id, 'item_id': item_id})

def update_list_form(request, id):
    list = List.objects.get(id=id)
    form = ListForm(instance=list)

    return render(request,'backpack_list/list_form_update.html',{'form': form, 'list_id': id})

@require_POST
def add_item(request,id):
    form = ItemForm(request.POST)
    if form.is_valid():
        form.save()
    
    return redirect('list_detail', id=id)

def add_category(request,id):
    form = CategoryForm(request.POST)
    if form.is_valid():
        form.save()
    
    return redirect('list_detail', id=id)

def add_list(request):
    form = ListForm(request.POST)
    if form.is_valid():
        form.save()
    
    return redirect('index')

def update_category(request, id, category_id):
    category = Category.objects.get(id=category_id)
    form = CategoryForm(request.POST, instance=category)

    if form.is_valid():
        form.save()
    
    return redirect('list_detail', id=id)

def delete_category(request, id, category_id):
    category = Category.objects.get(id=category_id)
    category.delete()

    return redirect('list_detail', id=id)

def update_item(request, id, item_id):
    item = Item.objects.get(id=item_id)
    form = ItemForm(request.POST, instance=item)
    
    if form.is_valid():
        form.save()
    
    return redirect('list_detail', id=id)

def update_list(request, id):
    list = List.objects.get(id=id)
    form = ListForm(request.POST, instance=list)
    
    if form.is_valid():
        form.save()
    
    return redirect('list_detail', id=id)


def delete_item(request, id, item_id):
    item = Item.objects.get(id=item_id)
    item.delete()
    return redirect('list_detail', id=id)


def delete_list(request, id):
    list = List.objects.get(id=id)
    list.delete()
    return(redirect('index'))
