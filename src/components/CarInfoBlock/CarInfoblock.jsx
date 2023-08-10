import React from 'react'
import "./CarInfoblock.css"

export const CarInfoblock = (props) => {
    let Registration = ""
    if(props.comfirm === '0') {
        Registration = "Регистрация не подтверждена"
    } else {
        Registration = "Регистрация подтверждена"
    }
    return (
        <div className='Data'>
            <h1 className='DataTitle'>Данные автомобиля</h1>
            <div className='CarInfo'>
                <p className='CarInfoTitle'>марка и модель</p>
                <p className='CarInfoData'>{props.mark} {props.model}</p>
            </div>
            <div className='CarInfo'>
                <p className='CarInfoTitle'>номер</p>
                <p className='CarInfoData'>{props.carNumber}</p>
            </div>
            <div className='CarConfirm'>{Registration}</div>
        </div>
    )

}
