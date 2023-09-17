import React from 'react'
import './Order.css'
import { MainButton } from '../mainButton/MainButton'
import { OrderPosition } from './OrderPosition'
import GrayGreen from '../../media/ClockGray.png'
import Coins from "../../media/Coins.png"
import Reviews from "../../media/Reviews.png"
import {Link, NavLink, useLocation } from 'react-router-dom'

export const PastOrder = ({data, showDetails, toggleDetails, calculateTotalPrice}) => {
    const location = useLocation();

    if (!data || !data.servicesList) {
        return <div>Нет прошедших заказов</div>;
    }

    const buttonWidth = "191px";
    const isReviewPage = location.pathname === `/review/${data.id}`;
    const orderStatusClass = isReviewPage? 'completedOrder' : '';
    const orderClassName = isReviewPage ? 'OrderWithMargin' : 'Order';
    return (
        <>
            <div className={orderClassName}>
                <div>
                    <h1 className='OrderAdress'>{data.address}</h1>
                    <div className='OrderDate' id='OldOrder'>
                        <img id='clockSimbol' style={{width: '24px'}} src={GrayGreen} /><span>{data.time}</span>
                    </div>
                    <div className={`OrderStatusSign ${orderStatusClass}`} id='OldOrderSign'>Завершена</div>
                </div>
                {location.pathname !== `/review/${data.id}` && (
                    <>
                        <div className='OrderButtonSet'>
                            <div className={showDetails ? 'orderHidden' : 'orderActive'} id='interactiveOrder'>
                                <div id='shortbuttonset'>
                                    <button id='moreButton' style={{width: buttonWidth}} onClick={toggleDetails}>Подробнее</button>
                                    <div className="rightButtons">
                                        <button id='tipsButton'>
                                            <NavLink to={`/tips/${data.id}`}><img style={{width: '25px'}} src={Coins} /></NavLink>
                                        </button>
                                        <Link to={{ pathname: `/review/${data.id}`, state: { orderData: data } }}>
                                            <button id='rewiesButton'><img style={{width: '40px'}} src={Reviews} /></button>
                                        </Link>
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
                                <div>
                                    <NavLink to={`/tips/${data.id}`}>
                                        <button>Оставить чаевые</button>
                                    </NavLink>
                                </div>
                                <div>
                                    <Link to={{ pathname: `/review/${data.id}`, state: { orderData: data } }}>
                                        <button>Оставить отзыв</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>

    )
}
