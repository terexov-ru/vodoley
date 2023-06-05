import React from 'react'
import {MainButton} from '../components/mainButton/MainButton'
import { Header } from '../components/Header/Header';
import '../pageStyles/RegisterPage.css'

export const RegisterPage = () => {
  return (
    <>
        <Header title="Профиль" gobackto="/auth"/>
        <p className='registerTitle'>Заполните поля для регистрации</p>
        <div className='RegisterPoint'>
            <h1 className='formPoint'>Имя</h1>
            <input className='registerInput' placeholder='ФИО'></input>
        </div>
        <div className='RegisterPoint'>
            <h1 className='formPoint'>Номер телефона</h1>
            <input className='registerInput' placeholder='+7-(___)-___-__-__'></input>
        </div>
        <div className='RegisterPoint'>
            <h1 className='formPoint'>Ник Telegram</h1>
            <input className='registerInput' placeholder='@tg'></input>
        </div>
        <a className='helpLink' href='/'>Как узнать свой ник в Телеграме?</a>
        <div className='RegisterPoint'>
            <h1 className='formPoint'>Марка автомобиля</h1>
            <input className='registerInput' placeholder='Марка'></input>
        </div>
        <div className='extraPoint'>
            <div className='RegisterPoint2'>
                <h1 className='formPoint2'>Модель</h1>
                <input className='registerInput2' placeholder='Модель'></input>
            </div>
            <div className='RegisterPoint2'>
                <h1 className='formPoint2'>Гос. номер</h1>
                <input className='registerInput2' placeholder='Номер'></input>
            </div>
        </div>
        <MainButton goto="/" title="Зарегистрироваться" />
    </>
  )
}
