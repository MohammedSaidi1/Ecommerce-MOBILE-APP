export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
}

export interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    category: string;
    images: string[];
    rating: number;
    reviews: number;
    sizes: string[];
    colors: string[];
    isNew?: boolean;
    isTrending?: boolean;
    comments?: Comment[];
}

export interface Comment {
    id: string;
    userId: string;
    userName: string;
    userAvatar?: string;
    content: string;
    rating: number;
    date: string;
}

export interface CartItem extends Product {
    quantity: number;
    selectedSize: string;
    selectedColor: string;
}
