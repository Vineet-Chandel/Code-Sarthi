import { useSelector } from "react-redux";
const Explore = () => {
    const user = useSelector((store) => store.user);
    return (

        <div>Explore {user.user.FirstName}</div>

    )
}
export default Explore;
