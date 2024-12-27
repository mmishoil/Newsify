from django.db import models

class Country(models.Model):
        img = models.CharField(max_length=16,null=True)
        short_name = models.CharField(max_length=16)
        full_name = models.CharField(max_length=32)

        def __str__(self) -> str:
                return str(self.full_name)

        class Meta:
                ordering = ['full_name']
                verbose_name_plural = "Countries"
