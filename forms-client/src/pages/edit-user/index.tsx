import { EditUserForm } from "@/features/edit-user"


export const PageEditUser = () => {
  return (
    <div className="flex justify-center">
      <div className="w-[80vw] py-6 px-10 bg-slate-200 rounded-2xl shadow-lg">
        <h2 className="mb-8 text-2xl font-bold text-center">Редактирование пользователя</h2>
        <EditUserForm/>
      </div>
      
    </div>
  )
}

export default PageEditUser
