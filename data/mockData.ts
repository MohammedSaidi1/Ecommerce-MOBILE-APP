import { Product } from '@/types';

export const PRODUCTS: Product[] = [
    {
        id: '1',
        name: 'Oversized Cotton T-Shirt',
        price: 29.99,
        category: 'Men',
        description: 'A comfortable oversized t-shirt made from 100% organic cotton.',
        images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=2080&auto=format&fit=crop'],
        rating: 4.5,
        reviews: 120,
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['#000', '#FFF', '#808080'],
        isNew: true,
        comments: [
            {
                id: 'c1',
                userId: 'u1',
                userName: 'John Doe',
                content: 'Great quality t-shirt! Fits perfectly.',
                rating: 5,
                date: '2024-02-10',
            },
            {
                id: 'c2',
                userId: 'u2',
                userName: 'Jane Smith',
                content: 'Love the material, very soft.',
                rating: 4,
                date: '2024-02-12',
            }
        ]
    },
    {
        id: '2',
        name: 'Slim Fit Jeans',
        price: 59.99,
        category: 'Women',
        description: 'Classic blue jeans with a slim fit cut. Perfect for casual wear.',
        images: ['https://images.unsplash.com/photo-1620932934088-fbdb2920e484?q=80&w=2000&auto=format&fit=crop'], 
        rating: 4.8,
        reviews: 85,
        sizes: ['28', '30', '32', '34'],
        colors: ['#1E90FF', '#000'],
        isTrending: true,
    },
    {
        id: '3',
        name: 'Leather Jacket',
        price: 199.99,
        category: 'Men',
        description: 'Premium leather jacket with a modern cut and finish.',
        images: ['https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?q=80&w=2190&auto=format&fit=crop'],
        rating: 4.9,
        reviews: 200,
        sizes: ['M', 'L', 'XL'],
        colors: ['#000', '#5c4033'],
    }
    ,

    {
        id: '5',
        name: 'Running Shoes',
        price: 89.99,
        category: 'Shoes',
        description: 'High-performance running shoes with breathable mesh.',
        images: ['https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=2000&auto=format&fit=crop'], 
        rating: 4.7,
        reviews: 300,
        sizes: ['7', '8', '9', '10', '11'],
        colors: ['#FF4500', '#000'],
    }
    ,
    {
        id: '6',
        name: 'Smart Watch',
        price: 149.99,
        category: 'Accessories',
        description: 'Feature-rich smart watch with health tracking.',
        images: ['https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=2000&auto=format&fit=crop'], 
        rating: 4.4,
        reviews: 90,
        sizes: ['One Size'],
        colors: ['#000', '#C0C0C0'],
        isTrending: true,
    },
];
