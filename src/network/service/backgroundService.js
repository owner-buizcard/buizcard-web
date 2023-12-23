import axiosClient from "../axiosClient";

export async function getVirtualBackgrounds(){
    return await axiosClient.get('/vb');
}

export async function createVirtualBackground(cardId, backgroundId){
    return await axiosClient.post('/vb', { cardId, backgroundId });
}
