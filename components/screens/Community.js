import * as React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import CommunityStyle from '../styles/CommunityStyle';
import { useFonts } from 'expo-font';

export default function Community({navigation}) {
    const [fontsLoaded] = useFonts({
        'le-murmure': require('../../assets/fonts/le-murmure.ttf'),
    });
    if (!fontsLoaded) {
        return null;
      }
    return (
        <View style={CommunityStyle.container}>
          {/* Header */}
          <View style={CommunityStyle.header}>
            <View style={CommunityStyle.logoContainer}>
              <Text style={CommunityStyle.logo}>InterestLink</Text>
            </View>
          </View>
    
          {/* Main Content */}
          <ScrollView contentContainerStyle={CommunityStyle.content}>
            {/* Large Content Box */}
            <View style={CommunityStyle.largeBox}>
              <View style={CommunityStyle.largeBoxImage}></View>
              <Text style={CommunityStyle.boxTitle}>Community Name</Text>
              <Text style={CommunityStyle.boxText}>
                Welcome to our community! The
              </Text>
            </View>
    
            {/* Smaller Boxes */}
            <View style={CommunityStyle.smallBoxesContainer}>
              <View style={CommunityStyle.smallBox}>
                <Text style={CommunityStyle.boxTitle}>Post title</Text>
                <Text style={CommunityStyle.boxText}>Body text</Text>
              </View>
              <View style={CommunityStyle.smallBox}>
                <Text style={CommunityStyle.boxTitle}>Post title</Text>
                <View style={CommunityStyle.smallBoxImage}></View>
              </View>
            </View>
    
            {/* Bottom Box */}
            <View style={CommunityStyle.bottomBox}>
              <Text style={CommunityStyle.boxTitle}>Post title</Text>
              <Text style={CommunityStyle.boxText}>Body text</Text>
            </View>
          </ScrollView>
        </View>
      );
    }