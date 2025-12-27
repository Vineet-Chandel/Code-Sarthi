import { useSelector } from "react-redux";
const AboutUs = () => {
    const user = useSelector((store) => store.user);
    return (

        <div>AboutUs {user.FirstName}</div>

    )
}

export default AboutUs