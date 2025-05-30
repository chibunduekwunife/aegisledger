import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Transaction } from "@/lib/types";
import clsx from "clsx";

interface TransactionsSectionProps {
  transactions: Transaction[];
  footer?: React.ReactNode;
  header?: React.ReactNode;
  slice?: number;
}

export default function TransactionsDisplay({
  transactions,
  footer,
  header,
  slice,
}: TransactionsSectionProps) {
  const txns = transactions ?? [];
  const displayTxns = slice ? txns.slice(0, slice) : txns;
  return (
    <Card>
      <CardHeader>{header}</CardHeader>
      <CardContent>
        {displayTxns.length > 0 ? (
          <div>
            <div className="flex flex-col gap-3">
              {displayTxns.map((txn) => (
                <Card key={txn.id}>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardHeader>
                        <CardTitle>{txn.name}</CardTitle>
                        <CardDescription>
                          {txn.type}: {txn.category}
                        </CardDescription>
                      </CardHeader>
                    </div>
                    <div>
                      <CardContent>
                        <p
                          className={clsx(
                            "text-end",
                            txn.type === "Income"
                              ? "text-income"
                              : "text-expense"
                          )}
                        >
                          {`$${txn.amount}`}
                        </p>
                        <CardDescription>{`Date: ${txn.date}`}</CardDescription>
                      </CardContent>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <h1 className="mb-5 text-gray-600 text-sm">
            Add a new transaction to display
          </h1>
        )}
      </CardContent>
      <CardFooter>
        {footer}
      </CardFooter>
    </Card>
  );
}
