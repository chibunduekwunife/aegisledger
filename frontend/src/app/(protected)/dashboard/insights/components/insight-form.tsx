"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import choices from "@/shared/choices.json";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
  transactionType: z
    .array(z.string())
    .min(1, "Select at least one transaction type"),
  transactionCategory: z
    .array(z.string())
    .min(1, "Select at least one category"),
  chartType: z.enum(["bar", "line", "pie", "doughnut", "area"]),
  dateRange: z
    .object({
      start: z.date({ required_error: "Start date is required" }),
      end: z.date({ required_error: "End date is required" }),
    })
    .refine((range) => range.end >= range.start, {
      message: "End date must be after start date",
      path: ["end"],
    }),
});

export default function InsightForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      transactionType: [],
      transactionCategory: [],
      chartType: "bar",
      dateRange: {
        start: new Date(),
        end: new Date(),
      },
    },
  });
  const [rangeType, setRangeType] = useState("date");
  const selectedTypes = form.watch("transactionType");
  const dateRange = form.watch("dateRange");

  // Helper for year/month pickers
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 20 }, (_, i) => currentYear - i);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* transaction type form field */}
        <FormField
          control={form.control}
          name="transactionType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Transaction Type</FormLabel>
              <FormControl>
                <div className="flex gap-4 flex-wrap">
                  {choices.transaction_types.map((type) => (
                    <label key={type} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        value={type}
                        checked={field.value.includes(type)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            field.onChange([...field.value, type]);
                          } else {
                            field.onChange(
                              field.value.filter((v: string) => v !== type)
                            );
                          }
                        }}
                      />
                      {type}
                    </label>
                  ))}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Separator className="my-4" />
        {/* transaction category form field */}
        <FormField
          control={form.control}
          name="transactionCategory"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Transaction Category</FormLabel>
              <FormControl>
                <div className="flex flex-col gap-2">
                  {selectedTypes.length === 0 && (
                    <span className="text-gray-400 text-sm">
                      Please select a transaction type.
                    </span>
                  )}
                  {selectedTypes.includes("Expense") && (
                    <div>
                      <span className="font-semibold text-xs">
                        Expense Categories
                      </span>
                      <div className="flex gap-4 flex-wrap mt-1">
                        {choices.expense_categories.map((cat) => (
                          <label key={cat} className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              value={cat}
                              checked={field.value.includes(cat)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  field.onChange([...field.value, cat]);
                                } else {
                                  field.onChange(
                                    field.value.filter((v: string) => v !== cat)
                                  );
                                }
                              }}
                            />
                            {cat}
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                  {selectedTypes.includes("Income") && (
                    <div>
                      <span className="font-semibold text-xs">
                        Income Categories
                      </span>
                      <div className="flex gap-4 flex-wrap mt-1">
                        {choices.income_categories.map((cat) => (
                          <label key={cat} className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              value={cat}
                              checked={field.value.includes(cat)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  field.onChange([...field.value, cat]);
                                } else {
                                  field.onChange(
                                    field.value.filter((v: string) => v !== cat)
                                  );
                                }
                              }}
                            />
                            {cat}
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Separator className="my-4" />
        {/* chart type form field */}
        <FormField
          control={form.control}
          name="chartType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Chart Type</FormLabel>
              <Select
                value={field.value}
                onValueChange={field.onChange}
                required
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a chart type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="bar">Bar</SelectItem>
                  <SelectItem value="line">Line</SelectItem>
                  <SelectItem value="pie">Pie</SelectItem>
                  <SelectItem value="doughnut">Doughnut</SelectItem>
                  <SelectItem value="area">Area</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Separator className="my-4" />
        {/* Date range type selector */}
        <div>
          <FormLabel>Date Range Type</FormLabel>
          <Select value={rangeType} onValueChange={setRangeType}>
            <SelectTrigger className="w-[220px]">
              <SelectValue placeholder="Select range type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">Specific Dates</SelectItem>
              <SelectItem value="month">Month Range</SelectItem>
              <SelectItem value="year">Year Range</SelectItem>
              <SelectItem value="ytd">Year to Date</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Separator className="my-4" />
        {/* Date range picker field */}
        <FormField
          control={form.control}
          name="dateRange"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date Range</FormLabel>
              <FormControl>
                <div>
                  {rangeType === "date" && (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={
                            !field.value?.start || !field.value?.end
                              ? "text-muted-foreground"
                              : ""
                          }
                        >
                          {field.value?.start && field.value?.end
                            ? `${format(field.value.start, "PPP")} - ${format(
                                field.value.end,
                                "PPP"
                              )}`
                            : "Pick a date range"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="range"
                          selected={{ from: field.value?.start, to: field.value?.end }}
                          onSelect={(range) => {
                            field.onChange({
                              start: range?.from ?? null,
                              end: range?.to ?? null,
                            });
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  )}
                  {rangeType === "month" && (
                    <div className="flex flex-col gap-4">
                      {/* Start Month/Year */}
                      <div className="flex gap-2 items-center">
                        <Select
                          value={
                            field.value?.start
                              ? String(field.value.start.getMonth())
                              : "0"
                          }
                          onValueChange={(val) => {
                            const start = new Date(field.value?.start || new Date());
                            start.setMonth(Number(val));
                            field.onChange({ ...field.value, start });
                          }}
                        >
                          <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder="Start Month" />
                          </SelectTrigger>
                          <SelectContent>
                            {months.map((m, i) => (
                              <SelectItem key={m} value={String(i)}>
                                {m}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Select
                          value={
                            field.value?.start
                              ? String(field.value.start.getFullYear())
                              : String(currentYear)
                          }
                          onValueChange={(val) => {
                            const start = new Date(field.value?.start || new Date());
                            start.setFullYear(Number(val));
                            field.onChange({ ...field.value, start });
                          }}
                        >
                          <SelectTrigger className="w-[100px]">
                            <SelectValue placeholder="Start Year" />
                          </SelectTrigger>
                          <SelectContent>
                            {years.map((y) => (
                              <SelectItem key={y} value={String(y)}>
                                {y}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      {/* End Month/Year */}
                      <div className="flex gap-2 items-center">
                        <Select
                          value={
                            field.value?.end ? String(field.value.end.getMonth()) : "0"
                          }
                          onValueChange={(val) => {
                            const end = new Date(field.value?.end || new Date());
                            end.setMonth(Number(val));
                            field.onChange({ ...field.value, end });
                          }}
                        >
                          <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder="End Month" />
                          </SelectTrigger>
                          <SelectContent>
                            {months.map((m, i) => (
                              <SelectItem key={m} value={String(i)}>
                                {m}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Select
                          value={
                            field.value?.end
                              ? String(field.value.end.getFullYear())
                              : String(currentYear)
                          }
                          onValueChange={(val) => {
                            const end = new Date(field.value?.end || new Date());
                            end.setFullYear(Number(val));
                            field.onChange({ ...field.value, end });
                          }}
                        >
                          <SelectTrigger className="w-[100px]">
                            <SelectValue placeholder="End Year" />
                          </SelectTrigger>
                          <SelectContent>
                            {years.map((y) => (
                              <SelectItem key={y} value={String(y)}>
                                {y}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}
                  {rangeType === "year" && (
                    <div className="flex gap-2 items-center">
                      <Select
                        value={
                          field.value?.start
                            ? String(field.value.start.getFullYear())
                            : String(currentYear)
                        }
                        onValueChange={(val) => {
                          const start = new Date(field.value?.start || new Date());
                          start.setFullYear(Number(val));
                          field.onChange({ ...field.value, start });
                        }}
                      >
                        <SelectTrigger className="w-[120px]">
                          <SelectValue placeholder="Start Year" />
                        </SelectTrigger>
                        <SelectContent>
                          {years.map((y) => (
                            <SelectItem key={y} value={String(y)}>
                              {y}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Select
                        value={
                          field.value?.end
                            ? String(field.value.end.getFullYear())
                            : String(currentYear)
                        }
                        onValueChange={(val) => {
                          const end = new Date(field.value?.end || new Date());
                          end.setFullYear(Number(val));
                          field.onChange({ ...field.value, end });
                        }}
                      >
                        <SelectTrigger className="w-[120px]">
                          <SelectValue placeholder="End Year" />
                        </SelectTrigger>
                        <SelectContent>
                          {years.map((y) => (
                            <SelectItem key={y} value={String(y)}>
                              {y}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  {rangeType === "ytd" && (
                    <div className="flex gap-2 items-center">
                      <span className="text-muted-foreground">
                        Year to Date: {currentYear}
                      </span>
                    </div>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Generate Chart</Button>
      </form>
    </Form>
  );
}
