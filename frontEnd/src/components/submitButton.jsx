import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import PropTypes from "prop-types";

export default function SubmitButton({ isSubmit }) {
    return (
        <Button
            type="submit"
            disabled={isSubmit}
            className="w-full h-10 mt-6 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold rounded-2xl transition-all duration-300 transform  hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
            {isSubmit ? (
                <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Ajouter...</span>
                </div>
            ) : (
                <div className="flex items-center justify-center space-x-2">
                    <span>Ajouter</span>
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                </div>
            )}
            </Button>
    )
}

SubmitButton.propTypes = {
    isSubmit: PropTypes.bool.isRequired,
};

