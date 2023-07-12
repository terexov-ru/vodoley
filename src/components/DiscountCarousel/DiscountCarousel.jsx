import React from 'react'
import './DiscountCarousel.css'
import { NavLink } from 'react-router-dom';
import { CarouselElement } from './CarouselElement';


export const DiscountCarousel = () => {
  const userData = JSON.parse(sessionStorage.getItem('user'))
  const discountsDataSet = userData.discounts
  
  return (
    <div className='DiscountCarousel'>
        <h1 className='DiscountCarouselTitle'>Ближайшие скидки</h1>
        <NavLink to="discounts">
            <div className='Carousel'>
            {discountsDataSet.discounts?.map((discounts, ind) => (
                <CarouselElement discounts={discounts} key={ind} />
            ))}
            </div>
        </NavLink>
    </div>
  )
}
