import './Order.css'

import React from 'react'
import {useLocation} from "react-router-dom";

export const OrderPosition = ({selectedServices, selectedPaymentOption, calculateTotalPrice}) => {
    const isMyOrdersPage = window.location.hash === '#/myorders';
    const location = useLocation();

    const isOrderPage = location.pathname === '/makeorder';

    const totalPriceClassName = isOrderPage ? 'totalPrice withShadow' : 'totalPrice';
    return (
        <table className={totalPriceClassName}>
            <tbody>
            {console.log("selectedServices", selectedServices)}
            {selectedServices.map((service, index) => (
                <tr key={index}>
                    <td>{service.title}</td>
                    <td>{service.price}₽</td>
                </tr>
            ))}
            {selectedPaymentOption === 'discount' && (
                <tr>
                    <td>Скидка</td>
                    <td>5%</td>
                </tr>
            )}
            </tbody>
            <tfoot>
            <tr>
                <td>Сумма</td>
                <td>{calculateTotalPrice()}₽</td>
            </tr>
            {isMyOrdersPage && (
                // {selectedServices.map((service) => (
                <tr>
                    <td>Оплата</td>
                    <td>Тип оплаты</td>
                </tr>
                // ))}
            )}
            </tfoot>
        </table>
    );
};

