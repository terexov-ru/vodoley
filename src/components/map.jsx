// import React from 'react';
// import GoogleMapReact from "google-map-react";
import mapPinImage from '../media/Map_Pin.png'
//
// const SimpleMap = ({ center, markers }) => {
//     return (
//         <div
//             style={{
//                 height: '134px',
//                 width: '328px',
//                 marginLeft: '16px',
//                 marginTop: '16px',
//                 marginBottom: '0',
//                 borderRadius: '8px',
//                 overflow: 'hidden',
//             }}
//         >
//             <GoogleMapReact
//                 center={center}
//                 zoom={10}
//                 mapContainerStyle={{ width: '100%', height: '400px' }}
//             >
//                 {markers.map((marker, index) => (
//                     <div
//                         key={index}
//                         lat={marker.position.lat}
//                         lng={marker.position.lng}
//                         style={{ width: '40px', height: '40px' }} // Apply styling to the wrapper div
//                     >
//                         <img
//                             src={mapPinImage}
//                             alt="Marker"
//                             style={{ width: '100%', height: '100%' }}
//                         />
//                     </div>
//                 ))}
//             </GoogleMapReact>
//         </div>
//     );
// };
//
// export default SimpleMap;

// import React from 'react';
// import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';

// export default function App() {
//     const defaultState = {
//         center: [55.751574, 37.573856],
//         zoom: 5,
//     };
//
//     return (
//         <YMaps>
//             <Map defaultState={defaultState}>
//                 <Placemark geometry={[[55.684758, 37.738521], [53.684758, 38.738521]]} />
//                 {/*<Placemark geometry={[53.684758, 38.738521]} />*/}
//             </Map>
//         </YMaps>
//     );
// }

// import React from 'react';
// import { YMaps, Map, Placemark } from 'react-yandex-maps';

import React, {useEffect, useRef, useState} from 'react';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import fullScreenIcon from '../media/Frame10.png'

const SimpleMap = ({ addresses, selectedAddress }) => {
    const mapState = {
        center: [60.09178132652299, 30.39640071114599],
        zoom: 10,
    };

    const [isFullScreen, setIsFullScreen] = useState(false);
    const mapContainerRef = useRef(null);

    let tempLat = 60.11948495663695; // Temporary latitude value
    let tempLng = 30.403222492525114; // Temporary longitude value


    useEffect(() => {
        if (selectedAddress) {
            let newCenter = [60.09178132652299, 30.39640071114599]; // Default center

            // Check if the selected address has a specific ID
            if (selectedAddress.id === 2) {
                newCenter = [60.07013481794439, 30.395003216876574]; // Replace with the desired coordinates
            }

            mapRef && mapRef.setCenter(newCenter, mapState.zoom);
            mapRef && mapRef.setZoom(15);
        }
    }, [selectedAddress]);

    let mapRef = null;



    return (
        <div className={`map-container ${isFullScreen ? 'fullscreen' : ''}`}
             ref={mapContainerRef}
             style={{
                 height: isFullScreen ? '100vh' : '134px', // Растягиваем на весь экран или возвращаем обычную высоту
                 width: '328px',
                 marginLeft: '16px',
                 marginTop: '16px',
                 marginBottom: '0',
                 borderRadius: '8px',
                 overflow: 'hidden',
                 position: 'relative', // Добавляем абсолютное позиционировани
             }}>
            <YMaps>
                <Map state={mapState} width='100%'  height={isFullScreen ? '100vh' : '134px'} // Растягиваем на весь экран или возвращаем обычную высоту
                     instanceRef={(ref) => (mapRef = ref)} // Сохраняем ссылку на объект карты
                >
                    {/*{addresses.map((address) => (*/}
                    {/*    <Placemark*/}
                    {/*        key={address.id}*/}
                    {/*        geometry={[*/}
                    {/*            parseFloat(address.latitude) || 0,*/}
                    {/*            parseFloat(address.longitude) || 0,*/}
                    {/*        ]}*/}
                    {/*        properties={{*/}
                    {/*            balloonContent: address.address,*/}
                    {/*        }}*/}
                    {/*        options={{*/}
                    {/*            preset: selectedAddress === address ? 'islands#redCircleDotIcon' : 'islands#blueCircleDotIcon',*/}
                    {/*        }}*/}
                    {/*        modules={['geoObject.addon.balloon']}*/}
                    {/*    />*/}
                    {/*))}*/}
                    {addresses.map((address) => (
                        <Placemark
                            key={address.id}
                            geometry={[60.09178132652299, 30.39640071114599]} // Replace with desired latitude and longitude for the first Placemark
                            properties={{
                                balloonContent: 'First Placemark',
                            }}
                            options={{
                                preset: selectedAddress === address ? 'islands#redCircleDotIcon' : 'islands#blueCircleDotIcon',
                            }}
                            modules={['geoObject.addon.balloon']}
                        />           ))}
                    {addresses.map((address) => (
                        <Placemark
                            key={address.id}
                            geometry={[60.07013481794439, 30.395003216876574]} // Replace with desired latitude and longitude for the second Placemark
                            properties={{
                                balloonContent: 'Second Placemark',
                            }}
                            options={{
                                preset: selectedAddress === address ? 'islands#redCircleDotIcon' : 'islands#blueCircleDotIcon',
                            }}
                            modules={['geoObject.addon.balloon']}
                        />
                    ))}
                </Map>
            </YMaps>
            <div style={{
                position: 'absolute',
                bottom: '12px',
                right: '12px',
                zIndex: '1000',
            }}>
                <button style={{
                    border: 'none',
                    appearance: 'none',
                    background: 'transparent'
                }} onClick={() => setIsFullScreen(!isFullScreen)}>
                    <img
                        src={fullScreenIcon} />
                </button>
            </div>

        </div>
    );
};

export default SimpleMap;