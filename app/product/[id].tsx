import { CommentSection } from '@/components/CommentSection';
import { Button } from '@/components/ui/Button';
import { Colors } from '@/constants/Colors';
import { PRODUCTS } from '@/data/mockData';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, Heart, Share2, Star } from 'lucide-react-native';
import React, { useState } from 'react';
import { Dimensions, Image, Platform, ScrollView, Share, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

export default function ProductDetails() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const product = PRODUCTS.find((p) => p.id === id);
    const addItem = useCartStore((state) => state.addItem);
    const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
    const isFavorites = useWishlistStore((state) => state.items.some((item) => item.id === id));

    const backgroundColor = useThemeColor({}, 'background');
    const textColor = useThemeColor({}, 'text');
    const iconColor = useThemeColor({}, 'icon');
    const topIconColor = '#000';
    const borderColor = useThemeColor({}, 'border');

    const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || '');
    const [selectedColor, setSelectedColor] = useState(product?.colors[0] || '');
    const [comments, setComments] = useState(product?.comments || []);

    if (!product) {
        return <View style={styles.center}><Text style={{ color: textColor }}>Product not found</Text></View>;
    }

    const handleAddToCart = () => {
        addItem(product, selectedSize, selectedColor);
        router.push('/(tabs)/cart');
    };

    const handleAddComment = (content: string, rating: number) => {
        const newComment = {
            id: Math.random().toString(),
            userId: 'current-user',
            userName: 'You',
            content,
            rating,
            date: new Date().toISOString().split('T')[0],
        };
        setComments([...comments, newComment]);
    };

    const handleShare = async () => {
        try {
            await Share.share({
                message: `Check out this amazing product: ${product.name} - $${product.price}`,
                title: product.name,
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View style={[styles.container, { backgroundColor }]}>
            <Stack.Screen options={{ headerShown: false }} />
            <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: product.images[0] }} style={styles.image} />
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
                            <ArrowLeft size={24} color={topIconColor} />
                        </TouchableOpacity>
                        <View style={styles.headerRight}>
                            <TouchableOpacity style={styles.iconButton} onPress={handleShare}>
                                <Share2 size={24} color={topIconColor} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.iconButton} onPress={() => toggleWishlist(product)}>
                                <Heart
                                    size={24}
                                    color={isFavorites ? Colors.light.accent : topIconColor}
                                    fill={isFavorites ? Colors.light.accent : "transparent"}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <Animated.View entering={FadeInDown.duration(500)} style={[styles.content, { backgroundColor }]}>
                    <View style={styles.titleRow}>
                        <Text style={[styles.name, { color: textColor }]}>{product.name}</Text>
                        <Text style={[styles.price, { color: textColor }]}>${product.price}</Text>
                    </View>

                    <View style={styles.ratingRow}>
                        <Star size={16} color="#FFD700" fill="#FFD700" />
                        <Text style={[styles.ratingText, { color: textColor }]}>{product.rating} ({product.reviews} reviews)</Text>
                    </View>

                    <Text style={[styles.description, { color: textColor }]}>{product.description}</Text>

                    <View style={styles.selectorContainer}>
                        <Text style={[styles.selectorTitle, { color: textColor }]}>Size</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.sizes}>
                            {product.sizes.map((size) => (
                                <TouchableOpacity
                                    key={size}
                                    style={[
                                        styles.sizeOption,
                                        { borderColor: borderColor },
                                        selectedSize === size && styles.selectedSizeOption
                                    ]}
                                    onPress={() => setSelectedSize(size)}
                                >
                                    <Text style={[styles.sizeText, { color: textColor }, selectedSize === size && styles.selectedSizeText]}>{size}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>

                    <View style={styles.selectorContainer}>
                        <Text style={[styles.selectorTitle, { color: textColor }]}>Color</Text>
                        <View style={styles.colors}>
                            {product.colors.map((color) => (
                                <TouchableOpacity
                                    key={color}
                                    style={[
                                        styles.colorOption,
                                        { backgroundColor: color, borderColor: borderColor },
                                        selectedColor === color && styles.selectedColorOption,
                                        selectedColor === color && { borderColor: textColor }
                                    ]}
                                    onPress={() => setSelectedColor(color)}
                                />
                            ))}
                        </View>
                    </View>

                    <CommentSection comments={comments} onAddComment={handleAddComment} />

                </Animated.View>
            </ScrollView>

            <View style={[styles.footer, { backgroundColor, borderTopColor: borderColor }]}>
                <Button
                    title="Add to Cart"
                    onPress={handleAddToCart}
                    size="large"
                    style={styles.addButton}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer: {
        width: width,
        height: width * 1.2,
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    header: {
        position: 'absolute',
        top: Platform.OS === 'android' ? StatusBar.currentHeight! + 10 : 50,
        left: 20,
        right: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerRight: {
        flexDirection: 'row',
        gap: 15,
    },
    iconButton: {
        backgroundColor: 'rgba(255,255,255,0.8)',
        padding: 8,
        borderRadius: 20,
    },
    content: {
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        marginTop: -30,
        padding: 24,
        paddingBottom: 100,
        minHeight: 500,
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 8,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        flex: 1,
        marginRight: 10,
    },
    price: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        gap: 6,
    },
    ratingText: {
        fontSize: 14,
        fontWeight: '500',
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 24,
    },
    selectorContainer: {
        marginBottom: 24,
    },
    selectorTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 12,
    },
    sizes: {
        flexDirection: 'row',
        gap: 12,
    },
    sizeOption: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedSizeOption: {
        backgroundColor: Colors.light.primary,
        borderColor: Colors.light.primary,
    },
    sizeText: {
        fontSize: 14,
    },
    selectedSizeText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    colors: {
        flexDirection: 'row',
        gap: 12,
    },
    colorOption: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 1,
    },
    selectedColorOption: {
        borderWidth: 2,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 20,
        paddingBottom: Platform.OS === 'ios' ? 30 : 20,
        borderTopWidth: 1,
    },
    addButton: {
        width: '100%',
    }
});
