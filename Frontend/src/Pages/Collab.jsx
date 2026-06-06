import { useSelector } from "react-redux";
const Collab = () => {
  const user = useSelector((store) => store.user);
  return (
    // visible
    <div>collab</div>

  )
}

export default Collab