import React from 'react'
import './MainUserInfo.css'
import Avatar from '../../media/UserAvatar.png'

export const MainUserInfo = (props) => {
  return (
    <div className='MainUserInfo'>
        <img className='userAvatar' src={props.userPhoto || Avatar}/>
        <div className='userMainInfo'>
            <p>{props.userName}</p>
            <a>{props.userNumber}</a>
        </div>
    </div>
  )
}
