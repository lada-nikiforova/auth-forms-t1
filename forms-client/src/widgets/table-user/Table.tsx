import { useAppDispatch, useAppSelector } from "@/app/provider/store";
import { fetchUsers } from "@/entities/user";
import { DeleteUserForm } from "@/features/delete-user";
import { useEffect } from "react";
import { Link } from "react-router";

export const Table = () => {
    const dispatch = useAppDispatch();
    const users = useAppSelector((state) => state.users.users);
    
    useEffect(()=>{
        dispatch(fetchUsers())
    }, [dispatch])
  return (
    <div className="overflow-x-auto shadow-lg">
        <table className="min-w-[800px] rounded-xl text-left table-auto text-lg ">
            <thead>
                <tr>
                    <th className="p-4 border-b border-slate-400 bg-slate-100 text-slate-600">id</th>
                    <th className="p-4 border-b border-slate-400 bg-slate-100 text-slate-600">email</th>
                    <th className="p-4 border-b border-slate-400 bg-slate-100 text-slate-600">full name</th>
                    <th className="p-4 border-b border-slate-400 bg-slate-100 text-slate-600"></th>
                    <th className="p-4 border-b border-slate-400 bg-slate-100 text-slate-600"></th>
                </tr>
            </thead>
            <tbody>
                {users.map((user)=>(
                    <tr key={user.id} className="text-slate-800">
                        <td className="p-4 border-b border-slate-300">{user.id}</td>
                        <td className="p-4 border-b border-slate-300">{user.email}</td>
                        <td className="p-4 border-b border-slate-300">{user.fullName}</td>
                        <td className="p-4 border-b border-slate-300"><Link to={`user/${user.id}`} className="px-2 py-1 rounded-lg bg-slate-200 inline-block hover:bg-slate-300 transition-all duration-300">Ред.</Link></td>
                        <td className="p-4 border-b border-slate-300"><DeleteUserForm value={user.id}/></td>
                    </tr>
                    ))}
            </tbody>

        </table>

    </div>
  )
}

export default Table
