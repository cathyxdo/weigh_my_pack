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

from backpack_list.views import  list_detail, item_form, addItem, category_form, add_category, add_list, list_form

from backpack_list.views import ListListView, CategoryListView
urlpatterns = [
    path('admin/', admin.site.urls),
    path('', ListListView.as_view(), name="index"),
    #path("backpacklist/<int:list_id>/", CategoryListView.as_view(), name = "list_detail")
    path("backpacklist/<int:id>/", list_detail, name = "list_detail"),
    path("backpacklist/<int:id>/add_item/", item_form, name = "item_form"),
    path("backpacklist/<int:id>/add_item/add/", addItem, name = "add"),
    path("backpacklist/<int:id>/add_category/", category_form, name = "category_form"),
    path("backpacklist/<int:id>/add_category/add/", add_category, name = "add_category"),
    path("add_list/",list_form, name = "list_form"),
    path("add_list/add",add_list, name = "add_list"),

]
