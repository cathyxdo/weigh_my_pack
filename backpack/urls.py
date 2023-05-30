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

from backpack_list.views import  list_detail, item_form, add_item, category_form, add_category, add_list, list_form, update_category_form, update_category, delete_category, update_item_form, delete_item, update_item, delete_list, update_list, update_list_form

from backpack_list.views import ListListView, CategoryListView
urlpatterns = [
    path('admin/', admin.site.urls),
    path('', ListListView.as_view(), name="index"),
    path("backpacklist/<int:id>/", list_detail, name = "list_detail"),
    path("backpacklist/update_list/<int:id>/", update_list_form, name = "update_list_form"),
    path("backpacklist/update_list/<int:id>/update", update_list, name = "update_list"),
    path("backpacklist/delete/<int:id>/", delete_list, name = "delete_list"),

    path("backpacklist/<int:id>/add_item/", item_form, name = "item_form"),
    path("backpacklist/<int:id>/add_item/add/", add_item, name = "add"),
    path("backpacklist/<int:id>/update_item/<int:item_id>/", update_item_form, name = "update_item_form"),
    path("backpacklist/<int:id>/update_item/<int:item_id>/update/", update_item, name = "update_item"),
    path("backpacklist/<int:id>/delete_item/<int:item_id>/", delete_item, name = "delete_item"),


    path("backpacklist/<int:id>/add_category/", category_form, name = "category_form"),
    path("backpacklist/<int:id>/add_category/add/", add_category, name = "add_category"),
    path("backpacklist/<int:id>/update_category/<int:category_id>/", update_category_form, name = "update_category_form"),
    path("backpacklist/<int:id>/update_category/<int:category_id>/update/", update_category, name = "update_category"),
    path("backpacklist/<int:id>/delete_category/<int:category_id>/", delete_category, name = "delete_category"),


    path("add_list/",list_form, name = "list_form"),
    path("add_list/add", add_list , name = "add_list"),

]
