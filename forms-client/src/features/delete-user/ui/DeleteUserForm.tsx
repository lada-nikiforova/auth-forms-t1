import { useAppDispatch } from "@/app/provider/store";
import { deleteUserAsync } from "@/entities/user";

interface Props {
    value: string,
}
export const DeleteUserForm: React.FC<Props> = ({value})=> {
    const dispatch = useAppDispatch();
    const handleSubmit = ()=>{
      dispatch(deleteUserAsync(value))
        .unwrap()
        .catch(err => {console.error(err)});
    }
    
  return (
    <button onClick={handleSubmit} className="px-2 py-1 rounded-lg bg-slate-200 cursor-pointer hover:bg-red-300 transition-all duration-300">
        Удалить
    </button>
  )
}

export default DeleteUserForm
