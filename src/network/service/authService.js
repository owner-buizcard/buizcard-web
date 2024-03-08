import { BASE_URL } from "../../utils/global";
import axiosClient from "../axiosClient";

export async function signInWithEmail(data){
    return await axiosClient.post('/auth/login', data);
}

export async function initApp(){
    return await axiosClient.post('/auth/init');
}

export async function signUpWithEmail(data){
    return await axiosClient.post('/auth/signup', data);
}

export async function loginWithGoogle(data){
    window.location.href = `${BASE_URL}/auth/google`;
}

export async function loginWithGithub(data){
    console.log(`${BASE_URL}/auth/github`)
    window.location.href = `${BASE_URL}/auth/github`;
}

export async function loginWithLinkedin(data){
    window.location.href = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=7782mi1w2h629z&redirect_uri=${BASE_URL}/auth/callback/linkedin&state=foobar&scope=profile%20openid%20email`;
}

export async function forgotPassword(data){
    return await axiosClient.post('/auth/password/forgot', data);
}

export async function resetPassword(data){
    return await axiosClient.put('/auth/password/reset', data);
}

export async function sendVerificationEmail(){
    return await axiosClient.put('/auth/verify-email');
}