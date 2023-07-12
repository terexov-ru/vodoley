import React, { useEffect, useState } from 'react'
import '../pageStyles/LoginVerificationPage.css'
import { Header } from '../components/Header/Header';

export const LoginVerificationPage = () => {

  const[seconds, setSeconds] = useState(60)
  useEffect(() => {
    if(seconds > 0) {
      setTimeout(() => setSeconds(seconds -1), 1000)
    } else {
      let disactiveButton = document.getElementById('VerifyButton')
      disactiveButton.classList.remove("disactive")
      let disactiveButtonDiv = document.getElementById("VerifyButtonDiv")
      disactiveButtonDiv.classList.add('disactive')
    }
  })

  return (
    <>
        <Header title="Профиль" gobackto="/login"/>
        <h1 className='VerifyTitle'>Введите код из сообщения</h1>
        <h2 className='VerifyHelp'>Новый код сможем отправить через {seconds} сек.</h2>
        <from>
          <div className='buttonset'>
            <input type="number" required maxLength={1} min="0" max="9" className='VerifyInput' id='1' placeholder='' />
            <input type="number" required maxLength={1} min="0" max="9" className='VerifyInput' id='2' placeholder='' />
            <input type="number" required maxLength={1} min="0" max="9" className='VerifyInput' id='3' placeholder='' />
            <input type="number" required maxLength={1} min="0" max="9" className='VerifyInput' id='4' placeholder='' />
          </div>
          <div>
            <div id='VerifyButtonDiv'>Прислать новый код</div>
            <button id='VerifyButton' className='disactive'>Прислать новый код</button>
          </div>
        </from>
    </>
  )
}
