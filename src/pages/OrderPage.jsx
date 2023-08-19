import React, {useEffect, useState} from 'react'
import '../pageStyles/OrderPage.css'
import { Header } from '../components/Header/Header'
import axios from "../utils/axios";
import queryString from 'query-string';
import {Navigate, NavLink, useLocation, useNavigate} from "react-router-dom";
import {Service} from "../components/Services/Service";
import { OrderPosition } from "../components/Order/OrderPosition";
import {ServicePopup} from "../components/Services/ServicePopup";
import {DiscountCarousel} from "../components/DiscountCarousel/DiscountCarousel";
import {QueryClient, useMutation} from "react-query";
import Select from "react-select";
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker, {registerLocale} from 'react-datepicker';
import '../components/Order/React-select.scss'
import ru from 'date-fns/locale/ru';
import {format} from "date-fns";



async function newOrder(data) {

    await axios.post('create-checkout/', data)
        .then((res) => {
            if(res.status === 200) {
                return (
                    <Navigate to='/' />
                )
            } else {
                return <h1>{res.message}</h1>
            }
        })
}

export const OrderPage = ( ) => {
    const queryClient = new QueryClient()
    const location = useLocation();
    const order = useMutation(order => newOrder(order), {
        onSuccess: () => queryClient.invalideteQueries(['order'])
    })
    const navigate = useNavigate();


    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [selectedServices, setSelectedServices] = useState([]);
    const [selectedPaymentOption, setSelectedPaymentOption] = useState('discount');
    const [paymentOptions, setPaymentOptions] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [discountList, setDiscountList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isFormFilled, setIsFormFilled] = useState(false);
    const [buttonClicked, setButtonClicked] = useState(false); // Step 1


    useEffect(() => {
        setIsLoading(true);
        const parsed = queryString.parse(location.search);
        const queryAddressId = parsed.address;
        // Fetch addresses and services from your API

        axios.get('get-user-discounts/').then(response => {
            console.log("Discounts response:", response.data); // Check the structure of the response
            setDiscountList(response.data);
        });
        axios.get('get-addresses-list').then(response => {
            setAddresses(response.data);
            if (queryAddressId) {
                setSelectedAddress(parseInt(queryAddressId));
            }
        });

        axios.get('get-payment-methods/') // Replace with the actual endpoint to fetch payment options
            .then(response => {
                setPaymentOptions(response.data);
                console.log(paymentOptions)
            })
            .catch(error => {
                console.error('Error fetching payment options:', error);
            });

        const storedServices = JSON.parse(localStorage.getItem('selectedServices')) || [];
        setSelectedServices(storedServices);
        setIsLoading(false);
    }, [useLocation]);


    useEffect(() => {
        const areRequiredFieldsFilled = (
            selectedAddress !== '' &&
            selectedDate !== '' &&
            selectedTime !== '' &&
            selectedServices.length > 0
        );

        setIsFormFilled(areRequiredFieldsFilled);
    }, [selectedAddress, selectedDate, selectedTime, selectedServices]);



    const handleGoToCatalog = () => {
        if (!selectedAddress) { // Check if an address is selected
            setButtonClicked(true); // Set the buttonClicked state to true
        } else {
            setShowPopup(true);
        }
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Check if the form is fully filled before submitting
        if (isFormFilled) {
            await assembleFinalResult()
        } else {
            console.log("Please fill in all required fields.");
        }
    };

    const timeIntervals = [];
    for (let hour = 9; hour < 22; hour++) {
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
            setSelectedServices={handleServiceChange}
        />
    ));

    const assembleFinalResult = async () => {
        try {
            const formattedDate = format(selectedDate, 'yyyy-MM-dd', { timeZone: 'UTC' });
            const formattedTime = selectedTime ? `${selectedTime.value}:00` : '';
            const selectedPaymentOptionObj = paymentOptions.find(option => option.id === selectedPaymentOption);
            const finalResult = {
                address: selectedAddress,
                time: formattedDate + ' ' + formattedTime,
                paymentType: selectedPaymentOptionObj.id,
                servicesList: selectedServices.map(service => (service.id))
            };

            console.log('newOrder: ', finalResult);

            // Send the data to the server
            const response = await axios.post('create-checkout/', finalResult);

            if (response.status === 200) {
                console.log('Order created successfully:', response.data);
                // Handle success, e.g. redirect to a success page or show a confirmation message
            } else {
                console.error('Failed to create order:', response.data.message);
                // Handle failure, e.g. display an error message to the user
            }
        } catch (error) {
            console.error('Error creating order:', error);
            // Handle error, e.g. display an error message to the user
        }
    };

    // const paymentOptions = [
    //     { value: 'discount', label: 'Онлайн со скидкой 5%' },
    //     { value: 'regular', label: 'Оплатить позже онлайн или при посещении' },
    // ];

    const handleAddressChange = option => {
        setSelectedAddress(option.value);
        navigate(`/makeorder?address=${option.value}`);
        setButtonClicked(false);
    };

    const options = (addresses) => (
        addresses.map(address => ({ value: address.id, label: address.address }))
    );

    const customStyles = {
        dropdownIndicator: (provided, state) => ({
            ...provided,
            transform: state.selectProps.menuIsOpen && 'rotate(180deg)'
        })
    }
    registerLocale('ru', ru)

    console.log('ешьу: ', selectedTime)

    return (
        <>
            <Header gobackto='/' title='Записаться'/>
            <form className='OrderPage' onSubmit={handleSubmit}>
                <h1 className='OrderFormTitle'>Адрес</h1>
                <Select
                    classNamePrefix={`custom-select${buttonClicked && !selectedAddress ? 'invalid-select' : ''}`} // Step 2
                    value={selectedAddress ? { value: selectedAddress, label: addresses.find(address => address.id === selectedAddress)?.address } : selectedAddress}
                    options={options(addresses)}
                    onChange={handleAddressChange}
                    placeholder='Выберите адрес'
                    isSearchable={false}
                    styles={customStyles}

                />
                <NavLink to="/address"><button className='OrderPage_button'>Выбрать на карте</button></NavLink>
                <h1 className='OrderFormTitle'>Услуги</h1>
                <div>
                    {renderedServices}
                </div>
                <button className='OrderPage_button' onClick={handleGoToCatalog}>Перейти в каталог</button>
                <h1 className='OrderFormTitle'>Дата и время</h1>
                <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                    <DatePicker
                        locale="ru"
                        className='custom-date-input'
                        dateFormat='dd.MM.yyyy'
                        selected={selectedDate}
                        onChange={date => setSelectedDate(date)}
                        placeholderText='Выберите дату'

                    />
                    <Select
                        classNamePrefix='custom-select_time'
                        value={selectedTime}
                        label={selectedTime}
                        onChange={option => setSelectedTime(option)}
                        options={timeIntervals.map(time => ({ value: time, label: time }))}
                        placeholder={timeIntervals[0]}
                        styles={customStyles}
                        isSearchable={false}
                    />
                </div>
                <h1 className='OrderFormTitle'>Скидки</h1>
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    discountList.length > 0 ? (
                        <div>
                            <DiscountCarousel discount={discountList} />
                        </div>
                    ) : (
                        <p id='discountNotification'>Скидок пока нет</p>
                    )
                )}
                <h1 className='OrderFormTitle'>Способ оплаты</h1>
                <Select
                    classNamePrefix='custom-select'
                    value={{ value: selectedPaymentOption, label: paymentOptions.find(option => option.id === selectedPaymentOption)?.title }}
                    options={paymentOptions.map(option => ({ value: option.id, label: option.title }))}
                    onChange={option => setSelectedPaymentOption(option.value)}
                    placeholder='Выберите способ оплаты'
                    styles={customStyles}
                    isSearchable={false}
                />
                <p id='paymentNotification'>При неявке по записи оплата не возвращается</p>
                <div>
                    <OrderPosition selectedServices={selectedServices} selectedPaymentOption={selectedPaymentOption}/>
                </div>
                {showPopup && (
                    <ServicePopup
                        selectedAddressId={selectedAddress}
                        selectedServices={selectedServices}
                        setSelectedServices={setSelectedServices}
                        onClose={closePopup}
                    />
                )}
                {/*<NavLink to="/pay" className="nav-link" disabled={!isFormFilled}>*/}
                {/*    <input type="submit" value="Оплатить" disabled={!isFormFilled} />*/}
                {/*</NavLink>*/}
                <input type="submit" value="Оплатить" disabled={!isFormFilled} />
            </form>
        </>

    )
}
