import React, {useState} from 'react'
import './Order.css'
import { MainButton } from '../mainButton/MainButton'
import { OrderPosition } from './OrderPosition'
import ClockGreen from '../../media/ClockGreen.png'
import axios from "../../utils/axios";
import {Link} from "react-router-dom";

export const Order = ({data, showDetails, toggleDetails, calculateTotalPrice}) => {
    const [isPostponed, setIsPostponed] = useState(data.postponed);
    if (!data || !data.servicesList) {
        return <div>Нет текущих заказов</div>;
    }



    const handleAddFifteenMinutes = () => {
        if (!isPostponed) {
            axios.post('postpone-checkout/', { id: data.id })
                .then(response => {
                    setIsPostponed(true); // Обновляем состояние кнопки

                })
                .catch(error => {
                    console.error('Postponement error:', error);
                });
        }
    };

    const handleCancelOrder = () => {
        axios
            .post('/cancel-checkout/', { id: data.id })
            .then((response) => {
                // Обработка успешной отмены заказа
                console.log('Заказ успешно отменен');
            })
            .catch((error) => {
                console.error('Error cancelling order:', error);
            });
    };


    return (
        <>
            <div className='Order'>
                <div>
                    <h1 className='OrderAdress'>{data.address}</h1>
                    <div className='OrderDate' id='NewOrder'>
                        <img id='clockSimbol' src={ClockGreen} width={24} height={24}/><span>{data.time}</span>
                    </div>
                    <div className='OrderStatusSign' id='NewOrderSign'>Ожидается</div>
                </div>

                <div className='OrderButtonSet'>
                    <div className={showDetails ? 'orderHidden' : 'orderActive'} id='interactiveOrder'>
                        <div id='shortbuttonset'>
                            <button id='moreButton' onClick={toggleDetails}>Подробнее</button>
                            <div>
                                <button
                                    className={isPostponed ? 'grayButton' : ''}
                                    id='shortAddFifteen'   disabled={isPostponed} onClick={handleAddFifteenMinutes}>+15 минут</button>
                            </div>
                        </div>
                    </div>
                    <div className={!showDetails ? 'orderHidden' : 'orderActive'} id='interactiveOrder'>
                        <button className='closeDetails' onClick={toggleDetails}>Скрыть</button>
                    </div>
                </div>

                <div className={showDetails ? 'orderActive' : 'orderHidden'} id='interactiveOrder'>
                    <table className='orderTable'>
                        <tbody>
                        <OrderPosition
                            selectedServices={data.servicesList}
                            selectedPaymentOption={data.paymentMethod}
                            calculateTotalPrice={calculateTotalPrice}
                        />
                        </tbody>
                    </table>
                </div>
                <div className='bottomButtons'>
                    <div className={showDetails ? 'orderActive' : 'orderHidden'} id='interactiveOrder'>
                        {/*<div>*/}
                        {/*    <button   className={isPostponed ? 'grayButton' : 'bottomLate'} disabled={isPostponed} onClick={handleAddFifteenMinutes}>{isPostponed? ("Уже отложено") :*/}
                        {/*        ('Опоздаю на 15 минут')}</button>*/}
                        {/*</div>*/}
                        <div className='buttonChangeOrder'>
                            <Link to={{ pathname: `/changeorder/${data.id}`, state: { orderData: data } }}>
                                <button>Изменить запись</button>
                            </Link>
                        </div>
                        <div>
                            <button className='bottomLate' onClick={handleCancelOrder}>Отменить запись</button>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}
