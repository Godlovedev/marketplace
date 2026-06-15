import { useQuery } from "@tanstack/react-query";
import { productService } from "../service/product.service";


export function useGetProducts(){
    const {data: products, isLoading} = useQuery({
        queryKey: ["products"],
        queryFn: async() => {
            return productService.findAll()
        }
    });

    return {
        products,
        isLoading
    }
}