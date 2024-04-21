"use client"
import Layout from "@/app/layout"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import './sign-in.css'

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
import { Button } from "@/components/ui/button"
import { ReactElement, JSXElementConstructor } from "react"

const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    passwordConfirm: z.string(),
}).refine(data => data.password === data.passwordConfirm, {
    message: "Passwords must match",
    path: ["passwordConfirm"],
})


function page() {
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }



    return (
        <main className="signIncontainer flex flex-row-reverse ">
            {/* <Layout showNavbar={false}/> */}
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className=" shadow bg-white rounded p-4 max-w-md w-full felx flex-col gap-4 min-h-screen -mt-16 z-20">
                    <div className="flex flex-col justify-center h-5/6">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-lg">E-mail</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter email address" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        --Enter the email address associated with your Institute
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Pasword</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter Password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="passwordConfirm"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Re-enter Password</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Confirm Password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </main>
    )
}
export default page