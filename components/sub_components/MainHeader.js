import { StyleSheet, View, Text, SafeAreaView } from 'react-native';
import { useFonts } from 'expo-font';

const HeaderStyle = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        paddingTop: 20, 
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
});

export default function MainHeader() {
    const [fontsLoaded] = useFonts({
        'le-murmure': require('../../assets/fonts/le-murmure.ttf'),
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <SafeAreaView style={HeaderStyle.container}>
            <View style={HeaderStyle.header}>
                <View style={HeaderStyle.logoContainer}>
                    <Text style={HeaderStyle.logo}>InterestLink</Text>
                </View>
            </View>
        </SafeAreaView>
    );
}
