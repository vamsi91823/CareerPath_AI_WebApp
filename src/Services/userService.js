

// Signup
const BASE_URL = `https://careerpathai-api.onrender.com/api/users`;

export async function signUpUser(formData) {
  const response = await fetch(`${BASE_URL}/signUp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const data = await response.json();

  if (!response.ok || data.success === false) {
    throw new Error(data.message || "Signup failed");
  }

  return data;
}


// Signin
export async function signInUser(credentials) {
  const response = await fetch(`${BASE_URL}/signIn`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // allow httpOnly cookie
    body: JSON.stringify(credentials),
  });

  const result = await response.json();

  if (!response.ok || result.success === false) {
    throw new Error(result.message || "Login failed");
  }

  return result;
}


// Signout
export async function signOutUser() {
  const response = await fetch(`${BASE_URL}/signOut`, {
    method: "POST",
    credentials: "include", // REQUIRED to clear httpOnly cookie
  });

  const data = await response.json();

  if (!response.ok || data.success === false) {
    throw new Error(data.message || "Logout failed");
  }

  return data;
}


// Profile
// Fetch logged-in user profile
export async function fetchUserProfileDetails() {
  const token = localStorage.getItem("token");

  const response = await fetch(`${BASE_URL}/profileDetails`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
    body: JSON.stringify({
    firebaseUid : localStorage.getItem("uid")
  }),
    credentials: "include", // allows httpOnly cookie auth
  });

  const data = await response.json();

  if (!response.ok || data.success === false) {
    throw new Error(data.message || "Unauthorized");
  }

  return data.user;
}



