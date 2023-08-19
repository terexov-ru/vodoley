import React, {useEffect, useState} from 'react';
import {ServicesPage} from "../../pages/ServicesPage";
import arrow from '../../media/back.png';
import {Header} from "../Header/Header";
import {NavLink} from "react-router-dom";
import check from '../../media/Check.png'

export const ServicePopup = ({ selectedAddressId, selectedServices, setSelectedServices, onClose }) => {



    const handleCancel = () => {
        localStorage.setItem('selectedServices', JSON.stringify(selectedServices));
        onClose();
    };


    const handleSave = () => {
        onClose();
        window.location.reload(); // Перезагрузка страницы
    };


    return (
        <div className='ServicePopup'>
            <div className='ServicePopupContent'>
                <div className='header'>
                    <button className='close-button' onClick={handleCancel}><img src={arrow}/></button>
                    <h1 className='headerTitle'>Услуги</h1>
                    <button className='close-button' onClick={handleSave}><img src={check}/></button>
                </div>
                {console.log("address", selectedAddressId)}
                <div className="service-list-container"> {/* Add a scrollable container */}
                    <ServicesPage
                        showHeader={false}
                        showButton={false}
                        showAddress={false}
                        selectedAddressId={selectedAddressId}
                    />
                </div>
            </div>
        </div>
    );
};