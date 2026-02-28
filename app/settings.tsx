import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Colors } from '@/constants/Colors';
import { useAuthStore } from '@/store/authStore';
import { useSettingsStore } from '@/store/settingsStore';
import { useRouter } from 'expo-router';
import { ArrowLeft, Check, Globe, Moon, User as UserIcon } from 'lucide-react-native';
import React, { useState } from 'react';
import { Alert, Modal, SafeAreaView, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';

export default function SettingsScreen() {
    const router = useRouter();
    const { user, updateUser } = useAuthStore();
    const { theme, language, setTheme, setLanguage } = useSettingsStore();

    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [avatar, setAvatar] = useState(user?.avatar || '');
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [langModalVisible, setLangModalVisible] = useState(false);

    const handleSaveProfile = () => {
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            updateUser({ name, email, avatar });
            setLoading(false);
            setIsEditing(false);
            Alert.alert('Success', 'Profile updated successfully');
        }, 1000);
    };

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    };

    const languages = [
        { code: 'en', label: 'English' },
        { code: 'fr', label: 'Français' },
        { code: 'es', label: 'Español' },
    ];

    return (
        <SafeAreaView style={[styles.container, theme === 'dark' && styles.darkContainer]}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <ArrowLeft size={24} color={theme === 'dark' ? '#fff' : Colors.light.text} />
                </TouchableOpacity>
                <Text style={[styles.title, theme === 'dark' && styles.darkText]}>Settings</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {/* Profile Section */}
                <View style={[styles.section, theme === 'dark' && styles.darkSection]}>
                    <View style={styles.sectionHeader}>
                        <UserIcon size={20} color={theme === 'dark' ? '#fff' : Colors.light.text} />
                        <Text style={[styles.sectionTitle, theme === 'dark' && styles.darkText]}>Profile</Text>
                        <TouchableOpacity onPress={() => setIsEditing(!isEditing)}>
                            <Text style={styles.editButton}>{isEditing ? 'Cancel' : 'Edit'}</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.form}>
                        <Input
                            label="Name"
                            value={name}
                            onChangeText={setName}
                            editable={isEditing}
                            containerStyle={{ marginBottom: 15 }}
                        />
                        <Input
                            label="Email"
                            value={email}
                            onChangeText={setEmail}
                            editable={isEditing}
                            keyboardType="email-address"
                        />
                        <Input
                            label="Avatar URL"
                            value={avatar}
                            onChangeText={setAvatar}
                            editable={isEditing}
                        />
                        {isEditing && (
                            <Button
                                title="Save Changes"
                                onPress={handleSaveProfile}
                                isLoading={loading}
                                style={styles.saveButton}
                            />
                        )}
                    </View>
                </View>

                {/* Preferences Section */}
                <View style={[styles.section, theme === 'dark' && styles.darkSection]}>
                    <Text style={[styles.sectionTitle, theme === 'dark' && styles.darkText, { marginBottom: 20 }]}>Preferences</Text>

                    <View style={styles.row}>
                        <View style={styles.rowLeft}>
                            <Moon size={20} color={theme === 'dark' ? '#fff' : Colors.light.text} />
                            <Text style={[styles.rowText, theme === 'dark' && styles.darkText]}>Dark Mode</Text>
                        </View>
                        <Switch
                            value={theme === 'dark'}
                            onValueChange={toggleTheme}
                            trackColor={{ false: '#767577', true: Colors.light.tint }}
                            thumbColor={theme === 'dark' ? '#fff' : '#f4f3f4'}
                        />
                    </View>

                    <TouchableOpacity style={styles.row} onPress={() => setLangModalVisible(true)}>
                        <View style={styles.rowLeft}>
                            <Globe size={20} color={theme === 'dark' ? '#fff' : Colors.light.text} />
                            <Text style={[styles.rowText, theme === 'dark' && styles.darkText]}>Language</Text>
                        </View>
                        <View style={styles.rowRight}>
                            <Text style={styles.valueText}>{languages.find(l => l.code === language)?.label}</Text>
                            <ArrowLeft size={16} color="#ccc" style={{ transform: [{ rotate: '180deg' }] }} />
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            {/* Language Modal */}
            <Modal
                transparent={true}
                visible={langModalVisible}
                animationType="fade"
                onRequestClose={() => setLangModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={[styles.modalContent, theme === 'dark' && styles.darkSection]}>
                        <Text style={[styles.modalTitle, theme === 'dark' && styles.darkText]}>Select Language</Text>
                        {languages.map((lang) => (
                            <TouchableOpacity
                                key={lang.code}
                                style={styles.langOption}
                                onPress={() => {
                                    setLanguage(lang.code as any);
                                    setLangModalVisible(false);
                                }}
                            >
                                <Text style={[styles.langText, theme === 'dark' && styles.darkText]}>{lang.label}</Text>
                                {language === lang.code && <Check size={20} color={Colors.light.tint} />}
                            </TouchableOpacity>
                        ))}
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setLangModalVisible(false)}
                        >
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.background,
    },
    darkContainer: {
        backgroundColor: '#121212',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    backButton: {
        marginRight: 15,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.light.text,
    },
    darkText: {
        color: '#fff',
    },
    content: {
        padding: 20,
    },
    section: {
        marginBottom: 30,
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    darkSection: {
        backgroundColor: '#1E1E1E',
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
        flex: 1,
        color: Colors.light.text,
    },
    editButton: {
        color: Colors.light.tint,
        fontWeight: '600',
    },
    form: {
        gap: 15,
    },
    saveButton: {
        marginTop: 10,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    rowLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    rowText: {
        fontSize: 16,
        color: Colors.light.text,
    },
    rowRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    valueText: {
        color: '#888',
        fontSize: 14,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    langOption: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    langText: {
        fontSize: 16,
    },
    closeButton: {
        marginTop: 20,
        alignItems: 'center',
        padding: 10,
    },
    closeButtonText: {
        color: Colors.light.tint,
        fontWeight: 'bold',
        fontSize: 16,
    },
});
