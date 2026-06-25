import { useSelector } from "react-redux";
import { Navigate, Outlet, useOutletContext } from "react-router-dom";

const ProtectedRoute = () => {
    const { user, loading } = useSelector((store) => store.user);

    // Receive context from Body
    const context = useOutletContext();

    if (loading) {
        return <div>Loading...</div>;
    }

    return user ? (
        <Outlet context={context} />
    ) : (
        <Navigate to="/login" replace />
    );
};

export default ProtectedRoute;