import React, { useEffect, useState } from "react";
import "../pageStyles/OrderPage.css";
import { Header } from "../components/Header/Header";
import axios from "../utils/axios";
import queryString from "query-string";
import { Navigate, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Service } from "../components/Services/Service";
import { OrderPosition } from "../components/Order/OrderPosition";
import { ServicePopup } from "../components/Services/ServicePopup";
import { DiscountCarousel } from "../components/DiscountCarousel/DiscountCarousel";
import { QueryClient, useMutation } from "react-query";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker, { registerLocale } from "react-datepicker";
import "../components/Order/React-select.scss";
import ru from "date-fns/locale/ru";
import { format } from "date-fns";

export const OrderPage = () => {
  const queryClient = new QueryClient();
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [selectedDate, setSelectedDate] = useState(Date.now());
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedPaymentOption, setSelectedPaymentOption] = useState("");
  const [paymentOptions, setPaymentOptions] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [discountList, setDiscountList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormFilled, setIsFormFilled] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [addressChangeCounter, setAddressChangeCounter] = useState(0);
  const selectedAddressData = addresses.find(
    (address) => address.id === selectedAddress
  );
  const [selectedDiscount, setSelectedDiscount] = useState("");
  const [discountOptions, setDiscountOptions] = useState([]);
  const [redirected, setRedirected] = useState(false);
  const [serverTimeIntervals, setServerTimeIntervals] = useState([]);

  const fetchServerTimeIntervals = async () => {
    if (selectedDate && selectedAddress) {
      try {
        const formattedDate = format(selectedDate, "yyyy-MM-dd");

        const response = await axios.post("/get-address-timings/", {
          id: selectedAddress,
          date: formattedDate,
        });

        if (response.status === 200) {
          setServerTimeIntervals(response.data);
        } else {
          console.error("Ошибка при получении временных интервалов с сервера");
        }
      } catch (error) {
        console.error("Ошибка при запросе к серверу:", error);
      }
    }
  };
  useEffect(() => {
    fetchServerTimeIntervals();
  }, [selectedDate, selectedAddress]);

  useEffect(() => {
    if (!redirected) {
      const storedToken = window.localStorage.getItem("VodoleyToken");
      if (token) {
        if (token === storedToken) {
        } else if (token !== storedToken) {
          window.localStorage.setItem("VodoleyToken", token);
          window.location.reload();
        }
      } else {
      }
      setRedirected(true);
    }
  }, [navigate]);

  useEffect(() => {}, [selectedAddress, selectedServices]);

  useEffect(() => {
    setIsLoading(true);
    const parsed = queryString.parse(location.search);
    const queryAddressId = parsed.address;

    axios.get("get-user-discounts/").then((response) => {
      setDiscountList(response.data);
      setDiscountOptions(
        response.data.map((discount) => ({
          value: discount.id,
          label: discount.title,
        }))
      );
    });
    axios.get("get-addresses-list").then((response) => {
      setAddresses(response.data);
      if (queryAddressId) {
        setSelectedAddress(parseInt(queryAddressId));
      }
    });

    axios
      .get("get-payment-methods/")
      .then((response) => {
        setPaymentOptions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching payment options:", error);
      });
    const storedServices = JSON.parse(localStorage.getItem("selectedServices"));
    if (storedServices === null || storedServices === undefined) {
      localStorage.setItem("selectedServices", JSON.stringify([]));
    }

    setSelectedServices(storedServices);
    setIsLoading(false);
  }, [location]);

  useEffect(() => {
    if (paymentOptions.length > 0) {
      setSelectedPaymentOption(paymentOptions[0].id);
    }
  }, [paymentOptions]);

  useEffect(() => {
    // Проверьте, есть ли в локальном хранилище сохраненные выбранные услуги.
    const storedServices = JSON.parse(localStorage.getItem("selectedServices"));
    if (storedServices === null || storedServices === undefined) {
      localStorage.setItem("selectedServices", JSON.stringify([]));
    }

    // Установите выбранные услуги из локального хранилища.
    setSelectedServices(storedServices);

    // Убедитесь, что isFormFilled устанавливается правильно при открытии формы.
    const areRequiredFieldsFilled =
      selectedAddress !== "" &&
      selectedDate !== null &&
      selectedTime &&
      selectedTime.value && // Проверка на объект времени
      selectedServices.length > 0;

    setIsFormFilled(areRequiredFieldsFilled);
  }, [location]);

  useEffect(() => {
    const areRequiredFieldsFilled =
      selectedAddress !== "" &&
      selectedDate !== null &&
      selectedTime !== "" &&
      selectedServices.length > 0;

    setIsFormFilled(areRequiredFieldsFilled);
  }, [selectedAddress, selectedDate, selectedTime, selectedServices]);

  const handleGoToCatalog = () => {
    if (!selectedAddress) {
      setButtonClicked(true);
    } else if (!showPopup) {
      // Добавьте это условие
      setShowPopup(true);
    }
  };

  const closePopup = () => {
    const storedServices = JSON.parse(localStorage.getItem("selectedServices"));
    setSelectedServices(storedServices);
    setShowPopup(false); // Закрываем попап
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isFormFilled) {
      const formattedDate = format(selectedDate, "yyyy-MM-dd", {
        timeZone: "UTC",
      });
      const formattedTime = `${selectedTime.value || selectedTime}:00`;

      const data = {
        address: selectedAddress,
        discount: selectedDiscount ? selectedDiscount.value : undefined,
        paymentType: selectedPaymentOption,
        servicesList: selectedServices.map((service) => service.id),
        time: formattedDate + " " + formattedTime,
      };

      try {
        const response = await axios.post("create-checkout/", data);

        if (response.status === 200) {
          localStorage.setItem("selectedServices", JSON.stringify([]));
          navigate("/myorders");
        } else {
        }
      } catch (error) {
        if (error.response && error.response.status === 500) {
          console.error("Internal Server Error:", error);
        } else {
          console.error("Error:", error);
        }
      }
    } else {
      console.log("Please fill in all required fields.");
      return false; // Prevent form submission
    }
  };

  const handleServiceChange = (updatedServices) => {
    setSelectedServices(updatedServices);
    localStorage.setItem("selectedServices", JSON.stringify(updatedServices));
  };

  const renderedServices =
    selectedServices && selectedServices.length > 0
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
      const selectedDiscountVisits =
        discountList.find((discount) => discount.id === selectedDiscount.value)
          ?.visits || 0;
      const discountPercentage = calculateDiscountPercentage(
        selectedDiscountVisits
      );

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

    if (selectedPaymentOption.title === "На сайте со скидкой 5%") {
      return totalPrice - totalPrice * 0.05;
    }

    return totalPrice;
  };

  const serviceHasDiscount = (service) => {
    if (!selectedDiscount) {
      return false;
    }

    const selectedDiscountVisits =
      discountList.find((discount) => discount.id === selectedDiscount.value)
        ?.visits || 0;

    return (
      service.title === selectedDiscount.label &&
      calculateDiscountPercentage(selectedDiscountVisits) > 0
    );
  };

  const handleAddressChange = (option) => {
    setSelectedAddress(option.value);
    navigate(`/makeorder?address=${option.value}`);
    setButtonClicked(false);
    setAddressChangeCounter((prevCounter) => prevCounter + 1);
    localStorage.setItem("selectedServices", JSON.stringify([]));
    setSelectedServices([]);
  };

  const options = (addresses) =>
    addresses.map((address) => ({ value: address.id, label: address.address }));

  const customStyles = {
    dropdownIndicator: (provided, state) => ({
      ...provided,
      transform: state.selectProps.menuIsOpen && "rotate(180deg)",
    }),
  };
  registerLocale("ru", ru);

  const filteredTimeIntervals = serverTimeIntervals.filter((time) => {
    const currentTime = new Date();
    const timeParts = time.split(":");
    const timeDate = new Date(selectedDate);
    timeDate.setHours(parseInt(timeParts[0]), parseInt(timeParts[1]));

    return timeDate >= currentTime;
  });

  useEffect(() => {
    if (filteredTimeIntervals.length > 0 && !selectedTime) {
      setSelectedTime({
        value: filteredTimeIntervals[0],
        label: filteredTimeIntervals[0],
      });
    }
  }, [filteredTimeIntervals, selectedTime]);

  return (
    <>
      <Header gobackto="/" title="Записаться" />
      <form className="OrderPage">
        <h1 className="OrderFormTitle">Адрес</h1>
        <Select
          classNamePrefix={`custom-select${
            buttonClicked && !selectedAddress ? "invalid-select" : ""
          }`} // Step 2
          value={
            selectedAddress
              ? {
                  value: selectedAddress,
                  label: addresses.find(
                    (address) => address.id === selectedAddress
                  )?.address,
                }
              : selectedAddress
          }
          options={options(addresses)}
          onChange={handleAddressChange}
          placeholder="Выберите адрес"
          isSearchable={false}
          styles={customStyles}
        />
        <NavLink to="/address">
          <button className="OrderPage_button">Выбрать на карте</button>
        </NavLink>
        <h1 className="OrderFormTitle">Услуги</h1>
        <div>{renderedServices}</div>

        <button className="OrderPage_button" onClick={handleGoToCatalog}>
          Перейти в каталог
        </button>
        <h1 className="OrderFormTitle">Дата и время</h1>
        <div style={{ display: "flex", alignItems: "flex-start" }}>
          <DatePicker
            locale="ru"
            className="custom-date-input"
            dateFormat="dd.MM.yyyy"
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            placeholderText="Выберите дату"
            minDate={new Date()}
            disabledKeyboardNavigation
            onFocus={(e) => e.target.blur()}
          />
          <Select
            classNamePrefix="custom-select_time"
            value={selectedTime}
            label={selectedTime}
            onChange={(option) => setSelectedTime(option)}
            options={filteredTimeIntervals.map((time) => ({
              value: time,
              label: time,
            }))}
            placeholder={filteredTimeIntervals[0]}
            noOptionsMessage={() => "На выбранный день, нет доступного времени"}
            styles={customStyles}
            isSearchable={false}
          />
        </div>
        <h1 className="OrderFormTitle">Скидки</h1>
        {discountList.length > 0 &&
        selectedServices &&
        selectedServices.some((service) =>
          discountList.some((discount) => discount.title === service.title)
        ) ? (
          <Select
            classNamePrefix="custom-select"
            value={selectedDiscount}
            options={discountOptions.filter((option) =>
              selectedServices.some((service) =>
                discountList.some(
                  (discount) =>
                    discount.title === service.title &&
                    discount.id === option.value
                )
              )
            )}
            onChange={(option) => setSelectedDiscount(option)}
            placeholder="Выберите скидку"
            styles={customStyles}
            isSearchable={false}
          />
        ) : (
          <p id="discountNotification">Текущих скидок пока нет</p>
        )}
        {isLoading ? (
          <p>Loading...</p>
        ) : discountList.length > 0 ? (
          <div style={{ "margin-right": "-16px", "margin-left": "-6px" }}>
            <DiscountCarousel showDiscount={true} discount={discountList} />
          </div>
        ) : (
          <div style={{ "margin-right": "-16px", "margin-left": "-6px" }}>
            <DiscountCarousel />
            <p
              style={{ "margin-top": "0px", "margin-left": "6px" }}
              id="discountNotification"
            >
              Скидок пока нет
            </p>
          </div>
        )}
        <h1 className="OrderFormTitle">Способ оплаты</h1>
        <Select
          classNamePrefix="custom-select"
          value={{
            value: selectedPaymentOption,
            label: paymentOptions.find(
              (option) => option.id === selectedPaymentOption
            )?.title,
          }}
          options={paymentOptions.map((option) => ({
            value: option.id,
            label: option.title,
          }))}
          onChange={(option) => setSelectedPaymentOption(option.value)}
          placeholder="Выберите способ оплаты"
          styles={customStyles}
          isSearchable={false}
        />
        <p id="paymentNotification">
          При неявке по записи оплата не возвращается
        </p>
        <div style={{ "margin-bottom": "40px" }}>
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
        <button
          className="OrderPage_button"
          type="button"
          onClick={handleSubmit}
          disabled={!isFormFilled}
        >
          Оплатить
        </button>
      </form>
    </>
  );
};
