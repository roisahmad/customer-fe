import { CustomerPayload } from "@/types/customer";
import apiClient from "./apiClient"
import { CUSTOMER_URL } from "./apiUrl"

export const getDataCustomers = (page: number, limit: number) => {
    return apiClient.get(`${CUSTOMER_URL}`, {params: {page, limit}});
}

export const postDataCustomer = (data: CustomerPayload) => {
    return apiClient.post(`${CUSTOMER_URL}`, data);
}

export const getDataCustomerById = (id: string) => {
    return apiClient.get(`${CUSTOMER_URL}/${id}`);
}

export const putDataCustomer = (id: string, data: CustomerPayload) => {
    return apiClient.put(`${CUSTOMER_URL}${id}`, data);
}

export const deleteDataCustomer = (id: string) => {
    return apiClient.delete(`${CUSTOMER_URL}/${id}`);
}