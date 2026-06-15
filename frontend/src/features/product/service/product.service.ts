import apiClient from "../../../api/apiClient"

export const productService = {
    findAll: async () => {
        const response = await apiClient.get("/product")
        return response.data
    },

    findOne: async(id:string) => {
        const response = await apiClient.get(`/product/${id}`)
        return response.data
    },

    create: async(formData: FormData) => {
        const data = Object.fromEntries(formData)
        const response = await apiClient.post("/product", data)
        return response.data
    },

    update: async(id: string, formData: FormData) => {
        const data = Object.fromEntries(formData)
        const response = await apiClient.patch(`/product/${id}`, data)
        return response.data
    },

    delete: async(id: string) => {
        const response = await apiClient.delete(`/product/${id}`)
        return response.data
    }
}