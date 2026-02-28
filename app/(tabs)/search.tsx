import { ProductCard } from '@/components/ProductCard';
import { Input } from '@/components/ui/Input';
import { Colors } from '@/constants/Colors';
import { PRODUCTS } from '@/data/mockData';
import { Search as SearchIcon } from 'lucide-react-native';
import React, { useState } from 'react';
import { FlatList, Platform, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';

import { useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';

import { useThemeColor } from '@/hooks/useThemeColor';

export default function SearchScreen() {
    const params = useLocalSearchParams<{ q: string }>();
    const [query, setQuery] = useState(params.q || '');
    const backgroundColor = useThemeColor({}, 'background');
    const textColor = useThemeColor({}, 'text');

    useEffect(() => {
        if (params.q) {
            setQuery(params.q);
        }
    }, [params.q]);

    const filteredProducts = PRODUCTS.filter(p => {
        const q = query.toLowerCase();
        // Exact match for category if the query matches a known category name to avoid "Men" matching "Women"
        if (q === 'men' || q === 'women' || q === 'kids' || q === 'shoes') {
            return p.category.toLowerCase() === q;
        }
        return p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
    });

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
            <View style={[styles.header, { backgroundColor }]}>
                <Text style={[styles.title, { color: textColor }]}>Search</Text>
                <Input
                    placeholder="Search products..."
                    value={query}
                    onChangeText={setQuery}
                    icon={<SearchIcon size={20} color="#666" />}
                    containerStyle={styles.searchContainer}
                />
            </View>

            <FlatList
                data={filteredProducts}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.itemWrapper}>
                        <ProductCard product={item} />
                    </View>
                )}
                numColumns={2}
                contentContainerStyle={styles.listContent}
                columnWrapperStyle={styles.columnWrapper}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>No products found</Text>
                    </View>
                }
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Colors.light.background,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: Colors.light.background,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 15,
        color: Colors.light.text,
    },
    searchContainer: {
        marginBottom: 0,
    },
    listContent: {
        padding: 20,
    },
    columnWrapper: {
        justifyContent: 'space-between',
    },
    itemWrapper: {
        flex: 0.48
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        marginTop: 50,
    },
    emptyText: {
        fontSize: 16,
        color: '#999',
    }
});
