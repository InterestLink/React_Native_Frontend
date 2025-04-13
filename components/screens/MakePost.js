import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons'; // Make sure to install if not already
import { createPost } from '../../services/api';
import { getAuth } from 'firebase/auth';

export default function MakePost({ navigation }) {
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null); // Placeholder for image picker later
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [isPosting, setIsPosting] = useState(false);

  const handlePost = async () => {
    if (!content.trim()) {
      Alert.alert('Post content is required');
      return;
    }

    const user = getAuth().currentUser;
    if (!user) {
      Alert.alert('You must be logged in to post');
      return;
    }

    const payload = {
      userId: user.uid,
      username: user.username || 'Anonymous',
      communityId: selectedCommunity?.id || null,
      communityName: selectedCommunity?.name || null,
      image: image || null,
      content: content.trim(),
    };

    try {
      setIsPosting(true);
      await createPost(payload);
      navigation.goBack();
    } catch (err) {
      console.error('Error creating post:', err);
      Alert.alert('Error creating post');
    } finally {
      setIsPosting(false);
    }
  };

  // Fallback icon component if image doesn't load
  const renderCommunityIcon = () => {
    return (
      <View style={styles.communityIconFallback}>
        <Ionicons name="people" size={24} color="white" />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.cancel}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.title}>New Post</Text>
        <TouchableOpacity onPress={handlePost} disabled={isPosting}>
          {isPosting ? (
            <ActivityIndicator size="small" color="#007AFF" />
          ) : (
            <Text style={styles.post}>Post</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Community Selector */}
      <TouchableOpacity
        style={styles.communitySelector}
        onPress={() => {
          setSelectedCommunity({
            id: '1',
            name: 'InterestLink Rules',
            description: 'A place for people that love the app',
          });
        }}
      >
        {selectedCommunity ? (
          <View style={styles.communityCard}>
            {renderCommunityIcon()}
            <View>
              <Text style={styles.communityName}>{selectedCommunity.name}</Text>
              <Text style={styles.communityDesc} numberOfLines={1}>
                {selectedCommunity.description}
              </Text>
            </View>
          </View>
        ) : (
          <Text style={styles.selectPrompt}>
            Post to your profile or select a community...
          </Text>
        )}
      </TouchableOpacity>

      {/* Text input */}
      <TextInput
        style={styles.textInput}
        placeholder="What's on your mind?"
        multiline
        value={content}
        onChangeText={setContent}
      />

      {/* Image preview */}
      {image && (
        <Image 
          source={{ uri: image }} 
          style={styles.imagePreview} 
          resizeMode="cover"
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  cancel: {
    fontSize: 17,
    color: '#007AFF',
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  post: {
    fontSize: 17,
    color: '#007AFF',
  },
  communitySelector: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  selectPrompt: {
    color: '#888',
    fontSize: 16,
  },
  communityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  communityIconFallback: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  communityName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  communityDesc: {
    color: '#666',
    fontSize: 13,
  },
  textInput: {
    padding: 15,
    fontSize: 16,
    textAlignVertical: 'top',
    minHeight: 150,
  },
  imagePreview: {
    margin: 15,
    height: 200,
    borderRadius: 10,
  },
});