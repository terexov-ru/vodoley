import React from 'react'
import './TipsOrder.css'
import { OrderPosition } from '../Order/OrderPosition'
import BlueClock from '../../media/ClockBlue.png'
import mapPin from '../../media/Map_Pin.png'

export const TipsOrder = () => {
    const orderDataSet = JSON.parse(localStorage.getItem('services'))
    console.log(orderDataSet)

  return (
    <>
        <div className='Order'>
            <div className='TipsOrderDetails'>
                <div className='TipsOrderAdress'>
                    <img src={mapPin} />
                    <span>Санкт-Петербург, Кондратьевский пр-т, 31</span>
                </div>
                <div className='TipsOrderDate'>
                    <img src={BlueClock} />
                    <span>15 апреля, 15:00</span>
                </div>
            </div>
            <table className='orderTable'>
                <tbody>
                    {orderDataSet.special.map((positions, ind) => (
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
                </tbody>
            </table>
        </div>
    </>

  )
}
