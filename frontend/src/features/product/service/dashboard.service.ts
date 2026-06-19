import apiClient from "../../../api/apiClient"

export const dashboardService = {
    getDashboardData: async() => {
        const response = await apiClient.get("/dashboard")
        return response.data
    }
}