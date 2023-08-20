import React, {useEffect, useState} from 'react'
import '../pageStyles/ServicesPage.css'
import {Header} from '../components/Header/Header';
import {Service} from '../components/Services/Service';
import CloseCross from '../media/ServiceCloseCross.png'
import {MainButton} from '../components/mainButton/MainButton';
import axios from '../utils/axios'
import {useQuery} from 'react-query';
import Select from "react-select";

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
        setAddressID(selectedAddressId); // Set addressID for fetching services
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



    const mainServices = servicesData && servicesData.filter(service => service.type === false);
    const specialServices = servicesData && servicesData.filter(service => service.type === true);


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
                    options={options(addresses)} // Use the 'options' function here
                    onChange={handleAddressChange}
                    placeholder='Выберите адрес'
                    isSearchable={false}
                    styles={customStyles} // Use the 'customStyles' object here
                />
            </div>}

            <div className='ServiceButtonSet'>
                <a
                    className={activeTab === 'base' ? 'active' : ''}
                    onClick={() => handleTabClick('base')}
                >
                    Основные {servicesData ? mainServices.length : 0}
                </a>
                <a
                    className={activeTab === 'special' ? 'active' : ''}
                    onClick={() => handleTabClick('special')}
                >
                    Специальные {servicesData ? specialServices.length : 0}
                </a>
            </div>
            <div id='ServiceHelp' style={{display: 'block',}}>
                <div className='ServiceHelp'>
                    <p>Выберете интересующие вас услуги.</p>
                    <button className='ServiceCloseCross' onClick={closeHelp}>
                        <img src={CloseCross}/>
                    </button>
                </div>
            </div>

            {servicesData && (

                <div id='baseServiceList' className='activeServiceList'>
                    {mainServices.map((service, ind) => (
                        <Service service={service}
                                 selectedServices={selectedServices}
                                 setSelectedServices={setSelectedServices}
                                 key={ind}
                        />
                    ))}
                </div>
            )}
            {servicesData && (
                <div id='specialServiceList' className='hiddenServiceList'>
                    {specialServices.map((service, ind) => (
                        <Service service={service}
                                 selectedServices={selectedServices}
                                 setSelectedServices={setSelectedServices}
                                 key={ind}
                        />
                    ))}
                </div>
            )}
            {showButton &&
                <div className='hiddenButton'>
                    <MainButton title='Записаться' goto={`/makeorder?address=${addressID}`}/>
                </div>
            }

        </div>
    )
}
