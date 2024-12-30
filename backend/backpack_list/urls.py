from django.urls import path
from .views import (
    ListList,
    ModifyCategory,
    ModifyItem,
    CreateCategory,
    CreateItem,
    SingleList,
    UserListView
)

app_name = 'backpack_list'  

urlpatterns = [
    path('lists/', ListList.as_view(), name='lists'),
    path('users/lists/', UserListView.as_view(), name='user_lists'),
    path('lists/<int:pk>/', SingleList.as_view(), name='list_modify'),
    path('categories/<int:pk>/', ModifyCategory.as_view(), name='category_modify'),
    path('categories/', CreateCategory.as_view(), name='create_category'),
    path('items/<int:pk>/', ModifyItem.as_view(), name='item_modify'),
    path('items/', CreateItem.as_view(), name='create_item'),
]