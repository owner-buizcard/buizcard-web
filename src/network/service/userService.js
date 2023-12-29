import axiosClient from "../axiosClient";

export async function updateProfile(data){
    return await axiosClient.put('/me', data);
}