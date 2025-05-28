import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Transaction } from "@/lib/types";
import { testTransactions } from "@/lib/seed";
import clsx from "clsx";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";
import { BotIcon } from "lucide-react";

interface TransactionsSectionProps {
  transactions?: Transaction[];
}

export default function TransactionsSection({
  transactions,
}: TransactionsSectionProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-gray-500">Recent Transactions</CardTitle>
          <Link
            href="/dashboard/transactions"
            className={buttonVariants({ variant: "link" })}
          >
            View All
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <div>
          <ul>
            {testTransactions.slice(0, 5).map((transaction) => (
              <Card key={transaction.id} className="mb-5">
                <div className="flex justify-between items-center">
                  <div>
                    <CardHeader>
                      <CardTitle>{transaction.name}</CardTitle>
                      <CardDescription>{transaction.category}</CardDescription>
                    </CardHeader>
                  </div>
                  <div>
                    <CardContent>
                      <p
                        className={clsx(
                          "text-end",
                          transaction.amount > 0
                            ? "text-income"
                            : "text-expense"
                        )}
                      >
                        {`$${transaction.amount}`}
                      </p>
                      <CardDescription>
                        {`Date: ${transaction.date}`}
                      </CardDescription>
                    </CardContent>
                  </div>
                </div>
              </Card>
            ))}
          </ul>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center md:justify-end gap-2">
        <Button asChild>
          <Link href="/dashboard/transactions/add-transaction">
            <PlusCircleIcon />
            Add Transaction
          </Link>
        </Button>
        <Button asChild>
          <Link href="#">
            <BotIcon />
            Ask AI
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
