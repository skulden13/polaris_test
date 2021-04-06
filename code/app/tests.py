import pytest
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
  item = Bicycle.objects.free(item3.id)
  assert not item.rented

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
