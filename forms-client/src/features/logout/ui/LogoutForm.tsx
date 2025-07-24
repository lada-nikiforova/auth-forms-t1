import { useAppDispatch } from "@/app/provider/store";
import { logout } from "@/entities/auth";
import { IoIosLogOut } from "react-icons/io";
import { useNavigate } from "react-router";
export const LogoutForm = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate(); 
    
    const onSubmit = () => {
        dispatch(logout())
            .unwrap()
            .then(() => navigate('/login'))
            .catch(err => console.error(err));
    };

  return (
    <button onClick={onSubmit} className="flex items-center gap-2 text-3xl cursor-pointer">
        <IoIosLogOut />
        <p className="text-lg font-medium">Выйти</p>
    </button>
  )
}

export default LogoutForm
