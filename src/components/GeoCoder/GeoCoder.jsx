import React from 'react'
import MapBoxGeoCoder from '@mapbox/mapbox-gl-geocoder'
import { useControl } from 'react-map-gl'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'

function GeoCoder() {
    const ctrl = new MapBoxGeoCoder({
        accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
    })

    useControl(() => ctrl)
    ctrl.on('result', (e) => {
        const cords = e.result.geometry.coordinates
        console.log(cords)
    })
    return (
        null
    )
}

export default GeoCoder