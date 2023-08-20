import './Order.css'

import React from 'react'

export const OrderPosition = ({selectedServices, selectedPaymentOption, calculateTotalPrice}) => {
    return (
        <table className='totalPrice'>
            <tbody>
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
            </tfoot>
        </table>
    );
};

