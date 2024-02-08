import axiosClient from "../axiosClient";

export async function sendFeatureRequest(userId, message){
    return await axiosClient.post('/support', { userId, message, type: "feature" });
}