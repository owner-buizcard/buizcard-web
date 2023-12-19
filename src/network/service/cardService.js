import axiosClient from "../axiosClient";

export async function getCardPreviewDetails(cardId){
    return await axiosClient.get(`/card-preview?cardId=${cardId}`);
}

export async function deleteCard(cardId){
  return await axiosClient.delete(`/card?cardId=${cardId}`);
}

export async function updateQrVisible(status, cardId){
  return await axiosClient.put(`/card?cardId=${cardId}`, {qrVisible: status});
}

export async function updateQrLogo(status, cardId){
  return await axiosClient.put(`/card?cardId=${cardId}`, {qrWithLogo: status});
}

export async function pauseCard(isPaused, cardId){
  return await axiosClient.put(`/card?cardId=${cardId}`, {status: isPaused ? "ACTIVE" : "PAUSED"});
}

export async function createBizcard(data){
  return await axiosClient.post(`/card`, data);
}

export async function uploadCardImage({cardId, key, file, fileName}){

  const formDataToSend = new FormData();
  formDataToSend.append('cardId', cardId)
  formDataToSend.append('key', key)
  formDataToSend.append('file', file, fileName)

  return await axiosClient.post(`/card-image`, formDataToSend);
}


export async function updateBizcard(cardId, data){
  return await axiosClient.put(`/card?cardId=${cardId}`, data);
}

export async function sendContactToMail(to, cardId){
  return await axiosClient.post('/receive-contact', {to, cardId});
}