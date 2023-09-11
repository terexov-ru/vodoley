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
    };


    return (
        <div className='ServicePopup'>
            <div className='ServicePopupContent'>
                <div className='header'>
                    <button className='close-button' onClick={handleCancel}><img style={{width: '24px'}} src={arrow}/></button>
                    <h1 className='headerTitle'>Услуги</h1>
                    <button className='close-button' onClick={handleSave}><img style={{width: '24px'}} src={check}/></button>
                </div>
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