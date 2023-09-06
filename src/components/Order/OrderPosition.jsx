import './Order.css'

import React from 'react'
import {useLocation} from "react-router-dom";



export const OrderPosition = ({selectedServices, selectedPaymentOption, calculateTotalPrice, calculateServicePrice, serviceHasDiscount}) => {
    const isMyOrdersPage = window.location.hash === '#/myorders';
    const location = useLocation();

    const isOrderPage = location.pathname === '/makeorder';
    const isChangeOrderPage = location.pathname.includes('/changeorder/');

    if (!selectedServices || selectedServices.length === 0) {
        return null;
    }

    const totalPriceClassName = isOrderPage || isChangeOrderPage ? 'totalPrice withShadow' : 'totalPrice';



    return (
        <table className={totalPriceClassName}>
            <tbody>
            {selectedServices.map((service, index) => (
                <tr key={index}>
                    <td>{service.title}</td>
                    <td className={serviceHasDiscount ? serviceHasDiscount(service) ? 'discountedPrice' : '' : ''}>
                        {calculateServicePrice ? calculateServicePrice(service) : service.price}₽
                    </td>
                </tr>
            ))}
            {selectedPaymentOption === 2 && (
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
                <tr>
                    <td>Оплата</td>
                    <td>{selectedPaymentOption}</td>
                </tr>
            )}
            </tfoot>
        </table>
    );
};

