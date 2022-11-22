import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { Login, Home, Map, Chat } from './pages/pages.js';
import { useEffect, useState } from 'react';
import './App.scss';
import './css/theme.scss'
import axios from 'axios';

function App() {
	const [online, setOnline] = useState(navigator.onLine);
	//hello

	const setUserActive = async (active) => {
		console.log(active)
		if (sessionStorage.getItem('userid')) {
			await axios.post(`${process.env.REACT_APP_SERVER_URL}/users/active`, { userid: sessionStorage.getItem('userid'), active: active })
		}
	}
	const InternetCheck = async () => {
		if (navigator.onLine) {
			setOnline(true);
		} else {
			if (sessionStorage.getItem('userid')) {
				setUserActive(false);
			}

			setOnline(false);
		}
	}

	useEffect(() => {
		const interval = setInterval(InternetCheck, 6000);
		setUserActive(true);
		return () => {
			setUserActive(false);
			clearInterval(interval);
		}
	}, [])

	return (
		<div className="App">
			{online ?
				<Routes>
					<Route path='/login' element={<Login />} />
					<Route path='/' element={<ProtectedRoutes />}>
						<Route path='/' element={<Home />} />
						<Route path='/map' element={<Map />} />
						<Route path='/chat' element={<Chat />} />
					</Route>
				</Routes> :
				<div>Could not connect to internet</div>
			}
		</div>
	);
}

const ProtectedRoutes = () => {
	return (
		sessionStorage.getItem('userid') ? <Outlet /> : <Navigate to='/login' />
	)
}

export default App;
