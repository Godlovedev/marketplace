import { useQuery } from "@tanstack/react-query";
import { cartService } from "../../shop/cart/service/cart.service";

export function useGetOrders(){

    const {data: orders, isLoading: isLoadingOrder} = useQuery({
        queryKey: ["orders"],
        queryFn: async() => {
            return cartService.getAllOrders()
        }
    });

    return {
        orders,
        isLoadingOrder
    }
}