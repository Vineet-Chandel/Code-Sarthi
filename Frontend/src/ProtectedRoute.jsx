import { useSelector } from "react-redux";
import { Navigate, Outlet, useOutletContext } from "react-router-dom";

const ProtectedRoute = () => {
    const context = useOutletContext();
    const user = useSelector((store) => store.user);
    return user ? <Outlet context={context} /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
