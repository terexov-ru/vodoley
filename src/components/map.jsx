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


    useEffect(() => {
        if (selectedAddress) {
            let newCenter = [selectedAddress.latitude, selectedAddress.longitude];

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
                     options={{
                         suppressMapOpenBlock: true, // Скрывает блок с дополнительной информацией о карте
                     }}
                >
                    {addresses.map((address) => (
                        <Placemark
                            key={address.id}
                            geometry={[
                                parseFloat(address.latitude) || 0,
                                parseFloat(address.longitude) || 0,
                            ]}
                            properties={{
                                balloonContent: address.address,
                            }}
                            options={{
                                preset: selectedAddress === address ? 'islands#redCircleDotIcon' : 'islands#blueCircleDotIcon',
                            }}
                            modules={['geoObject.addon.balloon']}
                        />
                    ))}
                    {/*{addresses.map((address) => (*/}
                    {/*<Placemark*/}
                    {/*    key={address.id}*/}
                    {/*    geometry={[60.09178132652299, 30.39640071114599]} // Replace with desired latitude and longitude for the first Placemark*/}
                    {/*    properties={{*/}
                    {/*        balloonContent: 'First Placemark',*/}
                    {/*    }}*/}
                    {/*    options={{*/}
                    {/*        preset: selectedAddress === address ? 'islands#redCircleDotIcon' : 'islands#blueCircleDotIcon',*/}
                    {/*    }}*/}
                    {/*    modules={['geoObject.addon.balloon']}*/}
                    {/*/>           ))}*/}
                    {/*{addresses.map((address) => (*/}
                    {/*<Placemark*/}
                    {/*    key={address.id}*/}
                    {/*    geometry={[60.07013481794439, 30.395003216876574]} // Replace with desired latitude and longitude for the second Placemark*/}
                    {/*    properties={{*/}
                    {/*        balloonContent: 'Second Placemark',*/}
                    {/*    }}*/}
                    {/*    options={{*/}
                    {/*        preset: selectedAddress === address ? 'islands#redCircleDotIcon' : 'islands#blueCircleDotIcon',*/}
                    {/*    }}*/}
                    {/*    modules={['geoObject.addon.balloon']}*/}
                    {/*/>*/}
                    {/*))}*/}
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
                    <img style={{width: '40px'}}
                         src={fullScreenIcon} />
                </button>
            </div>

        </div>
    );
};

export default SimpleMap;
