import axiosClient from "../axiosClient";

export async function generateEmailSignature(data){
    return await axiosClient.post('/email-signature', data);
}