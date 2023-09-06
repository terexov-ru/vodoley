import React, {useState} from 'react'
import { Header } from '../components/Header/Header';
import '../pageStyles/TipsPage.css'
import {MainButton} from '../components/mainButton/MainButton'
import { TipsOrder } from '../components/TipsOrder/TipsOrder';
import {useParams} from "react-router-dom";
import axios from "../utils/axios";

export const TipsPage = () => {
    const { orderId } = useParams();
    const [orderData, setOrderData] = React.useState(null);
    const [selectedPercent, setSelectedPercent] = useState(5);
    const [customAmount, setCustomAmount] = useState('');


    React.useEffect(() => {
        axios.get('get-user-checkouts/')
            .then(response => {
                const filteredOrder = response.data.find(order => order.id === parseInt(orderId));
                if (filteredOrder) {
                    setOrderData(filteredOrder);
                } else {
                    console.error('Order not found');
                }
            })
            .catch(error => {
                console.error('Error fetching orders:', error);
            });
    }, [orderId]);

    if (!orderData) {
        return <div>Loading...</div>;
    }

    const calculateTotalPrice = (orderData) => {
        const totalPrice = orderData.servicesList.reduce((total, service) => total + parseFloat(service.price), 0);
        if (orderData.paymentMethod === "На сайте со скидкой 5%") {
            return totalPrice - totalPrice * 0.05;
        }
        return totalPrice;
    };

    const totalAmount = calculateTotalPrice(orderData);

    const handleTipsClick = (e, percent) => {
        let tipsButtonList = document.querySelectorAll('#tipsbutton');
        for (let i = 0; i < tipsButtonList.length; i++) {
            tipsButtonList[i].classList.remove('activeTip');
        }
        setSelectedPercent(percent);
        setCustomAmount('');
        e.currentTarget.classList.add('activeTip');
    };

    const handleCustomAmountChange = (e) => {
        setSelectedPercent(null);
        setCustomAmount(e.target.value);
    };

    const tipsAmount = selectedPercent ? (totalAmount * selectedPercent) / 100 : parseFloat(customAmount);
    return (
        <div className="TipsPage">
            <Header title="Чаевые" gobackto="/myorders" />
            <TipsOrder orderData={orderData} />
            <h1 className="tipsAmount">Размер чаевых</h1>
            <div className="tipsButtonset">
                <a
                    id="tipsbutton"
                    className={selectedPercent === 5 ? 'activeTip' : ''}
                    onClick={(e) => handleTipsClick(e, 5)}
                >
                    5%
                </a>
                <a
                    id='tipsbutton'
                    className={selectedPercent === 10 ? 'activeTip' : ''}
                    onClick={(e) => handleTipsClick(e, 10)}
                >
                    10%
                </a>
                <a id='tipsbutton'
                   className={selectedPercent === 15 ? 'activeTip' : ''}
                   onClick={(e) => handleTipsClick(e, 15)}
                >
                    15%
                </a>
                <a id='tipsbutton'
                   className={selectedPercent === 20 ? 'activeTip' : ''}
                   onClick={(e) => handleTipsClick(e, 20)}
                >
                    20%
                </a>
            </div>
            <h1 className="anotherSumTitle">Своя сумма:</h1>
            <input
                id="customAmountInput"
                type="number"
                className="SumInput"
                placeholder="Введите сумму"
                value={customAmount}
                onChange={handleCustomAmountChange}
            />
            <div className="finalSum">
                <a>Итого</a>
                <a>{tipsAmount.toFixed(2)} ₽</a>
            </div>
            <MainButton goto="/pay" title="Оплатить" />
        </div>
    );
};