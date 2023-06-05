import React from 'react'
import '../pageStyles/LoginVerificationPage.css'
import { Header } from '../components/Header/Header';

export const LoginVerificationPage = () => {
  return (
    <>
        <Header title="Профиль" gobackto="/login"/>
        <h1 className='VerifyTitle'>Введите код из сообщения</h1>
        <h2 className='VerifyHelp'>Новый код сможем отправить через 34 сек.</h2>
        <div className='buttonset'>
          <input className='VerifyInput' id='1' placeholder='' />
          <input className='VerifyInput' id='2' placeholder='' />
          <input className='VerifyInput' id='3' placeholder='' />
          <input className='VerifyInput' id='4' placeholder='' />
        </div>
        <button className='VerifyButton'>Прислать новый код</button>
    </>
  )
}
