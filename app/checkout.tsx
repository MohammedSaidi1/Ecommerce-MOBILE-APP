import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Colors } from '@/constants/Colors';
import { useCartStore } from '@/store/cartStore';
import { useRouter } from 'expo-router';
import { CheckCircle, CreditCard, MapPin } from 'lucide-react-native';
import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function CheckoutScreen() {
    const router = useRouter();
    const { total, clearCart } = useCartStore();
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [zip, setZip] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [isLoading, setIsLoading] = useState(false);

    const handlePlaceOrder = () => {
        if (!address || !city || !zip) {
            Alert.alert("Error", "Please fill in all address fields");
            return;
        }

        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            clearCart();
            router.replace('/order-confirmation');
        }, 2000);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Text style={styles.backText}>Cancel</Text>
                </TouchableOpacity>
                <Text style={styles.title}>Checkout</Text>
            </View>

            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={styles.content}>
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Shipping Address</Text>
                        <Input
                            placeholder="Address"
                            value={address}
                            onChangeText={setAddress}
                            icon={<MapPin size={20} color="#666" />}
                        />
                        <View style={styles.row}>
                            <View style={styles.half}>
                                <Input placeholder="City" value={city} onChangeText={setCity} />
                            </View>
                            <View style={styles.half}>
                                <Input placeholder="ZIP Code" value={zip} onChangeText={setZip} keyboardType="numeric" />
                            </View>
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Payment Method</Text>
                        <TouchableOpacity
                            style={[styles.method, paymentMethod === 'card' && styles.selectedMethod]}
                            onPress={() => setPaymentMethod('card')}
                        >
                            <CreditCard size={24} color={paymentMethod === 'card' ? Colors.light.tint : '#666'} />
                            <Text style={[styles.methodText, paymentMethod === 'card' && styles.selectedMethodText]}>Credit Card</Text>
                            {paymentMethod === 'card' && <CheckCircle size={20} color={Colors.light.tint} />}
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.method, paymentMethod === 'apple' && styles.selectedMethod]}
                            onPress={() => setPaymentMethod('apple')}
                        >
                            <Text style={{ fontWeight: 'bold', fontSize: 20 }}></Text>
                            <Text style={[styles.methodText, paymentMethod === 'apple' && styles.selectedMethodText]}>Apple Pay</Text>
                            {paymentMethod === 'apple' && <CheckCircle size={20} color={Colors.light.tint} />}
                        </TouchableOpacity>
                    </View>

                    <View style={styles.summary}>
                        <View style={styles.summaryRow}>
                            <Text>Order Total</Text>
                            <Text style={styles.totalAmount}>${total.toFixed(2)}</Text>
                        </View>
                    </View>
                </ScrollView>

                <View style={styles.footer}>
                    <Button
                        title={`Pay $${total.toFixed(2)}`}
                        onPress={handlePlaceOrder}
                        isLoading={isLoading}
                        size="large"
                        style={styles.payButton}
                    />
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.background,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
        position: 'relative',
    },
    backButton: {
        position: 'absolute',
        left: 20,
    },
    backText: {
        color: Colors.light.tint,
        fontSize: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    content: {
        padding: 20,
    },
    section: {
        marginBottom: 30,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        color: Colors.light.text,
    },
    row: {
        flexDirection: 'row',
        gap: 15,
    },
    half: {
        flex: 1,
    },
    method: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 12,
        marginBottom: 10,
        gap: 15,
    },
    selectedMethod: {
        borderColor: Colors.light.tint,
        backgroundColor: '#f0f9ff',
    },
    methodText: {
        flex: 1,
        fontSize: 16,
        fontWeight: '500',
    },
    selectedMethodText: {
        color: Colors.light.tint,
        fontWeight: 'bold',
    },
    summary: {
        marginTop: 20,
        padding: 20,
        backgroundColor: '#f9f9f9',
        borderRadius: 12,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    totalAmount: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.light.text,
    },
    footer: {
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
        backgroundColor: Colors.light.background,
    },
    payButton: {
        width: '100%',
    }
});
