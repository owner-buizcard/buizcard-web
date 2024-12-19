import axiosClient from "../axiosClient";

export async function fetchMainData(){
    return await axiosClient.get('/main');
}

export async function fetchConfigData(){
    const [data, vbs] = await Promise.all([
        axiosClient.get('/config'),
        axiosClient.get('/vb')
    ])

    data.backgrounds = vbs;

    return data;
}