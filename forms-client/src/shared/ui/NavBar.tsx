import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { HiOutlineBars3BottomLeft } from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";

export const NavBar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const handleNavClick = (path:string) => {
        setMenuOpen(false);
        if (location.pathname === path) {
        navigate(path, { replace: true }); 
        } else {
        navigate(path);
        }
    };
  return (
    <div className=''>
        <button className='text-3xl z-52 cursor-pointer relative flex flex-col justify-center items-center' onClick={() => setMenuOpen(!menuOpen)}>
            {!menuOpen && <HiOutlineBars3BottomLeft />}
            {menuOpen && <IoMdClose />}
        </button>
        {menuOpen && <nav className='fixed top-0 left-0 h-full bg-white z-50 shadow-2xl'>
            <ul className='flex flex-col items-start mt-20 h-full px-7 text-xl gap-10 '>
                <button onClick={()=>handleNavClick('/user/create')} className="cursor-pointer hover:underline">Создать персонажа</button>
                <button onClick={()=>handleNavClick('/')} className="cursor-pointer hover:underline">Главная</button>
            </ul>
        </nav>}
      
    </div>
  )
}

export default NavBar
