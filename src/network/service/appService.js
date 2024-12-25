import axiosClient from "../axiosClient";

export async function fetchMainData(){
    return await axiosClient.get('/main');
}

export async function fetchConfigData(){
    return await axiosClient.get('/config');
}