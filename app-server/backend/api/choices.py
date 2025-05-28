import json
from pathlib import Path

CHOICES_PATH = Path(__file__).resolve().parent.parent / "shared" / "choices.json"

with open(CHOICES_PATH) as f:
    CHOICES = json.load(f)

EXPENSE_CHOICES = [(item, item) for item in CHOICES["expense_categories"]]
INCOME_CHOICES = [(item, item) for item in CHOICES["income_categories"]]
TYPE_CHOICES = [(item, item) for item in CHOICES["transaction_types"]]