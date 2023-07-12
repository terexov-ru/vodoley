import React from 'react'
import '../pageStyles/OrderPage.css'
import { Header } from '../components/Header/Header'

export const OrderPage = () => {
  return (
    <>
        <Header gobackto='/' title='Записаться'/>
        <form className='OrderPage'>
            <h1 className='OrderFormTitle'>Адрес</h1>
            <select value='' onChange=''>
                <option>Выберите адрес</option>
                <option>2</option>
                <option>3</option>
            </select>
            <button>Выбрать на карте</button>
            <h1 className='OrderFormTitle'>Услуги</h1>
            <div></div>
            <button>Перейти в каталог</button>
            <h1 className='OrderFormTitle'>Дата и время</h1>
            <div>
                <input type='date' />
                <input type="time" value='15:00' />
            </div>
            <h1 className='OrderFormTitle'>Скидки</h1>
            <div></div>
            <p id='discountNotification'>Скидок пока нет</p>
            <div></div>
            <h1 className='OrderFormTitle'>Способ оплаты</h1>
            <div>
                <select value='' onChange=''>
                    <option>Онлайн со скидкой 5%</option>
                    <option>Оплатить позже онлайн или при посещении</option>
                </select>
            </div>
            <p id='paymentNotification'>При неявке по записи оплата не возвращается</p>
            <div>
                <table></table>
            </div>
            <input type='submit' />
        </form>
    </>
    
  )
}
