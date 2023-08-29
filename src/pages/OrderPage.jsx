import React, {useEffect, useState} from 'react'
import '../pageStyles/OrderPage.css'
import {Header} from '../components/Header/Header'
import axios from "../utils/axios";
import queryString from 'query-string';
import {Navigate, NavLink, useLocation, useNavigate} from "react-router-dom";
import {Service} from "../components/Services/Service";
import {OrderPosition} from "../components/Order/OrderPosition";
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
            if (res.status === 200) {
                return (
                    <Navigate to='/'/>
                )
            } else {
                return <h1>{res.message}</h1>
            }
        })
}

export const OrderPage = () => {
    console.log('OrderPage rendering');
    const queryClient = new QueryClient()
    const location = useLocation();
    const order = useMutation(order => newOrder(order), {
        onSuccess: () => queryClient.invalideteQueries(['order'])
    })
    const navigate = useNavigate();


    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState('');
    const [selectedDate, setSelectedDate] = useState(Date.now());
    const [selectedTime, setSelectedTime] = useState('');
    const [selectedServices, setSelectedServices] = useState([]);
    const [selectedPaymentOption, setSelectedPaymentOption] = useState('');
    const [paymentOptions, setPaymentOptions] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [discountList, setDiscountList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isFormFilled, setIsFormFilled] = useState(false);
    const [buttonClicked, setButtonClicked] = useState(false);
    const [addressChangeCounter, setAddressChangeCounter] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [timeIntervals, setTimeIntervals] = useState([]);
    const [currentTime, setCurrentTime] = useState(new Date());
    const selectedAddressData = addresses.find(address => address.id === selectedAddress);

    useEffect(() => {
        const roundedTime = new Date(currentTime);
        roundedTime.setMinutes(15 * Math.ceil(roundedTime.getMinutes() / 15));
        setCurrentTime(roundedTime);
    }, []);

    useEffect(() => {
        if (selectedDate && selectedAddressData) {
            const [startTime, endTime] = selectedAddressData.time.split(' - ');
            const [startHour, startMinute] = startTime.split(':');
            const [endHour, endMinute] = endTime.split(':');

            const intervals = [];
            let currentDate = new Date(selectedDate);
            currentDate.setHours(startHour, startMinute, 0, 0); // Set to starting time

            if (currentDate < currentTime) {
                currentDate = new Date(currentTime); // Use the rounded current time as the starting point
            }

            const endDate = new Date(selectedDate);
            endDate.setHours(endHour, endMinute, 0, 0); // Set to ending time

            const maxAvailableTime = new Date(selectedDate);
            maxAvailableTime.setHours(endHour, endMinute, 0, 0); // Set maximum available time to 21:45 for all days

            while (currentDate <= endDate && currentDate <= maxAvailableTime) {
                intervals.push(
                    currentDate.toLocaleTimeString('ru-RU', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false
                    })
                );
                currentDate = new Date(currentDate.getTime() + 15 * 60000); // Increment by 15 minutes
            }

            const intervalsWithoutLast = intervals.filter(time => time !== "22:00");
            setTimeIntervals(intervalsWithoutLast);
            setSelectedTime(intervalsWithoutLast[0]);
        }
    }, [selectedDate, selectedAddressData, currentTime]);





    const fetchAndFilterSelectedServices = async (addressID) => {
        if (addressID) {
            try {
                const response = await axios.post('get-services-for-address/', {addressID});
                const servicesForSelectedAddress = response.data;
                setSelectedServices(prevSelectedServices => {
                    const updatedSelectedServices = prevSelectedServices.filter(service =>
                        servicesForSelectedAddress.some(selectedService => selectedService.id === service.id)
                    );
                    return updatedSelectedServices;
                });
            } catch (error) {
                console.error('Error fetching services for the address:', error);
            }
        }
    };


    useEffect(() => {
    }, [selectedAddress, selectedServices]);


    useEffect(() => {
        setIsLoading(true);
        const parsed = queryString.parse(location.search);
        const queryAddressId = parsed.address;

        axios.get('get-user-discounts/').then(response => {
            setDiscountList(response.data);
        });
        axios.get('get-addresses-list').then(response => {
            setAddresses(response.data);
            if (queryAddressId) {
                setSelectedAddress(parseInt(queryAddressId));
                fetchAndFilterSelectedServices(parseInt(queryAddressId));
            }
        });

        axios.get('get-payment-methods/')
            .then(response => {
                setPaymentOptions(response.data);
                console.log(response.data)
            })
            .catch(error => {
                console.error('Error fetching payment options:', error);
            });

        const storedServices = JSON.parse(localStorage.getItem('selectedServices'));
        // || [];
        setSelectedServices(storedServices);
        setIsLoading(false);
    }, [location]);

    useEffect(() => {
        const totalPrice = calculateTotalPrice();
        setTotalPrice(totalPrice);
    }, [selectedServices, selectedPaymentOption]);

    useEffect(() => {
        if (paymentOptions.length > 0) {
            setSelectedPaymentOption(paymentOptions[0].id);
        }
    }, [paymentOptions]);

    useEffect(() => {
        fetchAndFilterSelectedServices();
    }, [selectedAddress, setAddressChangeCounter]);


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
        if (!selectedAddress) {
            setButtonClicked(true);
        } else {
            setShowPopup(true);
        }
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (isFormFilled) {
            await assembleFinalResult()
            localStorage.removeItem('selectedServices');
        } else {
            console.log("Please fill in all required fields.");
        }
    };

    const handleServiceChange = (updatedServices) => {
        setSelectedServices(updatedServices);
        localStorage.setItem('selectedServices', JSON.stringify(updatedServices));
    };

    const renderedServices = selectedServices.map((service) => (
        <Service
            key={`${service.id}-${addressChangeCounter}`} // Use a unique key here
            service={service}
            selectedServices={selectedServices}
            setSelectedServices={handleServiceChange}
            addressChangeCounter={addressChangeCounter}
        />
    ));


    const calculateTotalPrice = () => {
        let totalPrice = selectedServices.reduce((total, service) => total + parseFloat(service.price), 0);

        if (selectedPaymentOption === 'discount') {
            totalPrice -= totalPrice * 0.05;
        }

        return totalPrice;
    };


    const assembleFinalResult = async () => {
        try {
            const formattedDate = format(selectedDate, 'yyyy-MM-dd', {timeZone: 'UTC'});
            const formattedTime = selectedTime ? `${selectedTime.value}:00` : '';
            const selectedPaymentOptionObj = paymentOptions.find(option => option.id === selectedPaymentOption);
            // const servicesList = selectedServices.map((service) => ({
            //     [service.id]: { price: service.price },
            // }));


            const finalResult = {
                address: selectedAddress,
                time: formattedDate + ' ' + formattedTime,
                paymentType: selectedPaymentOptionObj.id,
                // servicesList,
                servicesList: selectedServices.map(service => service.id),
                // ServicePrice: totalPrice
            };

            console.log('newOrder: ', finalResult);

            // Send the data to the server
            const response = await axios.post('create-checkout/', finalResult);

            if (response.status === 200) {
                console.log('Order created successfully:', response.data);
            } else {
                console.error('Failed to create order:', response.data.message);
            }
        } catch (error) {
            console.error('Error creating order:', error);
        }
    };

    const handleAddressChange = option => {
        setSelectedAddress(option.value);
        navigate(`/makeorder?address=${option.value}`);
        setButtonClicked(false);
        setAddressChangeCounter(prevCounter => prevCounter + 1);
        fetchAndFilterSelectedServices(option.value);
    };


    const options = (addresses) => (
        addresses.map(address => ({value: address.id, label: address.address}))
    );

    const customStyles = {
        dropdownIndicator: (provided, state) => ({
            ...provided,
            transform: state.selectProps.menuIsOpen && 'rotate(180deg)'
        })
    }
    registerLocale('ru', ru)



    return (
        <>
            <Header gobackto='/' title='Записаться'/>
            <form className='OrderPage' onSubmit={handleSubmit}>
                <h1 className='OrderFormTitle'>Адрес</h1>
                <Select
                    classNamePrefix={`custom-select${buttonClicked && !selectedAddress ? 'invalid-select' : ''}`} // Step 2
                    value={selectedAddress ? {
                        value: selectedAddress,
                        label: addresses.find(address => address.id === selectedAddress)?.address
                    } : selectedAddress}
                    options={options(addresses)}
                    onChange={handleAddressChange}
                    placeholder='Выберите адрес'
                    isSearchable={false}
                    styles={customStyles}

                />
                <NavLink to="/address">
                    <button className='OrderPage_button'>Выбрать на карте</button>
                </NavLink>
                <h1 className='OrderFormTitle'>Услуги</h1>
                <div>
                    {renderedServices}
                </div>


                <button className='OrderPage_button' onClick={handleGoToCatalog}>Перейти в каталог</button>
                <h1 className='OrderFormTitle'>Дата и время</h1>
                <div style={{display: 'flex', alignItems: 'flex-start'}}>
                    <DatePicker
                        locale="ru"
                        className='custom-date-input'
                        dateFormat='dd.MM.yyyy'
                        selected={selectedDate}
                        onChange={date => setSelectedDate(date)}
                        placeholderText='Выберите дату'
                        minDate={new Date()}

                    />
                    <Select
                        classNamePrefix='custom-select_time'
                        value={selectedTime}
                        label={selectedTime}
                        onChange={option => setSelectedTime(option)}
                        options={timeIntervals.map(time => ({ value: time, label: time }))}
                        placeholder={timeIntervals[0]}
                        noOptionsMessage={() => "На выбранный день, нет доступного времени"}
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
                            <DiscountCarousel discount={discountList}/>
                        </div>
                    ) : (
                        <p id='discountNotification'>Скидок пока нет</p>
                    )
                )}
                <h1 className='OrderFormTitle'>Способ оплаты</h1>
                <Select
                    classNamePrefix='custom-select'
                    value={{
                        value: selectedPaymentOption,
                        label: paymentOptions.find(option => option.id === selectedPaymentOption)?.title
                    }}
                    options={paymentOptions.map(option => ({value: option.id, label: option.title}))}
                    onChange={option => setSelectedPaymentOption(option.value)}
                    placeholder='Выберите способ оплаты'
                    styles={customStyles}
                    isSearchable={false}
                />
                <p id='paymentNotification'>При неявке по записи оплата не возвращается</p>
                <div style={{"margin-bottom": "40px"}}>
                    <OrderPosition
                        selectedServices={selectedServices}
                        selectedPaymentOption={selectedPaymentOption}
                        calculateTotalPrice={calculateTotalPrice}
                    />
                </div>
                {showPopup && (
                    <ServicePopup
                        selectedAddressId={selectedAddress}
                        selectedServices={selectedServices}
                        setSelectedServices={setSelectedServices}
                        onClose={closePopup}
                    />
                )}
                <input type="submit" value="Оплатить" disabled={!isFormFilled}/>
            </form>
        </>

    )
}
