import { createSlice } from "@reduxjs/toolkit"
import axios from "axios";

export const STATUSES = Object.freeze({
    IDLE: "idle",
    ERROR: "error",
    LOADING: "loading"
});

//make userSlice
const userSlice = createSlice({
    name: "user",
    initialState: {
        data: { isAuthenticated: false, message: "" },
        status: STATUSES.IDLE,
    },
    reducers: {
        loginUser(state, action) {
            state.data = { ...state.data, ...action.payload }
        },
        setStatus(state, action) {
            state.status = action.payload
        }
    }
});

export const { loginUser, setStatus } = userSlice.actions;
export default userSlice.reducer;

//Thunk -> programming term which means an object which take time to run

//login user
export function getUserDetails(email, password) {
    return async function getUserDetailsThunk(dispatch, getState) {
        dispatch(setStatus(STATUSES.LOADING));
        try {
            const response = await axios.post("/api/v1/login", { email, password });
            const requireData = {
                name: response.data.user.name,
                email: response.data.user.email,
                isAuthenticated: true,
                message: "",
                image: response.data.user.avatar.url,
            }
            dispatch(loginUser(requireData));
            dispatch(setStatus(STATUSES.IDLE));
        } catch (error) {
            // console.log({ error: error.response.data.message, isAuthenticated: false });
            dispatch(loginUser({ message: error.response.data.message, isAuthenticated: false }))
            dispatch(setStatus(STATUSES.ERROR));
        }
    }
}

//user login at open browser
export function defaultUserLogin() {
    return async function defaultUserLoginThunk(dispatch, getState) {
        try {
            const response = await axios.get("/api/v1/me");
            const requireData = {
                name: response.data.user.name,
                email: response.data.user.email,
                isAuthenticated: true,
                message: "",
                image: response.data.user.avatar.url,
            }
            dispatch(loginUser(requireData));
            // console.log(response.data)
        }
        catch (error) {
            // console.log(error)
            // dispatch(loginUser([]));
        }
    }
}

//logout user
export function logoutLoginUser() {
    return async function logoutLoginUserThunk(dispatch, getState) {
        try {
            await axios.get("/api/v1/logout");
            dispatch(loginUser({
                isAuthenticated: false,
                message: "",
                name: "",
                email: "",
                image: "",
            }));
        } catch (error) {
            console.log(error)
        }
    }
}

//register new user
export function registerUser(name, email, password, avatar, user_image) {
    return async function registerUserThunk(dispatch, getState) {
        dispatch(setStatus(STATUSES.LOADING));
        try {
            // console.log("to back");
            const response = await axios.post("/api/v1/register", { name, email, password, user_image });
            console.log(response.data);
            const requireData = {
                name: response.data.user.name,
                email: response.data.user.email,
                isAuthenticated: true,
                message: "",
                image: response.data.user.avatar.url,
            }
            dispatch(loginUser(requireData));
            dispatch(setStatus(STATUSES.IDLE));
        } catch (error) {
            console.log({ error: error.response.data.message, isAuthenticated: false });
            dispatch(loginUser({ message: error.response.data.message, isAuthenticated: false }))
            dispatch(setStatus(STATUSES.ERROR));
        }
    }
}

//reset user password
export function resetUserPassword(email) {
    return async function resetUserPasswordThunk(dispatch, getState) {
        dispatch(setStatus(STATUSES.LOADING));
        try {
            const response = await axios.post("/api/v1/password/forgot", { email });
            const requireData = { message: response.data.Message };
            dispatch(loginUser(requireData));
            dispatch(setStatus(STATUSES.IDLE));
        } catch (error) {
            console.log(error.response.data)
            dispatch(setStatus(STATUSES.ERROR));
        }
    }
}

export function setNewPAssword(token, password, confirmPassword) {
    return async function setNewPAsswordThunk(dispatch, getState) {
        dispatch(setStatus(STATUSES.LOADING));
        try {
            const response = await axios.put(`/api/v1/password/reset/${token}`, { password, confirmPassword });
            // console.log(response)
            const requireData = {
                name: response.data.user.name,
                email: response.data.user.email,
                isAuthenticated: true,
                message: "",
                image: response.data.user.avatar.url,
            };
            dispatch(loginUser(requireData));
            dispatch(setStatus(STATUSES.IDLE));
        } catch (error) {
            console.log(error.response.data)
            dispatch(setStatus(STATUSES.ERROR));
        }
    }
}
