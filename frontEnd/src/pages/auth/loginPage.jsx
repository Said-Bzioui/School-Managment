import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useNavigate } from "react-router-dom"
import CostumAxios from "@/api/axios"




const formSchema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
})




export default function ModernLoginPage() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const [showPassword, setShowPassword] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(formSchema),
    })


    const onSubmit = async (formData) => {
        try {
            const { data } = await CostumAxios.post("/login", formData)
            localStorage.setItem("user", JSON.stringify(data.user))
            localStorage.setItem("userData", JSON.stringify(data.userData))
            localStorage.setItem("token", JSON.stringify(data.token))
            if (data.user.role === "admin") navigate("/admin")
            else if (data.user.role === "teacher") navigate("/teacher")
            else if (data.user.role === "student") navigate("/student")
            else if (data.user.role === "parent") navigate("/parent")
            else {
                setError("Invalid email or password")
            }
        } catch {
            setError("Invalid email or password")
        }
    }

    return (
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-purple-100 via-white to-blue-50">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-300/60 to-pink-300/60 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-300/60 to-purple-300/60 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-r from-purple-200/60 to-pink-200 rounded-full blur-2xl animate-pulse delay-500"></div>
            </div>

            <div className="relative flex items-center justify-center min-h-screen p-4">
                <div className="relative">
                    <div className="backdrop-blur-xl bg-white/40 rounded-3xl shadow-2xl border border-white/50 p-8 lg:p-10 mx-4 lg:mx-8">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-white/30 rounded-3xl"></div>
                        <div className="relative z-10">
                            <div className="text-center mb-8">
                                <h2 className="text-3xl font-bold text-gray-800 mb-2">Sign In</h2>
                                <p className="text-gray-600">Enter your credentials to access your account</p>
                            </div>

                            {error && (
                                <div className="px-4 py-1 bg-red-50 border border-red-200 rounded-2xl">
                                    <p className="text-red-600 text-center text-sm">{error}</p>
                                </div>
                            )}
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-5">
                                {/* Email Field */}
                                <div className="group">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-purple-500 transition-colors duration-200" />
                                        </div>
                                        <Input
                                            type="email"
                                            placeholder="Enter your email"
                                            {...register("email")}
                                            className="pl-12 h-10 bg-white/70 border-gray-200 rounded-2xl focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-200 text-gray-800 placeholder:text-gray-500"
                                        />
                                    </div>
                                    {errors.email && (
                                        <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                                    )}
                                </div>

                                {/* Password Field */}
                                <div className="group">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-purple-500 transition-colors duration-200" />
                                        </div>
                                        <Input
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Enter your password"
                                            {...register("password")}
                                            className="pl-12 pr-12 h-10 bg-white/70 border-gray-200 rounded-2xl focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-200 text-gray-800 placeholder:text-gray-500"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-purple-500 transition-colors duration-200"
                                        >
                                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                        </button>
                                    </div>
                                    {errors.password && (
                                        <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                                    )}
                                </div>

                                {/* Remember Me & Forgot Password */}
                                <div className="flex items-center justify-between text-sm">
                                    <label className="flex items-center space-x-2 cursor-pointer">
                                        <input type="checkbox" className="rounded border-gray-300 text-purple-500 focus:ring-purple-400" />
                                        <span className="text-gray-600">Remember me</span>
                                    </label>
                                    <button type="button" className="text-purple-500 hover:text-purple-600 font-medium transition-colors duration-200">
                                        Forgot password?
                                    </button>
                                </div>


                                {/* Submit Button */}
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full h-10 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                >
                                    {isSubmitting ? (
                                        <div className="flex items-center space-x-2">
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            <span>Signing In...</span>
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-center space-x-2">
                                            <span>Sign In</span>
                                            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                                        </div>
                                    )}
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}