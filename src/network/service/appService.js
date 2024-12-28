import axiosClient from "../axiosClient";

export async function fetchMainData(){
    const [data, vbs] = await Promise.all([
        axiosClient.get('/main'),
        axiosClient.get('/vb')
    ])

    data.backgrounds = vbs;

    return data;
}

export async function fetchConfigData(){
    const [data, vbs] = await Promise.all([
        axiosClient.get('/config'),
        axiosClient.get('/vb')
    ])

    data.backgrounds = vbs;

    return data;
}