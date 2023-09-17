import React, {useEffect, useState} from 'react';
import axios from "../utils/axios";
import {NavLink, useLocation, useNavigate, useParams} from "react-router-dom";
import {Header} from "../components/Header/Header";
import Select from "react-select";
import DatePicker, {registerLocale} from "react-datepicker";
import {DiscountCarousel} from "../components/DiscountCarousel/DiscountCarousel";
import {OrderPosition} from "../components/Order/OrderPosition";
import {ServicePopup} from "../components/Services/ServicePopup";
import {Service} from "../components/Services/Service";
import { parse, format } from 'date-fns';
import ru from "date-fns/locale/ru";
import queryString from "query-string";
import {MainButton} from "../components/mainButton/MainButton";

export const ChangeOrderPage = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState('');
    const [isFormFilled, setIsFormFilled] = useState(false);
    const [buttonClicked, setButtonClicked] = useState(false);
    const [addressChangeCounter, setAddressChangeCounter] = useState(0);
    const [timeIntervals, setTimeIntervals] = useState([]);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [orderData, setOrderData] = useState(null);
    const [addresses, setAddresses] = useState([])
    const [selectedAddressId, setSelectedAddressId] = useState(null);


    const { id } = useParams();

    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');
    const [redirected, setRedirected] = useState(false);

    useEffect(() => {
        if (!redirected) {
            const storedToken = window.localStorage.getItem('VodoleyToken');
            if (token) {
                if (token === storedToken) {
                } else if (token !== storedToken) {
                    window.localStorage.setItem('VodoleyToken', token);
                    window.location.reload();
                }
            } else {
            }
            setRedirected(true);
        }
    }, [navigate]);

    useEffect(() => {
        axios.get('get-user-checkouts/')
            .then(response => {
                const orderId = parseInt(id);
                const orderWithId = response.data.find(order => order.id === orderId);

                if (orderWithId) {
                    setOrderData(orderWithId);
                    const parsedDate = parse(orderWithId.time, 'dd MMMM, HH:mm', new Date(), { locale: ru });
                    const formattedTime = format(parsedDate, 'HH:mm');

                    setSelectedDate(parsedDate);
                    setSelectedTime(formattedTime);
                } else {
                    console.error('Order not found');
                }
            })
            .catch(error => {
                    console.error('Error fetching orders:', error);
                }
            );
    }, [id]);


    useEffect(() => {
        const roundedTime = new Date(currentTime);
        roundedTime.setMinutes(15 * Math.ceil(roundedTime.getMinutes() / 15));
        setCurrentTime(roundedTime);
    }, []);


    useEffect(() => {
        axios.get('get-addresses-list')
            .then(response => {
                setAddresses(response.data);
                const selectedAddressData = response.data.find(address => address.address === orderData.address);

                if (selectedAddressData) {
                    setSelectedAddressId(selectedAddressData.id);
                    const [startTime, endTime] = selectedAddressData.time.split(' - ');
                    const [startHour, startMinute] = startTime.split(':');
                    const [endHour, endMinute] = endTime.split(':');

                    const intervals = [];
                    let currentDate = new Date(selectedDate);
                    currentDate.setHours(startHour, startMinute, 0, 0);

                    if (currentDate < currentTime) {
                        currentDate = new Date(currentTime);
                    }

                    const endDate = new Date(selectedDate);
                    endDate.setHours(endHour, endMinute, 0, 0);

                    while (currentDate <= endDate) {
                        const timeString = currentDate.toLocaleTimeString('ru-RU', {
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: false
                        });

                        intervals.push(timeString);

                        currentDate = new Date(currentDate.getTime() + 15 * 60000);
                    }

                    if (selectedDate > new Date()) {
                        intervals.pop();
                    }

                    setTimeIntervals(intervals);
                    setSelectedTime(intervals[0]);
                }
            })
            .catch(error => {
                console.error('Error fetching addresses:', error);
            });
    }, [selectedDate, currentTime]);


    if (!orderData) {
        return <div>Loading...</div>; // Render loading UI while fetching data
    }

    const renderedServices = orderData.servicesList.map((service) => (
        <Service
            key={`${service.id}-${addressChangeCounter}`} // Use a unique key here
            service={service}
            selectedServices={orderData.servicesList}
            setSelectedServices={null}
        />
    ))

    const customStyles = {
        dropdownIndicator: (provided, state) => ({
            ...provided,
            transform: state.selectProps.menuIsOpen && 'rotate(180deg)'
        })
    }
    registerLocale('ru', ru)

    // const calculateTotalPrice = (servicesList, paymentMethod) => {
    //     const totalPrice = servicesList.reduce((total, service) => total + parseFloat(service.price), 0);
    //     if (paymentMethod === "На сайте со скидкой 5%") {
    //         return totalPrice - totalPrice * 0.05;
    //     }
    //     return totalPrice;
    // };


    const calculateTotalPrice = () => {
        const totalPrice = orderData.servicesList.reduce((total, service) => total + parseFloat(service.price), 0);
        if (orderData.paymentMethod === 'На сайте со скидкой 5%') {
            return totalPrice - totalPrice * 0.05;
        }
        return totalPrice;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formattedDate = format(selectedDate, 'yyyy-MM-dd', {timeZone: 'UTC'});
        const formattedTime = `${selectedTime.value || selectedTime}:00`;
        const data = {
            id: orderData.id,
            address: selectedAddressId, // Здесь замените на адрес, если требуется изменение
            time: formattedDate + ' ' + formattedTime,
        };

        try {
            const response = await axios.post('edit-checkout/', data);

            if (response.status === 200) {
                // Обработка успешного изменения заказа
                console.log('Заказ успешно изменен');
                navigate('/myorders');

            } else {
                // Обработка ошибки, если не удалось изменить заказ
                console.error('Не удалось изменить заказ');
            }
        } catch (error) {
            if (error.response && error.response.status === 500) {
                console.error('Internal Server Error:', error);
                console.log('data',data)
            } else {
                console.error('Error:', error);
            }
        }
    };


    return (
        <>
            <Header gobackto='/' title='Изменение заказа'/>
            <form className='OrderPage'>
                <h1 className='OrderFormTitle'>Адрес</h1>
                <Select
                    classNamePrefix={`custom-select${buttonClicked && !orderData.address? 'invalid-select' : ''}`} // Step 2
                    value={orderData.address ? {
                        value: orderData.address,
                        label: orderData.address
                    } : orderData.address}
                    styles={customStyles}
                    isDisabled={true}
                />
                <h1 className='OrderFormTitle'>Услуги</h1>
                <div>
                    {renderedServices}
                </div>
                <h1 className='OrderFormTitle'>Дата и время</h1>
                <div style={{display: 'flex', alignItems: 'flex-start'}}>
                    <DatePicker
                        locale="ru"
                        className='custom-date-input'
                        dateFormat='dd.MM.yyyy'
                        selected={selectedDate}
                        onChange={date => setSelectedDate(date)}
                        placeholderText={orderData.time}
                        minDate={new Date()}
                    />
                    <Select
                        classNamePrefix='custom-select_time'
                        value={selectedTime}
                        onChange={option => setSelectedTime(option)}
                        options={timeIntervals.map(time => ({ value: time, label: time }))}
                        placeholder={selectedTime}
                        noOptionsMessage={() => "На выбранный день, нет доступного времени"}
                        styles={customStyles}
                        isSearchable={false}
                    />
                </div>
                <h1 className='OrderFormTitle'>Скидки</h1>
                <Select
                    classNamePrefix='custom-select'
                    value={orderData.discount}
                    label={orderData.discount}
                    placeholder='Скидка отсутвует'
                    styles={customStyles}
                    isSearchable={false}
                    isDisabled
                />
                <h1 className='OrderFormTitle'>Способ оплаты</h1>
                <Select
                    classNamePrefix='custom-select'
                    value={{
                        value: orderData.paymentMethod,
                        label: orderData.paymentMethod
                    }}
                    styles={customStyles}
                    isDisabled={true}
                />
                <p id='paymentNotification'>При неявке по записи оплата не возвращается</p>
                <div style={{"marginBottom": "40px"}}>
                    <OrderPosition
                        selectedServices={orderData.servicesList}
                        selectedPaymentOption={orderData.paymentMethod} // Передача значения
                        calculateTotalPrice={calculateTotalPrice} // Передача функции
                    />
                </div>
                <MainButton onClick={handleSubmit} title="Изменить" />
            </form>
        </>

    );
};