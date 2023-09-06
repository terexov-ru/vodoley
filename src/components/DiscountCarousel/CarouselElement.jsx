import './DiscountCarousel.css'
import React from 'react'
import arrow from '../../media/ArrowBlack.png'
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';

const calculateCircleFillPercentage = (visits) => {
    if (visits === 0) {
        return 0;
    } else if (visits === 1) {
        return 33.3;
    } else if (visits === 2) {
        return 66.6;
    } else if (visits === 3) {
        return 100;
    } else {
        const remainder = visits % 3;
        if (remainder === 1) {
            return 33.3;
        } else if (remainder === 2) {
            return 66.6;
        } else if (remainder === 0) {
            return 100;
        }
    }
};

export const CarouselElement = ({discounts}) => {
    const circleFillPercentage = calculateCircleFillPercentage(discounts.visits);

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
                        value={circleFillPercentage}
                        styles={
                            buildStyles({
                                pathColor: '#FA7E63',
                                trailColor: '#F6F7F8',
                                strokeLinecap: "round",
                            })}
                    >
                        <div style={{
                            textAlign: 'center',
                            fontSize: 14,
                            color: '#40444F',
                            paddingBottom: 12,
                        }}>
                            {discounts.visits % 3 === 0 ? "3 раза" : `${3 - discounts.visits % 3} ${3 - discounts.visits % 3 === 1 ? "раз" : "раза"}`}
                        </div>
                    </CircularProgressbarWithChildren>
                </div>
                <div className='CarouselInfo'>
                    <div className='Options'>
                        {discounts.visits % 3 === 3 && <a style={{"display": "flex"}}>0% <img src={arrow} alt="Arrow" /> 5%</a>}
                        {discounts.visits % 3 === 1 && <a style={{"display": "flex"}}>5% <img src={arrow} alt="Arrow" /> 10%</a>}
                        {discounts.visits % 3 === 2 && <a style={{"display": "flex"}}>10% <img src={arrow} alt="Arrow" /> 15%</a>}
                        {discounts.visits % 3 === 0 && <a style={{"display": "flex"}}>15% <img src={arrow} alt="Arrow" /> 5%</a>}
                    </div>

                    <h1 className='WhichOption'>{discounts.title}</h1>
                </div>

            </div>
        </div>
    );
};
