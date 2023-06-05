import React from 'react'
import { Header } from '../components/Header/Header';
import '../pageStyles/TipsPage.css'
import {TipsCheck} from '../components/TipsCheck/TipsCheck'
import {MainButton} from '../components/mainButton/MainButton'

export const TipsPage = () => {
  return (
    <div className='TipsPage'>
        <Header title="Чаевые"/>
        <TipsCheck address="Санкт-Петербург, Кондратьевский пр-т, 31" times="15 апреля, 15:00" title="Тех. мойка без сушки" sum="400 ₽" />
        <h1 className='tipsAmount'>Размер чаевых</h1>
        <div className='tipsButtonset'>
            <a className='activeTip'>5%</a>
            <a>10%</a>
            <a>15%</a>
            <a>20%</a>
        </div>
        <h1 className='anotherSumTitle'>Своя сумма:</h1>
        <input className='SumInput'></input>
        <div className='finalSum'>
            <a>Сумма</a>
            <a>210 ₽</a>
        </div>
        <MainButton goto="/pay" title="Оплатить" />
    </div>
  )
}
