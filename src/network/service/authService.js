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
    window.location.href = 'https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=864hy6jn3uyw75&redirect_uri=https://x9a0br47t1.execute-api.us-east-1.amazonaws.com/dev/auth/linkedin/callback&state=foobar&scope=profile%20openid%20email';
}
