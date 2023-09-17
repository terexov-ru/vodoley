import React, {useEffect, useState} from 'react'
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
import {NavLink, Navigate, useLocation, useNavigate} from 'react-router-dom';
import axios from '../utils/axios'
import {useQuery} from 'react-query'

async function getMain() {
    const {data} = await axios.get('get-main-page/')
    return data
}

export const MainPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');
    const [redirected, setRedirected] = useState(false);

    const{data, isLoading, isError} = useQuery('Main', getMain)

    useEffect(() => {
        if (!redirected) {
            const storedToken = window.localStorage.getItem('VodoleyToken');
            if (token) {
                if (token === storedToken) {
                } else if (token !== storedToken) {
                    window.localStorage.setItem('VodoleyToken', token);
                    window.location.reload();
                }
            } else {
                // Do nothing
            }
            setRedirected(true);
        }
    }, [navigate]);


    if(isLoading) {
        return <h1>Идет загрузка...</h1>
    }
    if(isError) {
        return <h1>Ошибка</h1>
    }


    const logout = () => {
        localStorage.removeItem('VodoleyToken')
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
                    <MainUserInfo userName={data.userName} userNumber={data.userNumber} />
                </NavLink>
            </div>
            <div className='mainBlock'>
                {data.discountsList.length > 0 && <DiscountCarousel showDiscount={true} discount={data.discountsList} />}
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
