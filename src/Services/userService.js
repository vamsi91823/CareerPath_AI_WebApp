import API from "./api";

// Signup
export const signUpUser = (data) =>
  API.post("/users/signUp", data);

// Signin
export const signInUser = (data) =>
  API.post("/users/signIn", data);

// Signout
export const signOutUser = () =>
  API.post("/users/signOut");

// Profile
export const getProfileDetails = () =>
  API.post("/users/profileDetails");

// Save or update user profile
export const saveUserProfile = (data) =>
  API.post("/users/profile", data);

// Test
export const testAPI = () =>
  API.get("/users/route-test");
