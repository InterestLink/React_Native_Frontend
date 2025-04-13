import { API_URL} from "@env";

// Shared utility for GET requests with query parameters
const fetchWithParams = async (endpoint, parameters) => {
  const params = new URLSearchParams(parameters);
  const response = await fetch(`${API_URL}${endpoint}?${params}`);
  const data = await response.json();
  return data;
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
// if returnAll return all of the user profile (displayName, username, userBio, numCommunities = 0, numFollowers, numFollowing)
export const getUser = async (parameters) => {
  return await fetchWithParams("getUser", parameters);
};

// Get members of a community
export const getCommunityMembers = async (communityId) => {
  return await fetchWithParams("getProfileLists", { id: communityId, isUser: false });
};

// Get followers of a user
export const getUserFollowers = async (userId) => {
  return await fetchWithParams("getProfileLists", { id: userId, isUser: true, type: "followers" });
};

// Get users the user is following
export const getUserFollowing = async (userId) => {
  return await fetchWithParams("getProfileLists", { id: userId, isUser: true, type: "following" });
};

// parameters = { userId: 123 } Returns list of communities that specified user is in (id, name, picture)
export const getCommunities = async (parameters) => {
  return await fetchWithParams("getCommunities", parameters);
};

// parameters = { id: 123, isUser: true, userSaved: true, userLiked: false  } Returns communities or profile posts dependent on isUser, if isUser, check if userSaved or userLinked to return liked/saved posts or false on both for default. (id, username, content, image)
export const getPosts = async (parameters) => {
  return await fetchWithParams("getPosts", parameters);
};

export const getComments = async (parameters) =>{
  return await fetchWithParams("getComments", parameters);
}

// POST CALLS BELOW <------------------------------------------------------------------------>

// Add comment (userId, username, content, postId)
export const createComment = async (parameters) => {
  const response = await fetch(`${API_URL}createComment`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // 'Authorization': `Bearer ${API_KEY}` // Uncomment if needed
    },
    body: JSON.stringify(parameters),
  });
  const data = await response.json();
  return data.body;
};

// parameters = { userId: 123, communityId: 321, communityName: nameHere, username: nameHere, image: urlHere } 
export const createPost = async (parameters) => {
  const response = await fetch(`${API_URL}createPost`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // 'Authorization': `Bearer ${API_KEY}` // Uncomment if needed
    },
    body: JSON.stringify(parameters),
  });
  const data = await response.json();
  return data.body;
};

// parameters (userId, username, displayName, profilePicture)
export const createUser = async (parameters) => {
  const response = await fetch(`${API_URL}createUser`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // 'Authorization': `Bearer ${API_KEY}` // Uncomment if needed
    },
    body: JSON.stringify(parameters),
  });
  const data = await response.json();
  return data.body;
};

// parameters (guestId)
export const createGuestUser = async (parameters) => {
  const response = await fetch(`${API_URL}createUser`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // 'Authorization': `Bearer ${API_KEY}` // Uncomment if needed
    },
    body: JSON.stringify(parameters),
  });
  const data = await response.json();
  return data.body;
};

// parameters (userId, postId)
export const likePost = async (parameters) => {
  const response = await fetch(`${API_URL}likePost`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(parameters),
  });
  const data = await response.json();
  return data.body;
};

// parameters(userId, postId)
export const savePost = async (parameters) => {
  const response = await fetch(`${API_URL}savePost`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(parameters),
  });
  const data = await response.json();
  return data.body;
};

// DELETE CALLS BELOW <------------------------------------------------------------------------>

// parameters(userId, postId)
export const unlikePost = async (parameters) => {
  const response = await fetch(`${API_URL}likePost`, {
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
  const response = await fetch(`${API_URL}savePost`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(parameters),
  });
  const data = await response.json();
  return data.body;
};
