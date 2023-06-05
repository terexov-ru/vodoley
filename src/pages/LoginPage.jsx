import React from 'react'
import { Header } from '../components/Header/Header';
import { MainButton } from '../components/mainButton/MainButton';
import '../pageStyles/LoginPage.css'


export const LoginPage = () => {
  return (
    <>
        <Header title="Профиль" gobackto="/auth"/>
        <h1 className='LoginTitle'>Введите номер телефона или ник из Telegram</h1>
        <input className='LoginInput' placeholder='Телефон/ник tg' />
        <MainButton title="Продолжить" goto="/login/verify" />
    </>
  )
}
