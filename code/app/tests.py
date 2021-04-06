import pytest
from django.urls import reverse
from app.models import Bicycle


pytestmark = pytest.mark.django_db


@pytest.fixture
def data():
  item1 = Bicycle.objects.create(name='Cube', rented=False)
  item2 = Bicycle.objects.create(name='Merida', rented=False)
  item3 = Bicycle.objects.create(name='Cannondale', rented=True)

  return item1, item2, item3


def test_can_get_only_not_rented_items(data):
  item1, item2, item3 = data
  
  item = Bicycle.objects.rent_random()
  # Returned item should be already with rented=True
  assert item.rented
  assert item.id in [item1.id, item2.id]
  assert Bicycle.objects.filter(rented=False).count() == 1

  item = Bicycle.objects.rent_random()
  assert item.rented
  assert item.id in [item1.id, item2.id]
  assert Bicycle.objects.filter(rented=False).count() == 0

  # Nothing to return 
  item = Bicycle.objects.rent_random()
  assert not item

  # Change 3rd item and try again
  item3.rented = False
  item3.save()
  item = Bicycle.objects.rent_random()
  assert item.rented
  assert item.id == item3.id


def test_rent_random_and_free_items(data):
  item1, item2, item3 = data

  assert item3.rented
  Bicycle.objects.free(item3.id)
  item3.refresh_from_db()
  assert not item3.rented

  assert Bicycle.objects.filter(rented=False).count() == 3
  # Retured item are not the same
  rand_item1 = Bicycle.objects.rent_random()
  rand_item2 = Bicycle.objects.rent_random()
  assert rand_item1.id != rand_item2.id 

  assert Bicycle.objects.filter(rented=False).count() == 1
  Bicycle.objects.free(rand_item1.id)
  Bicycle.objects.free(rand_item2.id)
  # Items are available for rent
  assert Bicycle.objects.filter(rented=False).count() == 3


def test_api(data, client):
  item1, item2, item3 = data

  # 1. fetch all
  url = reverse('app:all')
  response = client.get(url)
  assert response.status_code == 200
  # check that returned all items
  content = str(response.content)
  for item in [item1, item2, item3]:
    assert item.name in content
 
  # 2. check get random
  url = reverse('app:get')
  response = client.get(url)
  assert response.status_code == 200
  # 1 item left
  response = client.get(url)
  assert response.status_code == 200
  response = client.get(url)
  # No items to return
  assert response.status_code == 404

  # 3. check free
  url = reverse('app:free', kwargs={'id': item1.id})
  # 1 item should be freed
  response = client.patch(url)
  assert response.status_code == 200
  Bicycle.objects.filter(rented=False).count() == 1
  # 2 items should be freed
  url = reverse('app:free', kwargs={'id': item2.id})
  response = client.patch(url)
  assert response.status_code == 200
  Bicycle.objects.filter(rented=False).count() == 2
  # 3 items should be freed
  url = reverse('app:free', kwargs={'id': item3.id})
  response = client.patch(url)
  assert response.status_code == 200
  Bicycle.objects.filter(rented=False).count() == 3

  # 4. check new
  url = reverse('app:new')
  data = {'name': 'Orbea', 'rented': True}
  response = client.post(url, data, content_type='application/json')
  assert response.status_code == 200
  Bicycle.objects.all().count() == 4
  new_item = Bicycle.objects.get(rented=True)
  assert new_item.name == 'Orbea'
  assert new_item.rented
