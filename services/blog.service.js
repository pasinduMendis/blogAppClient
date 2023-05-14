import axios from "axios"
import Router from "next/router";

export const blogService = {
    createBlog,
    getAllBlogs,
    getSingleBlog,
};

const requestObj = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
    "Origin,Content-Type, Authorization, X-Requested-With",
    "Access-Control-Allow-Methods": "GET, POST,PUT,DELETE, OPTIONS",
    
}

async function createBlog(blogData,session) {
    const config = {
        headers: {
            ...requestObj,
            "Authorization": session.user.accessToken
        }
    }
    try {
        const res = await axios.post(process.env.BASE_URL + '/blog/create', blogData, config);
        //console.log("RES ", res)
        if (res.status === 200 ) {
            return {data:res.data,status:res.status};
        } else {
            console.log("Error ", res.data)
            return { error: true, message: res.data.message,status:res.status }
        }
    } catch (error) {
        console.log("On Catch ", error)
        const message = (error.response && error.response.data && error.response.data.message) || "An error occured"
        return ({ error: true, message: message,status:400 })
    }
}

async function getAllBlogs(filter) {
    console.log("bodyFilte :",filter)

    try {
        const res = await axios.post(process.env.BASE_URL + 'blog/getAllBlogs', filter, requestObj);
        console.log("RES ", res)
        if (res.status === 200 ) {
            return {blogs:res.data.blogs,status:200};
        } else {
            console.log("Error ", res.data)
            return { error: true, message: res.data.message,status:res.status }
        }
    } catch (error) {
        console.log("On Catch ", error)
        const message = (error.response && error.response.data && error.response.data.message) || "An error occured"
        return ({ error: true, message: message,status:400 })
    }
}

async function getSingleBlog(blogId) {

    try {
        const res = await axios.post(process.env.BASE_URL + 'blog/getSingleBlog', {blogId:blogId}, requestObj);
        console.log("RES ", res)
        if (res.status === 200 ) {
            return {blogs:res.data.blog,status:200};
        } else {
            console.log("Error ", res.data)
            return { error: true, message: res.data.message,status:res.status }
        }
    } catch (error) {
        console.log("On Catch ", error)
        const message = (error.response && error.response.data && error.response.data.message) || "An error occured"
        return ({ error: true, message: message,status:400 })
    }
}


