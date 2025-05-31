"use client";

import { expense_categories } from "@/lib/db/txn";
import { income_categories } from "@/lib/db/txn";
import { transaction_types } from "@/lib/db/txn";
import { number, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CalendarIcon,
  EditIcon,
  PlusCircleIcon,
  SaveAllIcon,
} from "lucide-react";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "transaction name must be at least 2 characters long.",
    })
    .max(25, {
      message: "transaction name cannot exceed 25 characters.",
    }),
  amount: z.number(),
  category: z.string({
    required_error: "Please select a category.",
  }),
  type: z.string({
    required_error: "Please select a transaction type.",
  }),
  date: z.date({
    required_error: "Please select the date of the transaction.",
  }),
  notes: z.string().max(150, {
    message: "transaction note cannot exceed 150 characters.",
  }).optional().or(z.literal("")),
});

interface TransactionFormProps {
  method: string;
  onSubmit: (data: z.infer<typeof formSchema>) => void;
  defaultValues?: Partial<z.infer<typeof formSchema>>;
}

export default function TransactionForm({
  method,
  onSubmit,
  defaultValues,
}: TransactionFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues || {
      name: "",
      amount: 0,
      category: "",
      type: "Expense",
      date: new Date(),
      notes: "",
    },
  });

  const typeValue = form.watch("type");

  return (
    <Card>
      {method === "add-transaction" ? (
        <CardHeader>
          <CardTitle>Add Transaction</CardTitle>
          <CardDescription>Create a new transaction record</CardDescription>
        </CardHeader>
      ) : (
        <CardHeader>
          <CardTitle>Edit Transaction</CardTitle>
          <CardDescription>
            Update information on existing transaction
          </CardDescription>
        </CardHeader>
      )}
      <div className="border-b-2"></div>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="mb-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter a transaction name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter a transaction amount"
                        {...field}
                        onChange={(e) => {
                          field.onChange(
                            e.target.value === "" ? "" : Number(e.target.value)
                          );
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a transaction type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {transaction_types.map((txn) => (
                          <SelectItem key={txn.id} value={txn.value}>
                            {txn.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a transaction category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {(typeValue === "Income"
                          ? income_categories
                          : expense_categories
                        ).map((txn) => (
                          <SelectItem key={txn.id} value={txn.value}>
                            {txn.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter any transaction notes here."
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {method === "add-transaction" ? (
              <Button type="submit">
                <PlusCircleIcon />
                Add Transaction
              </Button>
            ) : (
              <Button type="submit">
                <EditIcon />
                Edit Transaction
              </Button>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
