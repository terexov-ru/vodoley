import React, { useState } from 'react'
import { Header } from '../components/Header/Header';
import BlueArrowRight from '../media/Arrow_Left_S.png'
import '../pageStyles/RegisterPage.css'
import {NavLink, useLocation, useNavigate} from 'react-router-dom';
import axios from '../utils/axios';
import { QueryClient, useMutation } from 'react-query';
import {useForm} from "react-hook-form";

export const RegisterPage = () => {
    const navigate = useNavigate();
    const [message, setMessage] = useState('')
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const username = queryParams.get('username');
    async function registrationUser(data) {
        await axios.post('auth-register/', data)
            .then((res) => {
                if(res.status === 200) {
                    const token = res.data.token
                    localStorage.setItem('VodoleyToken', token)
                    const mytoken = window.localStorage.getItem('VodoleyToken')
                    if(mytoken !== null) {
                        navigate('/');
                    }
                } else {
                    setMessage(res.message)
                    console.log('error: ', message)
                }
            })
    }
    const{ register, handleSubmit, reset } = useForm()
    const newUser = useMutation(newUserData => registrationUser(newUserData), {
        onSuccess: () => queryClient.invalideteQueries(['profile'])
    })
    const onSave = async (data) => {
        newUser.mutate(data)
        reset()
        console.log(data)
    }
    const queryClient = new QueryClient()

    return (
        <>
            <Header title="Профиль" gobackto="/auth"/>
            <form onSubmit={handleSubmit(onSave)}>
                <p className='registerTitle'>Заполните поля для регистрации</p>
                <div className='RegisterPoint'>
                    <h1 className='formPoint'>Имя</h1>
                    <input
                        type='text'
                        required
                        className='registerInput'
                        placeholder='ФИО'
                        {...register('userName')}
                        name='userName'
                    />
                </div>
                <div className='RegisterPoint'>
                    <h1 className='formPoint'>Номер телефона</h1>
                    <input
                        type='text'
                        required
                        className='registerInput'
                        placeholder='+7-(___)-___-__-__'
                        {...register('userNumber')}
                        name='userNumber'
                    />
                </div>
                <div className='RegisterPoint'>
                    <h1 className='formPoint'>Ник Telegram</h1>
                    <input
                        type='text'
                        required
                        className='registerInput'
                        placeholder='@tg'
                        value={`@${username}`}
                        {...register('userTG')}
                        name='userTG'
                    />
                </div>
                <NavLink className='tgHelpBlock' to='/'>
                    <a className='helpLink' href='/'>Как узнать свой ник в Телеграме?</a>
                    <img className='BlueArrowRight' alt='BlueArrowRight' src={BlueArrowRight} />
                </NavLink>
                <div className='RegisterPoint'>
                    <h1 className='formPoint'>Марка автомобиля</h1>
                    <input
                        type='text'
                        required
                        className='registerInput'
                        placeholder='Марка'
                        {...register('mark')}
                        name='mark'
                    />
                </div>
                <div className='extraPoint'>
                    <div className='RegisterPoint2'>
                        <h1 className='formPoint2'>Модель</h1>
                        <input
                            type='text'
                            required
                            className='registerInput2'
                            placeholder='Модель'
                            {...register('model')}
                            name='model'
                        />
                    </div>
                    <div className='RegisterPoint2'>
                        <h1 className='formPoint2'>Гос. номер</h1>
                        <input
                            type='text'
                            required
                            className='registerInput2'
                            placeholder='Номер'
                            {...register('carNumber')}
                            name='carNumber'
                        />
                    </div>
                </div>
                <div>
                    <input className='submiMainButton' type='submit' value="Зарегистрироваться" />
                </div>
            </form>
        </>
    )
}
   
