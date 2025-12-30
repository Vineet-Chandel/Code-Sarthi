import { useSelector } from "react-redux";
const ProjectManager = () => {
    const user = useSelector((store) => store.user);
    return (

        <div>ProjectManager {user.user.FirstName}</div>

    )
}
export default ProjectManager;