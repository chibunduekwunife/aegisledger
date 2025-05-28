// this file can be deleted

import type { Transaction } from "./types.ts"

export const testTransactions: Transaction[] = [
  {
    id: 1,
    name: "Groceries",
    amount: -54.99,
    category: "Food",
    date: "05/25/2025",
    notes: "Weekly supermarket run"
  },
  {
    id: 2,
    name: "Salary",
    amount: 2500,
    category: "Income",
    date: "05/24/2025",
    notes: "Monthly paycheck"
  },
  {
    id: 3,
    name: "Gym Membership",
    amount: -40,
    category: "Health",
    date: "05/20/2025",
    notes: "Monthly subscription"
  },
  {
    id: 4,
    name: "Electricity Bill",
    amount: -120.5,
    category: "Utilities",
    date: "05/18/2025",
    notes: "May bill"
  },
  {
    id: 5,
    name: "Coffee",
    amount: -3.75,
    category: "Food",
    date: "05/26/2025",
    notes: "Morning coffee"
  },
  {
    id: 6,
    name: "Internet Bill",
    amount: -60,
    category: "Utilities",
    date: "05/15/2025",
    notes: "Monthly internet"
  },
  {
    id: 7,
    name: "Book Purchase",
    amount: -18.99,
    category: "Education",
    date: "05/14/2025",
    notes: "Bought a programming book"
  },
  {
    id: 8,
    name: "Freelance Project",
    amount: 500,
    category: "Income",
    date: "05/12/2025",
    notes: "Website development"
  },
  {
    id: 9,
    name: "Dining Out",
    amount: -45.5,
    category: "Food",
    date: "05/10/2025",
    notes: "Dinner with friends"
  },
  {
    id: 10,
    name: "Movie Ticket",
    amount: -12,
    category: "Entertainment",
    date: "05/09/2025",
    notes: "Weekend movie"
  }
];

export const totalSpent = () => {

  let total_spent = 0;
  testTransactions.forEach(txn => {
    if (txn.amount < 0) {
      total_spent += txn.amount
    }
  })

  return total_spent;
}

export const totalIncome = () => {
  let total_income = 0
  testTransactions.forEach(txn => {
    if (txn.amount > 0) {
      total_income += txn.amount
    }
  })

  return total_income;
}

export const BudgetRemaining = (budget: number) => {
  return budget + totalIncome() - Math.abs(totalSpent());
}