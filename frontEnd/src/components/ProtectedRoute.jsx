import { Navigate, Outlet, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import UnauthorizedPage from "./UnauthorizedPage";

export default function ProtectedRoute({ allowedRoles }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [unauthorized, setUnauthorized] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (userData) {
            setUser(JSON.parse(userData));
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        if (!loading && user && !allowedRoles.includes(user.role)) {
            setUnauthorized(true);
            const timer = setTimeout(() => {
                navigate(-1); 
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [loading, user, allowedRoles, navigate]);

    if (loading) return null;

    if (!user) return <Navigate to="/login" />;

    if (unauthorized) {
        return <UnauthorizedPage/>
    }

    return <Outlet />;
}

ProtectedRoute.propTypes = {
    allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
};
