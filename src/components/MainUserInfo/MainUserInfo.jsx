import React from 'react'
import './MainUserInfo.css'
import Avatar from '../../media/userAvatar.png'

export const MainUserInfo = (props) => {
  return (
    <div className='MainUserInfo'>
        <img src={props.userPhoto || Avatar}/>
        <div className='userMainInfo'>
            <p>{props.userName}</p>
            <p>{props.userNumber}</p>
        </div>
    </div>
  )
}
