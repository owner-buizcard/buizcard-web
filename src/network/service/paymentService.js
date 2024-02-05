import axiosClient from "../axiosClient";

export async function createOrder(amount){
    return await axiosClient.post('/order', { amount });
}

export async function createSubscribe(data){
  return await axiosClient.post('/subscribe', data);
}