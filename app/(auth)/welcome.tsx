import { Button } from '@/components/ui/Button';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Animated.View entering={FadeInUp.delay(200).duration(1000)} style={styles.imageContainer}>
                <Image
                    source={{ uri: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop' }}
                    style={styles.image}
                    resizeMode="cover"
                />
                <View style={styles.overlay} />
            </Animated.View>

            <View style={styles.contentContainer}>
                <Animated.Text entering={FadeInDown.delay(400).duration(800)} style={styles.title}>
                    Define Your Style
                </Animated.Text>
                <Animated.Text entering={FadeInDown.delay(600).duration(800)} style={styles.subtitle}>
                    Discover the latest trends in fashion and explore your personality.
                </Animated.Text>

                <Animated.View entering={FadeInDown.delay(800).duration(800)} style={styles.buttonContainer}>
                    <Button
                        title="Get Started"
                        onPress={() => router.push('/(auth)/login')}
                        style={styles.button}
                        size="large"
                    />
                </Animated.View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    imageContainer: {
        height: height * 0.6,
        width: width,
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
    contentContainer: {
        flex: 1,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        backgroundColor: Colors.light.background,
        marginTop: -30,
        padding: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: '800',
        color: Colors.light.text,
        textAlign: 'center',
        marginBottom: 12,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 40,
        lineHeight: 24,
    },
    buttonContainer: {
        width: '100%',
    },
    button: {
        width: '100%',
    },
});
