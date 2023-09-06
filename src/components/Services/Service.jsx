import './Service.css'

import React, {useEffect, useState} from 'react'

export const Service = ({service, selectedServices, setSelectedServices, addressChangeCounter, showDisplayServiceButton}) => {
    const [addedToBasket, setAddedToBasket] = useState(false);

    useEffect(() => {
        setAddedToBasket(selectedServices.some(selectedService => selectedService.id === service.id));
    }, [selectedServices, service.id, addressChangeCounter]);


    const handleAddToFavorite = () => {
        const updatedSelectedServices = addedToBasket
            ? selectedServices.filter(selectedService => selectedService.id !== service.id)
            : [...selectedServices, service];

        setSelectedServices(updatedSelectedServices);
    };


    const buttonClassName = addedToBasket ? 'checkboxServices checkboxServices_added' : 'checkboxServices';

    return (
        <div className='Service'>
            <div className={service.type}>
                <div className='ServiceTitle'>{service.title}</div>
                <div className='ServicePrice'>{service.price}₽</div>
            </div>
            {showDisplayServiceButton && (
                <div className='ServiceButton'>
                    <button className={buttonClassName} id={service.id} onClick={handleAddToFavorite} />
                    <label className='labelServices' htmlFor={service.id} />
                </div>
            )}

        </div>
    )
}
