import React from 'react'
import './Order.css'
import { MainButton } from '../mainButton/MainButton'
import { OrderPosition } from './OrderPosition'
import GrayGreen from '../../media/ClockGray.png'
import Coins from "../../media/Coins.png"
import Reviews from "../../media/Reviews.png"
import { NavLink } from 'react-router-dom'

export const PastOrder = ({data}) => {

    const showMoreHandler = async () => {
        let profileBlocks = document.querySelectorAll('[id="interactiveOrder"]')
        for (let j = 0; j < profileBlocks.length; j=j+1) {
            if(profileBlocks[j].classList.contains('orderActive')){
                profileBlocks[j].classList.remove("orderActive")
                profileBlocks[j].classList.add("orderHidden")
            } else if(profileBlocks[j].classList.contains('orderHidden')) {
                profileBlocks[j].classList.remove("orderHidden")
                profileBlocks[j].classList.add("orderActive")
            }
        }
    }


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
                    <div className='orderActive' id='interactiveOrder'>
                        <div id='shortbuttonset'>
                            <button id='moreButton' onClick={showMoreHandler}>Подробнее</button>
                            <button id='tipsButton'>
                                <NavLink to="/tips"><img src={Coins} /></NavLink>
                            </button>
                            <button id='rewiesButton'><img src={Reviews} /></button>
                        </div>
                    </div>
                    <div className='orderHidden' id='interactiveOrder'>
                        <button className='closeDetails' onClick={showMoreHandler}>Скрыть</button>
                    </div>
                </div>

                <div className='orderHidden' id='interactiveOrder'>
                    <table className='orderTable'>
                        <tbody>
                        {data.servicesList.map((positions, ind) => (
                            <OrderPosition positions={positions} key={ind} />
                        ))}
                        </tbody>
                    </table>
                    <table className='orderInfo'>
                        <tbody>
                        <tr className='positionElement'>
                            <td className='positionElementName'>Сумма</td>
                            <td className='positionElementPrice'>1400 ₽</td>
                        </tr>
                        <tr className='positionElement'>
                            <td className='positionElementName'>Оплата</td>
                            <td className='positionElementPrice'>При посещении</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>


            <div className='bottomButtons'>
                <div className='orderHidden' id='interactiveOrder'>
                    <NavLink to="/tips">
                        <button>Оставить чаевые</button>
                    </NavLink>
                    <div>
                        <button>Оставить отзыв</button>
                    </div>
                </div>
            </div>

            <div className='hiddenOrderButton'>
                <MainButton title='Записаться' />
            </div>
        </>

    )
}