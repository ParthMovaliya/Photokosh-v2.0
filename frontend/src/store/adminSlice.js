import { createSlice } from "@reduxjs/toolkit"
import { STATUSES } from "./userSlice";
import axios from "axios";

const adminSlice = createSlice({
    name: "admin",
    initialState: {
        data: [],
        status: STATUSES.IDLE,
    },
    reducers: {
        verificationUser(state, action) {
            state.data = [...action.payload]
        },
        setStatus(state, action) {
            state.status = action.payload
        }
    }
});

export const { verificationUser, setStatus } = adminSlice.actions;
export default adminSlice.reducer;

//get all verification request
export function getVerificationUser() {
    return async function getVerificationUserThunk(dispatch, getState) {
        dispatch(setStatus(STATUSES.LOADING));
        try {
            const response = await axios.get("/api/v1/getall-photographer");
            dispatch(verificationUser(response.data.vUsers));
            dispatch(setStatus(STATUSES.IDLE));
        } catch (error) {
            console.log(error.response.data)
            dispatch(setStatus(STATUSES.ERROR));
        }
    }
}

//apply for verification
export function sendVerificationUser(name, email, shopName, shopAddress, mobileNumber) {
    return async function sendVerificationUserThunk(dispatch, getState) {
        dispatch(setStatus(STATUSES.LOADING));
        try {
            const response = await axios.post("/api/v1/register-photographer", { name, email, shopName, shopAddress, mobileNumber });
            dispatch(verificationUser({ isAuthenticated: true }))
            dispatch(setStatus(STATUSES.IDLE));
        } catch (error) {
            dispatch(verificationUser({ message: error.response.data.message, isAuthenticated: false }))
            dispatch(setStatus(STATUSES.ERROR));
        }
    }
}

//verify photographer by admin
export function verifyPhotographer(name, email) {
    return async function verifyPhotographerThunk(dispatch, getState) {
        dispatch(setStatus(STATUSES.LOADING));
        try {
            try {
                const response = await axios.put("/api/v1/verify-photographer", { name, email });
                dispatch(setStatus(STATUSES.LOADING));
                // console.log(response.data)
            } catch (error) {
                console.log(error.response)
                dispatch(setStatus(STATUSES.ERROR));
            }
        } catch (error) {

        }
    }
}