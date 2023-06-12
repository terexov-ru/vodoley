import React from 'react'
import '../pageStyles/MainPage.css'
import { MainButton } from '../components/mainButton/MainButton';
import MainLogo from '../media/MainLogo.png'
import CloseCross from '../media/CloseCross.png'
import { MainUserInfo } from '../components/MainUserInfo/MainUserInfo';
import { MainPageButtons } from '../components/MainPageButtons/MainPageButtons';
import MyOrders from '../media/Edit_Line.png'
import Services from '../media/Tag.png'
import Locate from '../media/Locate.png'
import Percent from '../media/percent.png'
import { DiscountCarousel } from '../components/DiscountCarousel/DiscountCarousel';
import { NavLink } from 'react-router-dom';

export const MainPage = () => {
  return (
    <div className='MainPage'>
        <div className='mainBackground'>
            <div className='mainLogo'>
                <img src={MainLogo} />
                <div className='CloseCross'>
                    <img src={CloseCross} />
                </div>
            </div>
            <NavLink to='/profile' className='mainPageUser'>
                <MainUserInfo userName="Александр" userNumber="+7 (921) 789-01-23"/>
            </NavLink>
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
