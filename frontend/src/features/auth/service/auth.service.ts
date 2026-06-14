import apiClient from "../../../api/apiClient"

export const authService = {
    login: async (formData: FormData) => {
        const data = Object.fromEntries(formData.entries())
        const response = await apiClient.post("/auth/login", data)
        return response.data
    },

    register: async (formData: FormData) => {
        const data = Object.fromEntries(formData)
        const response = await apiClient.post("/auth/register", data)
        return response.data
    }
}