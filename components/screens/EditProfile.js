import React, { useState } from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const EditProfile = ({ navigation }) => {
    // Dummy data
    const displayName = "First Last";
    const username = "Username";
    const userBio = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent mollis vel tellus in maximus. Nam pulvinar nulla non finibus aliquam.";

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.cancelButton}>Cancel</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Edit Profile</Text>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.saveButton}>Save</Text>
                </TouchableOpacity>
            </View>

            {/* Profile Picture */}
            <View style={styles.profilePictureContainer}>
                <Image 
                    source={require('../../assets/images/default_pfp.jpg')}
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
                defaultValue={displayName}
                />
            </View>

            {/* Username */}
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Username</Text>
                <TextInput
                style={styles.input}
                defaultValue={`@${username}`}
                />
            </View>

            {/* Bio */}
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Bio</Text>
                <TextInput
                style={[styles.input, styles.bioInput]}
                defaultValue={userBio}
                multiline={true}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    cancelButton: {
        fontSize: 17,
        color: '#007AFF',
    },
    saveButton: {
        fontSize: 17,
        color: '#007AFF',
    },
    headerTitle: {
        fontSize: 17,
        fontWeight: 'bold',
    },
    profilePictureContainer: {
        alignItems: 'center',
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
        color: '#007AFF',
    },
    inputContainer: {
        paddingHorizontal: 15,
        color: '#007AFF',
    },
    label: {
        fontSize: 17,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    input: {
        fontSize: 17,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingVertical: 5,
    },
    bioInput: {
        height: 100,
    },
});

export default EditProfile;