import React from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width - 40;

const DATA = [
    {
        id: '1',
        title: 'New Collection',
        subtitle: 'Summer 2026',
        image: 'https://images.unsplash.com/photo-1620932934088-fbdb2920e484?q=80&w=2000&auto=format&fit=crop', // Hijab fashion
    },
    {
        id: '2',
        title: 'Streetwear',
        subtitle: 'Urban Style',
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=2080&auto=format&fit=crop', // Men's streetwear
    },
    {
        id: '3',
        title: 'Accessories',
        subtitle: 'Must Haves',
        image: 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?q=80&w=2193&auto=format&fit=crop',
    },
];

export const HeroCarousel = () => {
    const scrollX = useSharedValue(0);

    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollX.value = event.contentOffset.x;
        },
    });

    return (
        <View style={styles.container}>
            <Animated.ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={scrollHandler}
                scrollEventThrottle={16}
                snapToInterval={ITEM_WIDTH + 20}
                decelerationRate="fast"
                contentContainerStyle={styles.scrollContent}
            >
                {DATA.map((item, index) => (
                    <View key={item.id} style={styles.card}>
                        <Image source={{ uri: item.image }} style={styles.image} />
                        <View style={styles.overlay}>
                            <Text style={styles.subtitle}>{item.subtitle}</Text>
                            <Text style={styles.title}>{item.title}</Text>
                        </View>
                    </View>
                ))}
            </Animated.ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 24,
    },
    scrollContent: {
        paddingHorizontal: 20,
        gap: 15,
    },
    card: {
        width: ITEM_WIDTH,
        height: 200,
        borderRadius: 20,
        overflow: 'hidden',
        backgroundColor: '#eee',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'flex-end',
        padding: 20,
    },
    title: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
    subtitle: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 4,
        textTransform: 'uppercase',
    },
});
