import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import Ionicons for icons

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
    iconContainer: {
        padding: 10,
        maginTop: 5,
    },
    icon: {
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
        navigation.navigate('Messages', { screen: 'DirectMessages' }); // Navigate to the DirectMessages screen
    };

    return (
        <SafeAreaView style={HeaderStyle.container}>
            <View style={HeaderStyle.header}>
                <View style={HeaderStyle.logoContainer}>
                    <Text style={HeaderStyle.logo}>InterestLink</Text>
                </View>
                <TouchableOpacity onPress={handlePress}
                    style={HeaderStyle.iconContainer}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }} // Increase touchable area
                    >
                    <Ionicons 
                        name="chatbubble-outline" 
                        size={28} 
                        style={HeaderStyle.icon}
                        color="gray"
                    />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
