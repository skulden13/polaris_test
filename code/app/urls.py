from django.urls import path
from app import views

app_name = 'app'

urlpatterns = [
  path('api/', views.get_all_items, name='all'),
  path('api/new/', views.add_item, name='new'),
  path('api/get/', views.get_item, name='get'),
  path('api/free/<str:id>', views.free_item, name='free'),
]
