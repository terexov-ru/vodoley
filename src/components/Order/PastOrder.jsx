import React from 'react'
import './Order.css'
import { MainButton } from '../mainButton/MainButton'
import { OrderPosition } from './OrderPosition'
import GrayGreen from '../../media/ClockGray.png'
import Coins from "../../media/Coins.png"
import Reviews from "../../media/Reviews.png"
import { NavLink } from 'react-router-dom'

export const PastOrder = ({data, showDetails, toggleDetails, calculateTotalPrice}) => {
    if (!data || !data.servicesList) {
        // Return some fallback UI or message here
        return <div>Нет прошедших заказов</div>;
    }

    const buttonWidth = "191px";

    return (
        <>
            <div className='Order'>
                <div>
                    <h1 className='OrderAdress'>{data.address}</h1>
                    <div className='OrderDate' id='OldOrder'>
                        <img id='clockSimbol' src={GrayGreen} /><span>{data.time}</span>
                    </div>
                    <div className='OrderStatusSign' id='OldOrderSign'>Завершена</div>
                </div>

                <div className='OrderButtonSet'>
                    <div className={showDetails ? 'orderHidden' : 'orderActive'} id='interactiveOrder'>
                        <div id='shortbuttonset'>
                            <button id='moreButton' style={{width: buttonWidth}} onClick={toggleDetails}>Подробнее</button>
                            <div className="rightButtons">
                                <button id='tipsButton'>
                                    <NavLink to={`/tips/${data.id}`}><img src={Coins} /></NavLink>
                                </button>
                                <button id='rewiesButton'><img src={Reviews} /></button>
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
                            // key={ind}
                            selectedServices={data.servicesList}
                            // selectedPaymentOption={positions.id} // Передача значения
                            calculateTotalPrice={calculateTotalPrice} // Передача функции
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
                            <button>Оставить отзыв</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className='hiddenOrderButton'>
                <MainButton title='Записаться' />
            </div>
        </>

    )
}