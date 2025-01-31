import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// Import your Header and Footer components if needed

const Profile = ({ navigation }) => {
  // Dummy data
  const username = "Username";
  const userBio = "Bio goes here!";
  
  return (
    <SafeAreaView style={styles.container}>

      {/* Main Content */}
      <View style={styles.contentContainer}>
        {/* Profile Information */}
        <View style={styles.profileInfoContainer}>
          <Image 
            source={require('../../assets/images/default_pfp.jpg')} 
            style={styles.profileImage} 
          />
          <View style={styles.textContainer}>
            <Text style={styles.usernameText}>{username}</Text>
            <Text style={styles.bioText}>{userBio}</Text>
          </View>
        </View>

        {/* Stats Section */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statText}>Posts</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statText}>Communities</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statText}>Followers</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statText}>Following</Text>
          </View>
        </View>

        {/* 80% Width Separator */}
        <View style={styles.separator} />
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
    },
    profileInfoContainer: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: 16,
    },
    profileImage: {
      width: 80,
      height: 80,
      borderRadius: 40, // makes it circular
    },
    textContainer: {
      flex: 1,
      marginLeft: 12,
      justifyContent: 'center',
    },
    usernameText: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    bioText: {
      fontSize: 16,
      color: '#555',
      marginTop: 4,
    },
    statsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-evenly', // or 'space-between'
      marginVertical: 16,
    },
    statItem: {
      alignItems: 'center',
      // Removed flex: 1 for better spacing
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
  });

export default Profile;
