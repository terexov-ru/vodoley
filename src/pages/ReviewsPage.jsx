import React, {useEffect, useState} from 'react'
import { Header } from '../components/Header/Header';
import '../pageStyles/ReviewsPage.css'
import {Link, useParams} from "react-router-dom";
import {PastOrder} from "../components/Order/PastOrder";
import axios from "../utils/axios";
import {format, parse} from "date-fns";
import ru from "date-fns/locale/ru";
import {MainButton} from "../components/mainButton/MainButton";
import {Reviews} from "../components/Reviews/Reviews";

export const ReviewsPage = () => {
    const [orderData, setOrderData] = useState(null);
    const [reviewText, setReviewText] = useState('');
    const [buttonTitle, setButtonTitle] = useState('Отправить');
    const [showReviews, setShowReviews] = useState(false);
    const maxCharacters = 1000;

    const handleReviewChange = (event) => {
        const newText = event.target.value;
        setReviewText(newText);
    };

    const handleButtonClick = () => {
        if (buttonTitle === 'Отправить') {
            setButtonTitle('Далее');
            setShowReviews(true);
        } else {
            setShowReviews(!showReviews);
        }
    };


    const { id } = useParams();

    useEffect(() => {
        axios.get('get-user-checkouts/')
            .then(response => {
                const orderId = parseInt(id);
                const orderWithId = response.data.find(order => order.id === orderId);

                if (orderWithId) {
                    setOrderData(orderWithId);
                } else {
                    console.error('Order not found');
                }
            })
            .catch(error => {
                    console.error('Error fetching orders:', error);
                }
            );
    }, [id]);

    return (
        <>
            <Header title="Отзыв" gobackto="/auth" />
            {showReviews ? (
                <div className="centeredReviews">
                    <Reviews />
                </div>
            ) : (
                <>
                    <PastOrder
                        key={id}
                        data={orderData}
                        className="headerWithMargin"
                    />
                    <div className="ReviewForm">
                        <p>Поделитесь своим мнением о нас</p>
                        <textarea
                            maxLength={maxCharacters}
                            className="ReviewInput"
                            placeholder="Ваше мнение"
                            value={reviewText}
                            onChange={handleReviewChange}
                        />
                        <div className="textLength">
                            {reviewText.length}/{maxCharacters}
                        </div>
                    </div>
                </>
            )}
            <div className="buttonContainer">
                {buttonTitle === 'Отправить' ? (
                    <MainButton title={buttonTitle} onClick={handleButtonClick} />
                ) : (
                    <MainButton title={buttonTitle} goto='/main'/>
                )}
            </div>
        </>
    )
}

