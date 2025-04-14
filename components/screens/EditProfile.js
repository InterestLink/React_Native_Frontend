import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../services/firebase/useAuth";
import { postUpdateUser } from "../../services/api";

const EditProfile = ({ route, navigation }) => {
  const { profileData = {} } = route.params || {};
  const user = useAuth();
  const userId = "asd123"; // replace with user?.uid or appropriate dynamic ID

  const {
    username = "usernameNotFound",
    display_name = "displayNameNotFound",
    bio = "bioNotFound",
    profile_picture = null,
    communityCount = 0,
    followerCount = 0,
    followingCount = 0,
  } = profileData;

  const [displayName, setDisplayName] = useState(display_name);
  const [userName, setUserName] = useState(username);
  const [userBio, setUserBio] = useState(bio);

  const handleSave = () => {
    const payload = {
        user_id: userId,
        bio: userBio,
        profile_picture: profile_picture,
        city: null,
        state: null,
        country: null,
        display_name: displayName,
        //username: userName,
    };

    postUpdateUser(payload);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.cancelButton}>Cancel</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Edit Profile</Text>

        <TouchableOpacity onPress={handleSave}>
          <Text style={styles.saveButton}>Save</Text>
        </TouchableOpacity>
      </View>

      {/* Profile Picture */}
      <View style={styles.profilePictureContainer}>
        <Image
          source={require("../../assets/images/default_pfp.jpg")}
          style={styles.profileImage}
        />
        <TouchableOpacity style={styles.changePhotoButton}>
          <Text style={styles.changePhotoText}>Change Profile Photo</Text>
        </TouchableOpacity>
      </View>

      {/* Display Name */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Display Name</Text>
        <TextInput
          style={styles.input}
          value={displayName}
          onChangeText={setDisplayName}
        />
      </View>

      {/* Username */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          value={userName}
          onChangeText={setUserName}
        />
      </View>

      {/* Bio */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Bio</Text>
        <TextInput
          style={[styles.input, styles.bioInput]}
          value={userBio}
          onChangeText={setUserBio}
          multiline={true}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  cancelButton: {
    fontSize: 17,
    color: "#007AFF",
  },
  saveButton: {
    fontSize: 17,
    color: "#007AFF",
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: "bold",
  },
  profilePictureContainer: {
    alignItems: "center",
    padding: 15,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  changePhotoButton: {
    marginTop: 10,
  },
  changePhotoText: {
    color: "#007AFF",
  },
  inputContainer: {
    paddingHorizontal: 15,
    color: "#007AFF",
  },
  label: {
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 15,
  },
  input: {
    fontSize: 17,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 5,
  },
  bioInput: {
    height: 100,
  },
});

export default EditProfile;
