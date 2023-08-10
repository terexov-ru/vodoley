import './DiscountCarousel.css'

import React from 'react'
import arrow from '../../media/ArrowBlack.png'
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';

export const CarouselElement = ({discounts}) => {
    return (
        <div className='CarouselElement'>
            <div className='CarouselInto'>
                <div style={{
                    width: 72,
                    height: 72,
                    marginTop: 12,
                    marginLeft: 12,
                    marginBottom: 12,
                    borderRadius: 8,
                }}>
                    <CircularProgressbarWithChildren
                        value={33}
                        styles={
                            buildStyles({
                                pathColor: '#FA7E63',
                                trailColor: '#F6F7F8',
                                strokeLinecap: "round",
                            })}>
                        <div style={{
                            textAlign: 'center',
                            fontSize: 14,
                            text: '#F6F7F8',
                            paddingBottom: 12,
                        }}>{discounts.visits} раза</div>
                    </CircularProgressbarWithChildren>
                </div>
                <div className='CarouselInfo'>
                    <div className='Options'>
                        <a>10%</a>
                        <img src={arrow}/>
                        <a>15%</a>
                    </div>
                    <h1 className='WhichOption'>{discounts.title}</h1>
                </div>
            </div>
        </div>
    )
}
