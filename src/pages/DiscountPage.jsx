import React from 'react'
import { Header } from '../components/Header/Header';
import '../pageStyles/DiscountPage.css'
import { NavLink } from 'react-router-dom';
import { Discount } from '../components/Discount/Discount';
import axios from '../utils/axios'
import { useQuery } from 'react-query';

async function getAllDiscounts() {
  const {data} = await axios.get('get-user-discounts/')
  return data
}

export const DiscountPage = () => {

  const{data, isLoading, isError} = useQuery('discounts', getAllDiscounts)
  if(isLoading) {
    return <h1>Идет загрузка...</h1>
  }

  if(isError) {
    return <h1>error</h1>
  }

  if(!data) {
    return <h1>no data</h1>
  }



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
          {data.forEach((discounts) => (
            <Discount discounts={discounts} />
          ))}
        </div>
    </div>
  )
}
