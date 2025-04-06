import { StyleSheet, View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import { createStackNavigator } from '@react-navigation/stack';
import DirectMessages  from '../screens/DirectMessages.js';
import ChatScreen  from '../screens/ChatScreen.js';

const Stack = createStackNavigator();

const HeaderStyle = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        borderBottomWidth: 1,
        borderColor: '#ddd',
        backgroundColor: '#fff', 
    },
    logo: {
        color: '#000',
        fontSize: 28,
        fontFamily: 'le-murmure',
    },
    logoContainer: {
        padding: 8,
    },
    icon: {
        width: 30, 
        height: 30, 
        marginTop: 13,
    },
});

export default function MainHeader() {
    const [fontsLoaded] = useFonts({
        'le-murmure': require('../../assets/fonts/le-murmure.ttf'),
    });

    const navigation = useNavigation(); // Access the navigation object

    if (!fontsLoaded) {
        return null;
    }

    const handlePress = () => {
        navigation.navigate('DirectMessages'); // Navigate to the DirectMessages screen
    };

    return (
        <SafeAreaView style={HeaderStyle.container}>
            <View style={HeaderStyle.header}>
                <View style={HeaderStyle.logoContainer}>
                    <Text style={HeaderStyle.logo}>InterestLink</Text>
                </View>
                <TouchableOpacity onPress={handlePress}>
                    <Image 
                        source={require('../../assets/images/chaticon.png')} 
                        style={HeaderStyle.icon} 
                    />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
