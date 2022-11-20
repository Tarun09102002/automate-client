import { useState } from 'react'
import styles from './RegisterComponent.module.scss'
import axios from 'axios'
import { CometChat } from '@cometchat-pro/chat'
const appID = '224922fe873c7228';
const region = 'us';
const appSetting = new CometChat.AppSettingsBuilder().subscribePresenceForAllUsers().setRegion(region).build();
CometChat.init(appID, appSetting).then(
    () => {
        console.log("Initialization completed successfully");
        // You can now call login function.
    },
    error => {
        console.log("Initialization failed with error:", error);
        // Check the reason for error and take appropriate action.
    }
)

function RegisterComponent({ setIsRegisterSelected }) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(username, password, email, confirmPassword)
        if (!username || !password || !email || !confirmPassword) {
            setError('All fields are required')
        }
        else if (password !== confirmPassword) {
            setError('Passwords do not match')
        }
        else {
            setError('')
            const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/users/register`, { username, password, email }).catch(err => {
                console.log(err)
                setError(err.response.data.message)
            })
            console.log(res)
            if (error === '') {
                console.log(res)
                console.log('User registered successfully')
                let authKey = "0d5366ead3a4658476daf2deba15e35be4cc0b0e";
                var uid = res.data.token;
                var name = username;
                var user = new CometChat.User(uid);
                user.setName(name);
                CometChat.createUser(user, authKey).then(
                    user => {
                        console.log("user created", user);
                    }, error => {
                        console.log("error", error);
                    }
                )
                alert('User created successfully')
                setIsRegisterSelected(false)
            }
        }
    }

    return (
        <form className={styles.container} onSubmit={handleSubmit}>
            <div className={styles.inputs}>
                <input type="text" placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                <input type="password" placeholder='Confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                <div className={styles.error}>{error}</div>
            </div>
            <button type='submit'>Register</button>
        </form>
    )
}

export default RegisterComponent