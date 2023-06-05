import React from 'react'
import { Header } from '../components/Header/Header';
import {NavLink} from 'react-router-dom'
import {TipsCheck} from '../components/TipsCheck/TipsCheck'
import {MainButton} from '../components/mainButton/MainButton'
import '../pageStyles/MyOrdersPage.css'

export const MyOrdersPage = () => {
  return (
    <div>
        <Header title="Мои записи" gobackto="/"/>
        <div className='mover'>
            <NavLink id='mover' to='/myorders'>Текущие 12</NavLink>
            <NavLink id='mover' to='/myorder/past'>Прошедше 12</NavLink>
        </div>
        <div className='card'>
          <TipsCheck comfirmation='0' address="Санкт-Петербург, Кондратьевский пр-т, 31" times="15 апреля, 15:00" title="Тех. мойка без сушки" sum="400 ₽">
            <div className='orderStatus'>Ожидается</div>
            <div className='changeOrderData'><NavLink>Перенести</NavLink></div>
          </TipsCheck>
        </div>
        <div className='MyOrdersButtonSet'>
          <button>Поменять способ оплаты</button>
          <button>Отменить</button>
        </div>
        <MainButton goto="/" title="Записаться" />
    </div>
  )
}
