""" from django.shortcuts import render
from .models import Item, List, Category

# Create your views here.
def backpack_list(request):
    lists = List.objects.all()
    return render(request, 'backpack_list/index.html', {'lists': lists})

def list_detail(request, list_id):

    return render(request, 'backpack_list/list_page.html', {'list_id': list_id}) """

# todo_list/todo_app/views.py
from django.views.generic import ListView
from .models import Item, List, Category


from django.shortcuts import render
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
    category_list = []
    total_weight = 0
    total_qty = 0

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
                'qty': item.qty
            }
            item_weight = item.weight*item.qty
            item_list.append(item_detail)
            subtotal_weight += item_weight
            subtotal_qty += item.qty

        category_list.append({'name': category.name, 'category_id' : category.id, 'subtotal_weight': subtotal_weight, 'subtotal_qty': subtotal_qty, 'items' : item_list})

        total_weight += subtotal_weight
        total_qty += subtotal_qty

    return_dict = {
        'list_id': id,
        'name': list_name,
        'total_weight': total_weight,
        'total_qty': total_qty,
        'categories': category_list
    }
    return render(request, 'backpack_list/list_page.html', {'full_details': return_dict})