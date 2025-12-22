import { useEffect } from "react";



const Dashboard = () => {

    useEffect(() => {
        document.title = "CodeSarthi | Dashboard";
    }, []);
    return (

        <div>Dashboard</div>


    );
}


export default Dashboard;
