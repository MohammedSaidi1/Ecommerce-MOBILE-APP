import { Colors } from '@/constants/Colors';
import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, TextStyle, ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

interface ButtonProps {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'small' | 'medium' | 'large';
    isLoading?: boolean;
    disabled?: boolean;
    style?: ViewStyle;
    textStyle?: TextStyle;
    icon?: React.ReactNode;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const Button: React.FC<ButtonProps> = ({
    title,
    onPress,
    variant = 'primary',
    size = 'medium',
    isLoading = false,
    disabled = false,
    style,
    textStyle,
    icon,
}) => {
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }],
        };
    });

    const handlePressIn = () => {
        scale.value = withSpring(0.97);
    };

    const handlePressOut = () => {
        scale.value = withSpring(1);
    };

    const getBackgroundColor = () => {
        if (disabled) return '#CCC';
        switch (variant) {
            case 'primary': return Colors.light.primary; 
            case 'secondary': return Colors.light.secondary;
            case 'outline': return 'transparent';
            default: return Colors.light.primary;
        }
    };

    const getTextColor = () => {
        if (disabled) return '#666';
        switch (variant) {
            case 'primary': return '#FFF';
            case 'secondary': return Colors.light.text;
            case 'outline': return Colors.light.primary;
            default: return '#FFF';
        }
    };

    const getPaddingValid = () => {
        switch (size) {
            case 'small': return 8;
            case 'medium': return 14;
            case 'large': return 18;
            default: return 14;
        }
    }

    return (
        <AnimatedPressable
            onPress={onPress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            disabled={disabled || isLoading}
            style={[
                styles.container,
                { backgroundColor: getBackgroundColor(), paddingVertical: getPaddingValid() },
                variant === 'outline' && styles.outline,
                style,
                animatedStyle
            ]}
        >
            {isLoading ? (
                <ActivityIndicator color={getTextColor()} />
            ) : (
                <>
                    {icon}
                    <Text style={[styles.text, { color: getTextColor(), fontSize: size === 'large' ? 18 : 16 }, textStyle]}>
                        {title}
                    </Text>
                </>
            )}
        </AnimatedPressable>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },
    text: {
        fontWeight: '600',
    },
    outline: {
        borderWidth: 1,
        borderColor: '#E0E0E0', 
    },
});
