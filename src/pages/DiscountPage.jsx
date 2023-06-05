import React from 'react'
import { Header } from '../components/Header/Header';
import '../pageStyles/DiscountPage.css'
import { NavLink } from 'react-router-dom';
import { Discount } from '../components/Discount/Discount';

export const DiscountPage = () => {
  return (
    <div className='DiscountPage'>
        <Header title="Скидки" gobackto="/"/>
        <div className='AdBanner'>
            <h1 className='AdTitle'>2 посещения для получения скидки 15% на “Мойка Люкс”</h1>
            <p className='AdArticle'>Пользуйся нашими услугами и копи скидки для следующих посещений</p>
            <NavLink className='AdLink' to='/info'>О системе лояльности</NavLink>
        </div>
        <h1 className='DiscountListTitle'>Мои скидки</h1>
        <div className='DiscountList'>
            <Discount title="Мойка Люкс (обезжирка)" options="Еще 2 раза до скидки 15%" />
            <Discount title="Мойка Люкс (обезжирка)" options="Еще 2 раза до скидки 15%" />
        </div>
    </div>
  )
}
