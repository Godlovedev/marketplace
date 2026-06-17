import type { Product } from "../../../../types/product";

type CartItem = {
    productid: string;
    name: string;
    price: number;
    imageUrl: string;
    quantity: number;
}

export function useCart(){

    const addToCart = (product: Product) => {
        // 1. Récupération du panier typé proprement
        const cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]")

        const existingProduct = cart.find((item) => item.productid === product.id)

        let newCart: CartItem[]

        if (existingProduct) {
            newCart = cart.map((item) => 
                item.productid === product.id 
                    ? { ...item, quantity: item.quantity + 1 } 
                    : item
            )
        } else {
            const newItem: CartItem = {
                productid: product.id,
                name: product.name,
                price: Number(product.price),
                imageUrl: product.imageUrl,
                quantity: 1
            }
            newCart = [...cart, newItem]
        }

        localStorage.setItem("cart", JSON.stringify(newCart))
    }

    return {
        addToCart
    }
}