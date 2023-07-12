import React from 'react'
import { Header } from '../components/Header/Header';
import '../pageStyles/MyOrdersPage.css'
import CloseCross from '../media/ServiceCloseCross.png'
import { Order } from '../components/Order/Order';
import { PastOrder } from '../components/Order/PastOrder';
import axios from '../utils/axios'
import {useQuery} from 'react-query'


async function getMyOrders() {
        const {data} = await axios.get('get-user-checkouts/')
        return data
}


export const MyOrdersPage = () => {
    
    const{data, isLoading, isError} = useQuery('MyOrders', getMyOrders)
    if(isLoading) {
        return <h1>Идет загрузка...</h1>
    }
    if(isError) {
        return <h1>Ошибка</h1>
    }
    if(!data) {
      return <h1>Нет заказов</h1>
    }

    //скрыть подсказку
    const closeHelp = () => {
      let el = document.getElementById('OrdersHelp')
      el.style.display = (el.style.display === 'none') ? 'block' : 'none'
    }
  
    //переключение разделов
    const handleClick = (e) => {
      let foo = document.querySelectorAll("a");
      for (let i = 0; i < foo.length; i++) {
        foo[i].classList.remove("active");
      }
      e.currentTarget.classList.add("active");
  
      let lists = document.querySelectorAll('[id$="\\OrderList"]')
      console.log(lists)
      for (let j = 0; j < lists.length; j++) {
        if(lists[j].classList.contains('ActiveOrderList')){
          lists[j].classList.remove("ActiveOrderList")
          lists[j].classList.add("HiddenOrderList")
          lists[j+1].classList.remove("HiddenOrderList")
          lists[j+1].classList.add("ActiveOrderList")
          break
        } else if(lists[j].classList.contains('HiddenOrderList')) {
          lists[j].classList.remove("HiddenOrderList")
          lists[j].classList.add("ActiveOrderList")
          lists[j+1].classList.remove("ActiveOrderList")
          lists[j+1].classList.add("HiddenOrderList")
          break
        }
      }
    };


  return (
    <div>
        <Header title="Мои записи" gobackto='/'/>
        <div className='OrdersButtonSet'>
           <a className='active' onClick={handleClick}>Текущие 12</a>
           <a className='' onClick={handleClick}>Прошедшие 12</a>
        </div>
        <div id='OrdersHelp' style={{display: 'block',}}>
          <div className='OrdersHelp' >
            <p>Если вы задерживаетесь на запись, предупредите нас об этом, нажав на кнопку “+15 минут”</p>
            <button className='OrdersCloseCross' onClick={closeHelp}>
              <img src={CloseCross} />
            </button>
          </div>
        </div>
        <div id='currentOrderList' className='ActiveOrderList'>
          <Order data={data} />
        </div>
        <div id='pastOrderList' className='HiddenOrderList'>
          <PastOrder data={data} />
        </div>
    </div>
  )
}
