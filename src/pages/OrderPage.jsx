import React, {useEffect, useState} from 'react'
import '../pageStyles/OrderPage.css'
import { Header } from '../components/Header/Header'
import axios from "../utils/axios";
import queryString from 'query-string';
import {NavLink, useLocation} from "react-router-dom";
import {Service} from "../components/Services/Service";
import { OrderPosition } from "../components/Order/OrderPosition";
import {ServicePopup} from "../components/Services/ServicePopup";
import {DiscountCarousel} from "../components/DiscountCarousel/DiscountCarousel";

export const OrderPage = (   ) => {

    const location = useLocation();
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [selectedServices, setSelectedServices] = useState([]);
    const [selectedPaymentOption, setSelectedPaymentOption] = useState('discount');
    const [showPopup, setShowPopup] = useState(false);
    const [discountList, setDiscountList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isFormFilled, setIsFormFilled] = useState(false);


    useEffect(() => {
        setIsLoading(true);
        const queryParams = queryString.parse(location.search);
        const selectedAddressId = queryParams.address;

        // Проверяем, есть ли переданный адрес в параметрах
        if (selectedAddressId) {
            setSelectedAddress(selectedAddressId);
        }
        // Fetch addresses and services from your API
        axios.get('get-addresses-list').then(response => {
            setAddresses(response.data.addresses);
        });
        axios.get('get-user-discounts/').then(response => {
            console.log("Discounts response:", response.data.discounts); // Check the structure of the response
            setDiscountList(response.data.discounts);
            setIsLoading(false);
        });
        const storedServices = JSON.parse(localStorage.getItem('selectedServices')) || [];
        setSelectedServices(storedServices);
    }, [location.search]);


    useEffect(() => {
        const areRequiredFieldsFilled = (
            selectedAddress !== '' &&
            selectedDate !== '' &&
            selectedTime !== '' &&
            selectedServices.length > 0
        );

        setIsFormFilled(areRequiredFieldsFilled);
    }, [selectedAddress, selectedDate, selectedTime, selectedServices]);


    const openPopup = () => {
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
    };


    const handleAddressChange = event => {
        const newAddress = event.target.value;
        setSelectedAddress(newAddress);

        // Update the URL with the selected address ID
        const queryParams = `#/makeorder?address=${newAddress}`;
        window.history.pushState({}, '', queryParams);
    };

    const handleDateChange = event => {
        setSelectedDate(event.target.value);
    };

    const handleTimeChange = event => {
        setSelectedTime(event.target.value);
    };

    const handleSubmit = event => {
        event.preventDefault();

        // Check if the form is fully filled before submitting
        if (isFormFilled) {
            const finalResult = assembleFinalResult();;
            console.log(finalResult);
            // You can proceed with submitting or performing further actions
        } else {
            console.log("Please fill in all required fields.");
        }
    };

    const handlePaymentOptionChange = event => {
        setSelectedPaymentOption(event.target.value);
    };

    const timeIntervals = [];
    for (let hour = 0; hour < 24; hour++) {
        for (let minute = 0; minute < 60; minute += 15) {
            const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
            timeIntervals.push(time);
        }
    }


    const handleServiceChange = (updatedServices) => {
        setSelectedServices(updatedServices);
        localStorage.setItem('selectedServices', JSON.stringify(updatedServices));
    };
    //
    const renderedServices = selectedServices.map((service, index) => (
        <Service
            key={index}
            service={service}
            selectedServices={selectedServices}
            setSelectedServices={handleServiceChange} // Pass the function to the Service component
        />
    ));

    const assembleFinalResult = () => {
        const finalResult = {
            address: selectedAddress,
            time: `${selectedDate} ${selectedTime}`,
            paymentType: selectedPaymentOption,
            servicesList: selectedServices.map(service => ({
                id: service.id,
                title: service.title,
                price: service.price
            })),
            // Add other properties as needed
        };

        return finalResult;
    };


    return (
        <>
            <Header gobackto='/' title='Записаться'/>
            <form className='OrderPage' onSubmit={handleSubmit}>
                <h1 className='OrderFormTitle'>Адрес</h1>
                <select value={selectedAddress} onChange={handleAddressChange}>
                    <option value='' disabled className="placeholder-option" >Выберите адрес</option>
                    {addresses.map(address => (
                        <option key={address.id} value={address.id}>
                            {address.address}
                        </option>
                    ))}
                </select>
                <NavLink to="/address"><button className='OrderPage_button'>Выбрать на карте</button></NavLink>
                <h1 className='OrderFormTitle'>Услуги</h1>
                <div>
                    {renderedServices}
                </div>
                <button className='OrderPage_button' onClick={openPopup}>Перейти в каталог</button>
                <h1 className='OrderFormTitle'>Дата и время</h1>
                <div>
                    <input type='date' value={selectedDate} onChange={handleDateChange} />
                    <select value={selectedTime} onChange={handleTimeChange} >
                        {timeIntervals.map((time, index) => (
                            <option key={index} value={time}>
                                {time}
                            </option>
                        ))}
                    </select>
                </div>
                <h1 className='OrderFormTitle'>Скидки</h1>
                {isLoading ? (
                    <p>Loading...</p>
                ) : (<div>
                        {console.log(discountList.discounts)}
                        <DiscountCarousel discount={discountList.discounts}/>
                    </div>
                )}
                {/*<p id='discountNotification'>Скидок пока нет</p>*/}
                {/*<div></div>*/}
                <h1 className='OrderFormTitle'>Способ оплаты</h1>
                <select className="selectPayment" value={selectedPaymentOption} onChange={handlePaymentOptionChange}>
                    <option value="discount">Онлайн со скидкой 5%</option>
                    <option valeu="regular">Оплатить позже онлайн или при посещении</option>
                </select>
                <p id='paymentNotification'>При неявке по записи оплата не возвращается</p>
                <div>
                    <OrderPosition selectedServices={selectedServices} selectedPaymentOption={selectedPaymentOption}/>
                </div>
                {showPopup && (
                    <ServicePopup
                        selectedServices={selectedServices} // Передайте актуальное состояние
                        setSelectedServices={setSelectedServices}
                        onClose={closePopup}
                    />
                )}
                <NavLink to="/pay" className="nav-link" disabled={!isFormFilled}>
                    <input type="submit" value="Оплатить" disabled={!isFormFilled} />
                </NavLink>
            </form>
        </>

    )
}
