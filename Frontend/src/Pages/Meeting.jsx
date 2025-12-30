import { useSelector } from "react-redux";
const Meeting = () => {
    const user = useSelector((store) => store.user);
    return (

        <div>Meeting {user.user.FirstName}</div>

    )
}
export default Meeting;
