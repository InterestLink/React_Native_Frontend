import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View, Image} from 'react-native';
import { useFonts } from 'expo-font';
import ProfileStyle from '../styles/ProfileStyle';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const imgPath = "../../assets/images/Default_pfp";
const username = "Username"
const followerCount = "Followers: XX"
const userBio = "Bio goes here!"

export default function Profile({navigation}) {
    const [modalVisible, setModalVisible] = useState(false);
    const [fontsLoaded] = useFonts({
            'le-murmure': require('../../assets/fonts/le-murmure.ttf'),
        });
        if (!fontsLoaded) {
            return null;
          }
    return (
        <View style={ProfileStyle.container}>
          {/* Header */}
          <View style={ProfileStyle.header}>
            <View style={ProfileStyle.logoContainer}>
            <Text style={ProfileStyle.logo}>InterestLink</Text>
            </View>
          </View>
          <View style = {ProfileStyle.profileImageContainer}>
            <Image source={require('../../assets/images/default_pfp.jpg')} style={ProfileStyle.profileImage} />
            <Text style={ProfileStyle.profileText}>{"\n"}{username}</Text>
            <Text style={ProfileStyle.profileText}>{followerCount}{"\n"}</Text>
            <Text style={ProfileStyle.profileText}>{userBio}{"\n"}</Text>
            </View>
          </View>
    )
}