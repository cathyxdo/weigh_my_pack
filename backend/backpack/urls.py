"""
URL configuration for backpack project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from backpack_list.views import ListList, ModifyCategory, ModifyItem, CreateCategory, CreateItem, SingleList, UserListView

urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/lists/", ListList.as_view(), name='lists'),
    path("api/users/lists", UserListView.as_view()),
    path("api/lists/<int:pk>/", SingleList.as_view(), name='list_modify'),
    path("api/categories/<int:pk>/", ModifyCategory.as_view(), name='category_modify'),
    path("api/categories/", CreateCategory.as_view(), name='create_category'),
    path("api/items/<int:pk>/", ModifyItem.as_view(), name='item_modify'),
    path("api/items/", CreateItem.as_view(), name='create_item'),
    path('api/user/', include('users.urls', namespace='users')),
]
