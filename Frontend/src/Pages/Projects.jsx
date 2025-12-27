import { useSelector } from "react-redux";
const Projects = () => {
    const user = useSelector((store) => store.user);
    return (

        <div>Projects {user.FirstName}</div>

    )
}
export default Projects;