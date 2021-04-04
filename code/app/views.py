from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from app.models import Bicycle

import json


def index(request):
  context = {}
  return render(request, 'index.html', context=context)


@csrf_exempt
def add_item(request):
  if request.method == 'POST':
    payload = json.loads(request.body)
    name = payload['name']
    rented = payload['rented']
    item = Bicycle(name=name, rented=rented)
    try:
      item.save()
      response = json.dumps([{'id': item.id, 'name': item.name, 'rented': item.rented}])
    except:
      response = json.dumps([{'Error': 'Can\'t add an item'}])
    return HttpResponse(response, content_type='text/json')


def get_all_items(request):
  if request.method == 'GET':
    items = Bicycle.objects.all()
    response = json.dumps([
      {'id': i.id, 'name': i.name, 'rented': i.rented}
      for i in items
    ])
    return HttpResponse(response, content_type='text/json')


def get_item(request):
  if request.method == 'GET':
    status = 200
    try:
      item = Bicycle.objects.get_random()
      response = json.dumps([{'id': item.id, 'name': item.name, 'rented': item.rented}])
    except:
      status = 404
      response = json.dumps([{'Error': 'No items are available!'}])
    return HttpResponse(response, status=status, content_type='text/json')


@csrf_exempt
def free_item(request, id):
  if request.method == 'PATCH':
    status = 200
    try:
      item = Bicycle.objects.free(id=id)
      response = json.dumps([{'id': item.id, 'name': item.name, 'rented': item.rented}])
    except:
      status = 404
      response = json.dumps([{ 'Error': 'No item with that id!' }])
    return HttpResponse(response, status=status, content_type='text/json')
    