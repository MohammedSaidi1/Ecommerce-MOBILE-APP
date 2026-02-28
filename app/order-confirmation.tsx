import { Button } from '@/components/ui/Button';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';
import { Check } from 'lucide-react-native';
import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import Animated, { FadeIn, ZoomIn } from 'react-native-reanimated';

export default function OrderConfirmation() {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Animated.View entering={ZoomIn.duration(800)} style={styles.iconContainer}>
                    <Check size={50} color="#fff" />
                </Animated.View>

                <Animated.Text entering={FadeIn.delay(400)} style={styles.title}>
                    Order Placed!
                </Animated.Text>

                <Animated.Text entering={FadeIn.delay(600)} style={styles.subtitle}>
                    Your order has been successfully placed and will be shipped soon.
                </Animated.Text>

                <Animated.View entering={FadeIn.delay(800)} style={styles.buttonContainer}>
                    <Button
                        title="Continue Shopping"
                        onPress={() => router.replace('/(tabs)')}
                        size="large"
                        style={styles.button}
                    />
                </Animated.View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.background,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        alignItems: 'center',
        padding: 20,
        width: '100%',
    },
    iconContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: Colors.light.tint,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
        elevation: 5,
        shadowColor: Colors.light.tint,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: Colors.light.text,
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 40,
        maxWidth: '80%',
    },
    buttonContainer: {
        width: '100%',
    },
    button: {
        width: '100%',
    }
});
