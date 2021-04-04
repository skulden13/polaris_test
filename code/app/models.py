import random
from django.db import models


class BicycleQuerySet(models.QuerySet):
  def get_random(self):
    items_available = self.filter(rented=False)
    n = random.randint(0, items_available.count() - 1)
    item = items_available[n]
    item.rented = True
    item.save()
    return item

  def free(self, id):
    item = self.get(id=id)
    item.rented = False
    item.save()
    return item


class Bicycle(models.Model):
  name = models.CharField(max_length=255, blank=True, null=True)
  rented = models.BooleanField(default=False)

  def __str__(self):
    return self.name

  objects = BicycleQuerySet.as_manager()
