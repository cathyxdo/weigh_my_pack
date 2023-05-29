from django.forms import ModelForm, Textarea
from .views import Item, Category, List

class ItemForm(ModelForm):
    class Meta:
        model = Item
        fields = '__all__'
        labels = {
            "weight": "Weight (g)"
        }

class CategoryForm(ModelForm):
    class Meta:
        model = Category
        fields = '__all__'


class ListForm(ModelForm):
    class Meta:
        model = List
        fields = '__all__'
        widgets = {
            'notes': Textarea()
        }
