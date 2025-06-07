import React, { createContext, useReducer, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

const initialState = {
	user: null,
	token: localStorage.getItem("token"),
	isAuthenticated: false,
	loading: true,
	error: null,
};

const authReducer = (state, action) => {
	switch (action.type) {
		case "USER_LOADED":
			return {
				...state,
				isAuthenticated: true,
				loading: false,
				user: action.payload,
			};
		case "REGISTER_SUCCESS":
		case "LOGIN_SUCCESS":
			localStorage.setItem("token", action.payload.token);
			return {
				...state,
				token: action.payload.token,
				isAuthenticated: true,
				loading: false,
			};
		case "REGISTER_FAIL":
		case "LOGIN_FAIL":
		case "AUTH_ERROR":
		case "LOGOUT":
			localStorage.removeItem("token");
			return {
				...state,
				token: null,
				isAuthenticated: false,
				loading: false,
				user: null,
				error: action.payload,
			};
		case "CLEAR_ERROR":
			return {
				...state,
				error: null,
			};
		default:
			return state;
	}
};

export const AuthProvider = ({ children }) => {
	const [state, dispatch] = useReducer(authReducer, initialState);

	// Load user
	useEffect(() => {
		const loadUser = async () => {
			if (localStorage.token) {
				setAuthToken(localStorage.token);

				try {
					const res = await axios.get("/api/auth/me");

					dispatch({
						type: "USER_LOADED",
						payload: res.data.data,
					});
				} catch (err) {
					dispatch({ type: "AUTH_ERROR" });
				}
			} else {
				dispatch({ type: "AUTH_ERROR" });
			}
		};

		loadUser();
	}, []);

	// Set auth token header
	const setAuthToken = (token) => {
		if (token) {
			axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
		} else {
			delete axios.defaults.headers.common["Authorization"];
		}
	};
	// Register user
	const register = async (formData) => {
		try {
			const res = await axios.post("/api/auth/register", formData);

			dispatch({
				type: "REGISTER_SUCCESS",
				payload: res.data,
			});

			// Make sure to set token in headers immediately
			setAuthToken(res.data.token);

			// Wait for user data to load
			await loadUser();
			return true;
		} catch (err) {
			const errorMessage =
				err.response && err.response.data
					? err.response.data.message
					: "Registration failed";

			dispatch({
				type: "REGISTER_FAIL",
				payload: errorMessage,
			});
			return false;
		}
	};
	// Login user
	const login = async (formData) => {
		try {
			const res = await axios.post("/api/auth/login", formData);

			dispatch({
				type: "LOGIN_SUCCESS",
				payload: res.data,
			});

			// Make sure to set token in headers immediately
			setAuthToken(res.data.token);

			// Wait for user data to load
			await loadUser();
			return true;
		} catch (err) {
			const errorMessage =
				err.response && err.response.data
					? err.response.data.message
					: "Login failed";

			dispatch({
				type: "LOGIN_FAIL",
				payload: errorMessage,
			});
			return false;
		}
	};

	// Logout
	const logout = () => dispatch({ type: "LOGOUT" });

	// Clear error
	const clearError = () => dispatch({ type: "CLEAR_ERROR" });
	// Function to load user
	const loadUser = async () => {
		const token = localStorage.token;
		if (token) {
			// Ensure token is set in axios headers
			setAuthToken(token);

			try {
				const res = await axios.get("/api/auth/me");

				dispatch({
					type: "USER_LOADED",
					payload: res.data.data,
				});
				return true;
			} catch (err) {
				dispatch({ type: "AUTH_ERROR" });
				return false;
			}
		}
		return false;
	};

	return (
		<AuthContext.Provider
			value={{
				user: state.user,
				token: state.token,
				isAuthenticated: state.isAuthenticated,
				loading: state.loading,
				error: state.error,
				register,
				login,
				logout,
				clearError,
				loadUser,
			}}>
			{children}
		</AuthContext.Provider>
	);
};
