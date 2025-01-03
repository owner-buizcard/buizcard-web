import axiosClient from "../axiosClient";

export async function getContacts({ page, query, groupBy}){
    return await axiosClient.get(`/contact-list?page=${page}&limit=10&query=${query??''}&groupBy=${groupBy}`);
}

export async function createContact(data){
    return await axiosClient.post(`/contact`, data);
}

export async function updateContactDetails(contactId, data){
    return await axiosClient.put(`/contact?contactId=${contactId}`, data);
}

export async function exportContacts(ids, type){
    return await axiosClient.post(`/${type}/export`, {contactIds: ids});
}

export async function sendMailToContacts(data){
    return await axiosClient.post('contact/mail', data);
}


