import { useSelector } from "react-redux";
const Assignment = () => {
    const user = useSelector((store) => store.user);
    return (

        <div>Assignment {user.user.FirstName}</div>

    )
}

export default Assignment