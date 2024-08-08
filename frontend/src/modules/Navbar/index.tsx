import logo from "@/assets/logo.svg";
import { Button } from "@/ui/Button";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const handleLeave = useCallback(() => {
    localStorage.removeItem("token");
    navigate("/login");
  }, []);

  return (
    <div className="h-[73px] w-[100vw] bg-blue-100 flex justify-start items-center">
      <div className="w-full px-[30px] flex items-center justify-between">
        <img src={logo} alt="expo" className="w-[152px] h-[52px]" />
        {token && <Button onClick={handleLeave}>Выйти</Button>}
      </div>
    </div>
  );
};
