from django.db import models
from django.contrib.auth.models import User

# Create your models here.

CATEGORY_CHOICES = [
    ('FOOD', 'Food'),
    ('TRANSPORT', 'Transport'),
    ('UTILITIES', 'Utilities'),
    ('ENTERTAINMENT', 'Entertainment'),
    ('OTHER', 'Other'),
]

class Transaction(models.Model):
    name = models.CharField(max_length=100)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    date = models.DateField()
    notes = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="transactions")

    def __str__(self):
        return self.name

