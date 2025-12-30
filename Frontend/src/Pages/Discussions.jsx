import { useSelector } from "react-redux";
const Discussions = () => {
    const user = useSelector((store) => store.user);
    return (

        <div>Discussions {user.user.FirstName}</div>

    )
}
export default Discussions;
