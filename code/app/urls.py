from django.urls import path
from app import views


urlpatterns = [
  path('api/', views.get_all_items),
  path('api/new/', views.add_item),
  path('api/get/', views.get_item),
  path('api/free/<str:id>', views.free_item),
]
