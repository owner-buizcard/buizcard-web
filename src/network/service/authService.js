import axiosClient from "../axiosClient";

export async function signInWithEmail(data){
    return await axiosClient.post('/auth/login', data);
}

export async function signUpWithEmail(data){
    return await axiosClient.post('/auth/signup', data);
}

export async function loginWithGoogle(data){
    return await axiosClient.get('/auth/google', data);
}
