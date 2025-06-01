from django.urls import path
from . import views
from .views import TransactionRetrieveUpdate

# CRUD Routes
urlpatterns = [
    path("transactions/", views.TransactionListCreate.as_view(), name="transaction-list"),
    path("transactions/delete/<int:pk>/", views.TransactionDelete.as_view(), name="delete-transaction"),
    path('transactions/<int:pk>/', TransactionRetrieveUpdate.as_view(), name='transaction-detail'),
    path('transactions/edit/<int:pk>/', TransactionRetrieveUpdate.as_view(), name='transaction-edit'),
]