import { useEffect, useState } from 'react'
import Logo from '../../images/logo.svg'
import axios from 'axios'
import styles from './Home.module.scss'
import { Navbar } from '../../components/components'
import { useNavigate } from 'react-router-dom'


function Home() {
    const [startInputValue, setStartInputValue] = useState()
    const [startLocation, setStartLocation] = useState()
    const [endInputValue, setEndInputValue] = useState()
    const [endLocation, setEndLocation] = useState()
    const [selectedStartLocation, setSelectedStartLocation] = useState()
    const [selectedEndLocation, setSelectedEndLocation] = useState()
    const navigate = useNavigate()

    const handleChange = async (e, type) => {
        if (type === 'start') {
            setStartInputValue(e.target.value)
            const endPoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${e.target.value}.json?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}&autocomplete=true&limit=10`
            const res = await axios.get(endPoint)
            setStartLocation(res.data.features)
        }
        else {
            setEndInputValue(e.target.value)
            const endPoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${e.target.value}.json?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}&autocomplete=true&limit=10`
            const res = await axios.get(endPoint)
            setEndLocation(res.data.features)
        }
    }

    const handleSubmit = async () => {
        const startObject = {
            "coordinates": selectedStartLocation.geometry.coordinates,
            "address": selectedStartLocation.place_name
        }
        const endObject = {
            "coordinates": selectedEndLocation.geometry.coordinates,
            "address": selectedEndLocation.place_name
        }
        const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/user/locations`, { userid: sessionStorage.getItem('userid'), startObject, endObject })
        if (res.data.error === false) {
            navigate('/map')
        }
    }

    window.addEventListener('click', (e) => {
        if (e.target.id !== '1') {
            setStartLocation(false)
        }
        if (e.target.id !== '2') {
            setEndLocation(false)
        }
    })

    return (
        <div id='' className={styles.container}>
            <Navbar />
            <div className={styles.input_container}>
                <div className={styles.input}>
                    <div className={styles.title}>Find Nearby Users</div>
                    <input id='1' type="text" value={startInputValue} placeholder="Start Location..." onChange={(e) => handleChange(e, "start")} />
                    {startLocation && <div className={styles.dropdown_container}> {startLocation.map((item, index) => {
                        return <div key={index} className={styles.dropdown} onClick={() => {
                            setStartInputValue(item.place_name)
                            setSelectedStartLocation(item)
                        }}>{item.place_name}</div>
                    })}</div>}
                    <input id='2' type="text" value={endInputValue} placeholder="End Location..." onChange={(e) => handleChange(e, "end")} />
                    {endLocation && <div className={styles.dropdown_container}> {endLocation.map((item, index) => {
                        return <div key={index} className={styles.dropdown} onClick={() => {
                            setEndInputValue(item.place_name)
                            setSelectedEndLocation(item)
                        }}>{item.place_name}</div>
                    })}</div>}
                    <button onClick={() => { handleSubmit() }}>Locate Nearby Users</button>
                </div>
            </div>
        </div>

    )
}

export default Home