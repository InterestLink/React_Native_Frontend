import { StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';

const CommunityStyle = StyleSheet.create({
  
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  navLinks: {
    flexDirection: 'row',
  },
  navText: {
    marginHorizontal: 8,
    fontSize: 14,
    color: '#000',
  },
  content: {
    padding: 16,
  },
  largeBox: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
  },
  largeBoxImage: {
    height: 150,
    backgroundColor: '#ddd',
    marginBottom: 8,
    borderRadius: 8,
  },
  boxTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  boxText: {
    fontSize: 14,
    color: '#555',
  },
  smallBoxesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  smallBox: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 8,
    width: '48%',
  },
  smallBoxImage: {
    height: 100,
    backgroundColor: '#ddd',
    marginBottom: 8,
    borderRadius: 8,
  },
  sidebar: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
  },
  linkText: {
    fontSize: 14,
    color: '#0066cc',
    marginVertical: 4,
  },
  bottomBox: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 8,
  },
});

export default CommunityStyle;