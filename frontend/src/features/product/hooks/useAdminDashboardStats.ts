import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "../service/dashboard.service";

export function useDashboardStats() {

    const {data: stats, isLoading, error} = useQuery({
        queryKey: ["dashboard", "stats"],
        queryFn: async() => {
            return dashboardService.getDashboardData()
        },
        refetchOnWindowFocus: true
    });

    return {
        stats,
        isLoading,
        error,
    }

}