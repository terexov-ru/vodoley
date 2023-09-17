import React, {useState} from 'react'
import { Header } from '../components/Header/Header';
import '../pageStyles/MyOrdersPage.css'
import CloseCross from '../media/ServiceCloseCross.png'
import { Order } from '../components/Order/Order';
import { PastOrder } from '../components/Order/PastOrder';
import axios from '../utils/axios'
import {useQuery} from 'react-query'
import {MainButton} from "../components/mainButton/MainButton";


async function getMyOrders() {
    const {data} = await axios.get('get-user-checkouts/')
    return data
}


export const MyOrdersPage = () => {

    const {data, isLoading, isError} = useQuery('MyOrders', getMyOrders)
    const [selectedOrderType, setSelectedOrderType] = useState('current');
    const [orderDetailsVisibleId, setOrderDetailsVisibleId] = useState(null);

    const calculateTotalPrice = (servicesList, paymentMethod) => {
        const totalPrice = servicesList.reduce((total, service) => total + parseFloat(service.price), 0);
        if (paymentMethod === "На сайте со скидкой 5%") {
            return totalPrice - totalPrice * 0.05;
        }
        return totalPrice;
    };


    if (isLoading) {
        return <h1>Идет загрузка...</h1>
    }
    if (isError) {
        return <h1>Ошибка</h1>
    }
    if (!data) {
        return <h1>Нет заказов</h1>
    }

    //скрыть подсказку
    const closeHelp = () => {
        let el = document.getElementById('OrdersHelp')
        el.style.display = (el.style.display === 'none') ? 'block' : 'none'
    }

    const handleClick = (type) => {
        setSelectedOrderType(type);
    };

    const toggleOrderDetails = (orderId) => {
        setOrderDetailsVisibleId((prevId) => (prevId === orderId ? null : orderId));
    };

    const currentOrderCount = data.filter(order => order.status === false).length;
    const pastOrderCount = data.filter(order => order.status === !false).length;

    const currentOrders = data.filter(order => order.status === false);
    const pastOrders = data.filter(order => order.status !== false);


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
            <div id='OrdersHelp' style={{display: 'block',}}>
                <div className='OrdersHelp'>
                    <p>Если вы задерживаетесь на запись, предупредите нас об этом, нажав на кнопку “+15 минут”</p>
                    <button className='OrdersCloseCross' onClick={closeHelp}>
                        <img style={{width: '24px'}} src={CloseCross}/>
                    </button>
                </div>
            </div>
            <div id='currentOrderList'
                 className={selectedOrderType === 'current' ? 'ActiveOrderList' : 'HiddenOrderList'}>
                {currentOrders.map(order => (
                    <Order
                        key={order.id}
                        data={order}
                        showDetails={orderDetailsVisibleId === order.id}
                        toggleDetails={() => toggleOrderDetails(order.id)}
                        calculateTotalPrice={() => calculateTotalPrice(order.servicesList, order.paymentMethod)}
                    />
                ))}
            </div>
            <div id='pastOrderList' className={selectedOrderType === 'past' ? 'ActiveOrderList' : 'HiddenOrderList'}>
                {pastOrders.map(order => (
                    <PastOrder
                        key={order.id}
                        data={order}
                        showDetails={orderDetailsVisibleId === order.id}
                        toggleDetails={() => toggleOrderDetails(order.id)}
                        calculateTotalPrice={() => calculateTotalPrice(order.servicesList, order.paymentMethod)}
                    />
                ))}
            </div>
            <div className='hiddenOrderButton'>
                <MainButton title='Записаться' goto='/makeorder'/>
            </div>
        </div>
    )
}
