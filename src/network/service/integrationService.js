import axiosClient from "../axiosClient";

export async function connectZohoCRM(code, server){
    return await axiosClient.post('/zoho/connect', { code, server });
}

export async function connectHubspot(code){
    return await axiosClient.post('/hubspot/connect', { code });
}