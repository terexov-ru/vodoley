import React from 'react'
import '../pageStyles/authPage.css'
import {MainButton} from '../components/mainButton/MainButton'
import { Header } from '../components/Header/Header';

export const AuthPage = () => {
  return (
    <>
        <Header title="Профиль" gobackto="/"/>
        <a className='space1'/>
        <MainButton goto="/login" title="Войти" />
        <MainButton goto="/register" title="Зарегистрироваться" />
    </>
  )
}
