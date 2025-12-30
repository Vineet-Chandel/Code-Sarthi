import { useSelector } from "react-redux";
const ContactUs = () => {
    const user = useSelector((store) => store.user);
    return (

        <div>ContactUs {user.userFirstName}</div>

    )
}

export default ContactUs