import axiosClient from "../axiosClient";

export async function updateProfile(data){
    return await axiosClient.put('/me', data);
}

export async function deleteAccount(){
    return await axiosClient.delete('/me');
}