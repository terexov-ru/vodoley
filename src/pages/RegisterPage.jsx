import React, { useState } from 'react'
import { Header } from '../components/Header/Header';
import BlueArrowRight from '../media/Arrow_Left_S.png'
import '../pageStyles/RegisterPage.css'
import { NavLink, Navigate, useNavigate } from 'react-router-dom';
import axios from '../utils/axios';
import { QueryClient, useMutation } from 'react-query';




async function registrationUser(data) {
    await axios.post('auth-register/', data)
    .than((res) => {
        if(res.token) {
            const token = res.token
            localStorage.setItem('token', token)
            navigateToMain('/')
        } else {
            return <h1>{res.message}</h1>
        }
    })
}

export const RegisterPage = () => {
    const queryClient = new QueryClient()

    //изменение переметров
    const[userName, setUserName] = useState('')
    const[userNumber, setUserNumber] = useState('')
    const[userTG, setUserTG] = useState('')
    const[carNumber, setCarNumber] = useState('')
    const[userCar, setUserCar] = useState('')
    const[userCarModel, setUserCarModel] = useState('')

    let navigateToMain = useNavigate()

    const newUser = useMutation(newData => registrationUser(newData), {
        onSuccess: () => queryClient.invalideteQueries(['profile']) 
    })

    let newUserData = new Object()
    newUserData.userName = userName;
    newUserData.userNumber = userNumber;
    newUserData.userTG = userTG;
    newUserData.carNumber = carNumber;
    newUserData.userCar = userCar + ' ' + userCarModel;

    const registerUser = async () => {
        if((newUserData.userName !== '') && (newUserData.userNumber !== '') && (newUserData.userTG !== '') && (newUserData.carNumber !== '') && (newUserData.userCar !== '')) {
            newUser.mutate(newUserData)
        }
    }
        
    if(localStorage.getItem('token') !== null) {
        return(navigateToMain('/'))
    } else {
        return (
            <>
                <Header title="Профиль" gobackto="/auth"/>
                <form>
                    <p className='registerTitle'>Заполните поля для регистрации</p>
                    <div className='RegisterPoint'>
                        <h1 className='formPoint'>Имя</h1>
                        <input 
                            type='text'
                            required
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}  
                            className='registerInput' 
                            placeholder='ФИО' />
                    </div>
                    <div className='RegisterPoint'>
                        <h1 className='formPoint'>Номер телефона</h1>
                        <input 
                            type='text'
                            required
                            value={userNumber}
                            onChange={(e) => setUserNumber(e.target.value)}  
                            className='registerInput' 
                            placeholder='+7-(___)-___-__-__' />
                    </div>
                    <div className='RegisterPoint'>
                        <h1 className='formPoint'>Ник Telegram</h1>
                        <input 
                            type='text'
                            required
                            value={userTG}
                            onChange={(e) => setUserTG(e.target.value)}  
                            className='registerInput' 
                            placeholder='@tg' />
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
                            value={userCar}
                            onChange={(e) => setUserCar(e.target.value)}  
                            className='registerInput' 
                            placeholder='Марка' />
                    </div>
                    <div className='extraPoint'>
                        <div className='RegisterPoint2'>
                            <h1 className='formPoint2'>Модель</h1>
                            <input 
                                type='text'
                                required
                                value={userCarModel}
                                onChange={(e) => setUserCarModel(e.target.value)}  
                                className='registerInput2' 
                                placeholder='Модель' />
                        </div>
                        <div className='RegisterPoint2'>
                            <h1 className='formPoint2'>Гос. номер</h1>
                            <input 
                                type='text'
                                required
                                value={carNumber}
                                onChange={(e) => setCarNumber(e.target.value)}  
                                className='registerInput2' 
                                placeholder='Номер' />
                        </div>
                    </div>    
                    <div>
                        <input className='submiMainButton' type='submit' value="Зарегистрироваться" onClick={registerUser} />
                    </div>
            </form>
        </>
        ) 
    }
}
   
