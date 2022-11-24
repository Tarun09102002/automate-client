import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CometChat } from "@cometchat-pro/chat";
import style from "../RegisterComponent/RegisterComponent.module.scss";
import axios from "axios";
let authKey = "0d5366ead3a4658476daf2deba15e35be4cc0b0e";
const appID = "224922fe873c7228";
const region = "us";
const appSetting = new CometChat.AppSettingsBuilder()
	.subscribePresenceForAllUsers()
	.setRegion(region)
	.build();
CometChat.init(appID, appSetting).then(
	() => {
		console.log("Initialization completed successfully");
		// You can now call login function.
	},
	(error) => {
		console.log("Initialization failed with error:", error);
		// Check the reason for error and take appropriate action.
	}
);

function LoginComponent() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();
	//temp
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (username === "" || password === "") {
			setError("Please fill all the fields");
		} else {
			setError("");
			const res = await axios
				.post(`${process.env.REACT_APP_SERVER_URL}/users/login`, {
					username,
					password,
				})
				.catch((err) => {
					console.log(err);
					setError(err.response.data.message);
				});
			// if (res.data.error) {
			//     setError(res.data.error)
			// }
			if (error === "") {
				// else {
				alert("User logged in successfully!!!!");
				sessionStorage.setItem("userid", res.data.token);
				CometChat.login(res.data.token, authKey).then(
					(user) => {
						console.log("Login Successful:", { user });
					},
					(error) => {
						console.log("Login failed with exception:", { error });
					}
				);
				navigate("/");
			}
		}
	};

	return (
		<form className={style.container} onSubmit={handleSubmit}>
			<div className={style.inputs}>
				<input
					type="text"
					placeholder="Username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
				<input
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<div className={style.error}>{error}</div>
			</div>

			<button type="submit">Login</button>
		</form>
	);
}

export default LoginComponent;
