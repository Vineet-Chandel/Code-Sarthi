import { Outlet } from "react-router-dom";
import NavBar from "./components/Navbar"

const Body = () => {
    return (
        <div>
            <NavBar />
            <Outlet />
        </div>
    );
};

export default Body;
