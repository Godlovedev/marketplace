import apiClient from "../../../../api/apiClient"
import type { OrderPayload } from "../hooks/useCommand"

export const cartService = {
    createOrder: async(data: OrderPayload) => {
        const response = await apiClient.post("/order", data)
        return response.data
    },

    getAllOrders: async() => {
        const response = await apiClient.get("/order")
        return response.data
    },

    getOneOrder: async(id: string) => {
        const response = await apiClient.get(`/order/${id}`)
        return response.data
    },
    updateOrderStatus: async(id: string, formData: FormData) => {
        const data = Object.fromEntries(formData)
        const response = await apiClient.patch(`/order/${id}/status`, data)
        return response.data
    }
}