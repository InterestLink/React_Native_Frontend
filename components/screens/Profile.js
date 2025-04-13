import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, ScrollView, Modal, Button, Share } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CommunityList from '../sub_components/CommunityList';
import PostList from '../sub_components/PostList';
import { useAuth } from '../../services/firebase/useAuth'; // 🔥 Added to get current user UID

const Profile = ({ navigation, route }) => {
  const { profileData } = route.params || {};
  const user = useAuth(); // 🔥 Get current user
  const userId = user?.uid || null;

  const {
    displayName = 'Default Name',
    username = 'defaultUsername',
    userBio = 'This is a default bio.',
    numCommunities = 0,
    numFollowers = 0,
    numFollowing = 0,
  } = profileData || {};

  const [selectedView, setSelectedView] = useState('Posts');
  const [isFollowersModalVisible, setFollowersModalVisible] = useState(false);
  const [isFollowingModalVisible, setFollowingModalVisible] = useState(false);
  const [isCommunitiesModalVisible, setCommunitiesModalVisible] = useState(false);
  const [isBioExpanded, setIsBioExpanded] = useState(false);

const handleShare = async () => {
  try {
    await Share.share({
      message: `Check out ${displayName}'s profile (@${username}) on our app!`,
    });
  } catch (error) {
    console.error("Error sharing:", error);
  }
};

  const handleEdit = () => {
    navigation.navigate('EditProfile');
  };

  const handleSettings = () => {
    navigation.navigate('Settings');
  };

  const renderContent = () => {
    switch (selectedView) {
      case 'Posts':
        return <PostList id={userId} isUser={true} navigation={navigation} />;
      case 'Communities':
        return <CommunityList userId={userId} navigation={navigation} />;
      case 'Followers':
        return <Text>Here is the list of followers...</Text>;
      case 'Following':
        return <Text>Here is the list of following...</Text>;
      case 'Saved':
        return <PostList id={userId} isUser={true} navigation={navigation} />;
      case 'Liked':
        return <PostList id={userId} isUser={true} navigation={navigation} />;
      default:
        return <Text>Here are the user's posts...</Text>;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={handleSettings} style={styles.settingsIconContainer}>
        <Image source={require('../../assets/images/settings.png')} style={styles.settingsIcon} />
      </TouchableOpacity>

      <View style={styles.contentContainer}>
        <View style={styles.profileInfoContainer}>
          <View style={styles.profileImageAndTextContainer}>
            <Image source={require('../../assets/images/default_pfp.jpg')} style={styles.profileImage} />
            <View style={styles.textContainer}>
              <View style={styles.nameAndEditContainer}>
                <TouchableOpacity style={styles.statItem} onPress={() => setCommunitiesModalVisible(true)}>
                  <Text style={styles.statText}>Communities</Text>
                  <Text style={styles.statCount}>{numCommunities}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.statItem} onPress={() => setFollowersModalVisible(true)}>
                  <Text style={styles.statText}>Followers</Text>
                  <Text style={styles.statCount}>{numFollowers}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.statItem} onPress={() => setFollowingModalVisible(true)}>
                  <Text style={styles.statText}>Following</Text>
                  <Text style={styles.statCount}>{numFollowing}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.usernameAndShareContainer}>
          <Text style={styles.nameText}>{displayName}</Text>
          <TouchableOpacity onPress={handleEdit}>
            <Image source={require('../../assets/images/icons8-edit-24.png')} style={styles.icon} />
          </TouchableOpacity>
        </View>

        <View style={styles.usernameAndShareContainer}>
          <Text style={styles.usernameText}>@{username}</Text>
          <TouchableOpacity onPress={handleShare}>
            <Image source={require('../../assets/images/icons8-share-24.png')} style={styles.icon} />
          </TouchableOpacity>
        </View>

        <Text style={styles.bioText} numberOfLines={isBioExpanded ? undefined : 1}>
          {userBio}
        </Text>

        <TouchableOpacity onPress={() => setIsBioExpanded(!isBioExpanded)} style={styles.expandTextContainer}>
          <Text style={styles.expandText}>{isBioExpanded ? 'Show Less' : 'Show More'}</Text>
        </TouchableOpacity>

        <View style={styles.statsContainer}>
          <TouchableOpacity style={styles.statItem} onPress={() => setSelectedView('Posts')}>
            <Text style={styles.statText}>Posts</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.statItem} onPress={() => setSelectedView('Saved')}>
            <Text style={styles.statText}>Saved</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.statItem} onPress={() => setSelectedView('Liked')}>
            <Text style={styles.statText}>Liked</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.separator} />
        <View style={styles.contentArea}>{renderContent()}</View>
      </View>

      {/* Modals */}
      <Modal visible={isFollowersModalVisible} animationType="slide" transparent={true} onRequestClose={() => setFollowersModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Followers</Text>
            <ScrollView>
              <Text>Follower 1</Text>
              <Text>Follower 2</Text>
              <Text>Follower 3</Text>
            </ScrollView>
            <Button title="Close" onPress={() => setFollowersModalVisible(false)} />
          </View>
        </View>
      </Modal>

      <Modal visible={isFollowingModalVisible} animationType="slide" transparent={true} onRequestClose={() => setFollowingModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Following</Text>
            <ScrollView>
              <Text>Following 1</Text>
              <Text>Following 2</Text>
              <Text>Following 3</Text>
            </ScrollView>
            <Button title="Close" onPress={() => setFollowingModalVisible(false)} />
          </View>
        </View>
      </Modal>

      <Modal visible={isCommunitiesModalVisible} animationType="slide" transparent={true} onRequestClose={() => setCommunitiesModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Communities</Text>
            <ScrollView>
              <Text>Community 1</Text>
              <Text>Community 2</Text>
              <Text>Community 3</Text>
            </ScrollView>
            <Button title="Close" onPress={() => setCommunitiesModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  contentContainer: { flex: 1, padding: 16, flexDirection: 'column' },
  profileInfoContainer: { flexDirection: 'column', alignItems: 'flex-start', marginBottom: 16 },
  profileImageAndTextContainer: { flexDirection: 'row', alignItems: 'center', borderRadius: 8 },
  profileImage: { width: 80, height: 80, borderRadius: 40 },
  textContainer: { flex: 1, marginLeft: 12, justifyContent: 'center' },
  nameAndEditContainer: { flexDirection: 'row', alignItems: 'center' },
  usernameAndShareContainer: { flexDirection: 'row', alignItems: 'center' },
  nameText: { fontSize: 20, fontWeight: 'bold', marginRight: 8 },
  usernameText: { fontSize: 16, fontWeight: 'bold', marginRight: 8 },
  bioText: { fontSize: 16, color: '#555', marginTop: 8 },
  icon: { width: 24, height: 24, marginHorizontal: 8 },
  statsContainer: { flexDirection: 'row', justifyContent: 'space-evenly', marginVertical: 16 },
  statItem: { alignItems: 'center', marginHorizontal: 8 },
  statText: { fontSize: 16, fontWeight: 'bold' },
  statCount: { fontSize: 14, color: '#888' },
  separator: { height: 1, backgroundColor: '#ddd', width: '80%', alignSelf: 'center', marginVertical: 16 },
  contentArea: { flex: 1, marginTop: 16 },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' },
  modalContent: { backgroundColor: '#fff', padding: 20, borderRadius: 10, width: '80%' },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  expandTextContainer: { marginTop: 8, alignItems: 'center' },
  expandText: { color: '#007bff', fontSize: 14, fontWeight: 'bold' },
  settingsIconContainer: { position: 'absolute', top: 16, right: 16, zIndex: 1 },
  settingsIcon: { width: 24, height: 24 },
});

export default Profile;
