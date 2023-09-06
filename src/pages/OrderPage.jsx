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
    const queryClient = new QueryClient()
    const location = useLocation();
    const order = useMutation(order => newOrder(order), {
        onSuccess: () => queryClient.invalideteQueries(['order'])
    })
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');


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
    // const [totalPrice, setTotalPrice] = useState(0);
    const [timeIntervals, setTimeIntervals] = useState([]);
    const [currentTime, setCurrentTime] = useState(new Date());
    const selectedAddressData = addresses.find(address => address.id === selectedAddress);
    const [selectedDiscount, setSelectedDiscount] = useState('');
    const [discountOptions, setDiscountOptions] = useState([]);
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
    }, [selectedDate, selectedAddressData, currentTime]);


    useEffect(() => {
    }, [selectedAddress, selectedServices]);


    useEffect(() => {
        setIsLoading(true);
        const parsed = queryString.parse(location.search);
        const queryAddressId = parsed.address;

        axios.get('get-user-discounts/').then(response => {
            setDiscountList(response.data);
            setDiscountOptions(response.data.map(discount => ({
                value: discount.id,
                label: discount.title
            })));
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
            })
            .catch(error => {
                console.error('Error fetching payment options:', error);
            });
        const storedServices = JSON.parse(localStorage.getItem('selectedServices'));
        if (storedServices === null || storedServices === undefined) {
            localStorage.setItem('selectedServices', JSON.stringify([]));
        }
        // const storedServices = JSON.parse(localStorage.getItem('selectedServices'));
        setSelectedServices(storedServices);
        setIsLoading(false);
    }, [location]);

    // useEffect(() => {
    //     const totalPrice = calculateTotalPrice();
    //     setTotalPrice(totalPrice);
    // }, [selectedServices, selectedPaymentOption]);

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
            (selectedServices && selectedServices.length > 0)
        );

        setIsFormFilled(areRequiredFieldsFilled);
    }, [selectedAddress, selectedDate, selectedTime, selectedServices]);

    const fetchAndFilterSelectedServices = async (addressID) => {
        if (addressID) {
            try {
                const response = await axios.post('get-services-for-address/', {addressID});
                const servicesForSelectedAddress = response.data;
                setSelectedServices(prevSelectedServices => {
                    if (prevSelectedServices === null) {
                        return servicesForSelectedAddress;
                    }

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
            localStorage.setItem('selectedServices', JSON.stringify([]));
            navigate('/myorders');
        } else {
            console.log("Please fill in all required fields.");
        }
    };

    const handleServiceChange = (updatedServices) => {
        setSelectedServices(updatedServices);
        localStorage.setItem('selectedServices', JSON.stringify(updatedServices));
    };

    const renderedServices = selectedServices && selectedServices.length > 0
        ? selectedServices.map((service) => (
            <Service
                key={`${service.id}-${addressChangeCounter}`}
                service={service}
                selectedServices={selectedServices}
                setSelectedServices={handleServiceChange}
                addressChangeCounter={addressChangeCounter}
                showDisplayServiceButton={true}
            />
        ))
        : null; // Or any fallback content you want

    const calculateDiscountPercentage = (visits) => {
        if (visits === 0) {
            return 0;
        } else if (visits % 3 === 1) {
            return 5;
        } else if (visits % 3 === 2) {
            return 10;
        } else if (visits % 3 === 0) {
            return 15;
        }
    };

    // const discountPercentage = calculateDiscountPercentage(discounts.visits);

    const calculateServicePrice = (service) => {
        let servicePrice = parseFloat(service.price);

        if (selectedDiscount) {
            const selectedDiscountVisits = discountList.find(discount => discount.id === selectedDiscount.value)?.visits || 0;
            const discountPercentage = calculateDiscountPercentage(selectedDiscountVisits);

            // Apply the discount only to the service with a matching title
            if (service.title === selectedDiscount.label) {
                servicePrice -= servicePrice * (discountPercentage / 100);
            }
        }

        if (selectedPaymentOption === 2) {
            servicePrice -= servicePrice * 0.05;
        }

        return servicePrice;
    };

    const calculateTotalPrice = () => {
        if (!selectedServices || selectedServices.length === 0) {
            return 0;
        }

        const totalPrice = selectedServices.reduce((total, service) => {
            const servicePrice = calculateServicePrice(service);
            return total + servicePrice;
        }, 0);

        if (selectedPaymentOption.title === 'На сайте со скидкой 5%') {
            return totalPrice - totalPrice * 0.05;
        }

        return totalPrice;
    };


    const serviceHasDiscount = (service) => {
        if (!selectedDiscount) {
            return false;
        }

        const selectedDiscountVisits = discountList.find(discount => discount.id === selectedDiscount.value)?.visits || 0;

        return (
            service.title === selectedDiscount.label &&
            calculateDiscountPercentage(selectedDiscountVisits) > 0
        );
    };


    const assembleFinalResult = async () => {
        try {
            const formattedDate = format(selectedDate, 'yyyy-MM-dd', {timeZone: 'UTC'});
            const formattedTime = `${selectedTime.value}:00`;
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
                discount: selectedDiscount.value,
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
                {discountList.length > 0 && selectedServices && selectedServices.some(service => discountList.some(discount => discount.title === service.title)) ? (
                    <Select
                        classNamePrefix='custom-select'
                        value={selectedDiscount}
                        options={discountOptions.filter(option =>
                            selectedServices.some(service =>
                                discountList.some(discount => discount.title === service.title && discount.id === option.value)
                            )
                        )}
                        onChange={option => setSelectedDiscount(option)}
                        placeholder='Выберите скидку'
                        styles={customStyles}
                        isSearchable={false}
                    />
                ) : (
                    <p id='discountNotification'>Скидок пока нет</p>
                )}
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    discountList.length > 0 ? (
                        <div style={{"margin-right": "-16px", "margin-left": "-6px"}}>
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
                        calculateServicePrice={calculateServicePrice}
                        serviceHasDiscount={serviceHasDiscount}
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
