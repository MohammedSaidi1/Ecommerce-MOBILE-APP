import { Colors } from '@/constants/Colors';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useWishlistStore } from '@/store/wishlistStore';
import { Product } from '@/types';
import { useRouter } from 'expo-router';
import { Heart } from 'lucide-react-native';
import React from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ProductCardProps {
    product: Product;
}

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 60) / 2;

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const router = useRouter();
    const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
    const isFavorites = useWishlistStore((state) => state.items.some((item) => item.id === product.id));

    const textColor = useThemeColor({}, 'text');
    const backgroundColor = useThemeColor({}, 'background');
    const cardBackgroundColor = useThemeColor({}, 'card'); 
    const handlePress = () => {
        router.push({
            pathname: '/product/[id]',
            params: { id: product.id }
        });
    };

    const handleWishlistPress = (e: any) => {
        e.stopPropagation?.();
        toggleWishlist(product);
    };

    return (
        <TouchableOpacity style={styles.container} onPress={handlePress}>
            <View style={[styles.imageContainer, { backgroundColor: cardBackgroundColor }]}>
                <Image source={{ uri: product.images[0] }} style={styles.image} />
                <TouchableOpacity style={[styles.favoriteButton, { backgroundColor: cardBackgroundColor }]} onPress={handleWishlistPress}>
                    <Heart
                        size={16}
                        color={isFavorites ? Colors.light.accent : textColor}
                        fill={isFavorites ? Colors.light.accent : 'transparent'}
                    />
                </TouchableOpacity>
                {product.isNew && (
                    <View style={styles.tag}>
                        <Text style={styles.tagText}>NEW</Text>
                    </View>
                )}
            </View>
            <View style={styles.details}>
                <Text style={[styles.name, { color: textColor }]} numberOfLines={1}>{product.name}</Text>
                <Text style={[styles.price, { color: textColor }]}>${product.price}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: CARD_WIDTH,
        marginBottom: 20,
    },
    imageContainer: {
        width: '100%',
        height: CARD_WIDTH * 1.4,
        borderRadius: 16,
        overflow: 'hidden',
        marginBottom: 8,
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    favoriteButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        padding: 6,
        borderRadius: 20,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
    },
    tag: {
        position: 'absolute',
        top: 10,
        left: 10,
        backgroundColor: Colors.light.tint,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
    },
    tagText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: 'bold',
    },
    details: {
        paddingHorizontal: 4,
    },
    name: {
        fontSize: 14,
        marginBottom: 4,
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});
