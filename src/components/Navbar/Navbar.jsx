import React from 'react'
import logo from '../../images/logo.svg'
import styles from './Navbar.module.scss'
import { useNavigate } from 'react-router-dom'

function Navbar() {
    const navigate = useNavigate()

    return (
        <div className={styles.navbar} >
            <div className={styles.navbar_left}>
                <img src={logo} alt="" className={styles.navbar_logo} onClick={() => navigate('/')} />
                <span className={styles.navbar_title}>AutoMate</span>
            </div>
            <div className={styles.navbar_right}>
                <div onClick={() => navigate(`/chat`)} className={styles.nav}>Chat</div>
            </div>
        </div>
    )
}

export default Navbar