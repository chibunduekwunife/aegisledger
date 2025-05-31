from django.db import models
from django.contrib.auth.models import User
from .choices import EXPENSE_CHOICES, INCOME_CHOICES, TYPE_CHOICES

# Create your models here.
ALL_CATEGORY_CHOICES = INCOME_CHOICES + EXPENSE_CHOICES

class Transaction(models.Model):
    name = models.CharField(max_length=100)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.CharField(max_length=20, choices=ALL_CATEGORY_CHOICES)
    type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    date = models.DateField()
    notes = models.TextField(blank=True, default="")
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="transactions")

    def __str__(self):
        return self.name

