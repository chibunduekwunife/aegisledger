export type ChartDatum = {
  month: string;
  income: number;
  expense: number;
};

export type Transaction = {
    id: string | number;
    name: string;
    amount: number;
    type: string;
    category: string;
    date: string;
    notes: string;
};

