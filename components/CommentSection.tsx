import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Colors } from '@/constants/Colors';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Comment } from '@/types';
import { Star, User } from 'lucide-react-native';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

interface CommentSectionProps {
    comments: Comment[];
    onAddComment: (content: string, rating: number) => void;
}

export const CommentSection: React.FC<CommentSectionProps> = ({ comments, onAddComment }) => {
    const [newComment, setNewComment] = useState('');
    const [rating, setRating] = useState(5);
    const textColor = useThemeColor({}, 'text');
    const backgroundColor = useThemeColor({}, 'background');
    const borderColor = useThemeColor({}, 'border');

    // In a real app we would get this from auth store
    const user = { name: "You" };

    const handleSubmit = () => {
        if (newComment.trim()) {
            onAddComment(newComment, rating);
            setNewComment('');
            setRating(5);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={[styles.title, { color: textColor }]}>Reviews ({comments.length})</Text>

            {comments.map((comment) => (
                <View key={comment.id} style={[styles.commentCard, { borderColor }]}>
                    <View style={styles.commentHeader}>
                        <View style={styles.userInfo}>
                            {comment.userAvatar ? (
                                <Image source={{ uri: comment.userAvatar }} style={styles.avatar} />
                            ) : (
                                <View style={[styles.avatarPlaceholder, { backgroundColor: Colors.light.tint }]}>
                                    <User size={16} color="#fff" />
                                </View>
                            )}
                            <View>
                                <Text style={[styles.userName, { color: textColor }]}>{comment.userName}</Text>
                                <View style={styles.ratingContainer}>
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            size={12}
                                            color={i < comment.rating ? "#FFD700" : "#ccc"}
                                            fill={i < comment.rating ? "#FFD700" : "transparent"}
                                        />
                                    ))}
                                    <Text style={styles.date}>{comment.date}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <Text style={[styles.commentContent, { color: textColor }]}>{comment.content}</Text>
                </View>
            ))}

            <View style={styles.addCommentContainer}>
                <Text style={[styles.addCommentTitle, { color: textColor }]}>Write a Review</Text>

                <View style={styles.ratingInput}>
                    <Text style={{ color: textColor }}>Rating:</Text>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                            key={star}
                            size={24}
                            color={star <= rating ? "#FFD700" : "#ccc"}
                            fill={star <= rating ? "#FFD700" : "transparent"}
                            onPress={() => setRating(star)}
                        />
                    ))}
                </View>

                <Input
                    placeholder="Share your thoughts..."
                    value={newComment}
                    onChangeText={setNewComment}
                    multiline
                    numberOfLines={4}
                    containerStyle={{ marginBottom: 15 }}
                />

                <Button title="Submit Review" onPress={handleSubmit} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        marginBottom: 40,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    commentCard: {
        padding: 15,
        borderRadius: 12,
        borderWidth: 1,
        marginBottom: 15,
    },
    commentHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    userInfo: {
        flexDirection: 'row',
        gap: 10,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    avatarPlaceholder: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    userName: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        marginTop: 2,
    },
    date: {
        fontSize: 12,
        color: '#888',
        marginLeft: 5,
    },
    commentContent: {
        fontSize: 14,
        lineHeight: 20,
    },
    addCommentContainer: {
        marginTop: 20,
    },
    addCommentTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    ratingInput: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginBottom: 15,
    },
});
