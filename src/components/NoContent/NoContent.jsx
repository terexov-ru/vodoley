import './NoContent.css'
import React from 'react'
import NoContentSrc from '../../media/NoContent.png'

export const NoContent = () => {

    const goBack = () => {
        window.history.back();
    };

    return (
        <div className='NoContent'>
            <img className='NoContentImage' src={NoContentSrc}/>
            <p className='NoContentText'>Раздел не заполнен</p>
            <button className='NoContentButton' onClick={goBack}>Вернуться назад</button>
        </div>
    )
}
