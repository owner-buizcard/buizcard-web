import axiosClient from "../axiosClient";

export async function signInWithEmail(data){
    return await axiosClient.post('/auth/login', data);
}

export async function signUpWithEmail(data){
    return await axiosClient.post('/auth/signup', data);
}

export async function loginWithGoogle(data){
    window.location.href = 'https://x9a0br47t1.execute-api.us-east-1.amazonaws.com/dev/auth/google';
}

export async function loginWithGithub(data){
    window.location.href = 'https://x9a0br47t1.execute-api.us-east-1.amazonaws.com/dev/auth/github';
}

export async function loginWithLinkedin(data){
    window.location.href = 'https://x9a0br47t1.execute-api.us-east-1.amazonaws.com/dev/auth/linkedin';
}
