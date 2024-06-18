import { useNavigate } from "react-router-dom";

const Navigation = () => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    navigate("/sign-in");
  };

  return (
    <nav>
      <button onClick={handleLogOut}>Log Out</button>
    </nav>
  );
};

export default Navigation;
