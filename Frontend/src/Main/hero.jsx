
import { useNavigate } from "react-router-dom";
const Hero = () => {
    const navigate = useNavigate();
    return (


        <div>
            <button onClick={() => navigate("/login")}>hero</button>
        </div>
    )
}

export default Hero