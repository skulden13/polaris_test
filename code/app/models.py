from django.db import models, transaction


class BicycleQuerySet(models.QuerySet):
  def rent_random(self):
    with transaction.atomic():
      item = self.select_for_update()\
          .filter(rented=False).order_by('?').first()
      if not item:
        return None
      item.rented = True
      item.save(update_fields=['rented'])
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
