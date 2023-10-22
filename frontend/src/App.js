import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
	const [registerUsername, setRegisterUsername] = useState("");
	const [registerPassword, setRegisterPassword] = useState("");
	const [loginUsername, setLoginUsername] = useState("");
	const [loginPassword, setLoginPassword] = useState("");
	const backend = process.env.BACKEND;
	const register = () => {
		axios({
			method: "post",
			data: {
				username: registerUsername,
				password: registerPassword,
			},
			withCredentials: true,
			url: "http://localhost:4000/auth/register",
		}).then((res) => console.log(res));
	};
	const login = () => {
		axios({
			method: "post",
			data: {
				username: loginUsername,
				password: loginPassword,
			},
			withCredentials: true,
			url: "http://localhost:4000/auth/login",
		}).then((res) => console.log(res));
	};
	const getUser = () => {
		axios({
			method: "get",
			withCredentials: true,
			url: "http://localhost:4000/admin/home",
		}).then((res) => console.log(res));
	};
	const logout = () => {
		axios({
			method: "get",
			withCredentials: true,
			url: "http://localhost:4000/auth/logout",
		}).then((res) => console.log(res));
	};
	return (
		<div className="App">
			<div>
				<h1>Register</h1>
				<input
					placeholder="username"
					onChange={(e) => setRegisterUsername(e.target.value)}
				/>
				<input
					placeholder="password"
					onChange={(e) => setRegisterPassword(e.target.value)}
				/>
				<button onClick={register}>Submit</button>
			</div>

			<div>
				<h1>Login</h1>
				<input
					placeholder="username"
					onChange={(e) => setLoginUsername(e.target.value)}
				/>
				<input
					placeholder="password"
					onChange={(e) => setLoginPassword(e.target.value)}
				/>
				<button onClick={login}>Submit</button>
			</div>

			<div>
				<h1>Get User</h1>
				<button onClick={getUser}>check log in</button>
				<button onClick={logout}>Logout</button>
			</div>
		</div>
	);
}

export default App;
