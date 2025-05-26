"use client";

import { useState, useEffect } from "react";
import api from "@/api";
import { useRouter } from "next/navigation";
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
    name: z.string().min(2, {
        message: "transaction name must be at least 2 characters long"
    }).max(25, {
        message: "transaction name cannot exceed 25 characters"
    }),
    amount: z.number(),
    category: z.string(),
    date: z.string(),
    note: z.string().max(50, {
        message: "transaction note cannot exceed 50 characters"
    })

})

export default function AddTransactionPage() {

    const [name, setName] = useState<string>('')
    const [amount, setAmount] = useState<number>(0)
    const [category, setCategory] = useState<string>('')
    const [date, setDate] = useState<string>('')
    const [note, setNotes] = useState<string>('')
    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            amount: 0,
            category: "",
            date: "",
            note: ""
        },
    })

    const createTransaction = (
        data: 
        { 
            name: string; 
            amount: number; 
            category: string; 
            date: string; 
            note: string 
        }) => {
    api
        .post("/api/transactions/", data)
        .then((res) => {
            if (res.status === 201) {
                alert("Transaction created!")
                router.replace('/dashboard')
            } else {
                alert("Failed to create transaction")
            }
        })
        .catch((err) => alert(err))
};


    return (
        <div className="p-5 rounded-lg bg-white">
            <h1 className="text-2xl text-center font-bold">Add Transaction</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(createTransaction)} className="p-4">
                    <FormField 
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter a transaction name" {...field}/>
                                </FormControl>
                                {/* <FormDescription>
                                    This is your transaction name
                                </FormDescription> */}
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2">

                    </div>
                </form>
            </Form>
        </div>
    )
}
