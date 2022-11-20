import { useState, useEffect } from 'react'
import 'mapbox-gl/dist/mapbox-gl.css';
import Map, { Marker, NavigationControl, Popup, GeolocateControl } from 'react-map-gl'
import './MapComponent.scss'
import UserImage from '../../images/user.png'
import RedPin from '../../images/red-pin.png'
import BluePin from '../../images/blue-pin.png'
import PurpleUser from '../../images/purple-user.png'
import PurplePin from '../../images/purple-pin.png'

function MapComponent({ users, userIndex, setUserIndex, user }) {
    const [userLocation, setUserLocation] = useState(null)

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function (position) {
            setUserLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            })
        });
    }, [])
    console.log(userIndex)
    return (
        <div>
            {/* {userLocation ? */}
            <Map mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN} id="map-display"
                style={{
                    width: '100%',
                    height: '85vh',
                    borderRadius: '20px'
                }}
                initialViewState={{
                    latitude: user?.startLocation.coordinates[1],
                    longitude: user?.startLocation.coordinates[0],
                    zoom: 15
                }}
                mapStyle="mapbox://styles/mapbox/streets-v11">
                <NavigationControl />
                <GeolocateControl
                    onGeolocate={location => {
                        setUserLocation({ ...userLocation, latitude: location.coords.latitude, longitude: location.coords.longitude })
                    }}
                />
                {userIndex >= 0 &&
                    <Marker latitude={users[userIndex].endLocation.coordinates[1]} longitude={users[userIndex].endLocation.coordinates[0]}
                        offsetLeft={-20} offsetTop={-40} >
                        <img src={PurplePin} height="40px" style={{
                            transform: 'translate(0, -50%)'
                        }}></img>
                    </Marker>
                }
                <Marker latitude={user.startLocation.coordinates[1]} longitude={user.startLocation.coordinates[0]} style={{
                    cursor: 'pointer'
                }} offsetLeft={-20} offsetTop={-40} >
                    <img src={RedPin} height="40px" style={{
                        transform: 'translate(0, -50%)'
                    }}></img>
                </Marker>
                <Marker latitude={user.endLocation.coordinates[1]} longitude={user.endLocation.coordinates[0]} style={{
                    cursor: 'pointer'
                }} offsetLeft={-20} offsetTop={-40} >
                    <img src={BluePin} height="40px" style={{
                        transform: 'translate(0, -50%)'
                    }}></img>
                </Marker>
                {
                    users?.map((marker, index) => {
                        console.log(marker)
                        if (index === userIndex) {
                            return (
                                < Marker
                                    longitude={marker?.startLocation.coordinates[0]}
                                    latitude={marker?.startLocation.coordinates[1]}
                                    onClick={() => setUserIndex((prev) => {
                                        if (prev === index) return -1
                                        return index
                                    })}
                                    style={{
                                        cursor: 'pointer'
                                    }}
                                    color="#800080"
                                    offsetLeft={-20} offsetTop={-40} >
                                    <img src={PurpleUser} height="40px" style={{
                                        transform: 'translate(0, -50%)'
                                    }}></img>
                                </Marker>
                            )
                        }
                        else {
                            return (
                                < Marker key={index}
                                    longitude={marker?.startLocation.coordinates[0]}
                                    latitude={marker?.startLocation.coordinates[1]}
                                    onClick={() => setUserIndex((prev) => {
                                        if (prev === index) return -1
                                        return index
                                    })}
                                    color={`${index === userIndex ? '#800080' : '#000000'}`}
                                    style={{
                                        cursor: 'pointer'
                                    }}
                                >
                                    <img src={UserImage} height="40px" style={{
                                        transform: 'translate(0, -50%)'
                                    }}></img>
                                </Marker>
                            )
                        }
                    })
                }
                <div style={{
                    backgroundColor: 'white',
                }}>Hlelo</div>
                {/* {selectedIndex && customPopUp(selectedIndex, markers[selectedIndex])} */}
            </Map >
        </div >
    )
}

export default MapComponent