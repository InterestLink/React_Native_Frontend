import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, ScrollView, Modal, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CommunityList from '../sub_components/CommunityList';
import PostList from '../sub_components/PostList';

const Profile = ({ navigation, route }) => {
  // Extract profile data from route params with a fallback to dummy data
  const { profileData } = route.params || {};
  
  // Provide dummy data in case profileData is undefined
  const {
    displayName = 'Default Name',
    username = 'defaultUsername',
    userBio = 'This is a default bio.',
    numCommunities = 0,
    numFollowers = 0,
    numFollowing = 0,
  } = profileData || {};

  // State to manage the selected view and modal visibility
  const [selectedView, setSelectedView] = useState('Posts');
  const [isFollowersModalVisible, setFollowersModalVisible] = useState(false);
  const [isFollowingModalVisible, setFollowingModalVisible] = useState(false);
  const [isCommunitiesModalVisible, setCommunitiesModalVisible] = useState(false);

  // State to manage the expanded bio
  const [isBioExpanded, setIsBioExpanded] = useState(false);

  // Handle share icon click
  const handleShare = () => {
    Alert.alert(
      "Share",
      "Choose an option:",
      [
        {
          text: "Copy Username",
          onPress: () => {
            // Placeholder for copy to clipboard functionality
            Alert.alert("Copied", "Username copied to clipboard.");
          },
        },
        {
          text: "Share",
          onPress: () => {
            // Placeholder for sharing via social media apps or messaging
            Alert.alert("Share", "Sharing via social media or messaging...");
          },
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ],
      { cancelable: true }
    );
  };

  // Handle edit icon click
  const handleEdit = () => {
    navigation.navigate('EditProfile'); //Navigate to EditProfile screen
  };

  // Handle settings icon click
  const handleSettings = () => {
    navigation.navigate('Settings'); //Navigate to Settings screen
  };

  // Content for each view
  const renderContent = () => {
    switch (selectedView) {
      case 'Posts':
        return <PostList id={456} isUser={true} navigation={navigation} />; {/* TODO: GET USERID HERE!!!!!!!!!!!!!! */}
      case 'Communities':
        return <CommunityList userId = {123} navigation={navigation} />;
      case 'Followers':
        return <Text>Here is the list of followers...</Text>;
      case 'Following':
        return <Text>Here is the list of following...</Text>;
      case 'Saved':
        return <PostList id={456} isUser={true} navigation={navigation} />; {/* TODO: GET USERID HERE!!!!!!!!!!!!!! ALSO LATER THIS IS FOR SAVED POSTS*/}
      case 'Liked':
        return <PostList id={456} isUser={true} navigation={navigation} />; {/* TODO: GET USERID HERE!!!!!!!!!!!!!! ALSO LATER THIS IS FOR LIKED POSTS*/}
      default:
        return <Text>Here are the user's posts...</Text>;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Settings icon in the top right corner */}
      <TouchableOpacity onPress={handleSettings} style={styles.settingsIconContainer}>
        <Image
          source={require('../../assets/images/settings.png')}
          style={styles.settingsIcon}
        />
      </TouchableOpacity>
      {/* Main Content */}
      <View style={styles.contentContainer}>
        {/* Profile Information */}
        <View style={styles.profileInfoContainer}>
          {/* Profile Image, Name, Username, and Icons */}
          <View style={styles.profileImageAndTextContainer}>  
            <Image 
              source={require('../../assets/images/default_pfp.jpg')} 
              style={styles.profileImage} 
            />
            <View style={styles.textContainer}>
              <View style={styles.nameAndEditContainer}>
                <TouchableOpacity 
                  style={styles.statItem} 
                  onPress={() => setCommunitiesModalVisible(true)} // Open Communities Modal
                >
                  <Text style={styles.statText}>Communities</Text>
                  <Text style={styles.statCount}>{numCommunities}</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.statItem} 
                  onPress={() => setFollowersModalVisible(true)} // Open Followers Modal
                >
                  <Text style={styles.statText}>Followers</Text>
                  <Text style={styles.statCount}>{numFollowers}</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.statItem} 
                  onPress={() => setFollowingModalVisible(true)} // Open Following Modal
                >
                  <Text style={styles.statText}>Following</Text>
                  <Text style={styles.statCount}>{numFollowing}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        {/* Bio */}
        <View style={styles.usernameAndShareContainer}>
          <Text style={styles.nameText}>{displayName}</Text>
          <TouchableOpacity onPress={handleEdit}>
            <Image
              source={require('../../assets/images/icons8-edit-24.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.usernameAndShareContainer}>
          <Text style={styles.usernameText}>@{username}</Text>
          <TouchableOpacity onPress={handleShare}>
            <Image
              source={require('../../assets/images/icons8-share-24.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.bioText} numberOfLines={isBioExpanded ? undefined : 1}>
          {userBio}
        </Text>

        <TouchableOpacity onPress={() => setIsBioExpanded(!isBioExpanded)} style={styles.expandTextContainer}>
          <Text style={styles.expandText}>{isBioExpanded ? 'Show Less' : 'Show More'}</Text>
        </TouchableOpacity>

        {/* Stats Section with Buttons */}
        <View style={styles.statsContainer}>
          <TouchableOpacity 
            style={styles.statItem} 
            onPress={() => setSelectedView('Posts')}
          >
            <Text style={styles.statText}>Posts</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.statItem} 
            onPress={() => setSelectedView('Saved')}
          >
            <Text style={styles.statText}>Saved</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.statItem} 
            onPress={() => setSelectedView('Liked')}
          >
            <Text style={styles.statText}>Liked</Text>
          </TouchableOpacity>
        </View>

        {/* 80% Width Separator */}
        <View style={styles.separator} />

        {/* Content Area */}
        <View style={styles.contentArea}>
          {renderContent()}
        </View>
      </View>

      {/* Followers Modal */}
      <Modal
        visible={isFollowersModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setFollowersModalVisible(false)}
      >
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

      {/* Following Modal */}
      <Modal
        visible={isFollowingModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setFollowingModalVisible(false)}
      >
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

      {/* Communities Modal */}
      <Modal
        visible={isCommunitiesModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setCommunitiesModalVisible(false)}
      >
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    flex: 1,
    padding: 16,
    flexDirection: 'column',
  },
  profileInfoContainer: {
    flexDirection: 'column', // Stack children vertically
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  profileImageAndTextContainer: {
    flexDirection: 'row', // Align profile image, text, and icons in a row
    alignItems: 'center',
    borderRadius: 8, // Space between profile image/name and bio
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40, // Make it a circle
  },
  textContainer: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  nameAndEditContainer: {
    flexDirection: 'row', // Align name and edit icon in a row
    alignItems: 'center',
  },
  usernameAndShareContainer: {
    flexDirection: 'row', // Align username and share icon in a row
    alignItems: 'center',
  },
  nameText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 8, // Space between the name and the edit icon
  },
  usernameText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8, // Space between the username and the share icon
  },
  bioText: {
    fontSize: 16,
    color: '#555',
    marginTop: 8, // Space between the row and the bio
  },
  icon: {
    width: 24,
    height: 24,
    marginHorizontal: 8
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly', // or 'space-between'
    marginVertical: 16,
  },
  statItem: {
    alignItems: 'center',
    marginHorizontal: 8, // Optional: adjust as needed
  },
  statText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  statCount: {
    fontSize: 14,
    color: '#888',
  },
  separator: {
    height: 1,
    backgroundColor: '#ddd',
    width: '80%',
    alignSelf: 'center',
    marginVertical: 16,
  },
  contentArea: {
    flex: 1,
    marginTop: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  expandTextContainer: {
    marginTop: 8,
    alignItems: 'center',
  },
  expandText: {
    color: '#007bff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  settingsIconContainer: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 1,
  },
  settingsIcon: {
    width: 24,
    height: 24,
  },
});

export default Profile;