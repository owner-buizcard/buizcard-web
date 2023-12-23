import axiosClient from "../axiosClient";

export async function getVirtualBackgrounds(){
    return await axiosClient.get('/vb');
}
