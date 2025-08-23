"use client"
import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"

export default function Google() {
  return (
    <Button
      onClick={() => signIn("google")}
      className="w-full mt-2"
    >
      Sign in with Google
    </Button>
  )
}