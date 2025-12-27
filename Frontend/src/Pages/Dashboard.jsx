import { useSelector } from "react-redux";
const Dashboard = () => {
    const user = useSelector((store) => store.user);
    return (

        <div>Dashboard {user.FirstName}</div>

    )
}
export default Dashboard;
