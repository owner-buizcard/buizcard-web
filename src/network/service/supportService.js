import axiosClient from "../axiosClient";

export async function sendFeatureRequest(userId, message){
    return await axiosClient.post('/support', { userId, message, type: "feature" });
}

export async function sendMessage(userId, message, type){
    return await axiosClient.post('/support', { userId, message, type });
}