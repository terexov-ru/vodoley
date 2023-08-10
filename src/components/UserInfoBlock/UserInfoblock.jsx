import React from 'react'
import './UserInfoblock.css'

export const UserInfoblock = (props) => {
    return (
        <div className='Data'>
            <h1 className='DataTitle'>Личные данные</h1>
            <p className='PersonName'><strong>{props.userName}</strong></p>
            <div className='PersonInfo'>
                <p className='PersonInfoTitle'>мобильный</p>
                <p className='PersonInfoData'>{props.userNumber}</p>
            </div>
            <div className='PersonInfo'>
                <p className='PersonInfoTitle'>имя Telegram</p>
                <p className='PersonInfoData'>{props.userTG}</p>
            </div>
        </div>
    )
}
