import { Button } from '@/components/ui/Button';
import { Colors } from '@/constants/Colors';
import { useCartStore } from '@/store/cartStore';
import { useRouter } from 'expo-router';
import { Minus, Plus, Trash2 } from 'lucide-react-native';
import React from 'react';
import { Alert, FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated';

import { useThemeColor } from '@/hooks/useThemeColor';

export default function CartScreen() {
    const { items, total, updateQuantity, removeItem } = useCartStore();
    const router = useRouter();
    const backgroundColor = useThemeColor({}, 'background');
    const textColor = useThemeColor({}, 'text');

    const handleCheckout = () => {
        if (items.length === 0) {
            Alert.alert("Cart is empty", "Add items to cart to proceed");
            return;
        }
        // Proceed to checkout flow
        router.push('/checkout');
    };

    if (items.length === 0) {
        return (
            <SafeAreaView style={[styles.container, { backgroundColor }]}>
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>Your cart is empty</Text>
                    <Button
                        title="Start Shopping"
                        onPress={() => router.push('/(tabs)')}
                        style={styles.shopButton}
                    />
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={[styles.container, { backgroundColor }]}>
            <View style={styles.header}>
                <Text style={[styles.title, { color: textColor }]}>Shopping Cart</Text>
                <Text style={styles.subtitle}>{items.length} Items</Text>
            </View>

            <FlatList
                data={items}
                keyExtractor={(item) => `${item.id}-${item.selectedSize}-${item.selectedColor}`}
                renderItem={({ item, index }) => (
                    <Animated.View
                        entering={FadeInRight.delay(index * 100)}
                        exiting={FadeOutLeft}
                        style={styles.cartItem}
                    >
                        <Image source={{ uri: item.images[0] }} style={styles.itemImage} />
                        <View style={styles.itemDetails}>
                            <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
                            <Text style={styles.itemVariant}>{item.selectedSize} | {item.selectedColor}</Text>
                            <Text style={styles.itemPrice}>${item.price}</Text>

                            <View style={styles.quantityContainer}>
                                <TouchableOpacity
                                    onPress={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, item.quantity - 1)}
                                    style={styles.qtyButton}
                                >
                                    <Minus size={16} color="#333" />
                                </TouchableOpacity>
                                <Text style={styles.qtyText}>{item.quantity}</Text>
                                <TouchableOpacity
                                    onPress={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, item.quantity + 1)}
                                    style={styles.qtyButton}
                                >
                                    <Plus size={16} color="#333" />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <TouchableOpacity
                            onPress={() => removeItem(item.id, item.selectedSize, item.selectedColor)}
                            style={styles.removeButton}
                        >
                            <Trash2 size={20} color={Colors.light.error} />
                        </TouchableOpacity>
                    </Animated.View>
                )}
                contentContainerStyle={styles.listContent}
            />

            <View style={styles.footer}>
                <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Subtotal</Text>
                    <Text style={styles.summaryValue}>${total.toFixed(2)}</Text>
                </View>
                <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Shipping</Text>
                    <Text style={styles.summaryValue}>Free</Text>
                </View>
                <View style={[styles.summaryRow, styles.totalRow]}>
                    <Text style={styles.totalLabel}>Total</Text>
                    <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
                </View>

                <Button
                    title="Checkout"
                    onPress={handleCheckout}
                    size="large"
                    style={styles.checkoutButton}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.background,
    },
    header: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: Colors.light.text,
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 18,
        color: '#666',
        marginBottom: 20,
    },
    shopButton: {
        width: 200,
    },
    listContent: {
        padding: 20,
    },
    cartItem: {
        flexDirection: 'row',
        marginBottom: 20,
        backgroundColor: '#fff',
        borderRadius: 12,
        overflow: 'hidden',
    },
    itemImage: {
        width: 100,
        height: 120,
        borderRadius: 12,
        backgroundColor: '#f5f5f5',
    },
    itemDetails: {
        flex: 1,
        padding: 10,
        justifyContent: 'space-between',
    },
    itemName: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.light.text,
    },
    itemVariant: {
        fontSize: 12,
        color: '#888',
    },
    itemPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.light.tint,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginTop: 8,
    },
    qtyButton: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    qtyText: {
        fontSize: 14,
        fontWeight: '600',
    },
    removeButton: {
        padding: 10,
        justifyContent: 'center',
    },
    footer: {
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
        backgroundColor: Colors.light.background,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    summaryLabel: {
        fontSize: 14,
        color: '#666',
    },
    summaryValue: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.light.text,
    },
    totalRow: {
        marginTop: 10,
        marginBottom: 20,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
        paddingTop: 10,
    },
    totalLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.light.text,
    },
    totalValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.light.tint,
    },
    checkoutButton: {
        width: '100%',
    }
});
