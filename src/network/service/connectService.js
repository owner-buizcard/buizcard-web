import axiosClient from "../axiosClient";

export async function connectPeople(cardId){
    return await axiosClient.post('/contact', { cardId, type: "Bizcard"});
}

export async function connectRequest(cardId, connectedBy, userId){
    return await axiosClient.post('/contact-request', { cardId, connectedBy, userId, type: "Bizcard"});
}

export async function connectWithForm({ name, email, phone, message, userId, connectedBy }){
    return await axiosClient.post('/contact-form', { name, email, phone, message, userId, connectedBy });
}

export async function getMyContacts(){
    return await axiosClient.get('/user-contacts');
}

export async function removeContact(contactId){
    return await axiosClient.delete(`/contact?contactId=${contactId}`);
}
