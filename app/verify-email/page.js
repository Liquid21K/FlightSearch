"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {Button} from "@heroui/react";
import { useRouter } from "next/navigation"

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [message, setMessage] = useState("Verifying...");
  const [isLoading , setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const res = await fetch(`/api/auth/verify-email?token=${token}`);
        const data = await res.json();
        setMessage(data.message);
        setLoading(false)
      } catch (error) {
        setMessage("Something went wrong.");
      }
    };

    if (token) verifyEmail();
  }, [token]);
  const handleChange = () => {
    router.push("/")
  }
  return (<>
  <div className="container max-h-screen my-96 flex justify-center items-center m-auto">
    <Button
        isLoading={isLoading}
        size="lg"
        onClick={handleChange}
        color="secondary"
        spinner={
            <svg
            className="animate-spin h-10 w-10  text-current"
            fill="none"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            >
            
            <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
            />
            <path
                className="opacity-75"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                fill="currentColor"
            />
            </svg>
        }
        >
        {message}
        </Button>
    </div>
  </>);
}
