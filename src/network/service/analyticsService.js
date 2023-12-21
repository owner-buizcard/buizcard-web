import axiosClient from "../axiosClient";

export async function getUserAnalytics(){
    return await axiosClient.get('/user-analytics');
}

export async function getCardAnalytics(cardId){
    return await axiosClient.get(`/card-analytics?cardId=${cardId}`);
}

export async function getCardLog(cardId){
    return await axiosClient.get(`/card-log?cardId=${cardId}&count=6`);
}

export async function addCardLog(cardId, by, type){
    const data = { cardId, by, type }
    return await axiosClient.post(`/card-log`, data);
}