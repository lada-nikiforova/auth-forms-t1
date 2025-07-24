import { NewUserForm } from "@/features/new-user"

export const PageNewUser = () => {
  return (
    <div className="flex justify-center ">
      <div className="w-[80vw] py-6 px-10 bg-slate-200 rounded-2xl shadow-lg">
        <h2 className="mb-8 text-2xl font-bold text-center">Создание пользователя</h2>
        <NewUserForm/>
      </div>
    </div>
  )
}

export default PageNewUser
