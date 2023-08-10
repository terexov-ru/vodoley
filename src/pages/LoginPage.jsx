import React, {useState} from 'react'
import { Header } from '../components/Header/Header';
import { MainButton } from '../components/mainButton/MainButton';
import '../pageStyles/LoginPage.css'
import {Navigate, NavLink, useNavigate} from 'react-router-dom';
import axios from "../utils/axios";
import {QueryClient, useMutation} from "react-query";
import {useForm} from "react-hook-form";

export const LoginPage = () => {
    const{ register, handleSubmit, reset } = useForm()
    const navigate = useNavigate();
    const loginUserName = async (username) => {
      try {
        const { data } = await axios.post('auth-login/', username)
        // если в запросе есть токен то записывает его в сторадж
        if(data.token) {
            const token = data.token
            window.localStorage.setItem('VodoleyToken', token)
            const mytoken = window.localStorage.getItem('VodoleyToken')
            if(mytoken !== null) {
                navigate('/');
            }
        }
        if(data.status === 200) {
            const token = data.token
            window.localStorage.setItem('VodoleyToken', token)
            const mytoken = window.localStorage.getItem('VodoleyToken')
            if(mytoken !== null) {
                navigate('/');
            }
        }
      } catch (error) {
        console.log(error)
      }
    }

    const queryClient = new QueryClient()
    const user = useMutation(user => loginUserName(user), {
        onSuccess: () => queryClient.invalideteQueries(['user'])
    })
    const onSave = async (data) => {
        user.mutate(data)
        reset()
        console.log(data)
    }


    return (
        <>
            <Header title="Профиль" gobackto="/auth"/>
            <form onSubmit={handleSubmit(onSave)}>
                <h1 className='LoginTitle'>Введите номер телефона или ник из Telegram</h1>
                <input
                    type='text'
                    required
                    className='LoginInput'
                    placeholder='Телефон/ник tg'
                    {...register('username')}
                />
                <div>
                    <input className='verifyButtonSubmit' type='submit' title="Продолжить" />
                </div>
            </form>
        </>
    )
}
