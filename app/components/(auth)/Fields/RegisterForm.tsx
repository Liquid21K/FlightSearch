"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState, useTransition } from "react"
import Google from "./Google"
import { RegisterSchema } from "../../../schemas"
import { ExclamationCircleIcon } from "@heroicons/react/24/outline"

type FormValues = z.infer<typeof RegisterSchema>

export function RegisterForm({changeMode}) {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const form = useForm<FormValues>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      firstname: "",
      lastname: "",
      gender: "",
      dob: "",
    },
  })

  function is16OrOlder(dob: string): boolean {
    const birthDate = new Date(dob)
    const today = new Date()
    const ageDiff = today.getFullYear() - birthDate.getFullYear()
    const m = today.getMonth() - birthDate.getMonth()
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      return ageDiff - 1 >= 16
    }
    return ageDiff >= 16
  }

  function onSubmit(value: z.infer<typeof RegisterSchema>) {
    setError("")
    setSuccess("")

    if (!is16OrOlder(value.dob)) {
      setError("You must be at least 16 years old to register.")
      return
    }

    startTransition(async () => {
      try {
        // Check if user exists
        const userExistsRes = await fetch("/api/auth/userExist", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: value.email }),
        })

        if (!userExistsRes.ok) {
          throw new Error("Failed to check user existence")
        }

        const userExists = await userExistsRes.json()
        if (userExists.exists) {
          setError("User already exists")
          return
        }

        if (value.password !== value.confirmPassword) {
          setError("Passwords do not match")
          return
        }

        // Register user
        const registerRes = await fetch("/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(value),
        })

        if (!registerRes.ok) {
          const error = await registerRes.json()
          throw new Error(error.message || "Registration failed")
        }

        setSuccess("Registration successful!")
        form.reset()
        changeMode("login")
      } catch (err: any) {
        console.error("Registration error:", err)
        setError(err.message || "Something went wrong")
      }
    })
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">First Name</label>
            <input
              {...form.register("firstname")}
              disabled={isPending}
              placeholder="John"
              className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {form.formState.errors.firstname && (
              <p className="text-red-500 text-xs mt-1">{form.formState.errors.firstname.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Last Name</label>
            <input
              {...form.register("lastname")}
              disabled={isPending}
              placeholder="Doe"
              className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {form.formState.errors.lastname && (
              <p className="text-red-500 text-xs mt-1">{form.formState.errors.lastname.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            {...form.register("email")}
            disabled={isPending}
            placeholder="name@example.com"
            className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {form.formState.errors.email && (
            <p className="text-red-500 text-xs mt-1">{form.formState.errors.email.message}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Gender</label>
            <input
              {...form.register("gender")}
              disabled={isPending}
              placeholder="Male/Female"
              className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {form.formState.errors.gender && (
              <p className="text-red-500 text-xs mt-1">{form.formState.errors.gender.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Date of Birth</label>
            <input
              {...form.register("dob")}
              disabled={isPending}
              type="date"
              className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {form.formState.errors.dob && (
              <p className="text-red-500 text-xs mt-1">{form.formState.errors.dob.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Password</label>
          <input
            {...form.register("password")}
            disabled={isPending}
            type="password"
            placeholder="********"
            className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {form.formState.errors.password && (
            <p className="text-red-500 text-xs mt-1">{form.formState.errors.password.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">Confirm Password</label>
          <input
            {...form.register("confirmPassword")}
            disabled={isPending}
            type="password"
            placeholder="********"
            className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {form.formState.errors.confirmPassword && (
            <p className="text-red-500 text-xs mt-1">{form.formState.errors.confirmPassword.message}</p>
          )}
        </div>

        {error && (
          <div className="flex items-center text-red-600 text-sm">
            <ExclamationCircleIcon className="h-5 w-5 mr-1" />
            {error}
          </div>
        )}

        {success && (
          <div className="text-green-600 text-sm font-semibold">{success}</div>
        )}

        <div className="flex justify-end text-sm text-blue-600 cursor-pointer mt-2">
          Forgot your password?
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
        >
          Register
        </button>
      </form>

      <div className="mt-6">
        {isPending ? null : (
          <>
            <p className="text-center text-xs text-gray-500 font-semibold">Quick Login</p>
            <Google />
          </>
        )}
      </div>
    </div>
  )
}
