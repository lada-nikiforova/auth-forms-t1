import { Link, useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/provider/store";
import { useForm } from "react-hook-form";
import { updateUserAsync, type UserPatchDto } from "@/entities/user";
import { InputForm } from "@/shared/ui";

export const EditUserForm = () => {
    const param  = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const user = useAppSelector((state) =>
        state.users.users.find((u) => u.id === param.id)
    );
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        reset,
        formState: { errors },
    } = useForm<UserPatchDto>()

    useEffect(() => {
        if (user) {
          reset({
            name: user.name,
            surName: user.surName,
            fullName: user.fullName,
            birthDate: user.birthDate,
            telephone: user.telephone,
            employment: user.employment,
            userAgreement: user.userAgreement,
          });
        }
    }, [user, reset]);

    const name = watch('name');
    const surName = watch('surName');
    const [error, setError] = useState<string|null>(null)

    useEffect(() => {
        setValue('fullName', `${name} ${surName}`);
    }, [name, surName, setValue]);


    const onSubmit = (data: UserPatchDto) => {
        if (!data.birthDate) delete data.birthDate;
        if (!data.telephone) delete data.telephone;
        const payload = {
            ...data,
            id: param.id!  
          };
        dispatch(updateUserAsync(payload))
            .unwrap()
            .then(() => navigate('/'))
            .catch(err => {console.error(err); 
                if (err?.message) {
                    if (Array.isArray(err.message)) {
                        setError(err.message.join(', '));
                    } else {
                        setError(err.message);
                    }
                } else {
                    setError('Что-то пошло не так. Попробуйте ещё раз.');
                }});
    };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col w-full items-center gap-5 text-lg'>
        <div className="flex flex-col md:flex-row w-full gap-9">
            <div className="w-full">
                <InputForm label="Имя *" {...register("name", { required: true, maxLength: 64})}/>
                {errors.name?.type === "required" && (
                    <p className="text-red-700" role="alert">Имя обязательно</p>
                )}
            </div>
            <div className="w-full">
                <InputForm label="Фамилия *" {...register("surName", { required: true, maxLength: 64})}/>
                {errors.surName?.type === "required" && (
                    <p className="text-red-700" role="alert">Фамилия обязательна</p>
                )}
            </div>
        </div>
        <InputForm label="Полное имя *" {...register("fullName", { required: true, maxLength: 130})}/>
        <div className="flex flex-col md:flex-row w-full gap-9">
            <InputForm type="date" label="День рождения"  {...register("birthDate", {  maxLength: 64 })}/>
            <div className="w-full">
                <InputForm label="Телефон" type="tel" {...register("telephone", { maxLength: 64, pattern: {
                    value: /^\+?[0-9]{10,15}$/,
                    message: 'Введите корректный номер телефона'
                }})}/>
                {errors.telephone?.type === "pattern" && (
                    <p className="text-red-700" role="alert">{errors.telephone.message}</p>
                )}
            </div>
        </div>
        
        <div className="flex flex-col w-full mb-4">
            <label className="font-medium">Должность</label>
            <select  className="cursor-pointer outline-none border-b border-slate-700 p-2"
            {...register("employment")}>
                <option value="" selected disabled hidden>Выберите из списка</option>
                <option value="dev">Разработчик</option>
                <option value="test">Тестировщик</option>
                <option value="analyst">Аналитик</option>
            </select>
        </div>
        <div className="flex items-center mb-4">
            <input className="cursor-pointer h-6 w-6 mr-4" type="checkbox" {...register('userAgreement')}/>
            <label className="font-medium">Согласие пользователя</label>
        </div>
        {error && (
            <p className="text-red-700" role="alert">{error}</p>
        )}
        <button onClick={()=>handleSubmit(onSubmit)} className="bg-slate-400 w-full text-slate-50 cursor-pointer rounded-2xl shadow-md font-medium text-xl py-3">Сохранить изменения</button>
        <Link className="font-medium" to={'/'}>Отменить</Link>
        
    </form>
  )
}

export default EditUserForm
