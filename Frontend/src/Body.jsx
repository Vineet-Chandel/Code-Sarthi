import { Outlet } from "react-router-dom";
import NavBar from "./components/Navbar";


const Body = () => {
    return (

        <>
            <NavBar />
            <Outlet />
        </>
    )
}

export default Body