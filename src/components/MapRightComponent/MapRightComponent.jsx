import { useState, useEffect } from 'react'
import styles from './MapRightComponent.module.scss'
import { CometChat } from '@cometchat-pro/chat'
import { useNavigate } from 'react-router-dom'

function MapRightComponent({ users, userIndex, setUserIndex }) {
    const navigate = useNavigate()
    const sendMessage = (user) => {
        let recieverId = user._id
        let messageText = "Hello"
        let receiverType = CometChat.RECEIVER_TYPE.USER;
        let textMessage = new CometChat.TextMessage(recieverId, messageText, receiverType);
        console.log(textMessage)
        CometChat.sendMessage(textMessage).then(
            message => {
                console.log("Message sent successfully:", message);
                navigate(`/chat`)
            },
            error => {
                console.log("Message sending failed with error:", error);
            }
        )
    }
    return (
        <div className={styles.map_right}>
            {users.map((user, index) => {
                return (
                    <div className={styles.user_card} key={index} style={{
                        backgroundColor: `${index === userIndex ? '#e6e6e6' : '#ffffff'}`
                    }} onClick={() => setUserIndex((prev) => {
                        if (prev === index) return -1
                        return index
                    })}>
                        <div className={styles.name}>{user.username}</div>
                        <div className={styles.address}>
                            <span className={styles.title}>Start Position:-</span>
                            <span className={styles.address_line}> {user.startLocation.address}</span>
                        </div>
                        <div className={styles.address}>
                            <span className={styles.title}>Destination:-</span>
                            <span className={styles.address_line}> {user.endLocation.address}</span>
                        </div>
                        <button onClick={() => sendMessage(user)}>Chat</button>
                    </div>
                )
            })}
        </div>
    )
}

export default MapRightComponent