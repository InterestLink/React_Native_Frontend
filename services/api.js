import { API_URL } from "@env"; // Import API_URL from environment

// Shared utility for GET requests with query parameters
const fetchWithParams = async (endpoint, parameters) => {
  const params = new URLSearchParams(parameters);
  try {
    const response = await fetch(`${API_URL}${endpoint}?${params}`);
    const data = await response.json();
    return data;
  }catch(error){
    console.log(error)
  }
};

// Shared utility for POST requests with query parameters
const postWithParams = async (endpoint, parameters) => {
  try {
    const response = await fetch(API_URL + endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${API_KEY}` // Uncomment if needed
      },
      body: JSON.stringify(parameters),
    });

    const data = await response.json();
    console.log('API Response:', data);  // Log the full response object

    if (typeof data.body === 'string') {
      return JSON.parse(data.body);
    }
    return data.body;
  } catch (error) {
    console.error(`Error in ${endpoint}:`, error);
    throw error;
  }
};

// SEARCH CALLS BELOW <------------------------------------------------------------------------>

// Search posts by keywords
// parameters {String} query - search term
// returns = Array<{user_id: number, community_id: number, community_name: string, username: string, image: string}>
export const getSearchPost = async (parameters) => {
  return await fetchWithParams('getSearchPost', parameters);
};

// Search users by username/displayName
// parameters {String} query - search term
// returns = Array<{user_id: number, username: string, display_name: string}>
export const getSearchUser = async (parameters) => {
  return await fetchWithParams('getSearchUser', parameters);
};

// Search communities by name/description
// parameters {String} query - search term
// returns = Array<{community_id: number, name: string, description: string, memberCount: number}>
export const getSearchCommunity = async (parameters) => {
  return await fetchWithParams('getSearchCommunity', parameters);
};

// GET CALLS BELOW <------------------------------------------------------------------------>


// parameters = { user_id: 123 }
// if returnAll is true, return all user profile data (display_name, username, user_bio, num_communities, num_followers, num_following)
export const getUser = async (parameters) => {
  return await fetchWithParams("getUser", parameters)
};

// Get users in a community
export const getCommunityMembers = async (parameters) => {
  return await fetchWithParams("getCommunityMembers", parameters);
};

// Get followers of a user
export const getUserFollowers = async (parameters) => {
  return await fetchWithParams("getUserFollowers", parameters);
};

// Get users the user is following
export const getUserFollowing = async (parameters) => {
  return await fetchWithParams("getUserFollowing", parameters);
};

// parameters = { user_id: 123 } Returns list of communities that specified user is in (id, name, picture)
export const getUserCommunities = async (parameters) => {
  return await fetchWithParams("getUserCommunities", parameters);
};
// parameters = { post_id: 123, is_user: true} Returns communities or profile posts dependent on isUser, if isUser, check if userSaved or userLinked to return liked/saved posts or false on both for default. (id, username, content, image)
export const getPosts = async (parameters) => {
  return await fetchWithParams("getPosts", parameters);
};

// parameters = { post_id: 123, is_user: true, user_saved: true, user_liked: false  } Returns communities or profile posts dependent on isUser, if isUser, check if userSaved or userLinked to return liked/saved posts or false on both for default. (id, username, content, image)
export const getHomepage = async (parameters) => {
  return await fetchWithParams("getHomepage", parameters)
};

export const getComments = async (parameters) => {
  return await fetchWithParams("getComments", parameters);
}

// POST CALLS BELOW <------------------------------------------------------------------------>

// (user_id, display_name, username, bio)
export const postUpdateUser = async (params) => postWithParams("postUpdateUser", params);

// parameters = { user_id: 123, community_id: 321, community_name: name_here, username: name_here, image: url_here } 
export const createComment = async (params) => postWithParams("createComment", params);

// parameters = { user_id: 123, community_id: 321, content, image: url_here } 
export const postCreatePost = async (params) => postWithParams("postCreatePost", params);

// parameters = { user_id, username, display_name, profile_picture }
export const postUser = async (params) => postWithParams("postUser", params);

// parameters = { guest_id }
export const createGuestUser = async (params) => postWithParams("createUser", params);

// parameters = { user_id, post_id, like } true = add, false = remove
export const postLikePost = async (params) => postWithParams("postLikePost", params);

// parameters = { user_id, post_id, save } true = add, false = remove
export const postSavePost = async (params) => postWithParams("postSavePost", params);

// parameters = { follower_id, following_id, follow } true = add, false = remove
export const postFollowUser = async (params) => postWithParams("followUser", params);

// parameters = { user_id, community_id, join } true = add, false = remove
export const postJoinCommunity = async (params) => postWithParams("joinCommunity", params);
