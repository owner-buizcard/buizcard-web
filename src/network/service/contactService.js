import axiosClient from "../axiosClient";

export async function saveContactDetails(data){
    return await axiosClient.post(`/contact-details`, data);
}

export async function updateContactDetails(contactId, data){
    return await axiosClient.put(`/contact?contactId=${contactId}`, data);
}
