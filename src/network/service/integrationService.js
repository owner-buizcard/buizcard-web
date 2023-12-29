import axiosClient from "../axiosClient";

export async function connectZohoCRM(code, server){
    return await axiosClient.post('/zoho/connect', { code, server });
}