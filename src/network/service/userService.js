import axiosClient from "../axiosClient";

export async function updateProfile(data){
    return await axiosClient.put('/me', data);
}

export async function updateFollowUp(value){
    return await axiosClient.put(`/followUp?value=${value}`);
}

export async function updateBranding(value){
    return await axiosClient.put(`/branding?value=${value}`);
}

export async function updatePersonalizedLink(value){
    return await axiosClient.put(`/personalizedLink?value=${value}`);
}

export async function personalizedLinkCheck(value){
    return await axiosClient.post(`/personalizedLink/check`, {domain: value});
}

export async function deleteAccount(){
    return await axiosClient.delete('/me');
}