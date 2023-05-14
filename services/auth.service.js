import axios from "axios"
import Router from "next/router";

export const authService = {
    signUp,
    signIn,
};

const requestObj = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
    "Origin,Content-Type, Authorization, X-Requested-With",
    "Access-Control-Allow-Methods": "GET, POST,PUT,DELETE, OPTIONS",
    
}

async function signUp(userInfo) {
    try {
        const res = await axios.post(process.env.BASE_URL + 'auth/signUp', userInfo, requestObj);
        if (res.status === 200 ) {
            return {data:res.data,status:res.status};
        } else {
            console.log("Error ", res.data)
            return { error: true, message: res.data.message ,status:res.status}
        }
    } catch (error) {
        console.log("On Catch ", error)
        const message = (error.response && error.response.data && error.response.data.message) || "An error occured"
        return ({ error: true, message: message ,status:400})
    }
}

async function signIn(userInfo) {
    try {
        const res = await axios.post(process.env.BASE_URL + '/auth/signIn', userInfo, requestObj);
        if (res.status === 200 && res.data.user) {
            //localStorage.setItem('user', JSON.stringify(res.data.user))
            return {data:res.data,status:res.status};
        } else {
            console.log("Error ", res.data)
            return { error: true, message: res.data.message ,status:res.status}
        }
    } catch (error) {
        console.log("On Catch ", error)
        const message = (error.response && error.response.data && error.response.data.message) || "An error occured"
        return ({ error: true, message: message ,status:400})
    }
}

