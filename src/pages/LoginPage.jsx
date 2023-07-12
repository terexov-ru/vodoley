import React from 'react'
import { Header } from '../components/Header/Header';
import { MainButton } from '../components/mainButton/MainButton';
import '../pageStyles/LoginPage.css'
import { NavLink } from 'react-router-dom';


export const LoginPage = () => {

  const loginUserName = () => {
    console.log('send')
  }
  //const loginUserNam = async (username) => {
  //  try {
  //    const { data } = await axios.post('url', {username}) 
  //    // если в запросе есть токен то записывает его в сторадж  
  //    if(data.token) {
  //      window.localStorage.setItem('token', data.token)
  //    }
  //    return data
  //  } catch (error) {
  //    console.log(error)
  //  }
  //}

  return (
    <>
        <Header title="Профиль" gobackto="/auth"/>
        <h1 className='LoginTitle'>Введите номер телефона или ник из Telegram</h1>
        <input required className='LoginInput' placeholder='Телефон/ник tg' />
        <div>
          <input className='verifyButtonSubmit' type='submit' onClick={loginUserName} title="Продолжить" goto="/login/verify" />
          <NavLink to='/login/verify' />
        </div>
        
    </>
  )
}
