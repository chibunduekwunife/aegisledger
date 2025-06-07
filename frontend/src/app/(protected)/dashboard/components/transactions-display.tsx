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
import Link from "next/link";

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
                <Link
                  key={txn.id}
                  href={`/dashboard/transactions/edit-transaction/${txn.id}`}
                  className="block"
                >
                  <Card>
                    <CardContent className="flex justify-between items-center py-4">
                      {/* Left: Name, type, category in a row */}
                      <div className="flex flex-col items-left gap-x-4 min-w-0">
                        <span className="font-semibold truncate">
                          {txn.name}
                        </span>
                        <span className="text-xs text-gray-500 truncate">
                          {txn.type}: {txn.category}
                        </span>
                      </div>
                      {/* Right: Amount and date */}
                      <div className="text-end">
                        <p
                          className={clsx(
                            txn.type === "Income"
                              ? "text-income"
                              : "text-expense"
                          )}
                        >
                          {`$${txn.amount}`}
                        </p>
                        <span className="text-xs text-gray-400">{`Date: ${txn.date}`}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <h1 className="mb-5 text-gray-600 text-sm">
            Add a new transaction to display
          </h1>
        )}
      </CardContent>
      <CardFooter>{footer}</CardFooter>
    </Card>
  );
}
