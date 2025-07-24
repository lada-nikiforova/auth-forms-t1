import {Outlet, useLocation } from "react-router";
import NavBar from "./NavBar";
import { LogoutForm } from "@/features/logout";

export const MainLayout = () => {
    const location = useLocation();
    if (location.pathname === './login'){
        return <Outlet/>
    }
    
  return (
    <div className="min-h-screen font-montserrat flex flex-col  text-slate-800">
      <header className="flex items-center bg-slate-200 p-5 shadow justify-between">
        <NavBar/>
        <LogoutForm/>
      </header>

        <main className="flex-1 p-8 bg-white w-full">
          <Outlet />
        </main>
    </div>
  )
}

export default MainLayout
