import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/app/provider/store";
import { useForm } from "react-hook-form";
import { createUserAsync, type UserCreateDto } from "@/entities/user";
import { InputForm } from "@/shared/ui";


export const NewUserForm = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    
    type FormData = UserCreateDto & {
        confirmPassword: string;
    };
      
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<FormData>()

    const name = watch('name');
    const surName = watch('surName');
    const [error, setError] = useState<string>('')

    useEffect(() => {
        setValue('fullName', `${name} ${surName}`);
    }, [name, surName, setValue]);


    const onSubmit = (data: FormData) => {
        const { confirmPassword, ...payload } = data;
        if (!payload.birthDate) delete payload.birthDate;
        if (!payload.telephone) delete payload.telephone;
        if (!payload.employment) delete payload.employment;
        dispatch(createUserAsync(payload))
            .unwrap()
            .then(() => navigate('/'))
            .catch(err => {console.error(err); setError(err)});
    };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col w-full items-center gap-5 text-lg'>
        <div className="flex flex-col md:flex-row w-full gap-9">
            <div className="w-full">
                <InputForm placeholder='Ваше имя' label="Имя *" {...register("name", { required: true, maxLength: 64})}/>
                {errors.name?.type === "required" && (
                    <p className="text-red-700" role="alert">Имя обязательно</p>
                )}
            </div>
            <div className="w-full">
                <InputForm placeholder='Ваша фамилия' label="Фамилия *" {...register("surName", { required: true, maxLength: 64})}/>
                {errors.surName?.type === "required" && (
                    <p className="text-red-700" role="alert">Фамилия обязательна</p>
                )}
            </div>
        </div>
        <InputForm placeholder='Адрес электронной почты' label="Email *" type='email' {...register('email', {required: true, pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Введите корректный email'
        }})}/>
        {errors.email?.type === "required" && (
            <p className="text-red-700" role="alert">Email обязательный</p>
        )}
        {errors.email?.type === "pattern" && (
            <p className="text-red-700" role="alert">{errors.email.message}</p>
        )}
        <InputForm placeholder="Заполняется автоматически, но можно изменить" label="Полное имя *" {...register("fullName", { required: true, maxLength: 130})}/>
        <div className="flex flex-col md:flex-row w-full gap-9">
            <div className="w-full">
            <InputForm placeholder="Придумайте пароль" label="Пароль *" type="password" {...register("password", { required: true})} />
            {errors.password?.type === "required" && (
                <p className="text-red-700" role="alert">Пароль обязательный</p>
            )}
            </div>
        
            <div className="w-full">
                <InputForm placeholder="Подтвердите пароль" label="Подтверждение пароля *" type="password" {...register("confirmPassword", { required: true, validate: (value)=>value === watch('password') || "Пароли не совпадают",})} />
                {errors.confirmPassword && (
                    <p className="text-red-700" role="alert" >{errors.confirmPassword.message}</p>
                )}
            </div>
        </div>

        <div className="flex flex-col md:flex-row w-full gap-9">
        <InputForm type="date" label="День рождения"  {...register("birthDate", {  maxLength: 64})}/>
        <div className="w-full">
            <InputForm placeholder="+79876543210" label="Телефон" type="tel" {...register("telephone", { maxLength: 64, pattern: {
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
        <button onClick={()=>handleSubmit(onSubmit)} className="bg-slate-400 w-full text-slate-50 cursor-pointer rounded-2xl shadow-md font-medium text-xl px-6 py-3">Создать пользователя</button>
        <Link className="font-medium" to={'/'}>Отменить</Link>
        
    </form>
  )
}

export default NewUserForm
