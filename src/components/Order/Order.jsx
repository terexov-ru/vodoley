import React from 'react'
import './Order.css'
import { MainButton } from '../mainButton/MainButton'
import { OrderPosition } from './OrderPosition'
import ClockGreen from '../../media/ClockGreen.png'

export const Order = ({data}) => {

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
                <div className='OrderDate' id='NewOrder'>
                    <img id='clockSimbol' src={ClockGreen} width={24} height={24}/><span>{data.time}</span>
                </div>
                <div className='OrderStatusSign' id='NewOrderSign'>Ожидается</div>
            </div>

            <div className='OrderButtonSet'>
                <div className='orderActive' id='interactiveOrder'>
                    <div id='shortbuttonset'>
                        <button id='moreButton' onClick={showMoreHandler}>Подробнее</button>
                        <div>
                            <button id='shortAddFifteen'>+15 минут</button>
                        </div>
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
                <div>
                    <button className='bottomLate'>Опоздаю на 15 минут</button>
                </div>
                <div className='bottonChangeOrder'>
                    <button>изменить запись</button>
                </div>
            </div>
        </div>

        <div className='hiddenOrderButton'>
          <MainButton title='Записаться' />
        </div>
    </>

  )
}
