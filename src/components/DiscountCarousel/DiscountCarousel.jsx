import React from 'react'
import './DiscountCarousel.css'
import {NavLink, useLocation} from 'react-router-dom';
import { CarouselElement } from './CarouselElement';
import axios from "../../utils/axios";
import {useQuery} from "react-query";


export const DiscountCarousel = ({ discount }) => {
    const location = useLocation();
    const isMainPage = location.pathname === '/main';

    return (
        <div className='DiscountCarousel'>
            <h1
                className="DiscountCarouselTitle"
                style={isMainPage ? { marginLeft: '16px' } : {}}
            >Ближайшие скидки</h1>
            <NavLink to="/discounts">
                <div className='Carousel'>
                    {discount.map((discounts, ind) => (
                        <CarouselElement discounts={discounts} key={ind} />
                    ))}
                </div>
            </NavLink>
        </div>
    )
}
