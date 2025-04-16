import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, TextInput, Image, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { getSearchPost, getSearchUser, getSearchCommunity } from '../../services/api';

export default function Search({ navigation }) {
    const [searchQuery, setSearchQuery] = useState(''); // State to store input data
    const [results, setResults] = useState([]); // State to store search results
    const [isLoading, setIsLoading] = useState(false); // State to manage loading state
    const [searchType, setSearchType] = useState('posts'); // State to manage search type (posts, users, communities)

    // Debounce to limit API calls
    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchQuery.trim().length > 2) { // Only search if query length is greater than 2
                handleSearch();
            } else {
                setResults([]); // Clear results if query is too short
            }
        }, 500); // 500ms debounce time

        return () => clearTimeout(timer); // Cleanup function to clear the timer
    }, [searchQuery, searchType]); // Effect runs when searchQuery or searchType changes

    const handleSearch = async () => {
        setIsLoading(true);
        try {
            let data;
            switch (searchType) {
                case 'users':
                  console.warn(searchQuery)
                    data = await getSearchUser({search : searchQuery}); // Call API to search users
                    break;
                case 'communities':
                    data = await getSearchCommunity({search : searchQuery}); // Call API to search communities
                    break;
                default: //posts
                    data = await getSearchPost({search : searchQuery}); // Call API to search posts
                    console.warn(data)
            }
            console.log('Search results:', data); // Log the search results
            setResults(data); // Update results state with fetched data
        } catch (error) {
            console.error("Search error:", error); // Log any errors
        } finally {
            setIsLoading(false); // Set loading state to false
        }
    };

    const renderItem = ({ item }) => (
      <TouchableOpacity
        style={styles.resultItem}
        onPress={() => {
          if (searchType === 'users') {
            const profileData = {
              user_id: item.user_id || item.id,
              display_name: item.display_name || item.name || "Unnamed",
              icon: item.profile_picture || null,
              username: item.username || "Anonymous",
              bio: item.bio || "",
              followers: item.followers || 0,
              following: item.following || 0,
              communities: item.communities || 0,
            };
            navigation.navigate('UserProfile', { profileData });
          } else if (searchType === 'communities') {
            
            const communityData = {
              community_id: item.community_id || item.id,
              name: item.name || "Unnamed Community",
              icon: item.community_picture || null,
              description: item.description || ""
            };
            navigation.navigate('CommunityPage', { community: communityData });
          } 
        }}
      >
        {searchType === 'users' && (
          <View style={styles.userContainer}>
            <Image
              source={item.profile_picture 
                ? { uri: item.profile_picture }
                : require('../../assets/images/default_pfp.jpg')}
              style={styles.profileImage}
            />
            <View style={styles.userInfo}>
              <Text style={styles.resultTitle}>
                {item.display_name || item.name}
              </Text>
              <Text style={styles.username}>@{item.username}</Text>
            </View>
          </View>
        )}
        
        {searchType === 'communities' && (
          <>
            <Text style={styles.resultTitle}>{item.name}</Text>
            <Text style={styles.resultSubtext}>
              {item.memberCount} members
            </Text>
          </>
        )}
        
        {searchType === 'posts' && (
  <View style={styles.userContainer}>
    <Image
      source={item.profile_picture 
        ? { uri: item.profile_picture }
        : require('../../assets/images/default_pfp.jpg')}
      style={styles.profileImage}
    />
    <View style={styles.userInfo}>
      <Text style={styles.resultTitle}>{item.title}</Text>
      <Text style={styles.resultSubtext}>
        {item.display_name ? `${item.display_name} (@${item.username})` : `Posted by @${item.username}`} in {item.communityName}
      </Text>
    </View>
  </View>
)}
      </TouchableOpacity>
    );
    return (
        <SafeAreaView style={styles.container}>
          <TextInput 
            style={styles.input} 
            placeholder="Search posts, users, or communities..." 
            value={searchQuery} 
            onChangeText={setSearchQuery}
            autoFocus
          />
    
          {/* Search Type Toggle */}
          <View style={styles.toggleContainer}>
            {['posts', 'users', 'communities'].map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.toggleButton,
                  searchType === type && styles.activeToggle
                ]}
                onPress={() => setSearchType(type)}
              >
                <Text style={styles.toggleText}>{type.charAt(0).toUpperCase() + type.slice(1)}</Text>
              </TouchableOpacity>
            ))}
          </View>
    
          {/* Results */}
          {isLoading ? (
            <ActivityIndicator style={styles.loader} />
          ) : results.length > 0 ? (
            <FlatList
              data={results}
              renderItem={renderItem}
              keyExtractor={(item) => {
                if (searchType === 'users') return item.user_id;
                if (searchType === 'communities') return item.id?.toString(); // or item.community_id
                return item.id?.toString(); // posts
              }}              
              contentContainerStyle={styles.resultsContainer}
            />
          ) : (
            <Text style={styles.noResults}>
              {searchQuery ? 'No results found' : 'Start typing to search'}
            </Text>
          )}
        </SafeAreaView>
      );
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
      },
      input: {
        height: 50,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 25,
        paddingHorizontal: 20,
        marginBottom: 15,
        fontSize: 16,
      },
      toggleContainer: {
        flexDirection: 'row',
        marginBottom: 20,
        justifyContent: 'space-around',
      },
      toggleButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
      },
      activeToggle: {
        backgroundColor: 'tomato',
      },
      toggleText: {
        color: '#333',
      },
      resultItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
      },
      resultTitle: {
        fontSize: 16,
        fontWeight: '500',
      },
      resultSubtext: {
        color: '#666',
        fontSize: 14,
      },
      noResults: {
        textAlign: 'center',
        marginTop: 50,
        color: '#888',
      },
      loader: {
        marginTop: 30,
      },
      resultsContainer: {
        paddingBottom: 20,
      },
      userContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
      },
      userInfo: {
        flex: 1,
      },
      username: {
        color: '#888',
        fontSize: 14,
      },
    });