import React from 'react'
import './Order.css'
import { MainButton } from '../mainButton/MainButton'
import { OrderPosition } from './OrderPosition'
import ClockGreen from '../../media/ClockGreen.png'

export const Order = ({data, showDetails, toggleDetails, calculateTotalPrice}) => {
    if (!data || !data.servicesList) {
        return <div>Нет текущих заказов</div>;
    }

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
                                <button id='shortAddFifteen'>+15 минут</button>
                            </div>
                        </div>
                    </div>
                    <div className={!showDetails ? 'orderHidden' : 'orderActive'} id='interactiveOrder'>
                        <button className='closeDetails' onClick={toggleDetails}>Скрыть</button>
                    </div>
                </div>

                <div className={showDetails ? 'orderActive' : 'orderHidden'} id='interactiveOrder'>
                    {console.log('data:',data)}
                    <table className='orderTable'>
                        <tbody>
                        {/*console.log("postions:",positions),*/}
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
                            <button className='bottomLate'>Опоздаю на 15 минут</button>
                        </div>
                        <div className='buttonChangeOrder'>
                            <button>изменить запись</button>
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
