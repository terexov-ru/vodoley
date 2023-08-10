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
import { NavLink, Navigate } from 'react-router-dom';
import axios from '../utils/axios'
import {useQuery} from 'react-query'

async function getMain() {
    const {data} = await axios.get('get-main-page/')
    //const {data} = await axios.get('')
    return data
}
// discounts

export const MainPage = () => {

    const{data, isLoading, isError} = useQuery('Main', getMain)
    if(isLoading) {
        return <h1>Идет загрузка...</h1>
    }
    if(isError) {
        return <h1>Ошибка</h1>
    }


    const logout = () => {
        localStorage.removeItem('token')
    }

    return (
        <div className='MainPage'>
            <div className='mainBackground'>
                <div className='mainLogo'>
                    <img src={MainLogo} height={36} />
                    <NavLink to='/auth' className='CloseCross'>
                        <img onClick={logout} src={CloseCross} />
                    </NavLink>
                </div>
                <NavLink to='/profile' className='mainPageUser'>
                    <MainUserInfo userName={data.user.userName} userNumber={data.user.userNumber} />
                </NavLink>
            </div>
            <div className='mainBlock'>
                <DiscountCarousel discount={data.discounts.discounts} />
                <div className='mainButtonSet'>
                    <MainPageButtons pict={MyOrders} title="Мои записи" goto="/myorders"/>
                    <MainPageButtons id="servicesMainButton" pict={Services} title="Услуги" goto="/services" />
                    <MainPageButtons pict={Locate} title="Адреса моек" goto="/address" />
                    <MainPageButtons id="discountsMainButton" pict={Percent} title="Скидки" goto="/discounts"  />
                </div>
                <MainButton title="Записаться" goto="/makeorder" />
            </div>
        </div>
    )
}
