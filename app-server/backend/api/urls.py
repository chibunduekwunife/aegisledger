from django.urls import path
from . import views

# CRUD Routes
urlpatterns = [
    path("transactions/", views.TransactionListCreate.as_view(), name="transaction-list"),
    path("transactions/delete/<int:pk>/", views.TransactionDelete.as_view(), name="delete-transaction")
    
]