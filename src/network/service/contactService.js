import axiosClient from "../axiosClient";

export async function saveContactDetails(data){
    return await axiosClient.post(`/contact-details`, data);
}
