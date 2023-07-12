import React from 'react'
import './MainUserInfo.css'
import Avatar from '../../media/UserAvatar.png'

export const MainUserInfo = (userData) => {
  return (
    <div className='MainUserInfo'>
        <img className='userAvatar' src={Avatar}/>
        <div className='userMainInfo'>
            <p>{userData.userName}</p>
            <a>{userData.userNumber}</a>
        </div>
    </div>
  )
}
