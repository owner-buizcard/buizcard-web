import axiosClient from "../axiosClient";

export async function saveContactDetails(data){
    return await axiosClient.post(`/contact-details`, data);
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


