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
  Modal
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons'; // Make sure to install if not already
import { postCreatePost } from '../../services/api';
import { useAuth } from "../../services/firebase/useAuth";
import CommunityList from '../sub_components/CommunityList';

export default function MakePost({ navigation }) {
  const {user} = useAuth();
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [isPosting, setIsPosting] = useState(false);
  const [showCommunityModal, setShowCommunityModal] = useState(false);

  const handlePost = async () => {
    if (!content.trim()) {
      Alert.alert('Post content is required');
      return;
    }

    if (!user) {
      Alert.alert('You must be logged in to post');
      return;
    }

    const payload = {
      user_id: user.uid,
      community_id: selectedCommunity?.id || 1,
      image: image || null,
      content: content.trim(),
    };

    try {
      setIsPosting(true);
      const response = await postCreatePost(payload);
      
      if (response) {
        navigation.goBack();
        // Optionally trigger a refresh in parent component
        if (navigation.getState().routes.some(r => r.name === 'Home')) {
          navigation.navigate('Home', { refresh: true });
        }
      }
    } catch (err) {
      console.error('Error creating post:', err);
      Alert.alert('Error', err.message || 'Failed to create post');
    } finally {
      setIsPosting(false);
    }
  };

  const renderCommunityIcon = () => {
    return selectedCommunity?.community_picture ? (
      <Image 
        source={{ uri: selectedCommunity.community_picture }} 
        style={styles.communityImage} 
      />
    ) : (
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
        onPress={() => setShowCommunityModal(true)}
      >
        {selectedCommunity ? (
          <View style={styles.communityCard}>
            {renderCommunityIcon()}
            <View>
              <Text style={styles.communityName}>{selectedCommunity.name}</Text>
              <Text style={styles.communityDesc} numberOfLines={1}>
                {selectedCommunity.description || 'Community'}
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

      {/* Community Selection Modal */}
      <Modal
        visible={showCommunityModal}
        animationType="slide"
        onRequestClose={() => setShowCommunityModal(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setShowCommunityModal(false)}>
              <Ionicons name="close" size={24} color="#007AFF" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Select Community</Text>
            <View style={{ width: 24 }} />
          </View>
          
          <CommunityList 
            userId={user?.uid}
            onCommunitySelect={(community) => {
              setSelectedCommunity(community);
              setShowCommunityModal(false);
            }}
          />
        </SafeAreaView>
      </Modal>
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
  communityImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
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
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});