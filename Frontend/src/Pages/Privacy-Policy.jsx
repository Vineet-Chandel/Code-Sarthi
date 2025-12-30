import { useSelector } from "react-redux";
const PrivacyPolicy = () => {
    const user = useSelector((store) => store.user);
    return (

        <div>PrivacyPolicy {user.user.FirstName}</div>

    )
}
export default PrivacyPolicy;