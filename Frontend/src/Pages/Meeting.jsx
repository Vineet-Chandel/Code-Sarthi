import { useEffect } from "react";



const Meeting = () => {

    useEffect(() => {
        document.title = "CodeSarthi | Meeting";
    }, []);
    return (

        <div>Meeting</div>


    );
}


export default Meeting;
