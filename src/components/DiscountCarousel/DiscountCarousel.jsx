import React from 'react'
import './DiscountCarousel.css'
import arrow from '../../media/Arrow_Left_S.png'

export const DiscountCarousel = () => {
  return (
    <div>
        <h1 className='DiscountCarouselTitle'>Ближайшие скидки</h1>
        <div className='Carousel'>
        <div className='CarouselElement'>
                <div className='CarouselInto'>
                    <div className='circleflex'>
                        <div className='CarouselCircle'></div>
                        <div className='CompletedCircle'>
                            <a>2 раза</a>
                        </div>
                    </div>
                    <div className='CarouselInfo'>
                        <div className='Options'>
                            <a>10%</a>
                        <img src={arrow}/>
                            <a>15%</a>
                        </div>
                        <h1 className='WhichOption'>Услуга “Анти-дождь” <br/> (лобовое стекло)</h1>
                    </div>
                </div>  
            </div>
            <div className='CarouselElement'>
                <div className='CarouselInto'>
                    <div className='circleflex'>
                        <div className='CarouselCircle'></div>
                        <div className='CompletedCircle'>
                            <a>2 раза</a>
                        </div>
                    </div>
                    <div className='CarouselInfo'>
                        <div className='Options'>
                            <a>10%</a>
                        <img src={arrow}/>
                            <a>15%</a>
                        </div>
                        <h1 className='WhichOption'>Услуга “Анти-дождь” <br/> (лобовое стекло)</h1>
                    </div>
                </div>  
            </div>
            <div className='CarouselElement'>
                <div className='CarouselInto'>
                    <div className='circleflex'>
                        <div className='CarouselCircle'></div>
                        <div className='CompletedCircle'>
                            <a>2 раза</a>
                        </div>
                    </div>
                    <div className='CarouselInfo'>
                        <div className='Options'>
                            <a>10%</a>
                        <img src={arrow}/>
                            <a>15%</a>
                        </div>
                        <h1 className='WhichOption'>Услуга “Анти-дождь” <br/> (лобовое стекло)</h1>
                    </div>
                </div>  
            </div>
        </div>
    </div>
  )
}
