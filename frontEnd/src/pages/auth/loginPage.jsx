"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, Lock } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

const formSchema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
})

export default function LoginPage() {
    const navigate = useNavigate()
    const [error, setError] = useState("")

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(formSchema),
    })

    const onSubmit = async (formData) => {
        try {
            const { data } = await axios.get(
                `http://localhost:5000/users`
            )
            console.log(data);
            console.log(formData);
            const user = data.find((user) => user.email === formData.email && user.password === formData.password)
            console.log(user);
            localStorage.setItem("user", JSON.stringify(user))
            if (user.role === "admin") navigate("/admin")
            else if (user.role === "teacher") navigate("/teacher")
            else if (user.role === "student") navigate("/student")
            else if (user.role === "parent") navigate("/parent")
            else {
                setError("Invalid email or password")
            }
        } catch {
            setError("Server error occurred")
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-[800px] h-[500px] bg-white rounded-md shadow-lg flex overflow-hidden">
                {/* Left Side */}
                <div className="bg-teal-500 text-white w-1/2 flex flex-col items-center justify-center p-8 relative">
                    <div className="text-3xl font-bold mb-4">Welcome Back!</div>
                    <p className="text-center mb-6">Login with your credentials to continue</p>
                </div>

                {/* Right Side - Form */}
                <div className="w-1/2 p-8 flex flex-col justify-center">
                    <h2 className="text-2xl font-bold text-teal-500 text-center mb-10">Login to your Account</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <div className="flex items-center border rounded-full px-3 py-2 bg-gray-100">
                                <Mail className="w-4 h-4 mr-2 text-gray-400" />
                                <Input
                                    placeholder="Email"
                                    {...register("email")}
                                    className="border-0 shadow-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                                />
                            </div>
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                            )}
                        </div>

                        <div>
                            <div className="flex items-center border rounded-full px-3 py-2 bg-gray-100">
                                <Lock className="w-4 h-4 mr-2 text-gray-400" />
                                <Input
                                    type="password"
                                    placeholder="Password"
                                    {...register("password")}
                                    className="border-0 shadow-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                                />
                            </div>
                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                            )}
                        </div>

                        {error && <p className="text-red-600 text-center">{error}</p>}

                        <Button type="submit" className="w-full bg-teal-500 hover:bg-teal-600 text-white rounded-full">
                            Login
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}
