import { useSelector } from "react-redux";
const Study = () => {
    const user = useSelector((store) => store.user);
    return (

        <div>Study {user.FirstName}</div>

    )
}
export default Study;