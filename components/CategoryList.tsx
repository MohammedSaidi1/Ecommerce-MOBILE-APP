import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const CATEGORIES = [
    { id: '1', name: 'All', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop' },
    { id: '2', name: 'Women', image: 'https://images.unsplash.com/photo-1617922001439-4a2e6562f328?q=80&w=1974&auto=format&fit=crop' }, // clearer women fashion image
    { id: '3', name: 'Men', image: 'https://images.unsplash.com/photo-1610384104075-e05c8cf200c3?q=80&w=1964&auto=format&fit=crop' }, // clearer men fashion image
    { id: '4', name: 'Kids', image: 'https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?q=80&w=2070&auto=format&fit=crop' }, // clearer kids image
    { id: '5', name: 'Shoes', image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=1964&auto=format&fit=crop' },
];

export const CategoryList = () => {
    const router = useRouter();
    const [selected, setSelected] = React.useState('1');

    const handlePress = (id: string, name: string) => {
        setSelected(id);
        router.push({
            pathname: '/(tabs)/search',
            params: { q: name === 'All' ? '' : name }
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.headerTitle}>Categories</Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {CATEGORIES.map((cat) => (
                    <TouchableOpacity
                        key={cat.id}
                        style={[styles.item, selected === cat.id && styles.selectedItem]}
                        onPress={() => handlePress(cat.id, cat.name)}
                    >
                        <Image source={{ uri: cat.image }} style={styles.image} />
                        <View style={[styles.overlay, selected === cat.id && styles.selectedOverlay]} />
                        <Text style={[styles.text, selected === cat.id && styles.selectedText]}>{cat.name}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 24,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 12,
        paddingHorizontal: 20,
        color: Colors.light.text,
    },
    scrollContent: {
        paddingHorizontal: 20,
        gap: 12,
    },
    item: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        overflow: 'hidden',
        width: 80,
        height: 80,
        position: 'relative',
    },
    selectedItem: {
    },
    image: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    selectedOverlay: {
        backgroundColor: 'rgba(0,0,0,0.6)',
    },
    text: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 12,
    },
    selectedText: {
        fontWeight: 'bold',
    },
});
