"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState, useTransition } from "react"
import Google from "./Google"
import { LoginSchema } from "../../../schemas"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import FormError from "./form-error.js"
import FormSuccess from "./form-success.js"

type FormValues = z.infer<typeof LoginSchema>

export function ProfileForm() {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const form = useForm<FormValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: FormValues) {
    setError("")
    setSuccess("")

    startTransition(async () => {
      try {
        const res = await signIn("credentials", {
          email: values.email,
          password: values.password,
          redirect: false,
        })

        if (res?.error) {
          setError(res.error)
          setSuccess("")
        } else if (res?.ok) {
          setSuccess("Login successful!")
          setError("")
          router.push("/")
        }
      } catch (err) {
        console.error(err)
        setError("Something went wrong")
      }
    })
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input disabled={isPending} placeholder="name@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input disabled={isPending} type="password" placeholder="********" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {error && <FormError message={error} />}
          {success && <FormSuccess message={success} />}

          <div className="mt-5">
            <p className="text-sm text-blue-600 cursor-pointer">Forgot your password?</p>
          </div>

          <Button className="w-full" type="submit" disabled={isPending}>
            Login
          </Button>
        </form>
      </Form>

      <div className="mt-5">
        {!isPending && (
          <>
            <p className="text-center text-[12px] text-gray-500 font-semibold">Quick Login</p>
            <Google />
          </>
        )}
      </div>
    </>
  )
}
