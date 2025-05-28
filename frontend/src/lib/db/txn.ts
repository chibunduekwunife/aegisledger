import choices from "../../shared/choices.json";

export const expense_categories = (choices.expense_categories as string[]).map((name: string, idx: number) => ({
  id: idx + 1,
  name,
  value: name,
}));

export const income_categories = (choices.income_categories as string[]).map((name: string, idx: number) => ({
  id: idx + 1,
  name,
  value: name,
}));

export const transaction_types = (choices.transaction_types as string[]).map((name: string, idx: number) => ({
  id: idx + 1,
  name,
  value: name,
}));