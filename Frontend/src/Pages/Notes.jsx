import { useSelector } from "react-redux";
const Notes = () => {
    const user = useSelector((store) => store.user);
    return (

        <div>Notes {user.FirstName}</div>

    )
}
export default Notes;
