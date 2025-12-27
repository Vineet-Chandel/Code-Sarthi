import { useSelector } from "react-redux";
const Assignment = () => {
    const user = useSelector((store) => store.user);
    return (

        <div>Assignment {user.FirstName}</div>

    )
}

export default Assignment