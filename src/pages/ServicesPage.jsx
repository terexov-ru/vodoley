import React, {useEffect, useState} from 'react'
import '../pageStyles/ServicesPage.css'
import {Header} from '../components/Header/Header';
import {Service} from '../components/Services/Service';
import CloseCross from '../media/ServiceCloseCross.png'
import {MainButton} from '../components/mainButton/MainButton';
import axios from '../utils/axios'
import {useQuery} from 'react-query';
import Select from "react-select";
import {NoContent} from "../components/NoContent/NoContent";

async function fetchServicesForAddress(addressID) {
    const {data} = await axios.post('get-services-for-address/', {addressID: addressID});
    return data;
}


const options = (addresses) =>
    addresses.map((address) => ({value: address.id, label: address.address}));
const customStyles = {
    dropdownIndicator: (provided, state) => ({
        ...provided,
        transform: state.selectProps.menuIsOpen && 'rotate(180deg)',
    }),
    container: (provided) => ({
        ...provided,
        margin: '15px 20px',
    }),
};

export const ServicesPage = ({showHeader, selectedAddressId, showButton, showAddress}) => {
    const [addressID, setAddressID] = useState(null);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [addresses, setAddresses] = useState([]);
    const [activeTab, setActiveTab] = useState('base');
    const handleTabClick = (tab) => {
        setActiveTab(tab);
        const tabLists = document.querySelectorAll('[id$="ServiceList"]');

        tabLists.forEach(list => {
            if (list.id === `${tab}ServiceList`) {
                list.classList.add("activeServiceList");
                list.classList.remove("hiddenServiceList");
            } else {
                list.classList.remove("activeServiceList");
                list.classList.add("hiddenServiceList");
            }
        });
    };
    const [selectedServices, setSelectedServices] = useState(() => {
        const storedServices = JSON.parse(localStorage.getItem('selectedServices')) || [];
        return storedServices;
    });
    const {data: servicesData} = useQuery(['services', addressID], () =>
        fetchServicesForAddress(addressID)
    );

    useEffect(() => {
        setAddressID(selectedAddressId);
    }, [selectedAddressId]);


    useEffect(() => {
        localStorage.setItem('selectedServices', JSON.stringify(selectedServices));
    }, [selectedServices]);

    useEffect(() => {
        async function fetchAddresses() {
            const {data: addressData} = await axios.get('get-addresses-list');
            setAddresses(addressData);
        }

        fetchAddresses();
    }, []);



    const mainServices = Array.isArray(servicesData)
        ? servicesData.filter((service) => service.type === false)
        : [];
    const specialServices = Array.isArray(servicesData)
        ? servicesData.filter((service) => service.type === true)
        : [];


    //скрыть подсказку
    const closeHelp = () => {
        let el = document.getElementById('ServiceHelp')
        el.style.display = (el.style.display === 'none') ? 'block' : 'none'
    }


    const handleAddressChange = (selectedOption) => {
        setSelectedAddress(selectedOption);
        setAddressID(selectedOption.value);
    };


    return (
        <div className='ServicesPage'>
            {showHeader && <Header title="Услуги" gobackto="/"/>}
            {showAddress && <div className='AddressSelector'>
                <Select
                    classNamePrefix='custom-select'
                    value={selectedAddress ? {value: selectedAddress.value, label: selectedAddress.label} : null}
                    options={options(addresses)}
                    onChange={handleAddressChange}
                    placeholder='Выберите адрес'
                    isSearchable={false}
                    styles={customStyles}
                />
            </div>}
            <div className='ServiceButtonSet'>
                <a
                    className={activeTab === 'base' ? 'active' : ''}
                    onClick={() => handleTabClick('base')}
                >
                    Основные {mainServices.length}
                </a>
                <a
                    className={activeTab === 'special' ? 'active' : ''}
                    onClick={() => handleTabClick('special')}
                >
                    Специальные {specialServices.length}
                </a>
            </div>
            {Array.isArray(servicesData) ? ( // Проверка, что servicesData является массивом
                <>
                    <div id='ServiceHelp' style={{ display: 'block' }}>
                        {/* Ваша подсказка */}
                    </div>
                    <div id='baseServiceList' className='activeServiceList'>
                        {mainServices.map((service, ind) => (
                            <Service
                                service={service}
                                selectedServices={selectedServices}
                                setSelectedServices={setSelectedServices}
                                showDisplayServiceButton={true}
                                key={ind}
                            />
                        ))}
                    </div>
                    <div id='specialServiceList' className='hiddenServiceList'>
                        {specialServices.map((service, ind) => (
                            <Service
                                service={service}
                                selectedServices={selectedServices}
                                setSelectedServices={setSelectedServices}
                                showDisplayServiceButton={true}
                                key={ind}
                            />
                        ))}
                    </div>
                    {showButton && (
                        <div className='hiddenButton'>
                            <MainButton title='Записаться' goto={`/makeorder?address=${addressID}`} />
                        </div>
                    )}
                </>
            ) : (
                <div className="centeredNoContent">
                    <NoContent/>
                </div>
            )}

        </div>
    )
}
