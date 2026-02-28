import { Colors } from '@/constants/Colors';
import { useAuthStore } from '@/store/authStore';
import { Redirect } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

export default function Index() {
    const { isAuthenticated, isLoading, setLoading } = useAuthStore();

    console.log('[Index] Render - isLoading:', isLoading, 'isAuthenticated:', isAuthenticated);

    useEffect(() => {
        console.log('[Index] useEffect triggered');
        const checkAuth = () => {
            console.log('[Index] checkAuth calling setLoading(false) in 1s...');
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        };
        checkAuth();
    }, []);

    if (isLoading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color={Colors.light.tint} />
                <Text style={styles.text}>Welcome to Luxe</Text>
            </View>
        );
    }

    if (!isAuthenticated) {
        console.log('[Index] Redirecting to welcome');
        return <Redirect href="/(auth)/welcome" />;
    }

    console.log('[Index] Redirecting to tabs');
    return <Redirect href="/(tabs)" />;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.light.background,
    },
    text: {
        marginTop: 20,
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.light.text,
    },
});
