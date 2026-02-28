import { Colors } from '@/constants/Colors';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'expo-router';
import { ChevronRight, Heart, LogOut, Settings, ShoppingBag } from 'lucide-react-native';
import React from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export default function ProfileScreen() {
    const { user, logout } = useAuthStore();
    const router = useRouter();
    const backgroundColor = useThemeColor({}, 'background');
    const textColor = useThemeColor({}, 'text');
    const iconColor = useThemeColor({}, 'icon');
    const borderColor = useThemeColor({}, 'border');

    const handleLogout = () => {
        logout();
        router.replace('/(auth)/welcome');
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor }]}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <Text style={[styles.title, { color: textColor }]}>Profile</Text>
                </View>

                <View style={styles.userInfo}>
                    <Image
                        source={{ uri: user?.avatar || 'https://github.com/shadcn.png' }}
                        style={styles.avatar}
                    />
                    <View>
                        <Text style={[styles.userName, { color: textColor }]}>{user?.name || 'Guest User'}</Text>
                        <Text style={[styles.userEmail, { color: textColor }]}>{user?.email || 'guest@example.com'}</Text>
                    </View>
                </View>

                <View style={styles.section}>
                    <TouchableOpacity onPress={() => router.push('/(tabs)/cart')}>
                        <MenuItem icon={<ShoppingBag size={20} color={iconColor} />} title="My Orders" borderColor={borderColor} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => router.push('/wishlist')}>
                        <MenuItem icon={<Heart size={20} color={iconColor} />} title="Wishlist" borderColor={borderColor} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => router.push('/settings')}>
                        <MenuItem icon={<Settings size={20} color={iconColor} />} title="Settings" borderColor={borderColor} />
                    </TouchableOpacity>
                </View>

                <View style={styles.section}>
                    <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                        <LogOut size={20} color={Colors.light.error} />
                        <Text style={styles.logoutText}>Log Out</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const MenuItem = ({ icon, title, borderColor }: { icon: React.ReactNode, title: string, borderColor: string }) => {
    const textColor = useThemeColor({}, 'text');
    return (
        <View style={[styles.menuItem, { borderBottomColor: borderColor }]}>
            <View style={styles.menuItemLeft}>
                {icon}
                <Text style={[styles.menuItemText, { color: textColor }]}>{title}</Text>
            </View>
            <ChevronRight size={20} color="#ccc" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.background,
    },
    scrollContent: {
        paddingBottom: 40,
    },
    header: {
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 40,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginRight: 20,
    },
    userName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    userEmail: {
        fontSize: 14,
        color: '#666',
    },
    section: {
        paddingHorizontal: 20,
        marginBottom: 30,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    menuItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
    },
    menuItemText: {
        fontSize: 16,
        fontWeight: '500',
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingVertical: 15,
    },
    logoutText: {
        color: Colors.light.error,
        fontSize: 16,
        fontWeight: '600',
    }
});
