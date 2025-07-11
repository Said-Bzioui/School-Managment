import { TriangleAlert } from "lucide-react";

export default function UnauthorizedPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
            <div className="text-center">
                {/* Large 404 Number */}
                <div className="mb-8">
                    <h1 className="text-9xl md:text-[12rem] font-bold text-primary leading-none tracking-tight">
                        404
                    </h1>
                </div>

                {/* Page Not Found Text */}
                <div className="mb-8">
                    <h2 className="text-2xl md:text-3xl font-semibold text-gray-600 mb-2">
                        PAGE NOT FOUND
                    </h2>

                </div>

                {/* Medical-themed illustration */}
                <div className="mb-8">
                    <div className="w-24 h-24 mx-auto bg-muted rounded-full flex items-center justify-center mb-4">
                        <TriangleAlert size={55} className="text-red-500" />
                    </div>
                </div>


                {/* Additional Help Text */}
                <div className="mt-8 text-gray-500 text-sm">
                    <p>If you believe this is an error, please contact our technical support team.</p>
                </div>
            </div>
        </div>
    );
}