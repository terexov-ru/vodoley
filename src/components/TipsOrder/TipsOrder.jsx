import React from 'react';
import './TipsOrder.css';
import { OrderPosition } from '../Order/OrderPosition';
import BlueClock from '../../media/ClockBlue.png';
import mapPin from '../../media/Map_Pin.png';

export const TipsOrder = ({ orderData }) => {
    if (!orderData) {
        return <div>Loading...</div>;
    }

    const calculateTotalPrice = (servicesList, paymentMethod) => {
        const totalPrice = servicesList.reduce((total, service) => total + parseFloat(service.price), 0);
        if (paymentMethod === "На сайте со скидкой 5%") {
            return totalPrice - totalPrice * 0.05;
        }
        return totalPrice;
    };

    return (
        <div className='Order'>
            <div className='orderHeader'>
                <div className='iconAndText'>
                    <img src={mapPin} alt='Map Pin' className='icon' />
                    <p className='address'>{orderData.address}</p>
                </div>
                <div className='iconAndText'>
                    <img src={BlueClock} alt='Blue Clock' className='icon' />
                    <p className='dateTime'>{orderData.time}</p>
                </div>
            </div>
            <table className='orderTable'>
                <tbody>
                <OrderPosition
                    selectedServices={orderData.servicesList}
                    calculateTotalPrice={() => calculateTotalPrice(orderData.servicesList, orderData.paymentMethod)}
                ></OrderPosition>
                </tbody>
            </table>
        </div>
    );
};
