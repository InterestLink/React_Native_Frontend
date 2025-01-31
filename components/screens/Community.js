import * as React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Style from '../styles/Style';
import { useFonts } from 'expo-font';

export default function Community({navigation}) {
    return (
        <View style={CommunityStyle.container}>
          {/* Header */}
          <View style={CommunityStyle.header}>
            <View style={CommunityStyle.logoContainer}>
              <Text style={CommunityStyle.logo}>InterestLink</Text>
            </View>
          </View>
    
          {/* Main Content */}
          <ScrollView contentContainerStyle={Style.content}>
            {/* Large Content Box */}
            <View style={Style.largeBox}>
              <View style={Style.largeBoxImage}></View>
              <Text style={Style.boxTitle}>Community Name</Text>
              <Text style={Style.boxText}>
                Welcome to our community! The
              </Text>
            </View>
    
            {/* Smaller Boxes */}
            <View style={Style.smallBoxesContainer}>
              <View style={Style.smallBox}>
                <Text style={Style.boxTitle}>Post title</Text>
                <Text style={Style.boxText}>Body text</Text>
              </View>
              <View style={Style.smallBox}>
                <Text style={Style.boxTitle}>Post title</Text>
                <View style={Style.smallBoxImage}></View>
              </View>
            </View>
    
            {/* Bottom Box */}
            <View style={Style.bottomBox}>
              <Text style={Style.boxTitle}>Post title</Text>
              <Text style={Style.boxText}>Body text</Text>
            </View>
          </ScrollView>
        </View>
      );
    }