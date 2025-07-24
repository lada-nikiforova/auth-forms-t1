import { useAppSelector } from "@/app/provider/store";
import { Auth } from "@/entities/auth"
import { Loader } from "@/shared/ui";
import { Navigate } from "react-router";


const PageAuth = () => {
  const isAuth = useAppSelector(state => state.auth.isAuth);
  const isLoading = useAppSelector(state => state.auth.isLoading);
  if (isLoading) return <Loader/>;

  if (isAuth) {
    return <Navigate to="/" replace />;
  }
  return (
    <div className="min-h-screen flex items-center justify-center text-slate-800 bg-slate-200">
      <div className="flex flex-col items-center py-11 px-19 rounded-2xl bg-slate-50 shadow-lg shadow-slate-500">
        <p className="text-5xl font-medium mb-10"> Sign up</p>
        <Auth/>
      </div> 
    </div>
  )
}

export default PageAuth
