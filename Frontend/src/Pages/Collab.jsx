import { useSelector } from "react-redux";
const Collab = () => {
  const user = useSelector((store) => store.user);
  return (

    <div>Collab {user.user.FirstName}</div>

  )
}

export default Collab