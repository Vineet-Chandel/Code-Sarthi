import { useSelector } from "react-redux";
const ContactUs = () => {
    const user = useSelector((store) => store.user);
    return (

        <div>ContactUs {user.FirstName}</div>

    )
}

export default ContactUs