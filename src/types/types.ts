export interface CartItem {
    product: PantryProduct;
    quantity: number;
}

export interface PantryProduct {
    id: number;
    name: string;
    category: string;
    image: number;
    price: number;
}
