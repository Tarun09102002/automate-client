import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Logo from '../../images/logo.svg'
import Rickshaw from '../../images/rickshaw.png'
import './Login.scss'
import { LoginComponent, RegisterComponent } from '../../components/components'

function Login() {
    const [isRegisterSelected, setIsRegisterSelected] = useState(false)
    const navigate = useNavigate()

    return (
        <div className='container'>
            <div className='navbar' onClick={() => navigate('/')}>
                <img src={Logo} alt="" className='logo' />
                <span>AutoMate</span>
            </div>
            <div className='login'>
                <div className='login_left'>
                    <div className='options'>
                        <span className={`option first ${!isRegisterSelected && 'selected'}`} onClick={() => setIsRegisterSelected(false)}>Login</span>
                        <span className={`option second ${isRegisterSelected && 'selected'}`} onClick={() => setIsRegisterSelected(true)}>Register</span>
                    </div>
                    <div className='form'>
                        {isRegisterSelected ? <RegisterComponent setIsRegisterSelected={setIsRegisterSelected} /> : <LoginComponent setIsRegisterSelected={setIsRegisterSelected} />}
                    </div>
                </div>
                <div className='login_right'>
                    <img src={Rickshaw} alt="" />
                </div>
            </div>
        </div>

    )
}

export default Login