import axiosClient from "../axiosClient";

export async function connectBizard(cardId){
    return await axiosClient.post('/contact/connect', { cardId});
}

export async function connectRequest(cardId, connectedBy, userId){
    return await axiosClient.post('/contact-request', { cardId, connectedBy, userId, type: "Bizcard"});
}

export async function connectWithForm({ firstName, lastName, email, phone, message, accountID, connectedBy }){
    return await axiosClient.post('/contact/message', { firstName, lastName, email, phone, message, accountID, connectedBy });
}

export async function getMyContacts(){
    return await axiosClient.get('/user-contacts');
}

export async function addTags(contactId, tags){
    return await axiosClient.put(`/contact?contactId=${contactId}`, { tags });
}

export async function removeContact(contactId){
    return await axiosClient.delete(`/contact?contactId=${contactId}`);
}
