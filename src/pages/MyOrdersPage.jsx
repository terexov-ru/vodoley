import React, {useState} from 'react'
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
    const [selectedOrderType, setSelectedOrderType] = useState('current');
    const [orderDetailsVisible, setOrderDetailsVisible] = useState(false);

    if(isLoading) {
        return <h1>Идет загрузка...</h1>
    }
    if(isError) {
        return <h1>Ошибка</h1>
    }
    if(!data) {
        return <h1>Нет заказов</h1>
    }
    // if(data.length === 0) {
    //     return (
    //         <div>
    //             <Header title="Мои записи" gobackto='/'/>
    //             <h1>Нет заказов</h1>
    //         </div>
    //     )
    // }

    //скрыть подсказку
    const closeHelp = () => {
        let el = document.getElementById('OrdersHelp')
        el.style.display = (el.style.display === 'none') ? 'block' : 'none'
    }

    const handleClick = (type) => {
        setSelectedOrderType(type);
    };

    const toggleOrderDetails = () => {
        setOrderDetailsVisible(!orderDetailsVisible);
    };

    const currentOrderCount = data.filter(order => order.status === 'current').length;
    const pastOrderCount = data.filter(order => order.status === 'past').length;


    return (
        <div>
            <Header title="Мои записи" gobackto='/'/>
            <div className='OrdersButtonSet'>
                <a
                    className={selectedOrderType === 'current' ? 'active' : ''}
                    onClick={() => handleClick('current')}
                >
                    Текущие {currentOrderCount}
                </a>
                <a
                    className={selectedOrderType === 'past' ? 'active' : ''}
                    onClick={() => handleClick('past')}
                >
                    Прошедшие {pastOrderCount}
                </a>
            </div>
            <div id='currentOrderList' className={selectedOrderType === 'current' ? 'ActiveOrderList' : 'HiddenOrderList'}>
                <Order data={data} showDetails={orderDetailsVisible} toggleDetails={toggleOrderDetails} />
            </div>
            <div id='pastOrderList' className={selectedOrderType === 'past' ? 'ActiveOrderList' : 'HiddenOrderList'}>
                <PastOrder data={data} showDetails={orderDetailsVisible} toggleDetails={toggleOrderDetails} />
            </div>
        </div>
    )
}
