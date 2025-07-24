import { useForm } from 'react-hook-form';
import { login, type LoginDto } from '../model';
import { useNavigate } from 'react-router';
import { useAppDispatch } from '@/app/provider/store';

export const Auth = () => {
    const { register, handleSubmit} = useForm<LoginDto>();
    const dispatch = useAppDispatch();
    const navigate = useNavigate(); 
    
    const onSubmit = (data: LoginDto) => {
        dispatch(login(data))
            .unwrap()
            .then(() => navigate('/'))
            .catch(err => console.error(err));
    };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col items-center gap-6 text-lg '>
        <div className='flex flex-col'>
            <label className='font-medium' htmlFor='login'>Логин</label>
            <input 
            placeholder='email'
            type='email'
            id='login' 
            {...register('email', {required: 'Email обязателен'})}
            className='border-b w-50 md:w-70 border-slate-700 px-2 py-1 outline-none' />
        </div>
        <div className='flex flex-col mb-5 '>
            <label className='font-medium' htmlFor='password'>Пароль</label>
            <input 
            placeholder='password'
            type='password'
            id='password' 
            {...register('password', {required: 'Пароль обязателен'})}
            className='border-b w-50 md:w-70  border-slate-700  px-2 py-1 outline-none' />
        </div>
        <button onClick={()=>handleSubmit(onSubmit)} className="bg-slate-400 cursor-pointer rounded-lg shadow-lg font-medium text-slate-100 text-2xl w-full px-6 py-3">Войти</button>
    </form>

  )
}

export default Auth
