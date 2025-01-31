import { StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';

const ProfileStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 15
      },
      header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        borderBottomWidth: 1,
        borderColor: '#ddd',
      },
      logoContainer: {
        padding: 8,
      },
      logo: {
        color: '#000',
        fontSize: 28,
        fontFamily: 'le-murmure',
      },
      profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50
      }

});

export default ProfileStyle;