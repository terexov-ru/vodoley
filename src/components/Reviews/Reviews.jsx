import './Reviews.css'

import React from 'react'
import Review from '../../media/ReviewsHuge.png'

export const Reviews = () => {

    return (
        <div className='Reviews'>
            <img className='ReviewImage' src={Review}/>
            <p className='ReviewsText'>Спасибо за ваш отзыв. Нам важна ваша обратная связь чтобы быть лучшими</p>
        </div>
    )
}
