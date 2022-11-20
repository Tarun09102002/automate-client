import { useState, useEffect } from 'react'
import Logo from '../../images/logo.svg'
import styles from './Map.module.scss'
import { MapComponent, MapRightComponent, Navbar } from '../../components/components'
import { users } from '../../utils/users'
import axios from 'axios'
import UserImage from '../../images/user.png'
import RedPin from '../../images/red-pin.png'
import BluePin from '../../images/blue-pin.png'
import PurpleUser from '../../images/purple-user.png'
import PurplePin from '../../images/purple-pin.png'

function Map() {
    const [userIndex, setUserIndex] = useState(-1)
    const [nearbyUsers, setNearbyUsers] = useState([])
    const [user, setUser] = useState(null)

    useEffect(() => {
        const fetchUsers = async () => {
            const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/user/nearby/${sessionStorage.getItem('userid')}`)
                .catch(err => console.log(err))
            setNearbyUsers(res.data.nearbyUsersData)
            setUser(res.data.user)
            console.log(nearbyUsers)
        }
        console.log(user)
        const interval = setInterval(fetchUsers, 10000);
        fetchUsers()
        return () => clearInterval(interval);
    }, [])

    return (
        <div>
            {!nearbyUsers || user === null ? <div>Loading...</div> :
                <div className={styles.container}>
                    <Navbar />
                    <div className={styles.map_container}>
                        <div className={styles.map_left}>
                            <div className={styles.indicators}>
                                <div className={styles.indicator}>
                                    <img src={RedPin} alt="" />
                                    <span> - Your start position</span>
                                </div>
                                <div className={styles.indicator}>
                                    <img src={BluePin} alt="" />
                                    <span> - Your destination</span>
                                </div>
                                <div className={styles.indicator}>
                                    <img src={UserImage} alt="" />
                                    <span> - Nearby Users</span>
                                </div>
                                <div className={styles.indicator}>
                                    <img src={PurpleUser} alt="" />
                                    <span> - Selected User</span>
                                </div>
                                <div className={styles.indicator}>
                                    <img src={PurplePin} alt="" />
                                    <span> - Selected User Destination</span>
                                </div>
                            </div>
                            <div className={styles.map_main}>
                                <MapComponent user={user} users={nearbyUsers} userIndex={userIndex} setUserIndex={setUserIndex} />
                            </div>
                        </div>
                        <div className={styles.map_right}>
                            <MapRightComponent users={nearbyUsers} userIndex={userIndex} setUserIndex={setUserIndex} />
                        </div>
                    </div>
                </div >}
        </div>
    )
}

export default Map