import { useSelector } from "react-redux";
const Resume = () => {
    const user = useSelector((store) => store.user);
    return (

        <div>Resume {user.FirstName}</div>

    )
}
export default Resume;