import { useSelector } from "react-redux";
const Scheduler = () => {
    const user = useSelector((store) => store.user);
    return (

        <div>Scheduler {user.FirstName}</div>

    )
}
export default Scheduler;