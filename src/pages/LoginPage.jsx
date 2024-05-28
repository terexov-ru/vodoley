import React from 'react'
import { Header } from '../components/Header/Header';
import '../pageStyles/LoginPage.css'
import {useLocation, useNavigate} from 'react-router-dom';
import axios from "../utils/axios";
import {QueryClient, useMutation} from "react-query";
import {useForm} from "react-hook-form";

//Telegram WebApp Get User
const search = window.Telegram.WebApp.initData
const urlParams = new URLSearchParams(search);
const userParam = urlParams.get('user');
const decodedUserParam = decodeURIComponent(userParam);
const userObject = JSON.parse(decodedUserParam);
const userTG = userObject.username;

export const LoginPage = (props) => {
    const{ register, handleSubmit, reset } = useForm()
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const userTG = queryParams.get('username');

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
                    navigate('/main');
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    const queryClient = new QueryClient()
    const user = useMutation(user => loginUserName(user), {
        onSuccess: () => queryClient.invalideteQueries(['login'])
    } )
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
                    value={`@${userTG}`}
                    {...register('username')}
                />
                <div>
                    <input className='verifyButtonSubmit' type='submit' value="Продолжить" />
                </div>
            </form>
        </>
    )
}
