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
    return data.body || JSON.parse(data.body); // Handle both direct and stringified JSON body
  } catch (error) {
    console.error(`Error in ${endpoint}:`, error);
    throw error;
  }
};

// SEARCH CALLS BELOW <------------------------------------------------------------------------>

// Search posts by keywords
// parameters {String} query - search term
// returns = Array<{userId: number, communityId: number, communityName: string, username: string, image: string}>
export const searchPosts = async (parameters) => {
  return await fetchWithParams('searchPosts', { parameters });
};

// Search users by username/displayName
// parameters {String} query - search term
// returns = Array<{userId: number, username: string, displayName: string}>
export const searchUsers = async (parameters) => {
  return await fetchWithParams('searchUsers', { parameters });
};

// Search communities by name/description
// parameters {String} query - search term
// returns = Array<{id: number, name: string, description: string, memberCount: number}>
export const searchCommunities = async (parameters) => {
  return await fetchWithParams('searchCommunities', { parameters });
};

// GET CALLS BELOW <------------------------------------------------------------------------>


// parameters = { userId: 123, returnAll: true }
// if returnAll is true, return all user profile data (displayName, username, userBio, numCommunities, numFollowers, numFollowing)
export const getUser = async (parameters) => {
  return await fetchWithParams("getUser", parameters)
};

// Get users in a community
export const getCommunityMembers = async (communityId) => {
  return await fetchWithParams("getProfileLists", { id: communityId });
};

// Get followers of a user
export const getUserFollowers = async (userId) => {
  return await fetchWithParams("getProfileLists", { id: userId });
};

// Get users the user is following
export const getUserFollowing = async (userId) => {
  return await fetchWithParams("getProfileLists", { id: userId });
};

// parameters = { userId: 123 } Returns list of communities that specified user is in (id, name, picture)
export const getUserCommunities = async (parameters) => {
  return await fetchWithParams("getUserCommunities", parameters);
};
// parameters = { id: 123, isUser: true} Returns communities or profile posts dependent on isUser, if isUser, check if userSaved or userLinked to return liked/saved posts or false on both for default. (id, username, content, image)
export const getPosts = async (parameters) => {
  return await fetchWithParams("getPosts", parameters);
};

// parameters = { id: 123, isUser: true, userSaved: true, userLiked: false  } Returns communities or profile posts dependent on isUser, if isUser, check if userSaved or userLinked to return liked/saved posts or false on both for default. (id, username, content, image)
export const getHomepage = async (parameters) => {
  return await fetchWithParams("getHomepage", parameters)
};

export const getComments = async (parameters) => {
  return await fetchWithParams("getComments", parameters);
}

// POST CALLS BELOW <------------------------------------------------------------------------>

// (userId, displayName, username, bio)
export const postUserUpdate = async (params) => postWithParams("postUserUpdate", params);

// parameters = { userId: 123, communityId: 321, communityName: nameHere, username: nameHere, image: urlHere } 
export const createComment = async (params) => postWithParams("createComment", params);

// parameters = { userId: 123, communityId: 321, communityName: nameHere, username: nameHere, image: urlHere } 
export const createPost = async (params) => postWithParams("createPost", params);

// parameters = { userId, username, displayName, profilePicture }
export const postUser = async (params) => postWithParams("postUser", params);

// parameters = { guestId }
export const createGuestUser = async (params) => postWithParams("createUser", params);

// parameters = { userId, postId }
export const likePost = async (params) => postWithParams("likePost", params);

// parameters = { userId, postId }
export const savePost = async (params) => postWithParams("savePost", params);

// DELETE CALLS BELOW <------------------------------------------------------------------------>

// parameters(userId, postId)
export const unlikePost = async (parameters) => {
  const response = await fetch(API_URL + "likePost", {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(parameters),
  });
  const data = await response.json();
  return data.body;
};

// parameters(userId, postId)
export const unSavePost = async (parameters) => {
  const response = await fetch(API_URL + "savePost", {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(parameters),
  });
  const data = await response.json();
  return data.body;
};
