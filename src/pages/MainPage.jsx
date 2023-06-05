import React from 'react'
import '../pageStyles/MainPage.css'
import { MainButton } from '../components/mainButton/MainButton';
import MainLogo from '../media/MainLogo.png'
import CloseCross from '../media/CloseCross.png'
import { MainUserInfo } from '../components/MainUserInfo/MainUserInfo';
import { MainPageButtons } from '../components/MainPageButtons/MainPageButtons';
import MyOrders from '../media/MyOrders.png'
import Services from '../media/Services.png'
import Locate from '../media/Locate.png'
import Percent from '../media/percent.png'
import { DiscountCarousel } from '../components/DiscountCarousel/DiscountCarousel';

export const MainPage = () => {
  return (
    <div className='MainPage'>
        <div className='mainBackground'>
            <div className='mainLogo'>
                <img src={MainLogo} />
                <div className='CloseCross'>
                    <img src={CloseCross} width={24} height={24} />
                </div>
            </div>
            <div className='mainPageUser'>
                <MainUserInfo userName="Александр" userNumber="+7 (921) 789-01-23"/>
            </div>
        </div>
        <div className='mainBlock'>
            <DiscountCarousel />
            <div className='mainButtonSet'>
                <MainPageButtons pict={MyOrders} title="Мои записи" goto="/myorders"/>
                <MainPageButtons pict={Services} title="Услуги" goto="/services" />
                <MainPageButtons pict={Locate} title="Адреса моек" goto="/address" />
                <MainPageButtons pict={Percent} title="Скидки" goto="/discounts" />
            </div>
            <MainButton title="Записаться" goto="/auth" />
        </div>
    </div>
  )
}
