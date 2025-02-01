import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Communities from './Communities';
import ProfilePosts from '../sub_components/ProfilePosts'; // Import ProfilePosts component

const Profile = ({ navigation }) => {
  // Dummy data
  const firstName = "First";
  const lastName = "Last";
  const username = "Username";
  const userBio = "Bio goes here!";

  // State to manage the selected view
  const [selectedView, setSelectedView] = useState('Posts'); // Default view is 'Posts'

  // Content for each view
  const renderContent = () => {
    switch (selectedView) {
      case 'Posts':
        return <ProfilePosts />;
      case 'Communities':
        return <Communities />;
      case 'Followers':
        return <Text>Here is the list of followers...</Text>;
      case 'Following':
        return <Text>Here is the list of following...</Text>;
      default:
        return <Text>Here are the user's posts...</Text>;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
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
            <Text style={styles.nameText}>{firstName} {lastName}</Text>
            <Text style={styles.usernameText}>{username}</Text>
          </View>
          <View style={styles.iconContainer}>
              <Image
                source={require('../../assets/images/icons8-edit-24.png')}
                style={styles.icon}
              />
              <Image
                source={require('../../assets/images/icons8-share-24.png')}
                style={styles.icon}
              />
          </View>
        </View>
        {/* Bio */}
        <Text style={styles.bioText}>{userBio}</Text>
        </View>

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
            onPress={() => setSelectedView('Communities')}
          >
            <Text style={styles.statText}>Communities</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.statItem} 
            onPress={() => setSelectedView('Followers')}
          >
            <Text style={styles.statText}>Followers</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.statItem} 
            onPress={() => setSelectedView('Following')}
          >
            <Text style={styles.statText}>Following</Text>
          </TouchableOpacity>
        </View>

        {/* 80% Width Separator */}
        <View style={styles.separator} />

        {/* Content Area */}
        <View style={styles.contentArea}>
          {renderContent()}
        </View>
      </View>
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
  nameText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  usernameText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  bioText: {
    fontSize: 16,
    color: '#555',
    marginTop: 8, // Space between the row and the bio
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
    fontSize: 14,
    color: '#333',
  },
  separator: {
    alignSelf: 'center',
    width: '80%', // Only takes up 80% of the container width
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginTop: 16,
  },
  contentArea: {
    flex: 1, // This will make the content take up the available space from separator to bottom
    marginTop: 16,
  },
});

export default Profile;
